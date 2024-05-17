class AppearEnemyEvent extends StageEvent {
  // 敵クラス
  #enemyClass = null;
  // 敵のX座標
  #enemyX = 0;
  // 敵のY座標
  #enemyY = 0;

  constructor(time, enemyClass, enemyX, enemyY) {
    super(time);

    this.#enemyClass = enemyClass;
    this.#enemyX = enemyX;
    this.#enemyY = enemyY;
  }

  // 実行
  run() {
    const enemy = new this.#enemyClass;
    enemy.x = this.#enemyX;
    enemy.y = this.#enemyY;
    scene.insertBefore(enemy, CharacterManager.getPlayer());
  }
}