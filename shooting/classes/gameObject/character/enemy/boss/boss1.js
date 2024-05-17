class Boss1 extends Boss {
  phaseHP = [
    3000,
    4000,
    3000,
    4000
  ];

  #scheduleId1 = null;
  #scheduleId2 = null;

  #danmakuAngle = 0;

  constructor(width, height) {
    super(width, height);

    // バックグラウンドの色を設定
    // this.backgroundColor = "red";

    this.image = core.assets["boss1"];

    // 大きさ設定
    this.width = 528;
    this.height = 528;

    this.setHitDistance(this.width / 2);

    this.setPhaseHP();

    // 弾幕の発射を開始    
    // this.#scheduleId1 = this.addSchedule(this.#danmaku2_1.bind(this), 8, true);
    // this.#scheduleId2 = this.addSchedule(this.#danmaku2_2.bind(this), 24, true);  
    this.#scheduleId1 = this.addSchedule(this.#danmaku1.bind(this), 10, true);
  }

  // 倒された時に呼び出される
  onDefeat() {
    StageManager.stageClear();
  }

  // フェーズを移行した際に呼び出される
  onNextPhase() {
    BulletProvider.hideAllEnemyBullets();

    if (this.#scheduleId1) Timer.removeSchedule(this.#scheduleId1); 
    if (this.#scheduleId2) Timer.removeSchedule(this.#scheduleId2); 

    if (this.phase == 1) {
      this.#scheduleId1 = this.addSchedule(this.#danmaku2_1.bind(this), 8, true);
      this.#scheduleId2 = this.addSchedule(this.#danmaku2_2.bind(this), 24, true);  
    }
    if (this.phase == 2) {
      this.#scheduleId1 = this.addSchedule(this.#danmaku3.bind(this), 10, true);
      // this.#scheduleId2 = this.addSchedule(this.#danmaku3_2.bind(this), 20, true);  
    }
    if (this.phase == 3) {
      this.#scheduleId1 = this.addSchedule(this.#danmaku4_1.bind(this), 80, true);
      this.#scheduleId2 = this.addSchedule(this.#danmaku4_2.bind(this), 20, true);  
    }
  }

  #danmaku4_1() {
    // 弾の数
    const bulletCount = 100;
    // 角度
    const rotate = getRandomValue(0, 180);
    // 全方位弾
    for (let i = 0; i < bulletCount; i++) {
      // 弾を作る
      const type = getRandomValue(0, 1);
      let bullet;
      if (type == 0) bullet = BulletProvider.smallRedBullet();
      if (type == 1) bullet = BulletProvider.needleRedBullet();
      // 位置
      bullet.x = this.centerX - bullet.width / 2;
      bullet.y = this.centerY - bullet.height / 2;
      // 向き
      const degree = i * (360 / bulletCount) + rotate;
      const radian = degree * (Math.PI / 180);
      // ベクトル
      const speed = getRandomValue(10, 15);
      const vectorX = Math.cos(radian) * speed;
      const vectorY = Math.sin(radian) * speed;
      // 移動
      bullet.moveArrow(vectorX, vectorY);
    }
  }

  #danmaku4_2() {
    // 弾の数
    const bulletCount = 10;
    // 角度
    const rotate = getRandomValue(0, 180);
    // 全方位弾
    for (let i = 0; i < bulletCount; i++) {
      // 弾を作る
      const bullet = BulletProvider.smallBlueBullet();
      // 位置
      bullet.x = this.centerX - bullet.width / 2;
      bullet.y = this.centerY - bullet.height / 2;
      // 向き
      const degree = i * (360 / bulletCount) + rotate;
      const radian = degree * (Math.PI / 180);
      // ベクトル
      const speed = 8;
      const vectorX = Math.cos(radian) * speed;
      const vectorY = Math.sin(radian) * speed;
      // 移動
      bullet.moveArrow(vectorX, vectorY);
    }
  }

  // 弾幕
  #danmaku1() {
    // 弾の数
    const bulletCount = getRandomValue(15, 20);
    // 角度
    const rotate = getRandomValue(0, 180);
    // 全方位弾
    for (let i = 0; i < bulletCount; i++) {
      // 弾を作る
      const bullet = BulletProvider.smallRedBullet();
      // 位置
      bullet.x = this.centerX - bullet.width / 2;
      bullet.y = this.centerY - bullet.height / 2;
      // 向き
      const degree = i * (360 / bulletCount);
      const radian = degree * (Math.PI / 180) + rotate;
      // ベクトル
      const vectorX = Math.cos(radian) * 10;
      const vectorY = Math.sin(radian) * 10;
      // 移動
      bullet.moveArrow(vectorX, vectorY);
    }
  }

  // 弾幕
  #danmaku2_1() {
    // 弾の数
    const bulletCount = 12;
    
    // 角度
    const rotate = this.#danmakuAngle;
    
    // if (this.#danmakuAngle >= 360) {
    //   this.#danmakuAngle = 0;
    // } else {
    // }
    
    this.#danmakuAngle += 13;
    // 全方位弾
    for (let i = 0; i < bulletCount; i++) {
      // 弾を作る
      const bullet = BulletProvider.smallRedBullet();
      scene.addChild(bullet);
      // 位置
      bullet.x = this.centerX - bullet.width / 2;
      bullet.y = this.centerY - bullet.height / 2;
      // 向き
      const degree = i * (360 / bulletCount) + rotate;
      const radian = degree * (Math.PI / 180);
      // ベクトル
      const vectorX = Math.cos(radian) * 10;
      const vectorY = Math.sin(radian) * 10;
      // 移動
      bullet.moveArrow(vectorX, vectorY);
    }
  }

  // 弾幕
  #danmaku2_2() {
    // 弾の数
    const bulletCount = 12;
    
    // 自機狙い
    let vectorX = CharacterManager.getPlayer().centerX - this.centerX;
    let vectorY = CharacterManager.getPlayer().centerY - this.centerY;
    
    // 角度
    const rotate = Math.atan2(vectorY, vectorX);

    // 全方位弾
    for (let i = 0; i < bulletCount; i++) {
      // 弾を作る
      const bullet = BulletProvider.middleRedBullet();
      // 位置
      bullet.x = this.centerX - bullet.width / 2;
      bullet.y = this.centerY - bullet.height / 2;
      // 向き
      const degree = i * (360 / bulletCount);
      const radian = degree * (Math.PI / 180) + rotate;
      // ベクトル
      vectorX = Math.cos(radian) * 12;
      vectorY = Math.sin(radian) * 12;
      // 移動
      bullet.moveArrow(vectorX, vectorY);
    }
  }

  // 弾幕
  #danmaku3() {
    // 弾の数
    const bulletCount = getRandomValue(15, 20);
    // 角度
    const rotate = getRandomValue(0, 180);
    // 全方位弾
    for (let i = 0; i < bulletCount; i++) {
      // 弾を作る
      const bullet = BulletProvider.smallBlueBullet();
      // 位置
      bullet.x = this.centerX - bullet.width / 2;
      bullet.y = this.centerY - bullet.height / 2;
      // 向き
      const degree = i * (360 / bulletCount) + rotate;
      const radian = degree * (Math.PI / 180);
      // ベクトル
      const vectorX = Math.cos(radian) * 10;
      const vectorY = Math.sin(radian) * 10;
      // 移動
      bullet.moveArrow(vectorX, vectorY);
    }
  }
}