export default class BlastEffect {
  constructor(x, y, params = {}) {
    this.x = x;
    this.y = y;

    this.frame = 0;
    this.maxFrame = params.maxFrame ?? 10;

    this.crossRatio = params.crossRatio ?? 0.3;

    this.cross = {
      sizeStart: params.crossSizeStart ?? 4,
      sizeGrow: params.crossSizeGrow ?? 100,
      base: params.crossBase ?? 3,
      tip: params.crossTip ?? 1,
    };

    this.circle = {
      radiusStart: params.radiusStart ?? 10,
      radiusGrow: params.radiusGrow ?? 20,
      alpha: params.alpha ?? 0.4,
    };
  }

  advance() {
    this.frame++;
    return this.frame > this.maxFrame;
  }

  get ratio() {
    return this.frame / this.maxFrame;
  }

  draw(ctx) {
    const ratio = this.ratio;

    ctx.save();
    ctx.translate(this.x, this.y);

    // 十字
    if (ratio < this.crossRatio) {
      const size = this.cross.sizeStart + ratio * this.cross.sizeGrow;

      ctx.globalAlpha = 0.8 * (1 - ratio);
      ctx.fillStyle = "rgb(0,255,0)";

      const { base, tip } = this.cross;

      // 左右
      for (const dir of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(dir * size, -tip);
        ctx.lineTo(dir * size, tip);
        ctx.lineTo(0, base);
        ctx.lineTo(0, -base);
        ctx.closePath();
        ctx.fill();
      }

      // 上下
      for (const dir of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(-tip, dir * size);
        ctx.lineTo(tip, dir * size);
        ctx.lineTo(base, 0);
        ctx.lineTo(-base, 0);
        ctx.closePath();
        ctx.fill();
      }
    }

    // 爆風円
    const r = this.circle.radiusStart + this.circle.radiusGrow * ratio;

    ctx.globalAlpha = this.circle.alpha * (1 - ratio);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
