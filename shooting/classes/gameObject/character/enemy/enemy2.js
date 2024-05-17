class Enemy2 extends Enemy {
  // 移動停止用のスケジュールのID
  #stopScheduleId = null;

  // 角度
  #danmakuAngle = 0;

  constructor(width, height) {
    super(width, height);

    // バックグラウンドの色を設定
    // this.backgroundColor = "red";

    this.image = core.assets["medium_enemy1"];

    // 大きさ設定
    this.width = 352;
    this.height = 352;

    this.setHP(500);

    // 移動
    this.setVector(0, 5);

    // 当たり判定の半径を設定
    this.setHitDistance(this.width / 2);

    // パワーアップアイテムの数
    this.powerUpItemCount = 5;

    // 移動停止を予約
    this.#stopScheduleId = this.addSchedule(this.#moveEnd.bind(this), 120, false);
    // // 回転
    // this.addSchedule(this.#rotation.bind(this), 1, true);
  }

  // // 毎フレーム処理拡張
  // #update() {
  //   // // 移動
  //   // this.setVector(0, 6);
  // }

  // ダメージを受けたときの処理
  onDamage() { }

  // 移動停止
  #moveEnd() {
    // 移動停止
    this.setVector(0, 0);

    this.removeSchedule(this.#stopScheduleId);

    // 弾幕の発射を開始
    this.addSchedule(this.#danmaku.bind(this, 0), 15, true);
    // this.addSchedule(this.#danmaku.bind(this, 180), 15, true);
  }

  // 弾幕
  #danmaku(angle) {
    // 弾の数
    const bulletCount = 5;
    // 全方位弾
    for (let i = -2; i < bulletCount -2; i++) {
      // 赤円弾を作る
      const bullet = BulletProvider.smallBlueBullet();
      // 位置
      bullet.x = this.centerX - bullet.width / 2;
      bullet.y = this.centerY - bullet.height / 2;
      // 向き
      const degree = i * (40 / bulletCount) + this.#danmakuAngle + 90;
      const radian = degree * (Math.PI / 180);
      // ベクトル
      const vectorX = Math.cos(radian) * 11;
      const vectorY = Math.sin(radian) * 11;
      // 移動
      bullet.moveCircle(vectorX, vectorY);
      // // 回転
      // bullet.rotation = degree + 90;

      // // コンソール
      // console.log(i + " " + degree);
    }

    // this.#danmakuAngle += 10;

    // if (this.#danmakuAngle > 360) {
    //   this.#danmakuAngle = 0;
    // }
  }

  // 回転
  #rotation() {
    this.rotation += 0.2;
  }
}