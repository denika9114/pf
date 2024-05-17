class Bullet extends GameObject {
  #id = null;
  #type = null;
  #manager = null;

  #displayed = false;

  #damage = 0;
  
  constructor(width, height) {
    super(width, height);

    // 毎フレーム呼び出す
    this.addSchedule(this.#update.bind(this), 1, true);
  }

  // 毎フレーム呼ばれる
  #update() {
    if (!this.#displayed) return;

    // 画面外か確認
    if (
      (this.centerX < -this.width) || 
      (this.centerX > 1400 + this.width) || 
      (this.centerY < -this.height) || 
      (this.centerY > 1400 + this.height)
    ) {
      // console.log("find!");
      // 弾を隠す
      this.hide();
    }
  }

  // 表示されている
  isDisplayed() {
    this.#displayed = true;
  }

  // 大きさを設定する
  setSize(width, height) {
    this._width = width;
    this._height = height;
  }

  // 弾の種類を取得
  getType() {
    return this.#type;
  }
  
  // 弾の種類を設定する
  setType(type) {
    // 種類を設定
    this.#type = type;
  }

  // 弾のIDを取得
  getId() {
    return this.#id;
  }

  // 弾のIDを設定する
  setId(id) {
    // IDを設定
    this.#id = id;
  }

  // 自分のマネージャーを設定する
  setManager(manager) {
    this.#manager = manager;
  }

  // 弾のダメージを返す
  getDamage() {
    return this.#damage;
  }

  // 弾のダメージを設定する
  setDamage(damage) {
    // ダメージを設定
    this.#damage = damage;
  }

  // 移動量設定時に呼び出される
  onSetVector(x, y) {
    // TODO：スプライトの向きをベクトルに対応した角度に調整する
    // const rotate = x * y;
    // this.rotate(rotate);
  }

  // 弾を隠す(画面外に移動させる)
  hide() {
    this.x = -1000;
    this.y = -1000;
    this.setVector(0, 0);
    this.#displayed = false;
    // バレットマネージャーへ戻る
    this.#manager.returnBullet(this.#id, this);
  }

  // 円形の弾の移動
  moveCircle(x, y) {
    this.setVector(x, y);

    // 角度を修正
    this.rotation = 0;
  }

  // 向きのある弾の移動
  moveArrow(x, y) {
    this.setVector(x, y);

    // 角度を修正
    const degree = (Math.atan2(y, x) * 180) / Math.PI;
    this.rotation = degree + 90;
  }
}