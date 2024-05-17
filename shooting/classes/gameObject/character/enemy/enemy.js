class Enemy extends GameObject {
  // HP
  HP = 1;

  // 現在撃っている弾幕
  currentShot = 1;

  // 自分が撃つ弾の種類
  bulletType = "enemy";

  // 落とすパワーアップアイテムの数
  powerUpItemCount = 0;

  constructor(width, height) {
    super(width, height);

    // 当たり判定の半径を設定
    this.setHitDistance(40);

    // 自分をキャラクターマネージャーに登録
    CharacterManager.registerEnemy(this);

    // 毎フレーム実行
    this.addSchedule(this.#update.bind(this), 1, true);
  }

  // 毎フレーム
  #update() {
    // 衝突判定を行う
    const targets = BulletProvider.getPlayerBullets();
    this.collisionDetectionMultiple(targets);

    // 画面外にいるかを確認
    if (
      (this.centerX < -this.width) || 
      (this.centerX > 1400 + this.width) || 
      (this.centerY < -this.height) || 
      (this.centerY > 1400 + this.height)
    ) {
      // 自分を倒す
      this.destroy();
    }
  }

  // HPをセット
  setHP(HP) {
    this.HP = HP;
  }

  // HPを確認
  checkHP(min, max) {
    if (this.HP >= min && this.HP <= max) {
      return true;
    }
  }

  // 衝突
  collision(target) {
    // 弾のダメージを取得
    const bulletDamage = target.getDamage();

    // HPが0以下だったら止める
    if (this.HP <= 0) return;
    
    // ダメージを与える
    this.damage(bulletDamage);
    
    // 衝突した弾を隠す
    target.hide();
  }

  // HPを減らす
  damage(damage) {
    // HPを減らす
    this.HP -= damage;
    
    // HPが0以下の場合、
    // HPが0以下の状態の処理を行う
    if(this.HP <= 0) {
      this.HPZero();
    }

    // ダメージを受けたときの処理を呼び出す
    this.onDamage();
  }

  // HPが0以下の場合呼び出される
  HPZero() {
    this.defeat();
  }
  
  // 敵を倒す
  defeat() {
    // アイテムを落とす
    this.dropItems();
    // 敵を消す
    this.destroy();
  }

  // アイテムを落とす
  dropItems() {
    // 設定された数、パワーアップアイテムを出す
    for (let i = 0; i < this.powerUpItemCount; i++) {
      // 追加座標
      let addX = 0;
      let addY = 0;

      // パワーアップアイテムの数が複数ある場合、座標をランダムにする
      if (this.powerUpItemCount >= 2) {
        const width = 300;
        addX = Math.random()*width - width / 2;
        addY = Math.random()*width - width / 2;
      }

      // パワーアップアイテムを作成
      const itemSize = 48;
      const powerUpItem = new PowerUpItem(
        itemSize, itemSize,
        this.centerX - itemSize / 2 + addX, this.centerY - itemSize / 2 + addY
      );
      scene.addChild(powerUpItem);
    }
  }

  // ゲームオブジェクトが消えたときに呼び出される
  onDestroy() {
    // 自分を敵リストから削除
    CharacterManager.leaveEnemy(this);
    // console.log("enemy destroy");
  }

  // ダメージを受けたときに呼ばれる処理
  onDamage() {}

  // 次の弾幕へ変更
  nextShot(method, interval) {
    // 現在の弾幕の発射を終了

    // 自分が追加したスケジュールを取得
    const mySchedules = this.getMySchedules();
    // 自分が追加したスケジュールの2つ目を削除
    this.removeMySchedule(mySchedules[1]);

    // 弾幕の発射を開始
    this.addSchedule(method, interval, true);

    // 現在の弾幕の状態を変更
    this.currentShot++;
  }
}