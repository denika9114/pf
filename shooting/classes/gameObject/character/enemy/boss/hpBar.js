class HPBar extends enchant.Sprite {
  #maxHP = 0;
  #maxWidth = 0;

  #frame = null;

  constructor(width, height) {
    super(width, height);
    
    const gap = 30;
    
    // this.#maxWidth = scene.width - gap * 2;
    this.#maxWidth = 1200;

    this.width = this.#maxWidth;
    this.height = 40;

    this.x = scene.width / 2 - this.width / 2;
    this.y = gap;

    // this.backgroundColor = "#c25656";

    this.image = core.assets["hpBar"];
  }

  setMaxHP(value) {
    this.#maxHP = value;
  }

  resize(value) {
    const widthPercent = value * 100 / this.#maxHP;
    const width = widthPercent / 100 * this.#maxWidth;
    this.width = width;
  }
}