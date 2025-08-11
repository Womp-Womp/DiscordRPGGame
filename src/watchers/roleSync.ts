import { Client, GuildMember } from 'discord.js';
import fs from 'fs/promises';
import path from 'path';

// Mapping of Discord role IDs to perk identifiers.
// Update the role IDs to match your server configuration.
const ROLE_PERKS: Record<string, string> = {
  '123456789012345678': 'supporter',
  '234567890123456789': 'vip',
};

const GRACE_PERIOD_MS = 72 * 60 * 60 * 1000; // 72 hours
const CLEANUP_INTERVAL_MS = 60 * 60 * 1000; // 1 hour
const STORE_PATH = path.join(__dirname, '../../data/entitlements.json');

interface PerkInfo {
  grantedAt: number;
  expiresAt?: number;
}

// userId -> perk -> info
type EntitlementStore = Record<string, Record<string, PerkInfo>>;

async function readStore(): Promise<EntitlementStore> {
  try {
    const data = await fs.readFile(STORE_PATH, 'utf8');
    return JSON.parse(data) as EntitlementStore;
  } catch {
    return {};
  }
}

async function writeStore(store: EntitlementStore): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

/**
 * Setup synchronization between Discord roles and in-game perks.
 * A 72 hour grace period is applied before perks are revoked.
 */
export async function setupRoleSync(client: Client): Promise<void> {
  const entitlements = await readStore();

  async function cleanupExpired(): Promise<void> {
    const now = Date.now();
    let changed = false;
    for (const [userId, perks] of Object.entries(entitlements)) {
      for (const [perk, info] of Object.entries(perks)) {
        if (info.expiresAt && info.expiresAt <= now) {
          delete perks[perk];
          changed = true;
        }
      }
      if (Object.keys(perks).length === 0) {
        delete entitlements[userId];
        changed = true;
      }
    }
    if (changed) {
      await writeStore(entitlements);
    }
  }

  // Initial cleanup and scheduled cleanup for expired entitlements
  await cleanupExpired();
  setInterval(() => {
    void cleanupExpired();
  }, CLEANUP_INTERVAL_MS);

  client.on('guildMemberUpdate', async (oldMember: GuildMember, newMember: GuildMember) => {
    const now = Date.now();
    const userId = newMember.id;
    const userEntitlements = entitlements[userId] ?? {};

    // Remove expired entitlements for this user
    for (const [perk, info] of Object.entries(userEntitlements)) {
      if (info.expiresAt && info.expiresAt <= now) {
        delete userEntitlements[perk];
      }
    }

    const oldRoles = new Set(oldMember.roles.cache.keys());
    const newRoles = new Set(newMember.roles.cache.keys());

    // Roles added -> grant perks immediately
    for (const roleId of newRoles) {
      if (!oldRoles.has(roleId)) {
        const perk = ROLE_PERKS[roleId];
        if (perk) {
          userEntitlements[perk] = { grantedAt: now };
        }
      }
    }

    // Roles removed -> schedule perk revocation after grace period
    for (const roleId of oldRoles) {
      if (!newRoles.has(roleId)) {
        const perk = ROLE_PERKS[roleId];
        if (perk && userEntitlements[perk]) {
          userEntitlements[perk].expiresAt = now + GRACE_PERIOD_MS;
        }
      }
    }

    if (Object.keys(userEntitlements).length > 0) {
      entitlements[userId] = userEntitlements;
    } else {
      delete entitlements[userId];
    }

    await writeStore(entitlements);
  });
}

