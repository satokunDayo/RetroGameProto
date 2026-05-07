export default class type75_Chan {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(player) {
    this.drawHull(player);
    this.drawTracks(player);
    this.drawTurret(player);
    this.drawBarrel(player);
  }

  drawHull(player) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.body_Angle);

    const bodyWidth = 14;
    const frontLength = 18;
    const rearLength = 8;

    ctx.strokeStyle = "rgb(0,255,0)";
    ctx.strokeRect(
      -bodyWidth / 2,
      -frontLength,
      bodyWidth,
      frontLength + rearLength,
    );

    ctx.restore();
  }

  drawTracks(player) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.body_Angle);

    const bodyWidth = 14;
    const frontLength = 18;
    const rearLength = 8;
    const trackWidth = 3;
    const trackLength = frontLength + rearLength;
    const forwardOffset = 2;

    ctx.strokeRect(
      -bodyWidth / 2 - trackWidth,
      -frontLength - forwardOffset,
      trackWidth,
      trackLength + forwardOffset,
    );

    ctx.strokeRect(
      bodyWidth / 2,
      -frontLength - forwardOffset,
      trackWidth,
      trackLength + forwardOffset,
    );

    ctx.restore();
  }

  drawTurret(player) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.turret_Angle);

    ctx.strokeRect(-6.5, -7, 13, 14);
    ctx.restore();
  }

  drawBarrel(player) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.turret_Angle);

    ctx.strokeRect(-2, -23, 4, 23);
    ctx.strokeRect(-3, -20, 6, 6);
    ctx.strokeRect(-4, -29, 8, 6);
    ctx.strokeStyle = "rgba(0, 255, 0, 0.3)";
    ctx.strokeRect(0, -23, 1, -80);

    ctx.restore();
  }
}
