class Stage {
  // 背景スプライト
  background = null;
  
  // ステージのイベント
  /*
  nフレームでここから敵が出現、背景スクロールの速度が変わる、止まるなど。
  */
  #events = [];

  constructor() {
    // // 毎フレーム呼び出す
    // Timer.addSchedule(this.update.bind(this), 1, true);
  }

  // // 毎フレーム呼び出される
  // update() {
  //   // 
  // };

  // ステージ終了
  end() {
  }

  // イベントグループを設定
  setEventGroup(time, events) {
    Timer.addSchedule(function() {
      for(const event of events) {
        // time分の時間が経過したらタイマースタート
        event.timerStart();
      }
    }.bind(this), time, false);
  };
}