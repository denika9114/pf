class BulletProvider {
  static #playerBulletManager = null;
  static #enemyBulletManager = null;
  
  // 起動
  static start() {
    const playerBulletDebug = new Debug("HiddenPlayerBullets");
    playerBulletDebug.y = 50;
    const enemyBulletDebug = new Debug("HiddenEnemyBullets");
    enemyBulletDebug.y = 100;

    this.#playerBulletManager = new BulletManager(50, "player", playerBulletDebug);
    this.#enemyBulletManager = new BulletManager(400, "enemy", enemyBulletDebug);
  }

  // 自機の弾を取得
  static getPlayerBullets() {
    return this.#playerBulletManager.getAllBullets();
  }

  // 敵の弾を取得
  static getEnemyBullets() {
    return this.#enemyBulletManager.getAllBullets();
  }

  // 敵の弾を全て非表示にする
  static hideAllEnemyBullets() {
    return this.#enemyBulletManager.hideAllBullets();
  }

  // 弾の基本的な設定
  static #bulletBase(bullet, width, height, image, hitDistance) {
    // 大きさ
    bullet.width = width;
    bullet.height = height;
    // 画像
    bullet.image = image;
    // 当たり判定
    bullet.setHitDistance(hitDistance);
    // 弾の種類
    bullet.setType(this.bulletType);
  }

  // プレイヤーの弾
  static playerBullet(damage) {
    // 大きさ
    const size = 50;
    // 画像
    const image = core.assets["playerBullet"];
    // 当たり判定
    const hitDistance = size / 2;
    // バレットマネージャーから弾をもらう
    const bullet = this.#playerBulletManager.getBullet();
    // 弾の基本的な設定
    this.#bulletBase(bullet, size, size, image, hitDistance);
    // ダメージ
    bullet.setDamage(damage);
    // 弾を返す
    return bullet;
  }

  // 円形の弾
  static #circleBullet(color) {
    // 大きさ
    const size = 50;
    // 画像
    const image = new Circle(size, size, color);
    // 当たり判定
    const hitDistance = size / 2;
    // バレットマネージャーから弾をもらう
    const bullet = this.#enemyBulletManager.getBullet();
    // 弾の基本的な設定
    this.#bulletBase(bullet, size, size, image, hitDistance);
    // 弾を返す
    return bullet;
  }

  // 赤円弾
  static redCircleBullet() {
    // 色
    const color = 'rgb(255, 0, 0)';
    // 円形の弾を作る
    const bullet = this.#circleBullet(color);
    // 弾を返す
    return bullet;
  }

  // 青円弾
  static blueCircleBullet() {
    // 色
    const color = 'rgb(0, 0, 255)';
    // 円形の弾を作る
    const bullet = this.#circleBullet(color);
    // 弾を返す
    return bullet;
  }

  // 緑円弾
  static greenCircleBullet() {
    // 色
    const color = 'rgb(0, 255, 0)';
    // 円形の弾を作る
    const bullet = this.#circleBullet(color);
    // 弾を返す
    return bullet;
  }

  // 赤小弾
  static smallRedBullet() {
    // 大きさ
    const size = 48;
    // 画像
    const image = core.assets["smallRedBullet"];
    // 当たり判定
    const hitDistance = size / 2 - 20;
    // バレットマネージャーから弾をもらう
    const bullet = this.#enemyBulletManager.getBullet();
    // 弾の基本的な設定
    this.#bulletBase(bullet, size, size, image, hitDistance);
    // 弾を返す
    return bullet;
  }

  // 青小弾
  static smallBlueBullet() {
    // 大きさ
    const size = 48;
    // 画像
    const image = core.assets["smallBlueBullet"];
    // 当たり判定
    const hitDistance = size / 2 - 20;
    // バレットマネージャーから弾をもらう
    const bullet = this.#enemyBulletManager.getBullet();
    // 弾の基本的な設定
    this.#bulletBase(bullet, size, size, image, hitDistance);
    // 弾を返す
    return bullet;
  }

  // 赤中弾
  static middleRedBullet() {
    // 大きさ
    const size = 120;
    // 画像
    const image = core.assets["middleRedBullet"];
    // 当たり判定
    const hitDistance = size / 2 - 30;
    // バレットマネージャーから弾をもらう
    const bullet = this.#enemyBulletManager.getBullet();
    // 弾の基本的な設定
    this.#bulletBase(bullet, size, size, image, hitDistance);
    // 弾を返す
    return bullet;
  }

  // 青中弾
  static middleBlueBullet() {
    // 大きさ
    const size = 120;
    // 画像
    const image = core.assets["middleBlueBullet"];
    // 当たり判定
    const hitDistance = size / 2 - 30;
    // バレットマネージャーから弾をもらう
    const bullet = this.#enemyBulletManager.getBullet();
    // 弾の基本的な設定
    this.#bulletBase(bullet, size, size, image, hitDistance);
    // 弾を返す
    return bullet;
  }

  // 赤大弾
  static bigRedBullet() {
    // 大きさ
    const size = 250;
    // 画像
    const image = core.assets["bigRedBullet"];
    // 当たり判定
    const hitDistance = size / 2 - 50;
    // バレットマネージャーから弾をもらう
    const bullet = this.#enemyBulletManager.getBullet();
    // 弾の基本的な設定
    this.#bulletBase(bullet, size, size, image, hitDistance);
    // 弾を返す
    return bullet;
  }

  // 青大弾
  static bigBlueBullet() {
    // 大きさ
    const size = 250;
    // 画像
    const image = core.assets["bigBlueBullet"];
    // 当たり判定
    const hitDistance = size / 2 - 50;
    // バレットマネージャーから弾をもらう
    const bullet = this.#enemyBulletManager.getBullet();
    // 弾の基本的な設定
    this.#bulletBase(bullet, size, size, image, hitDistance);
    // 弾を返す
    return bullet;
  }

  // 赤針弾
  static needleRedBullet() {
    // 大きさ
    const size = 75;
    // 画像
    const image = core.assets["needleRedBullet"];
    // 当たり判定
    const hitDistance = 10;
    // バレットマネージャーから弾をもらう
    const bullet = this.#enemyBulletManager.getBullet();
    // 弾の基本的な設定
    this.#bulletBase(bullet, size, size, image, hitDistance);
    // 弾を返す
    return bullet;
  }

  // 赤矢弾
  static arrowRedBullet() {
    // 大きさ
    const size = 50;
    // 画像
    const image = core.assets["arrowRedBullet"];
    // 当たり判定
    const hitDistance = size / 2;
    // バレットマネージャーから弾をもらう
    const bullet = this.#enemyBulletManager.getBullet();
    // 弾の基本的な設定
    this.#bulletBase(bullet, size, size, image, hitDistance);
    // 弾を返す
    return bullet;
  }
}
