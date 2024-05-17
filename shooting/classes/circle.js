class Circle extends enchant.Surface {
  constructor(width, height, fillStyle) {
    super(width, height)

    this.context.beginPath();
    this.context.arc(width / 2, width / 2, width / 2, 0, Math.PI*2, true);
    this.context.fillStyle = fillStyle;
    this.context.fill();
  }
}