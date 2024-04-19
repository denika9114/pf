class GameManager {
  // インスタンスリスト
  static #instances = {
    player: null,
    boss: null,
    enemies: [],
    bullets: [],
    hiddenBullets: [],
    displayedBullets: [],
    playerBullets: [],
    enemyBullets: []
  };

  // 自機の弾の数
  static #playerBulletCount = 100;
  // 敵の弾の数
  static #enemyBulletCount = 900;

  // デバッグ
  static #debug = null;
  static #debug2 = null;

  static loopBullet = 0;

  // GameManager起動
  static startUp() {
    // インスタンス化
    this.#instantiate();

    // // デバッグ
    // this.#debug = new Debug("hidden");
    // this.#debug.showCount(this.#instances.hiddenBullets.length);

    // this.#debug2 = new Debug("loopBullet");
    // this.#debug2.y = 240;

    
    // 毎フレーム呼び出す
    Timer.addSchedule(this.#update.bind(this), 1, true);
    // タイマーを起動
    Timer.start();

    // 弾の
  }

  // 毎フレーム呼び出される
  static #update() {
    // 表示中の弾があるかを確認
    if (this.#instances.displayedBullets.length > 0) {
      // 画面外にある表示中の弾を隠す
      this.#searchBullets();
    }

    // this.#debug2.showCount(this.loopBullet);
    // this.loopBullet = 0;
  }

  // インスタンス化
  static #instantiate() {
    // 自機
    const player = new Player(100, 100);
    player.backgroundColor = "white";
    scene.addChild(player);
    this.#instances.player = player;
    // 自機の当たり判定の画像
    const hitBoxCircle = new Circle(40, 40, 'rgb(0, 255, 255)');
    // 自機の当たり判定
    const hitBox = new Sprite(40, 40);
    hitBox.image = hitBoxCircle;
    scene.addChild(hitBox);
    player.setHitBox(hitBox);
    // 自機の座標を初期化
    player.initPosition();
    
    // 敵機
    // const enemy = new Enemy(100, 100);
    // enemy.backgroundColor = "red";
    // enemy.x = scene.width / 2 + enemy.width * 2;
    // enemy.y = enemy.height * 2;
    // scene.addChild(enemy);
    // 敵機
    const enemy1 = new Enemy1(100, 100);
    enemy1.backgroundColor = "red";
    enemy1.x = scene.width / 2 - enemy1.width / 2;
    enemy1.y = enemy1.height;
    scene.addChild(enemy1);
    this.addInstanceList("enemies", enemy1);
    // const enemy2 = new EnemyAim(100, 100);
    // enemy2.backgroundColor = "green";
    // enemy2.x = (scene.width / 2 - enemy2.width / 2) + 300;
    // enemy2.y = enemy2.height;
    // scene.addChild(enemy2);
    // const enemy3 = new EnemyAim(100, 100);
    // enemy3.backgroundColor = "green";
    // enemy3.x = (scene.width / 2 - enemy3.width / 2) - 300;
    // enemy3.y = enemy3.height;
    // scene.addChild(enemy3);
    // 敵機
    // const enemy2 = new Enemy(100, 100);
    // enemy2.backgroundColor = "red";
    // enemy2.x = scene.width / 2 - enemy2.width * 3;
    // enemy2.y = enemy2.height * 2;
    // scene.addChild(enemy2);

    // 弾の画像
    // const bulletCircle = new Circle(30, 30, 'rgb(255, 255, 255)');
    // 弾
    for (let i = 0; i < this.#playerBulletCount + this.#enemyBulletCount; i++) {
      const bullet = new Bullet(0, 0);
      // bullet.image = bulletCircle;
      bullet.x = -100;
      bullet.y = -100;
      scene.insertBefore(bullet, hitBox);
      this.#instances.bullets.push(bullet);
      this.#instances.hiddenBullets.push(bullet);
    }

    // // 自機の弾
    // for (let i = 0; i < this.#playerBulletCount; i++) {
    //   const bullet = new PlayerBullet(0, 0);
    //   // bullet.image = bulletCircle;
    //   bullet.x = -100;
    //   bullet.y = -100;
    //   scene.insertBefore(bullet, hitBox);
    //   this.#instances.bullets.push(bullet);
    //   this.#instances.hiddenBullets.push(bullet);
    // }
    // // 敵の弾
    // for (let i = 0; i < this.#enemyBulletCount; i++) {
    //   const bullet = new EnemyBullet(0, 0);
    //   // bullet.image = bulletCircle;
    //   bullet.x = -100;
    //   bullet.y = -100;
    //   scene.insertBefore(bullet, hitBox);
    //   this.#instances.bullets.push(bullet);
    //   this.#instances.hiddenBullets.push(bullet);
    // }


    
    // 弾数をカウント

    // // 円形
    // const bulletCircle2 = new Circle(50, 50, 'rgb(255, 0, 0)');
    // // 弾を取得
    // const bullet = GameManager.getHiddenBullet();
    // bullet.image = bulletCircle2;
    // // 大きさ
    // bullet.width = 50;
    // bullet.height = 50;
    // // 衝突距離を設定
    // bullet.setHitDistance(25);
    // bullet.x = 700;
    // bullet.y = 700;

    // scene.addChild(playerGroup);

  }

  // 弾を隠す
  static hideBullet(bullet) {
    // 座標を変更
    bullet.x = -100;
    bullet.y = -100;
    // 画像をリセット
    bullet.image = null;
    // 移動停止
    bullet.setVector(0, 0);
    // 非表示の弾の配列に追加
    this.#instances.hiddenBullets.push(bullet);
    // 表示中の弾の配列から削除
    const index = this.#instances.displayedBullets.indexOf(bullet);
    this.#instances.displayedBullets.splice(index, 1);
    // 弾の種類の配列から削除
    const type = bullet.getType();
    this.deleteInstanceList(type + "Bullets", bullet);
    
    // デバッグ
    this.#debug.showCount(this.#instances.hiddenBullets.length);
  }

  // 複数の弾を隠す
  static hideBullets(bullets) {
    for (const bullet of bullets) {
      this.hideBullet(bullet);
    }
  };

  // 自機取得
  static getPlayer() {
    return this.#instances.player;
  }

  // // ボス取得
  // static #getBoss() {
  //   return this.#boss;
  // }

  // 非表示の弾を取得する
  static getHiddenBullet() {
    // 非表示のたまがあったら
    if (this.#instances.hiddenBullets.length >= 1) {
      // 非表示の弾を取得
      const hiddenBullet = this.#instances.hiddenBullets[0];
      // 取得した非表示の弾を配列から消す
      this.#instances.hiddenBullets.splice(0, 1);
      // 表示中の弾の配列に追加
      this.#instances.displayedBullets.push(hiddenBullet);
      // デバッグ
      this.#debug.showCount(this.#instances.hiddenBullets.length);
      // 非表示の弾を返す
      return hiddenBullet;

    } else {
      // なければエラー
      console.log("非表示の弾がありません");
    }
  }

  // 特定のインスタンスを取得する
  static getInstance(name) {
    // インスタンスを取得
    let gotInstance = this.#instances[name];

    if (Array.isArray(gotInstance)) {
      // インスタンスが配列だったら
      // 配列を複製
      const instances = gotInstance.slice();
      // インスタンスの配列を返す
      return instances;

    } else {
      // インスタンスが配列ではなかったら
      // 何もせずインスタンスを返す
      return gotInstance;

    }
  }

  // インスタンスをリストに追加
  static addInstanceList(identifier, instance) {
    this.#instances[identifier].push(instance);
  }

  // インスタンスをリストから削除
  static deleteInstanceList(identifier, instance) {
    const index = this.#instances[identifier].indexOf(instance);
    this.#instances[identifier].splice(index, 1);
  }

  // ゲームオーバー
  static gameOver() {
    Timer.stop();
  }
}