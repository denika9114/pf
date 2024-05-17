class PowerUpItem extends GameObject {
  // 縦移動のベクトル
  #heightVector = -20;

  constructor(width, height, x, y) {
    super(width, height);

    // 座標初期化
    this._x = x;
    this._y = y;

    // this._backgroundColor = "lime";
    this.image = core.assets["powerUpItem"];

    this.setHitDistance(100);

    this.addSchedule(this.#update.bind(this), 1, true);
  }

  #update() {
    // 縦移動のベクトルを下方向へ調整していく
    if (this.#heightVector < 5) {
      this.#heightVector += 1;
    }

    // 移動
    this.setVector(0, this.#heightVector);

    // 衝突判定
    const target = CharacterManager.getPlayer();
    this.collisionDetection(target);

    // 画面外にいるかを確認
    if (
      (this.centerX < -this.width) || 
      (this.centerX > 1400 + this.width) || 
      (this.centerY > 1400 + this.height)
    ) {
      // 自分を倒す
      this.destroy();
    }
  }

  collision(target) {
    target.powerUp();
    this.destroy();
  }
}