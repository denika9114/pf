class GameObject extends enchant.Sprite {
  // 衝突する距離
  #hitDistance = 0;
  // 自分が追加したスケジュールID
  #myScheduleId = [];

  // 自分の撃つ弾の種類
  bulletType = null;

  // ベクトル
  #vectorX = 0;
  #vectorY = 0;

  constructor(width, height) {
    super(width, height);

    // 毎フレーム呼び出す
    this.addSchedule(this.#update.bind(this), 1, true);
  }

  // 毎フレーム呼び出されるメソッド
  #update() {
    if (this.#vectorX || this.#vectorY) {
      this.move();
    }
  }

  // 衝突距離を取得
  getHitDistance() {
    return this.#hitDistance;
  }
  // 衝突距離を設定
  setHitDistance(value) {
    this.#hitDistance = value;
  }

  // 自分が追加したスケジュールのIdを取得
  getMyScheduleId() {
    return this.#myScheduleId;
  }

  // スケジュールを追加し、記録する
  addSchedule(method, interval, isLoop) {
    const scheduleId = Timer.addSchedule(method, interval, isLoop);
    // スケジュールを記録
    this.#myScheduleId.push(scheduleId);

    return scheduleId;
  }

  // X座標を設定
  setX(x) {
    this.x = x;
  }
  // Y座標を設定
  setY(y) {
    this.y = y;
  }

  // X座標を追加
  addX(x) {
    this.x += x;
  }
  // Y座標を追加
  addY(y) {
    this.y += y;
  }

  // 移動量設定
  setVector(x, y) {
    // 1フレームごとの移動量を設定
    this.#vectorX = x;
    this.#vectorY = y;

    this.onSetVector(x, y);
  }

  // 移動量設定時に呼び出される
  onSetVector(x, y) {}

  // 移動処理
  move() {
    // 移動
    this.addX(this.#vectorX);
    this.addY(this.#vectorY);
  }

  // 当たり判定
  collisionDetection(target) {
    // 中心の座標
    const thisX = this.centerX;
    const thisY = this.centerY;
    const targetX = target.centerX;
    const targetY = target.centerY;
    
    // 座標の差
    const diffX = Math.abs(thisX - targetX);
    const diffY = Math.abs(thisY - targetY);
    const diff = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    
    // 自身の中心の座標とターゲットの中心の座標の距離が両方の衝突距離の和よりも低ければ衝突
    if(diff <= this.getHitDistance() + target.getHitDistance()) {
      // 衝突
      this.collision(target);
    }
  }


  // 複数との当たり判定
  collisionDetectionMultiple(targets) {
    // ターゲットを1つずつ確認
    for (const target of targets) {
      this.collisionDetection(target);
    }
  }

  // 衝突している
  collision() {
    // console.log("hit!");
  }

  // 自身が追加したスケジュールを削除
  removeSchedule(scheduleId) {
    // タイマーからスケジュールを削除
    Timer.removeSchedule(scheduleId);

    // インデックス取得
    const index = this.#myScheduleId.indexOf(scheduleId);
    // 自分が追加したスケジュールから削除
    this.#myScheduleId.splice(index, 1);
  }

  // 自身が追加したスケジュールを全て削除
  removeAllSchedules() {
    // 自分が追加したスケジュールを削除
    for(const scheduleId of this.#myScheduleId) {
      Timer.removeSchedule(scheduleId);
    }
  }

  // ゲームオブジェクトを消す
  destroy() {
    // 自分が追加したスケジュールを全て削除
    this.removeAllSchedules();
    
    // ゲームオブジェクトが消えたときに呼び出す
    this.onDestroy();

    // 基底クラスのremove関数で敵を消す
    this.remove();
  }

  // ゲームオブジェクトが消えたときに呼び出される
  onDestroy() {}
}