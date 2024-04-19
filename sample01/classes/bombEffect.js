class BombEffect extends enchant.Sprite {
  #currentState = "stop";
  #currentFrame = 0;
  // #finalFrame = 10;
  #currentScheduleId = null;
  #transparentAnimationFrame = 30;

  #animation = [
    0,
    1, 1, 1,
    2, 2, 2, 2, 2,
    3, 3, 3, 3, 3,
    4, 4, 4, 4, 4,
    5, 5, 5, 5, 5,
    6, 6, 6, 6, 6,
    7, 7, 7, 7, 7,
    8, 8, 8, 8, 8,
    9, 9, 9, 9, 9,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
  ];

  constructor(width, height) {
    super(width, height);

    this.image = core.assets["bombEffect"];
    scene.addChild(this);
  }

  // フレーム取得
  getFinalFrame() {
    return this.#animation.length + this.#transparentAnimationFrame;
  }

  // アニメーション開始
  startAnimation() {
    if (this.#currentState == "stop") {
      this.#currentState = "imageAnimation";
      this.#currentScheduleId = Timer.addSchedule(this.#playAnimation.bind(this), 1, true);
    }
  }

  // アニメーション
  #playAnimation() {
    this.#currentFrame++;

    // console.log(this.#currentState);

    if (this.#currentState == "imageAnimation") {
      this.#imageAnimation();

    } else if (this.#currentState == "transparentAnimation") {
      this.#transparentAnimation();

    }
  }
  
  #imageAnimation() {
    if (this.#currentFrame >= this.#animation.length) {
      this.#currentState = "transparentAnimation";
    } else {
      this.frame = this.#animation[this.#currentFrame];
    }
  }

  #transparentAnimation() {
    this.opacity -= 1 / this.#transparentAnimationFrame;
    
    if (this.opacity <= 0) {
      this.#endAnimation();
    }
  }

  // アニメーション終了
  #endAnimation() {
    Timer.removeSchedule(this.#currentScheduleId);
    this.frame = 0;
    this.opacity = 1;
    this.#currentFrame = 0;
    this.#currentState = "stop"
  }
}