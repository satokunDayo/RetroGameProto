import Player from "./Player.js";
import Input from "./Input.js";
import Renderer from "./Renderer.js";
import {
  createFields,
  MARGIN,
  INFO_HEIGHT,
  BULLET_TRAVEL_TIME,
  ERROR_STOP_DEG,
  ERROR_MOVE_DEG,
  DEG,
  PLAYER_MAX_SPEED,
  Consider_As_Stopped,
} from "./constantValues.js";

import Bullet from "./Bullet.js";
import Explosion from "./Explosion.js";
import MuzzleFlash from "./MuzzleFlash.js";

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    //  FPS設定
    this.LOGIC_FPS = 60;
    this.DRAW_FPS = 10;

    this.logicFrameTime = 1000 / this.LOGIC_FPS;
    this.drawFrameTime = 1000 / this.DRAW_FPS;

    this.logicLastTime = 0;
    this.drawLastTime = 0;

    //  フィールド
    const fieldData = createFields(canvas);
    this.fields = fieldData;

    //  入力
    this.input = new Input(canvas);

    //  レイアウト
    this.layout = {
      margin: MARGIN,
      fieldHeight: fieldData.FIELD_HEIGHT,
      infoHeight: INFO_HEIGHT,
    };

    this.renderer = new Renderer(this.ctx, canvas, this.layout);

    //  プレイヤー
    const pf = this.fields.PLAYER;
    this.player = new Player(canvas.width / 2, (pf.top + pf.bottom) / 2);

    const MOVEMENT_PADDING_X = 20;
    const MOVEMENT_PADDING_Y = 20;

    this.playerBounds = {
      left: pf.left + MOVEMENT_PADDING_X,
      right: pf.right - MOVEMENT_PADDING_X,
      top: pf.top + MOVEMENT_PADDING_Y,
      bottom: pf.bottom - MOVEMENT_PADDING_Y,
    };

    this.bullets = [];
    this.explosions = [];
    this.muzzleFlashes = [];

    this.player.onFire = (data) => {
      this.muzzleFlashes.push(new MuzzleFlash(data.x, data.y));

      const m = this.input.mouse;

      //  砲口 → マウス
      const dx = m.x - data.x;
      const dy = m.y - data.y;
      const distance = Math.hypot(dx, dy);

      //  弾速（px/s）
      const bulletSpeed = this.canvas.height / BULLET_TRAVEL_TIME;

      //  移動率（0〜1）
      const t = Math.min(
        Math.abs(this.player.speed) / PLAYER_MAX_SPEED,
        Consider_As_Stopped,
      );

      //  角度誤差（度）
      const moving = Math.abs(this.player.speed) > Consider_As_Stopped;
      const turning = this.player.is_TurningBody;

      const maxErrorDeg = moving || turning ? ERROR_MOVE_DEG : ERROR_STOP_DEG;

      // 三角分布（中央寄り）
      const errorDeg = (Math.random() - Math.random()) * maxErrorDeg;

      const angle = data.angle + errorDeg * DEG;

      this.bullets.push(
        new Bullet({
          x: data.x,
          y: data.y,
          angle,
          speed: bulletSpeed,
          maxDistance: distance,
        }),
      );
    };

    //  ワールド境界（弾の寿命用）
    this.worldBounds = {
      left: 0,
      right: canvas.width,
      top: 0,
      bottom: canvas.height,
    };
  }

  isMouseInEnemyField() {
    const m = this.input.mouse;
    const ef = this.fields.ENEMY;

    return (
      m.x !== null &&
      m.x >= ef.left &&
      m.x <= ef.right &&
      m.y >= ef.top &&
      m.y <= ef.bottom
    );
  }

  update(dt) {
    const allowTurret = this.isMouseInEnemyField();
    const allowFire = this.isMouseInEnemyField();

    if (allowTurret) {
      this.player.aim(this.input.mouse.x, this.input.mouse.y);
    }

    this.player.update(
      this.input,
      this.playerBounds,
      allowTurret,
      allowFire,
      dt,
    );

    const ef = this.fields.ENEMY;

    this.bullets = this.bullets.filter((b) => {
      if (b.update(dt)) {
        const p = b.getImpactPosition();
        this.explosions.push(new Explosion(p.x, p.y));
        return false;
      }
      return true;
    });
  }

  draw() {
    //  残光
    this.ctx.fillStyle = "rgba(0,0,0,0.7)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderer.drawFields();
    this.renderer.drawInfoBar(this.player, "PLAYER", "ENEMY", 100, 100);

    this.renderer.drawPlayer(this.player);

    if (this.isMouseInEnemyField()) {
      const m = this.input.mouse;
      this.renderer.drawCrosshair(m.x, m.y);
    }

    // 描画
    this.renderer.drawEffects(this.muzzleFlashes);
    this.renderer.drawEffects(this.explosions);

    // 寿命更新
    this.muzzleFlashes = this.muzzleFlashes.filter((m) => !m.advance());
    this.explosions = this.explosions.filter((e) => !e.advance());
  }

  loop = () => {
    // 10fps固定: 100msごとにupdate/drawを1回ずつ呼ぶ
    this.update(0.1); // dt=0.1秒
    this.draw();
    setTimeout(this.loop, 100);
  };

  start() {
    this.loop();
  }
}
