class EnemyAim extends Enemy {
  constructor(width, height) {
    super(width, height);

    Timer.addSchedule(this.#shot.bind(this), 15, true);
  }

  // ショット
  #shot() {    
    // for (let i = -1 - 10; i < 2 + 10; i++) {
    //   // 弾を作成
    //   const bullet = this.#createBullet();
      // // 発射地点
      // bullet.x = this.x + this.width / 2 - bullet.width / 2;
      // bullet.y = this.y + this.height - bullet.height * 2;
    //   // 移動量
    //   const moveX = (i);
    //   const moveY = 8;
    //   // 移動量設定
    //   bullet.setMove(moveX, moveY);
    //   // 移動開始
    //   bullet.moveStart(); 
    // }
    // 弾を作成
    const bullet = this.#createBullet();
    // 自機を取得
    const player = GameManager.getInstance("player");
    // 発射地点
    bullet.x = this.x + this.width / 2 - bullet.width / 2;
    bullet.y = this.y + this.height - bullet.height * 2;
    // ベクトル
    let vectorX = (player.x - this.x);
    let vectorY = (player.y - this.y);
    const vector = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
    vectorX = (vectorX / vector) * 20 * 1.1;
    vectorY = (vectorY / vector) * 20 * 1.1;
    // 移動量設定
    bullet.setMove(vectorX, vectorY);
    // 移動開始
    bullet.moveStart(); 

  
    // for (let i = -3; i < 4; i++) {
    //   // 弾を作成
    //   const bullet = this.#createBullet();
    //   // 発射地点
    //   bullet.x = this.x + this.width / 2 - bullet.width / 2;
    //   bullet.y = this.y + this.height - bullet.height * 2;
    //   // 移動量
    //   const moveX = i * 1000;
    //   const moveY = 1600;
    //   // 移動時間
    //   const moveTime = 300;
    //   // 移動開始
    //   bullet.tl.moveBy(moveX, moveY, moveTime);
    // }
  }

  // 弾を作成
  #createBullet() {
    // 円形
    const bulletCircle = new Circle(50, 50, 'rgb(0, 255, 0)');
    // 弾を取得
    const bullet = GameManager.getHiddenBullet();
    bullet.image = bulletCircle;
    // 大きさ
    bullet.width = 50;
    bullet.height = 50;
    // 衝突距離を設定
    bullet.setHitDistance(25);

    // 敵の弾として設定
    GameManager.addInstanceList("enemyBullets", bullet);

    return bullet;
  }
}