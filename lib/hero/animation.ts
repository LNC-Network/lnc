export async function animate(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  function resizeCanvasToElement() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resizeCanvasToElement();

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  type Dot = {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    alpha: number;
  };

  const totalDots = 1000;
  const SPAWN_PER_FRAME = 1000;
  const ALPHA_THRESHOLD = 100;
  const MOVE_EASE = 0.0155555;

  const dots: Dot[] = [];
  let maskData: ImageData | null = null;
  let maskWidth = 0;
  let maskHeight = 0;
  let maskOffsetX = 0;
  let maskOffsetY = 0;

  const offscreen = document.createElement("canvas");
  const offCtx = offscreen.getContext("2d") as CanvasRenderingContext2D;

  const imagePath = "./image.png";

  // --- Load image asynchronously ---
  async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  }

  // Wait for the image to load
  const img = await loadImage(imagePath);

  // Fit image to visible canvas
  const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  const scaledWidth = img.width * scale;
  const scaledHeight = img.height * scale;
  const offsetX = (canvas.width - scaledWidth) / 2;
  const offsetY = (canvas.height - scaledHeight) / 2;

  maskWidth = scaledWidth;
  maskHeight = scaledHeight;
  maskOffsetX = offsetX;
  maskOffsetY = offsetY;

  // Draw to offscreen canvas
  offscreen.width = maskWidth;
  offscreen.height = maskHeight;
  offCtx.clearRect(0, 0, maskWidth, maskHeight);
  offCtx.drawImage(img, 0, 0, maskWidth, maskHeight);

  maskData = offCtx.getImageData(0, 0, maskWidth, maskHeight);

  // Clear and start animation loop
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  function getRandomMaskPoint(): { x: number; y: number } | null {
    if (!maskData) return null;
    const { data, width, height } = maskData;
    for (let t = 0; t < 20; t++) {
      const rx = (Math.random() * width) | 0;
      const ry = (Math.random() * height) | 0;
      const i = (ry * width + rx) * 4;
      if (data[i + 3] > ALPHA_THRESHOLD) {
        return { x: maskOffsetX + rx, y: maskOffsetY + ry };
      }
    }
    return null;
  }

  function spawnDots(count: number) {
    const remaining = totalDots - dots.length;
    if (remaining <= 0) return;
    const toMake = Math.min(count, remaining);
    for (let i = 0; i < toMake; i++) {
      const pt = getRandomMaskPoint();
      if (!pt) continue;
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: pt.x,
        targetY: pt.y,
        alpha: 1,
      });
    }
  }

  function loop() {
    spawnDots(SPAWN_PER_FRAME);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";

    for (const dot of dots) {
      dot.x += (dot.targetX - dot.x) * MOVE_EASE;
      dot.y += (dot.targetY - dot.y) * MOVE_EASE;

      ctx.globalAlpha = dot.alpha;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }

  // Start loop
  requestAnimationFrame(loop);

  // Handle window resize
  window.addEventListener("resize", () => {
    const oldW = canvas.width;
    const oldH = canvas.height;
    resizeCanvasToElement();
    const sx = canvas.width / oldW;
    const sy = canvas.height / oldH;
    for (const d of dots) {
      d.x *= sx;
      d.y *= sy;
      d.targetX *= sx;
      d.targetY *= sy;
    }
  });
}
