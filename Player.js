import {
  PLAYER_MAX_SPEED,
  PLAYER_ACCEL,
  PLAYER_DRAG,
  PLAYER_TURN_SPEED,
  TURRET_TURN_SPEED,
  PLAYER_RELOAD_TIME,
  MUZZLE_LENGTH,
  STOP_FIRE_LOCK_TIME,
  Consider_As_Stopped,
} from "./constantValues.js";

export default class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.is_TurningBody = false;
    this.body_Angle = 0;
    this.target_TurretAngle = 0;
    this.is_StopLock_Locked = false;
    this.turret_Angle = 0;
    this.speed = 0;

    this.reload_Timer = PLAYER_RELOAD_TIME;
    this.canFire = true;

    this.LockTimer = 0;

    this.prevFire = false;
    this.onFire = null;
  }

  update(input, bounds, allowTurret, allowFire, dt) {
    //  装填

    if (!this.canFire) {
      this.reload_Timer += dt;
      if (this.reload_Timer >= PLAYER_RELOAD_TIME) {
        this.reload_Timer = PLAYER_RELOAD_TIME;
        this.canFire = true;
      }
    }

    // 停車射撃時ロックシステム
    if (this.is_StopLock_Locked === true) {
      this.LockTimer += dt;
      if (this.LockTimer >= STOP_FIRE_LOCK_TIME) {
        this.is_StopLock_Locked = false;
      } else {
        return;
      }
    }

    //  発射（押した瞬間だけ）
    const firePressed = input.mouse.left && !this.prevFire;
    this.prevFire = input.mouse.left;

    if (firePressed && this.canFire && allowFire) {
      this.fire();
    }
    // = 砲塔
    if (allowTurret) {
      let diff = this.target_TurretAngle - this.turret_Angle;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      const step = TURRET_TURN_SPEED * dt;
      this.turret_Angle += Math.sign(diff) * Math.min(Math.abs(diff), step);
    }
    // 移動
    if (input.keys["w"]) {
      this.speed += PLAYER_ACCEL * dt;
    }
    if (input.keys["s"]) {
      this.speed -= PLAYER_ACCEL * dt;
    }

    if (!input.keys["w"] && !input.keys["s"]) {
      this.speed -=
        Math.sign(this.speed) *
        Math.min(Math.abs(this.speed), PLAYER_DRAG * dt);
    }

    this.speed = Math.max(
      -PLAYER_MAX_SPEED / 2,
      Math.min(PLAYER_MAX_SPEED, this.speed),
    );

    //車体回転
    this.is_TurningBody = false;
    let bodyDelta = 0;
    const turnSign = this.speed >= 0 ? 1 : -1;

    if (input.keys["a"]) {
      bodyDelta -= PLAYER_TURN_SPEED * dt * turnSign;
    }
    if (input.keys["d"]) {
      bodyDelta += PLAYER_TURN_SPEED * dt * turnSign;
    }

    if (bodyDelta !== 0) {
      this.body_Angle += bodyDelta;
      this.turret_Angle += bodyDelta;
      this.is_TurningBody = true;
    }

    this.x += Math.sin(this.body_Angle) * this.speed * dt;
    this.y -= Math.cos(this.body_Angle) * this.speed * dt;

    this.x = Math.max(bounds.left, Math.min(bounds.right, this.x));
    this.y = Math.max(bounds.top, Math.min(bounds.bottom, this.y));
  }

  aim(mx, my) {
    const dx = mx - this.x;
    const dy = my - this.y;
    this.target_TurretAngle = Math.atan2(dy, dx) + Math.PI / 2;
  }

  fire() {
    this.canFire = false;
    this.reload_Timer = 0;

    const muzzle = this.getMuzzlePosition();

    this.onFire?.({
      x: muzzle.x,
      y: muzzle.y,
      angle: this.turret_Angle,
      moving: this.speed > Consider_As_Stopped,
    });
    if (
      Math.abs(this.speed) < Consider_As_Stopped &&
      this.is_TurningBody === false
    ) {
      this.is_StopLock_Locked = true;
      this.LockTimer = 0;
    }
  }

  getMuzzlePosition() {
    const len = MUZZLE_LENGTH;

    return {
      x: this.x + Math.sin(this.turret_Angle) * len,
      y: this.y - Math.cos(this.turret_Angle) * len,
    };
  }
}
