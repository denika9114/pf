class Boss extends Enemy {
  #HPBar = null;
  #HPBarFrame = null;
  
  phase = 0;
  phaseHP = [ 1 ];
  
  constructor(width, height) {
    super(width, height);

    CharacterManager.registerBoss(this);

    this.#HPBarFrame = new Sprite(1200, 40);
    this.#HPBarFrame.image = core.assets["hpBarFrame"];
    this.#HPBarFrame.x = 100;
    this.#HPBarFrame.y = 30;
    scene.addChild(this.#HPBarFrame);
    this.#HPBar = new HPBar();
    scene.addChild(this.#HPBar);
  }

  // フェーズを初期化
  setPhaseHP() {
    const hp = this.phaseHP[this.phase];
    
    // HPを設定
    this.setHP(hp);
    this.#HPBar.setMaxHP(hp);

  }
  
  // override
  HPZero() {
    // 最後のフェーズの場合、敵を倒す
    if (this.phase >= this.phaseHP.length - 1) {
      // HPバー削除
      this.#HPBarFrame.remove();
      this.#HPBar.remove();

      // 倒された後の処理
      this.onDefeat();
      this.defeat();
    }

    // 次のフェーズへ移行
    this.phase += 1;

    // フェーズを初期化
    this.setPhaseHP();

    // 次のフェーズへ移行
    this.onNextPhase();
  }

  // override
  onDamage() {
    this.#HPBar.resize(this.HP);
  }

  /// override
  onNextPhase() {
  }
}