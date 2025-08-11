# DiscordRPGGame
RPG Game For Discord
# Tesseract Tavern — The Bible v0.2 (PRD + README)

> **Tagline:** *A Discord-native, headless-first, AI-authored D\&D sandbox with factorio-grade factories, emoji bases, emergent politics, and numbers that outrun common sense.*

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in the environment variables:
   - `DISCORD_TOKEN`: Bot token from the Discord Developer Portal.
   - `CLIENT_ID`: Discord application client ID.
   - `DATABASE_URL`: Database connection string for your database (e.g., `postgresql://user:password@localhost:5432/database`).

---

## 0) Version & Changelog (v0.2)

**What’s new vs v0.1 (opinionated, sweeping):**

* **Base & Territory Layer:** Emoji/ASCII grid bases with pathfinding, districts, traps, and weekly defense scoring. Optional PNG renderer + interactive web builder.
* **AI Director & Narrative Systems:** Encounter Director; Rumor Engine; dynamic villain arcs; deity **Covenants** with boons/banes.
* **Economy 2.0:** Power grid (generation, storage, line loss), machine wear/maintenance, **Insurance** for caravans, **Auction microstructure** (maker/taker fees, floors, breakers).
* **Social Ops:** Guild charters, treaties/sanctions, **Heists** and **Espionage** (consent-gated).
* **Exploration:** Surveying, hazards, map marketplace; cartographer profession.
* **Modding & Automation:** Encounter DSL, Blueprint Exchange, **safe scriptable automation** (deterministic, capped).
* **Ops & Observability:** Live KPIs, ledger diffs, seed replay, economy Monte Carlo.
* **Patreon Role Sync:** No OAuth; role→perk mapping; entitlement grace window.

> **Design stance:** Add depth without bloating cognitive load: emoji/ASCII for immediacy, PNG for precision, JSON as canon. All outcomes remain reproducible from seed.

---

## 1) Vision & Pillars

**Vision:** Build a living D\&D-flavored world where **factories**, **bases**, **factions**, and **lore** co-evolve. It’s fun in 30 seconds, deep at 30 hours, alive at 30 weeks.

**Pillars**

1. **Explosive Scale:** 1 → 10^10^10+ with automatic notation shifts (scientific → engineering → hyper).
2. **Emergent Complexity:** Production graphs, logistics, markets, politics, weather, deity edicts.
3. **AI-Authored World:** Gemini 2.5 Flash emits **strict JSON** content + weekly Season Chronicle; all inputs/outputs versioned and hashed.
4. **Headless-First:** Core engine ≠ UI. Discord bot and CLI share the same simulation.
5. **Deterministic Fairness:** Seeded RNG, signed EventIDs, replayable logs, audit-grade results.

---

## 2) Player Fantasy & Core Loops

**You are a Guildmaster** designing bases, commanding parties, running factories, negotiating with factions, and making covenants with gods. The world responds—economically and narratively.

**Time-Scale Loops**

* **30s:** `/mission quick`, `/base show`, reroll a contract.
* **2–5 min:** tweak craft queues, research picks, caravan routes.
* **15–30 min:** build/upgrade, party loadouts, district planning.
* **3–12 h:** region timers, factory throughput, boss windows.
* **Weekly:** raid windows, territory scoring, Season Chronicle.

---

## 3) World: Structure & Simulation

**World → Continents → Regions → Hex Tiles (biomes)** with threat clocks (undead bloom, infernal fissures). Factions carry **traits, ideologies, stances**, and **resource specialties**. Climate + calendar drive seasonality.

**Campaign:** Chapters and Acts introduce global modifiers and unlocks (e.g., enchanting, airships, planar trade).

---

## 4) Systems (Baseline)

### 4.1 Heroes & Parties

Classes (Martial/Caster/Trickster/Support) + subclasses, talents, elemental synergies (bleed/burn/frost/holy/void). Injury/exhaustion gates. Companions via crafted Spirits.

### 4.2 Missions & Dungeons

Templates: hunt/escort/siege/heist/expedition/delve/boss. Contracts with affixes (“no fire”, “fog”, “time dilation”). Deterministic sim + seeded RNG → concise CombatLog.

### 4.3 Combat (Abstracted, Auditable)

Elements: physical/fire/frost/shock/holy/void with combo reactions. Boss phase DSL supporting interrupts, purges, LoS checks.

### 4.4 Production (Factorio Flavor)

Resources → Assemblers → Multi-input recipes. Buildings: mines, mills, smelters, looms, enchanteries, distilleries. Blueprints with adjacency bonuses and power networks. Caravans with route risk & escort effects.

### 4.5 Research & Crafting

Recipe unlocks, throughput boosts, logistics, planar trade. Item quality: Normal → Mythic → Relic → Cosmic.

### 4.6 Market & Economy

Soft currency (Gold), earnable hard currency (Shards). Auction House with taxes; NPC buy floors to stabilize.

### 4.7 Factions & Diplomacy

Favor unlocks vendors/templates/units. Stances (war/truce/pact/alliance). World effects from control thresholds.

### 4.8 Seasons, Raids, Prestige

Seasonal mechanics and **Season Chronicle** (AI summarized). Multi-layer prestige: Ascend → Transcend → Mythify → Apotheosis (introducing hyper-number interactions sanely).

---

## 5) **New v0.2 Modules**

### 5.1 Base Builder & Territory

* **Grid:** A1 coordinates; default 15×15; footprints, adjacency auras, districts (Foundry District = +smelt throughput).
* **Defense:** Walls, traps (spring/slow/DOT), towers; A\* path preview from chosen edge to Town Hall; breach events are logged.
* **Territory:** Claim hexes around town; upkeep taxes; bonuses for contiguous control.
* **Renders:** Emoji/ASCII in chat; PNG renders via a Node service; interactive web builder for designers.
* **Scoring:** Weekly stronghold score with replay PNGs embedded in Discord.

### 5.2 AI Director & Narrative

* **Encounter Director:** Tracks player/meta power and injects counters to maintain interesting decisions.
* **Rumor Engine:** NPCs emit rumors (possibly false). Players **investigate** to canonize or debunk → favors and badges.
* **Dynamic Villains:** Named adversaries accrue grudges/quirks; influence loot tables and regional pressure.
* **Covenants:** Choose Radiant/Abyssal/Wild (etc.). Boons (~~+12% domain) and banes (~~−8% elsewhere); seasonal respec once.

### 5.3 Economy 2.0

* **Power Grid:** Generators/batteries; line losses; brownouts throttle factory ticks.
* **Wear & Maintenance:** Machines degrade; scheduled maintenance improves uptime/efficiency.
* **Insurance:** Premiums by server risk profile; player underwriters possible (with guardrails).
* **Auction Microstructure:** Maker/taker fees, listing taxes, NPC floors, circuit breakers, and recommended pricing.

### 5.4 Social Ops: Guilds, Heists, Espionage

* **Guild Charters:** Governance modes, tax rates, doctrines.
* **Treaties & Sanctions:** Trade routes, port access; breaking treaties costs esteem.
* **Heists:** Multi-phase (infiltrate→puzzle→getaway) with bespoke loot; fail states recorded as lore.
* **Espionage:** Spies observe base layouts, jam caravans, seed false rumors; countered by sentry towers. Consent-gated.

### 5.5 Exploration & Cartography

* **Surveying:** Scouts reveal tiles & economic data.
* **Hazards:** Quicksand/blizzards/mana-storms; mitigated by gear/research.
* **Map Market:** Share/sell maps; cartographer becomes a viable profession.

### 5.6 Modding & Automation

* **Encounter DSL:** JSON grammar for boss phases and checks.
* **Blueprint Exchange:** Hash-signed plans; copy/rate/remix.
* **Script Automation:** Safe, deterministic snippets (limited steps/time). Pre-approved presets for common factory logic.

### 5.7 Ops & Observability

* Live KPIs, economy heatmap, ledger diffs, AI JSON validity, seed replay.
* **Economy Monte Carlo** & **Behavior Fuzzer** in CI.

---

## 6) Numbers That Scale (Notation & Math)

* **Representation:** BigInt + rationals + log-space transforms; switch to hyper-notation (Knuth ↑) at defined thresholds.
* **Softcaps:** When throughput > `1e12 units/tick`, convert multiplicative bonuses to additive in `log10`-space.
* **Raid Scaling:** `HP = base * N^0.72`, dampened logarithmically after N > 50.
* **Determinism:** All results keyed by `EventID = hash(world_seed, mission_id)`.

---

## 7) Discord UX (Commands)

**Player**

* `/start`, `/profile`, `/party …`
* `/mission quick|contract|dungeon [tier] [mods]`
* `/base show|place|clear|export|render|simulate`
* `/build …`, `/craft …`, `/research …`
* `/market buy|sell|list|price`
* `/map survey|share`
* `/covenant choose|offer|break`
* `/raid trial <modifier>`
* `/journal rumor|debunk`
* `/prestige ascend|transcend|mythify|apotheosis`
* `/season info|leaderboard`, `/lore latest|search`

**Admin/GM**

* `/gm seed set|get`, `/gm ai gen|summarize`
* `/gm time tick|skip|speed`
* `/admin perks map …` (Patreon role→perk)
* `/ops kpi` (KPI snapshot)

---

## 8) Headless Engine & Testability

* **Same engine** for CLI and bot. No logic in the bot.
* **Tick:** Global 1s tick; idle compensation via fixed-step replay.
* **Testing:** Snapshot states, golden replays for CombatLogs, economy fuzzer, Monte Carlo price shocks, seed-replay suite in CI.

---

## 9) AI Integration (Gemini 2.5 Flash)

**Responsibilities:** Generate (quests/NPCs/regions/factions/encounters), summarize (LoreLedger → Season Chronicle), all **STRICT JSON**.

**System Pattern (JSON-only):**

```json
{
  "type": "system",
  "content": {
    "purpose": "STRICT_JSON_ONLY",
    "rules": [
      "Respond with valid JSON matching the provided $schema.",
      "No markdown fences or prose.",
      "Escape newlines in strings; no trailing commas.",
      "If uncertain, return {\"error\":\"...\"}."
    ]
  }
}
```

**Schemas (v0.2 additions below).** Existing v0.1 schemas (QuestDesign, NPC, Region, LoreEntry, SeasonChronicle) remain.

**Blueprint.schema.json (Base/Factory Layout)**

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Blueprint",
  "type": "object",
  "required": ["schema_version","size","cells"],
  "properties": {
    "schema_version": { "type": "string", "const": "0.2" },
    "size": { "type": "integer", "minimum": 8, "maximum": 30 },
    "cells": {
      "type": "array",
      "items": {
        "type":"object",
        "required":["r","c","key"],
        "properties": {
          "r":{"type":"integer","minimum":0},
          "c":{"type":"integer","minimum":0},
          "key":{"type":"string"}
        }
      }
    },
    "tags": { "type":"array", "items":{"type":"string"} },
    "seed": { "type":"integer" }
  }
}
```

**Encounter.schema.json (Boss/Trial Phases)**

```json
{
  "$schema":"https://json-schema.org/draft/2020-12/schema",
  "title":"Encounter",
  "type":"object",
  "required":["schema_version","id","name","phases","rewards"],
  "properties":{
    "schema_version":{"type":"string","const":"0.2"},
    "id":{"type":"string"},
    "name":{"type":"string"},
    "phases":{
      "type":"array",
      "items":{
        "type":"object",
        "required":["checks","timeline"],
        "properties":{
          "checks":{"type":"array","items":{"type":"string"}},
          "timeline":{"type":"array","items":{
            "type":"object",
            "required":["t","action"],
            "properties":{
              "t":{"type":"number"},
              "action":{"type":"string","enum":["spawn","move","aoe","cleanse","interrupt","enrage"]},
              "params":{"type":"object"}
            }
          }}
        }
      }
    },
    "rewards":{"type":"object"}
  }
}
```

**Covenant.schema.json**

```json
{
  "$schema":"https://json-schema.org/draft/2020-12/schema",
  "title":"CovenantPact",
  "type":"object",
  "required":["schema_version","deity","boons","banes","duration_days"],
  "properties":{
    "schema_version":{"type":"string","const":"0.2"},
    "deity":{"type":"string","enum":["Radiant","Abyssal","Wild","Mechanist","Oracle"]},
    "boons":{"type":"array","items":{"type":"string"}},
    "banes":{"type":"array","items":{"type":"string"}},
    "duration_days":{"type":"integer","minimum":7},
    "respec_allowed":{"type":"boolean","default":true}
  }
}
```

**Rumor.schema.json**

```json
{
  "$schema":"https://json-schema.org/draft/2020-12/schema",
  "title":"Rumor",
  "type":"object",
  "required":["schema_version","id","text","region","likelihood_prior","source_npc_id"],
  "properties":{
    "schema_version":{"type":"string","const":"0.2"},
    "id":{"type":"string"},
    "text":{"type":"string"},
    "region":{"type":"string"},
    "likelihood_prior":{"type":"number","minimum":0,"maximum":1},
    "source_npc_id":{"type":"string"},
    "tags":{"type":"array","items":{"type":"string"}}
  }
}
```

**Prompt Templates:** QuestDesign generation; Season summaries; Covenant generation; Rumor synthesis; Encounter DSL emission. All **schema-pinned** with model+prompt hashes stored in LoreLedger.

---

## 10) Data Model (Delta from v0.1)

* **Blueprints(id, owner\_id, json, tags, rating)**
* **Bases(id, owner\_id, blueprint\_id, district\_cache, stronghold\_score)**
* **PowerGrids(id, base\_id, nodes, edges, losses)**
* **Covenants(id, account\_id, deity, boons\[], banes\[], expires\_at)**
* **Rumors(id, text, region, likelihood\_prior, status, source\_npc\_id)**
* **Heists(id, json, state, phase, result\_log)**
* **Spies(id, owner\_id, target\_id, mission\_state, findings)**
* **Insurances(id, policyholder\_id, premium, coverage, status)**
* **MarketOrders(...)** (unchanged but adds maker/taker fees)
* **Entitlements(account\_id, source, tier\_id, perks, granted\_at, expires\_at)**
* **OpsSnapshots(id, kpis, timestamp)**

---

## 11) Economy & Balancing (Core Curves)

* **XP curve:** `xp(level) = round(100 * level^2 * (1 + 0.05*floor(level/10)))` (pre-tier break).
* **Throughput:** `min(sum(inputs_i/ratio_i), machine_rate*(1+bonuses))`; when > `1e12`, shift new multipliers to log-space adders.
* **Maintenance:** Scheduled service confers **−60% failure chance** for **8h**, **+3% efficiency**.
* **Auction fees:** base tax 3%, taker 1% (tunable); **NPC floors** computed from median craft cost ± buffer.
* **Insurance:** Loss floor 5%; premiums float with recent caravan loss rate.

---

## 12) Observability & KPIs

* **Latency:** Slash-command ack < **150 ms**; full results via follow-up.
* **Retention:** D1/D7/D30, sessions/day, commands/user/day.
* **Economy:** Liquidity, price swings (≤ ±25%/day at P95), circuit-breaker triggers.
* **AI Health:** JSON validity ≥ **99.0%** after ≤2 retries; retry rate, token cost.
* **Base Meta:** Stronghold score distribution, trap trigger heatmaps.
* **Ops Console:** Real-time KPIs, ledger diffs, seed replay button.

---

## 13) Security & Fairness

Rate limits; interaction nonces; deterministic RNG; replay audit. **Exploit quarantine:** suspicious loops run in sandbox until reviewed. Cosmetic monetization only; perk ceilings for PvP.

---

## 14) Patreon Role-Sync (No OAuth)

**Setup:** Patreon→Discord integration assigns roles per tier. Bot maps **role IDs → perks**; updates on `GuildMemberUpdate`; **72h grace** after role loss. Highest tier wins (no stacking).

**Config (role→perks)**

```json
{
  "schema_version":"1.0",
  "stacking":"highest_only",
  "grace_period_hours":72,
  "roles":[
    {"role_id":"111...","name":"Patron Copper","xp_multiplier":1.05,"lootcrate_multiplier":1.05,"daily_crates_bonus":0,"max_crate_weight_bonus":0.00},
    {"role_id":"222...","name":"Patron Silver","xp_multiplier":1.10,"lootcrate_multiplier":1.10,"daily_crates_bonus":1,"max_crate_weight_bonus":0.02},
    {"role_id":"333...","name":"Patron Gold","xp_multiplier":1.20,"lootcrate_multiplier":1.20,"daily_crates_bonus":2,"max_crate_weight_bonus":0.05}
  ]
}
```

**discord.js watcher (sketch)**

```ts
client.on(Events.GuildMemberUpdate, async (_old, m) => {
  const ent = resolvePerkFromRoles(m); // map role IDs to highest tier
  await EntitlementService.setFromRoleSnapshot(m.id, [...m.roles.cache.keys()], ent);
});
```

---

## 15) Base Builder: Emoji/ASCII + PNG + Interactive

**Coordinates:** A1 (letters=rows, numbers=cols).
**Pathfinding:** A\* (4-way).
**Emoji in Discord:** fast, readable; **PNG renderer** for precision (node-canvas/Express).
**Interactive web builder:** designers export **JSON**; bot ingests and persists.

**Renderer (Node) — JSON → PNG (excerpt)**

```ts
app.post("/render", async (req, res) => {
  const { size=15, cells=[], path=[] } = req.body;
  // draw grid, coords, optional path (lime), emojis at 32px cells
  // return image/png stream
});
```

---

## 16) Liveops & Roadmap

**Phase 0.2 (Ship)**

* Base builder (emoji/PNG), AI Director v1, power grid, heists, covenants, rumor engine.
* Auction microstructure, insurance, ops console MVP.

**Phase 1**

* Territory warfare, guild treaties, espionage opt-in servers, blueprint exchange, automation sandbox presets.

**Phase 2**

* Mythify/Apotheosis depth (planar anomalies), airships + aerial tiles, full Encounter DSL editor, seasonal megastructures.

---

## 17) Risks & Mitigations

* **Inflation & power creep:** log-space bonuses past breakpoints; NPC floors; seasonal resets; Monte Carlo fuzzer as CI gate.
* **Griefing (heists/espionage):** consent flags, safe targets, cooldowns, audit logs.
* **AI drift/JSON errors:** schema-first prompting, strict validators, retries, fallbacks, all model+prompt hashes stored.
* **Discord rate limits:** acks <150ms; deferred edits; batching; background jobs.

---

## 18) Factoids (crisp targets)

* **Ack time:** < **150 ms**; **99p** < 300 ms.
* **AI JSON validity:** ≥ **99.0%** after ≤2 retries.
* **Economy stability:** P95 daily price swing ≤ **±25%**.
* **Raid scaling:** `HP = base * N^0.72`; dampen after N > 50.
* **Factory softcap:** switch to log-space after **1e12 units/tick**.
* **Maintenance buff:** −60% failure for 8h; +3% efficiency.
* **Rumor false-positive prior:** **18%** (tunable).
* **Covenant boon/bane:** +12% / −8% defaults; respec once per season.
* **PNG size:** 15×15 @ 32px ≈ **1.2–1.5 MB**; cache 24h.
* **Shard capacity goal:** **10–20k** active accounts with Redis queue + batched ticks.
* **Patron grace:** **72h** after role removal; **highest\_only** stacking.

---

## 19) Config & Flags (ops-ready)

```json
{
  "schema_version":"0.2",
  "features":{
    "base_builder":true,
    "territory_control":true,
    "ai_director":true,
    "rumor_engine":true,
    "covenants":true,
    "power_grid":true,
    "heists":true,
    "espionage":true,
    "auction_microstructure":true,
    "insurance":true,
    "script_automation":true,
    "mythic_trials":true,
    "cartography":true,
    "economy_monte_carlo":true
  },
  "weights":{
    "raid_hp_alpha":0.72,
    "market_tax_base":0.03,
    "market_taker_fee":0.01,
    "insurance_loss_floor":0.05,
    "adjacency_bonus_cap":0.20,
    "maintenance_tick_hours":8,
    "rumor_false_positive":0.18,
    "covenant_boon":0.12,
    "covenant_bane":0.08
  }
}
```

---

## 20) License

TBD (MIT/AGPL dual—choose per hosting/commercial strategy).

---

# TL;DR

v0.2 grafts **bases + sieges**, **AI Director**, **covenants**, **heists/espionage**, **power grid**, **insurance**, **auction microstructure**, **rumor-driven lore**, **automation**, and **ops observability** onto the original D\&D–factorio core. Emoji/ASCII in chat for speed, PNG renders for precision, JSON as canon. All actions are deterministic, audited, and seed-replayable; AI outputs are schema-locked. Patreon perks come from Discord roles with a 72h grace and highest-tier-only stacking.
