class Enemy1 extends Enemy {
  constructor(width, height) {
    super(width, height);

    // バックグラウンドの色を設定
    // this.backgroundColor = "red";

    // 画像を設定
    this.image = core.assets["enemy1"];
    
    // 大きさ設定
    this.width = 150;
    this.height = 150;

    this.setHP(10);
    // 移動
    this.setVector(0, 6);
    // 当たり判定の半径を設定
    this.setHitDistance(120 / 2);

    // パワーアップアイテムの数を設定
    this.powerUpItemCount = 1;

    // アニメーション
    this.frame = [0, 0, 0, 0, 0, 0, 0,
                  1, 1, 1, 1, 1, 1, 1];

    // 弾幕の発射を開始
    // this.addSchedule(this.#animation.bind(this), 2, true);
    this.addSchedule(this.#danmaku.bind(this), 20, true);
  }

  // // アニメーション
  // #animation() {
  //   if (this.frame = 0) {
  //     this.frame = 1;
  //   } else {
  //     this.frame = 0;
  //   }
  // }

  // ダメージを受けたときの処理
  onDamage() {}

  // 弾幕
  #danmaku() {
    if (this.y > 400) return;

    // 赤円弾を作る
    const bullet = BulletProvider.needleRedBullet();
    // 弾の位置
    bullet.x = this.centerX - bullet.width / 2;
    bullet.y = this.centerY - bullet.height / 2;
    // 弾速
    const speed = 15;
    // ベクトル
    let vectorX = CharacterManager.getPlayer().x - this.x;
    let vectorY = CharacterManager.getPlayer().y - this.y;
    const vector = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
    vectorX = (vectorX / vector) * speed;
    vectorY = (vectorY / vector) * speed;

    // 移動
    bullet.moveArrow(vectorX, vectorY);
  }
}