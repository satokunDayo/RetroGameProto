export default class Bullet {
  constructor({ x, y, angle, speed, maxDistance }) {
    this.x = x;
    this.y = y;

    this.vx = Math.sin(angle) * speed;
    this.vy = -Math.cos(angle) * speed;

    this.speed = speed;
    this.maxDistance = maxDistance;
    this.traveled = 0;
  }

  update(dt) {
    const dx = this.vx * dt;
    const dy = this.vy * dt;

    this.x += dx;
    this.y += dy;

    this.traveled += Math.hypot(dx, dy);

    // マウスまでの距離に到達したら着弾
    return this.traveled >= this.maxDistance;
  }

  getImpactPosition() {
    return { x: this.x, y: this.y };
  }
}
