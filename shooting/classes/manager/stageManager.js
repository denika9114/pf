class StageManager {
  static #started = false;
  static #currentStage = null;
  static #currentStageNumber = 0;
  static #stageClasses = [
    Stage1, Stage2
  ];
  static #finalStageNumber = 4;

  static #background = null;

  static start() {
    if (this.#started === true) return;

    this.#started = true;

    // 背景を作成
    this.#background = new enchant.Sprite(scene.width, scene.height);
    scene.addChild(this.#background);

    this.#currentStage = new this.#stageClasses[this.#currentStageNumber];
  }

  static stageClear() {
    console.log("ステージクリア");

    if (this.#currentStageNumber === this.#finalStageNumber) {
      console.log("ゲームクリア");
    }

    console.log("次のステージへ移動します");

    this.#currentStage.end();
    this.#currentStageNumber ++;
    this.#currentStage = new this.#stageClasses[this.#currentStageNumber];
  }

  static changeBackgroundImage(image) {
    // 現在は画像素材でなく、色を変えるだけ
    this.#background.backgroundColor = image;
  }
}