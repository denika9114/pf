class Enemy2 extends Enemy {
  // 移動停止用のスケジュールのID
  #stopScheduleId = null;

  constructor(width, height) {
    super(width, height);

    // バックグラウンドの色を設定
    // this.backgroundColor = "red";

    this.image = core.assets["enemy2"];

    // 大きさ設定
    this.width = 500;
    this.height = 500;

    this.setHP(1000);

    // 移動
    this.setVector(0, 5);

    // 当たり判定の半径を設定
    this.setHitDistance(this.width / 2);

    // パワーアップアイテムの数
    this.powerUpItemCount = 5;

    // 移動停止を予約
    this.#stopScheduleId = this.addSchedule(this.#moveEnd.bind(this), 120, false);
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
    this.addSchedule(this.#danmaku.bind(this), 20, true);
  }

  // 弾幕
  #danmaku() {
    // 弾の数
    const bulletCount = 20;
    // 全方位弾
    for (let i = 0; i < bulletCount; i++) {
      // 赤円弾を作る
      const bullet = BulletProvider.smallBlueBullet();
      // 位置
      bullet.x = this.centerX - bullet.width / 2;
      bullet.y = this.centerY - bullet.height / 2;
      // 向き
      const degree = i * (360 / bulletCount);
      const radian = degree * (Math.PI / 180);
      // ベクトル
      const vectorX = Math.cos(radian) * 10;
      const vectorY = Math.sin(radian) * 10;
      // 移動
      bullet.moveCircle(vectorX, vectorY);
      // // 回転
      // bullet.rotation = degree + 90;

      // // コンソール
      // console.log(i + " " + degree);
    }
  }
}