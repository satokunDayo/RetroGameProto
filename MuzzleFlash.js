import BlastEffect from "./BlastEffect.js";

export default class MuzzleFlash extends BlastEffect {
  constructor(x, y) {
    super(x, y, {
      maxFrame: 8,
      crossRatio: 0.3,
      crossSizeStart: 4,
      crossSizeGrow: 100,
      radiusStart: 10,
      radiusGrow: 10,
      alpha: 0.4,
    });
  }
}
