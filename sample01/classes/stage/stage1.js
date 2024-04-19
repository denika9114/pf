class Stage1 extends Stage {
  constructor() {
    super();

    // 背景の画像を設定
    // 画像素材がないので今はまだ色を変えるだけ
    // StageManager.changeBackgroundImage("#5aa4ad");
    StageManager.changeBackgroundImage("black");
    
    // イベントを設定
    this.#setEvents();
  }

  // イベントを設定
  #setEvents() {
    // 敵出現
    this.setEventGroup(190, [
      new AppearEnemyEvent(1, Enemy1, 1100, -100),
      new AppearEnemyEvent(5, Enemy1, 800, -100),
      new AppearEnemyEvent(10, Enemy1, 600, -100),
      new AppearEnemyEvent(15, Enemy1, 500, -100),
      new AppearEnemyEvent(20, Enemy1, 300, -100),
      new AppearEnemyEvent(25, Enemy1, 200, -100)
    ]);
    this.setEventGroup(270, [
      new AppearEnemyEvent(1, Enemy2, 800, -500)
    ]);
    this.setEventGroup(500, [
      new AppearEnemyEvent(1, Enemy1, 1000, -100),
      new AppearEnemyEvent(5, Enemy1, 850, -100),
      new AppearEnemyEvent(10, Enemy1, 700, -100),
      new AppearEnemyEvent(15, Enemy1, 600, -100),
      new AppearEnemyEvent(20, Enemy1, 400, -100),
      new AppearEnemyEvent(20, Enemy1, 200, -100)
    ]);
    this.setEventGroup(640, [
      new AppearEnemyEvent(1, Enemy1, 1100, -100),
      new AppearEnemyEvent(5, Enemy1, 800, -100),
      new AppearEnemyEvent(10, Enemy1, 600, -100),
      new AppearEnemyEvent(15, Enemy1, 500, -100),
      new AppearEnemyEvent(20, Enemy1, 300, -100),
      new AppearEnemyEvent(25, Enemy1, 200, -100)
    ]);
    // this.setEventGroup(20, [
    //   new AppearEnemyEvent(1, Boss1, scene.width / 2 - 150 / 2, 150 + 150)
    // ]);
  }
}