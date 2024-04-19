/*
キャラクターマネージャー

・キャラクター(プレイヤー、雑魚敵、ボス)の管理を行います。
・他のクラスは、キャラクターマネージャーを通じてキャラクターを取得することが可能です。
・ステージクラスを継承したクラスがキャラクターを作成し、キャラクターマネージャーに登録します。
*/
class CharacterManager {
  static #player = null;
  static #enemies = [];
  static #boss = null;

  static createPlayer(bombAttack) {
    // 自機
    const player = new Player(128, 128, bombAttack);
    player.image = core.assets["player"];
    player.frame = [0, 0, 0, 0, 1, 1, 1, 1];
    scene.addChild(player);

    // 自機の当たり判定
    const hitBox = new Sprite(36, 36);
    hitBox.image = core.assets["playerHitBox"];
    scene.addChild(hitBox);
    player.setHitBox(hitBox);

    // 自機の座標を初期化
    player.initPosition();
    
    // キャラクターマネージャーに登録
    CharacterManager.registerPlayer(player);
  }

  // プレイヤーを取得
  static getPlayer() {
    return this.#player;
  }

  // プレイヤーを登録
  static registerPlayer(player) {
    this.#player = player;
  }

  // 敵を登録
  static registerEnemy(enemy) {
    this.#enemies.push(enemy);
  }
  
  /*
  ボムで倒せる敵の数が少ない。
  敵の登録の解除にはspliceを使っているのでバグがありそう。
  */

  // 敵の登録を解除
  static leaveEnemy(enemy) {
    const index = this.#enemies.indexOf(enemy);
    this.#enemies.splice(index, 1);
  }

  // ボスを登録
  static registerBoss(boss) {
    this.#boss = boss;
  }

  // 敵を取得
  static getEnemies() {
    return this.#enemies;
  }
}