/*
  setIntervalではなく、whileとnew Date()、getTime()を使う？
  
*/
class Timer {
  // FPS
  static #fps = 60;

  // インターバルID
  static #intervalId = null;

  // 最後に追加したスケジュールのID
  static #lastScheduleId = 0;

  // スケジュール
  static #schedules = {};
  
  // Timerスタート
  static start() {
    this.#intervalId = setInterval(this.#update.bind(this), 1000 / this.#fps);
  }

  // ストップ
  static stop() {
    clearInterval(this.#intervalId);
  };

  // 1フレーム毎に実行
  static #update() {
    // スケジュールクラスのタイムを1増加
    for (const schedule in this.#schedules) {
      this.#schedules[schedule].update();
    }
  }

  // スケジュールを追加
  static addSchedule(method, interval, isLoop) {
    this.#lastScheduleId += 1;
    this.#schedules[this.#lastScheduleId] = new Schedule(method, interval, isLoop);
    return this.#lastScheduleId;
  }

  // スケジュールを削除
  static removeSchedule(id) {
    delete this.#schedules[id];
  }
}