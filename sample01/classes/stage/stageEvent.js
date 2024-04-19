class StageEvent {
  #time = 0;

  constructor(time) {
    this.#time = time;
  }

  // タイマースタート
  timerStart() {
    Timer.addSchedule(this.run.bind(this), this.#time, false);
  }

  // 実行
  run() {}
}