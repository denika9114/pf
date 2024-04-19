class Schedule {
  // 現在の経過時間
  #elapsedTime = 0;

  // インターバル
  #interval = 0;
  // メソッド
  #method = null;
  // ループ
  #loop = false;

  constructor(method, interval, loop) {
    this.#method = method;
    this.#interval = interval;
    this.#loop = loop;
  }

  update() {
    this.#elapsedTime += 1;

    // インターバルを経過していたら
    if (this.#elapsedTime == this.#interval) {
      // 実行
      this.run();
    }
  }

  // 実行
  run() {
    // メソッドを呼び出す
    this.#method();

    // ループするか否かで処理を分岐
    if (this.#loop) {
      // ループする場合
      // 経過時間をリセット
      this.#elapsedTime = 0;

    } else {
      // ループしない場合
      // このスケジュールを削除
      Timer.removeSchedule(this);
    }
  }
}