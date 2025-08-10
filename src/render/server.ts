import express from 'express';
import { createCanvas } from 'canvas';

const app = express();
app.use(express.json());

const CELL_SIZE = 32;

app.post('/render', (req, res) => {
  const { size = 15, cells = [], path = [] } = req.body as {
    size?: number;
    cells?: { r: number; c: number; key: string }[];
    path?: { r: number; c: number }[];
  };

  const canvas = createCanvas(size * CELL_SIZE, size * CELL_SIZE);
  const ctx = canvas.getContext('2d');

  // background
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // grid lines
  ctx.strokeStyle = '#ccc';
  for (let i = 0; i <= size; i++) {
    const offset = i * CELL_SIZE;
    ctx.beginPath();
    ctx.moveTo(offset, 0);
    ctx.lineTo(offset, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, offset);
    ctx.lineTo(canvas.width, offset);
    ctx.stroke();
  }

  // cell contents (keys)
  ctx.font = '24px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const cell of cells) {
    const x = cell.c * CELL_SIZE + CELL_SIZE / 2;
    const y = cell.r * CELL_SIZE + CELL_SIZE / 2;
    ctx.fillText(cell.key, x, y);
  }

  // path
  if (Array.isArray(path) && path.length) {
    ctx.strokeStyle = 'lime';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i < path.length; i++) {
      const p = path[i];
      const x = p.c * CELL_SIZE + CELL_SIZE / 2;
      const y = p.r * CELL_SIZE + CELL_SIZE / 2;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }

  res.setHeader('Content-Type', 'image/png');
  canvas.createPNGStream().pipe(res);
});

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Renderer listening on ${port}`);
  });
}

export default app;
