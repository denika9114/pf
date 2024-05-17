class BulletManager {
  // すべての弾
  #allBullets = [];
  // 弾のプール
  #bulletPool = [];
  // 非表示の弾の数
  #hiddenBulletCount = 0;

  // デバッグ
  #debug = null;
  
  constructor(bulletCount, type, debug) {
    // 弾を作る
    this.#createBullets(bulletCount, type);

    // 弾数設定
    this.#hiddenBulletCount = bulletCount;

    this.#debug = debug;
    this.#debug.showCount(this.#hiddenBulletCount);
  }

  // 弾を作る
  #createBullets(bulletCount, type) {
    // 弾
    for (let i = 0; i < bulletCount; i++) {
      const bullet = new Bullet(0, 0);
      bullet.x = -100;
      bullet.y = -100;
      bullet.setId(i);
      bullet.setType(type);
      bullet.setManager(this);
      scene.addChild(bullet);
      this.#bulletPool.push(bullet);
    }

    // すべての弾へコピー
    this.#allBullets = this.#bulletPool.concat();
  }

  // 弾を与える
  getBullet() {
    for(let i = 0; i < this.#bulletPool.length; i++) {
      const bullet = this.#bulletPool[i];

      if (bullet !== null) {
        this.#bulletPool[i] = null;
        this.#hiddenBulletCount--;
        this.#debug.showCount(this.#hiddenBulletCount);
        bullet.isDisplayed();
        return bullet;
      }
    }
  }

  // 弾を返す
  returnBullet(id, bullet) {
    this.#bulletPool[id] = bullet;
    this.#hiddenBulletCount++;
    this.#debug.showCount(this.#hiddenBulletCount);
  }

  // すべての弾を取得
  getAllBullets() {
    return this.#allBullets.concat();
  }

  // すべての弾を非表示にする
  hideAllBullets() {
    for (const bullet of this.#allBullets) {
      bullet.setX(-500);
    }
  }
}