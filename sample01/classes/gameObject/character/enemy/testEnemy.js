class TestEnemy extends Enemy {
  // HP
  HP = 2400;

  constructor(width, height) {
    super(width, height);

    // バックグラウンドの色を設定
    this.backgroundColor = "red";
    
    // 大きさ設定
    this.width = 100;
    this.height = 100;

    this.setHP(this.HP);

    // 弾幕の発射を開始
    this.addSchedule(this.#shot1.bind(this), 20, true);
  }

  // ダメージを受けたときの処理
  onDamage() {
    // 残り体力に応じて発射する弾幕を変更
    if (this.checkHP(800, 1599) && this.currentShot === 1) {
      // 弾幕2の発射を開始
      this.nextShot(this.#shot2.bind(this), 20);

    } else if (this.checkHP(1, 799) && this.currentShot === 2) {
      // 弾幕3の発射を開始
      this.nextShot(this.#shot3.bind(this), 20);

    }
  }

  // 弾幕1
  #shot1() {
    // 赤円弾を作る
    const bullet = BulletProvider.redCircleBullet();
    // 弾の位置
    bullet.x = this.centerX - bullet.width / 2;
    bullet.y = this.centerY - bullet.height / 2;
    // 移動
    bullet.setVector(0, 8);
}

  // 弾幕2
  #shot2() {
    for (let i = -3; i < 3; i++) {
      // 青円弾を作る
      const bullet = BulletProvider.blueCircleBullet();
      // 弾の位置
      bullet.x = this.centerX - bullet.width / 2;
      bullet.y = this.centerY - bullet.height / 2;
      // ベクトル
      const bulletVectorX = (i + 0.5) * 2;
      // 移動
      bullet.setVector(bulletVectorX, 8);
    }
  }
  
  // 弾幕3
  #shot3() {    
    for (let i = -2; i < 3; i++) {
      // 緑円弾を作る
      const bullet = BulletProvider.greenCircleBullet();
      // 弾の位置
      bullet.x = this.centerX - bullet.width / 2;
      bullet.y = this.centerY - bullet.height / 2;
      // ベクトル
      const bulletVectorX = i * 3;
      // 移動
      bullet.setVector(bulletVectorX, 8);
    }
  }
}