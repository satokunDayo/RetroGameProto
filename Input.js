export default class Input {
  constructor(canvas) {
    this.keys = {};
    this.mouse = {
      x: null,
      y: null,
      left: false,
    };

    window.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
    });

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      this.mouse.x = (e.clientX - rect.left) * scaleX;
      this.mouse.y = (e.clientY - rect.top) * scaleY;
    });

    canvas.addEventListener("mousedown", (e) => {
      if (e.button === 0) this.mouse.left = true;
    });

    canvas.addEventListener("mouseup", (e) => {
      if (e.button === 0) this.mouse.left = false;
    });
  }
}
