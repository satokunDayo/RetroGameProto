import { PLAYER_RELOAD_TIME } from "./constantValues.js";
import type75_Chan from "./Type75_chan.js";

export default class Renderer {
  constructor(ctx, canvas, layout) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.layout = layout;
    this.spgRenderer = new type75_Chan(ctx);
  }

  drawFields() {
    const ctx = this.ctx;
    const { margin, fieldHeight, infoHeight } = this.layout;

    ctx.strokeStyle = "rgb(0,255,0)";
    ctx.lineWidth = 2;
    ctx.font = "16px monospace";
    ctx.fillStyle = "rgb(0,255,0)";

    /* ENEMY FIELD */
    ctx.strokeRect(margin, margin, this.canvas.width - margin * 2, fieldHeight);
    ctx.fillText("ENEMY FIELD", margin + 10, margin + 20);

    /* PLAYER FIELD */
    ctx.strokeRect(
      margin,
      margin + fieldHeight + infoHeight,
      this.canvas.width - margin * 2,
      fieldHeight,
    );
    ctx.fillText(
      "YOUR FIELD",
      margin + 10,
      margin + fieldHeight + infoHeight + 20,
    );
  }

  drawInfoBar(player, playerName, enemyName, playerHP, enemyHP) {
    const ctx = this.ctx;
    const { margin, fieldHeight, infoHeight } = this.layout;

    const y = margin + fieldHeight;

    ctx.strokeStyle = "rgb(0,255,0)";
    ctx.strokeRect(margin, y, this.canvas.width - margin * 2, infoHeight);

    ctx.font = "14px monospace";
    ctx.fillStyle = "rgb(0,255,0)";

    ctx.fillText(enemyName, margin + 10, y + 18);
    ctx.fillText(playerName, margin + 10, y + 38);
    ctx.font = "20px monospace";
    ctx.fillText("Reload", margin + 640, y + 33);

    ctx.fillRect(margin + 120, y + 12, enemyHP * 2, 6);
    ctx.fillRect(margin + 120, y + 32, playerHP * 2, 6);
    this.drawReloadGauge(player, margin + 740, y + 25);
  }

  drawCrosshair(x, y) {
    const ctx = this.ctx;

    ctx.save();
    ctx.translate(x, y);

    ctx.strokeStyle = "rgb(0,255,0)";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.stroke();

    // 上
    ctx.beginPath();
    ctx.moveTo(0, -27);
    ctx.lineTo(0, -10);
    ctx.stroke();

    // 下
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(0, 27);
    ctx.stroke();

    // 左
    ctx.beginPath();
    ctx.moveTo(-27, 0);
    ctx.lineTo(-10, 0);
    ctx.stroke();

    // 右
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(27, 0);
    ctx.stroke();

    // 中心点
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.lineTo(0, -6);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(6, 0);
    ctx.stroke();

    ctx.restore();
  }

  drawPlayer(player) {
    this.spgRenderer.draw(player);
  }

  drawReloadGauge(player, x, y) {
    const ctx = this.ctx;
    const r = 14;
    const ratio = player.reload_Timer / PLAYER_RELOAD_TIME;

    ctx.save();
    ctx.translate(x, y);

    ctx.strokeStyle = "rgb(0,255,0)";
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "rgb(0,255,0)";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r - 2, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ratio);
    ctx.fill();

    ctx.restore();
  }
  drawEffects(effects) {
    for (const e of effects) {
      e.draw(this.ctx);
    }
  }
}
