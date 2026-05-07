import BlastEffect from "./BlastEffect.js";

export default class Explosion extends BlastEffect {
  constructor(x, y) {
    super(x, y, {
      maxFrame: 12,
      crossRatio: 0.2,
      crossSizeStart: 10,
      crossSizeGrow: 400,
      radiusStart: 30,
      radiusGrow: 60,
      alpha: 0.25,
    });
  }
}
