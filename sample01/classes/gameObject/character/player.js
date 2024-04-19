class Player extends GameObject {
  // 残機
  #life = 2;
  // 無敵の残り時間
  #invincibleTime = 0;
  // フェードイン/フェードアウト
  #fade = 0;
  // ショットのパワー
  #power = 1;
  // ショットのダメージ
  #shotDamage = 10;
  // ショットのクールタイム
  #shotDelay = 0;
  // 移動速度
  #speed = 16;
  // 低速時の移動速度
  #slowSpeed = 8;
  // 残りボム
  #bombCount = 3;
  // ボムのクールタイム
  #bombDelay = 0;
  // 当たり判定
  #hitBox = null;
  // 自分が撃つ弾の種類
  bulletType = "player";

  // ボムエフェクトクラス
  #bombEffect = null;

  // デバッグ
  // 残機表示用
  #LifeDebug = null;
  // ボム数表示用
  #BombDebug = null;
  // パワー表示
  #PowerDebug = null;

  constructor(width, height, bombEffect) {
    super(width, height);

    // 衝突する距離を設定
    this.setHitDistance(5);

    this.#bombEffect = bombEffect;

    // デバッグ
    // 残機表示
    this.#LifeDebug = new Debug("life");
    this.#LifeDebug.y = 150;
    this.#LifeDebug.showCount(this.#life);
    // ボム数表示
    this.#BombDebug = new Debug("bomb");
    this.#BombDebug.y = 200;
    this.#BombDebug.showCount(this.#bombCount);
    // ボム数表示
    this.#PowerDebug = new Debug("power");
    this.#PowerDebug.y = 250;
    this.#PowerDebug.showCount(this.#power);

    // 毎フレーム実行
    //this.addEventListener("enterframe", function() {
    // 
    this.addSchedule(this.#update.bind(this), 1, true);
      //});
  }

  #update() {
    // WASDのいずれかを押していたら移動
    if (
      (Key.keyDown(87))
      || (Key.keyDown(65))
      || (Key.keyDown(83))
      || (Key.keyDown(68))
      ) {
      // 移動
      this.#move();
    }

    /*
    間隔を開けてループできるようになったので、shotDelayはいらないかも。
    */
    // Kキーを押していたらショット
    if (Key.keyDown(75)) {
      if (this.#shotDelay == 0) {
        // ショットのクールタイムが0だったらショット
        this.#shot();

      } else {
        // 0でなければ1減らす
        this.#shotDelay--;
      }
    }

    // ボムのクールタイムが0だったらボム
    if (this.#bombDelay == 0) {
      // Lキーを押していて、ボム数が1以上の場合ボム
      if ((Key.keyDown(76)) && (this.#bombCount > 0)) {
        this.#bomb();
      }
    } else {
      // 0でなければ1減らす
      this.#bombDelay--;
    }

    if (this.#invincibleTime > 0) {
      // 無敵中だったら無敵状態を更新
      this.#updateInvincible();

    } else {
      // 無敵中でなければ衝突判定を行う
      const targets = BulletProvider.getEnemyBullets();
      this.collisionDetectionMultiple(targets);
    }
  }

  // 移動
  #move() {
    // 移動速度
    let moveSpeed = this.#speed;

    // Jキーを押していたら移動速度を減らす
    if (Key.keyDown(74)) {
      moveSpeed = this.#slowSpeed;
    }

    // 移動方向の決定
    let moveWidth = 0;
    let moveHeight = 0;

    // 左
    if (Key.keyDown(65) && this.x > moveSpeed) {
      moveWidth -= moveSpeed;

    }
    // 右
    if (Key.keyDown(68) && this.x + this.width < scene.width - moveSpeed) {
      moveWidth += moveSpeed;

    }
    // 上
    if (Key.keyDown(87) && this.y > moveSpeed) {
      moveHeight -= moveSpeed;

    }
    // 下
    if (Key.keyDown(83) && this.y + this.height < scene.height - moveSpeed) {
      moveHeight += moveSpeed;

    }

    // 斜め移動だったら移動量を減らす
    if (moveWidth != 0 && moveHeight != 0) {
      moveWidth *= 0.6;
      moveHeight *= 0.6;
    }
    
    // 移動
    this.addX(moveWidth);
    this.addY(moveHeight);
  }

  // X座標を設定
  setX(x) {
    this.x = x;
    this.#hitBox.x = x + this.width / 2 - this.#hitBox.width / 2;
  }
  // Y座標を設定
  setY(y) {
    this.y = y;
    this.#hitBox.y = y + this.height / 2 - this.#hitBox.height / 2;
  }

  // X座標を追加
  addX(x) {
    this.x += x;
    this.#hitBox.x += x;
  }
  // Y座標を追加
  addY(y) {
    this.y += y;
    this.#hitBox.y += y;
  }

  // 位置を初期化
  initPosition() {
    // 初期位置
    const initialX = scene.width / 2 - this.width / 2;
    const initialY = scene.height - this.width * 2;
    // 位置を初期化
    this.setX(initialX);
    this.setY(initialY);
  }

  // 無敵にする
  #startInvincible(time) {
    // 無敵時間を設定
    this.#invincibleTime = time;
  }

  // 無敵状態の更新
  #updateInvincible() {
    // 無敵時間を減らす
    this.#invincibleTime--;

    // 7 * 3の倍数になるごとにフェードイン/フェードアウト切り替え
    if(this.#invincibleTime % (7 * 3) == (7 * 3 - 1)) {
      this.#fade = Math.floor(this.#invincibleTime / (7 * 3)) % 2;
    }

    if (this.#fade == 0) {
      if(this.opacity < 1) this.opacity += 0.1 / 3;
    } else {
      this.opacity -= 0.1 / 3;
    }
  }

  // ミス
  #mistake() {
    if (this.#life == 0) {
      // 残機が0の場合ゲームオーバー
      // ゲームオーバー演出ができていないので、現在はTimerクラスを止めている
      Timer.stop();

    } else {
      // 残機が0でない場合

      // 残機を減らす
      this.#life--;

      // 残機を表示
      this.#LifeDebug.showCount(this.#life);

      // // 弾を一時的にすべて消す
      // BulletManager.hideAllBullets();

      // 位置を初期化
      this.initPosition();

      // 一時的に無敵にする
      this.#startInvincible(140);

      // すべての敵弾を非表示にする
      BulletProvider.hideAllEnemyBullets();
    }
  }

  // ショット
  #shot() {
    // ショットの待ち時間を増やす
    this.#shotDelay = 6;

    // パワーによってショットを変える
    if (this.#power >= 1 && this.#power <= 9) {
      // パワー1～9
      this.#upShot(3, 60);
      
    } else if (this.#power >= 10 && this.#power <= 19) {
      // パワー10～19
      this.#upShot(3, 60);
      this.#nWayShot(4, 100, 10);
    
    } else if (this.#power >= 20 && this.#power <= 29) {
      // パワー20～29
      this.#upShot(3, 60);
      this.#nWayShot(6, 50, 10);

    }
  }
  
  // 真上ショット
  #upShot(columnCount, gap) {
    for (let i = -((columnCount - 1) / 2); i <= (columnCount - 1) / 2; i++) {
      // 弾作成
      const bullet = BulletProvider.playerBullet(this.#shotDamage);
      // 弾の位置
      bullet.x = this.centerX - bullet.width / 2 + gap * i;
      bullet.y = this.centerY;
      // 移動
      bullet.moveArrow(0, -60);
    }
  }

  // nwayショット
  #nWayShot(columnCount, gap, angle) {
    for (let i = -((columnCount - 1) / 2); i <= ((columnCount - 1) / 2); i++) {
      // 弾作成
      const bullet = BulletProvider.playerBullet(this.#shotDamage / 2);
      // 弾の位置
      bullet.x = this.centerX - bullet.width / 2 + gap * i;
      bullet.y = this.centerY;
      // 移動
      bullet.moveArrow(i * angle, -60);
      
      console.log(i);
    }
  }

  // ボム
  #bomb() {
    // クールタイムを設定
    this.#bombDelay = 80;

    // 残りボムを1減らす
    this.#bombCount--;

    // 残りボム数を表示
    this.#BombDebug.showCount(this.#bombCount);

    // すべての敵弾を非表示にする
    BulletProvider.hideAllEnemyBullets();

    // 全ての敵にダメージを与える
    const allEnemiesArray = CharacterManager.getEnemies();
    const allEnemies = allEnemiesArray.concat();
    for (const enemy of allEnemies) {
      enemy.damage(2000);
    }

    // ボムエフェクトのフレーム数
    const bombEffectFrame = this.#bombEffect.getFinalFrame();
    // 一時的に無敵にする
    this.#startInvincible(bombEffectFrame);

    // ボムエフェクトのアニメーションを再生
    this.#bombEffect.startAnimation();
  }

  // 当たり判定の設定
  setHitBox(hitBox) {
    this.#hitBox = hitBox;
  }

  // 敵弾との衝突時
  collision() {
    this.#mistake();
  }
  
  // パワーアップ
  powerUp() {
    this.#power += 1;
    // this.#power *= 10;
    // Math.trunc(this.#power);
    // this.#power /= 10;
    // console.log(this.#power);
    this.#PowerDebug.showCount(this.#power);
  }
}