class Debug extends enchant.Label {
  #name = null;

  constructor(name) {
    super();
    
    this.color = "white";
    this.font = "50px Arial";
    this.width = scene.width;
    scene.addChild(this);

    this.#name = name;
  }

  showCount(count) {
    // const display = new Label();
    // display.color = "white"
    // display.text = "Display: " + displayCount;
    // scene.addChild(display);

    this.text = this.#name + ": " + count;
  }
}