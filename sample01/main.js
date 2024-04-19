const assets = {
  title: "images/title.png", // タイトル
  player: "images/player/player.png", // 自機
  playerHitBox: "images/player/playerHitBox.png", // 自機の当たり判定
  playerBullet: "images/player/playerBullet.png", // 自機の弾
  bombEffect: "images/player/bombEffect.png", // ボムエフェクト
  powerUpItem: "images/item/powerUpItem1.png", // パワーアップアイテム
  smallRedBullet: "images/enemy/bullet/smallRedBullet.png", // 赤小弾
  smallBlueBullet: "images/enemy/bullet/smallBlueBullet.png", // 青小弾
  middleRedBullet: "images/enemy/bullet/middleRedBullet.png", // 赤中弾
  // middleBlueBullet: "images/enemy/bullet/middleBlueBullet.png", // 青中弾
  bigRedBullet: "images/enemy/bullet/bigRedBullet.png", // 赤大弾
  bigBlueBullet: "images/enemy/bullet/bigBlueBullet.png", // 青大弾
  needleRedBullet: "images/enemy/bullet/needleRedBullet.png", // 赤針弾
  arrowRedBullet: "images/enemy/bullet/arrowRedBullet.png", // 赤矢弾
  enemy1: "images/enemy/enemy1.png", // 雑魚敵1
  enemy2: "images/enemy/enemy2.png", // 雑魚敵2
  hpBar: "images/ui/hpBar.png", // 体力バー
  hpBarFrame: "images/ui/hpBarFrame.png" // 枠
}

const gameStart = () => {
  // キー登録
  core.keybind(16, "shift");
  core.keybind(37, "left");
  core.keybind(38, "up");
  core.keybind(39, "right");
  core.keybind(40, "down");
  core.keybind(90, "z");

  // シーン
  scene = new Scene();
  core.replaceScene(scene);
  scene.backgroundColor = "black";

  // // ゲームマネージャーを起動
  // GameManager.startUp();
  // // キャラクターマネージャーを起動
  // CharacterManager.startUp();

  // タイマーを起動
  Timer.start();
  // ステージマネージャーを起動
  StageManager.start();
  // ボム背景を作成
  const bombEffect = new BombEffect(1400, 1400);
  // 自機を作成
  CharacterManager.createPlayer(bombEffect);
  // バレットプロバイダーを起動
  BulletProvider.start();
  // キー入力の受付を開始
  Key.start();

  // console.log(BulletProvider.playerBullet());
};

const titleStart = function () {
  const scene = new Scene();
  core.replaceScene(scene);

  var back = new Sprite(1400, 1400);
  back.image = core.assets["title"];
  scene.addChild(back);

  scene.on(enchant.Event.TOUCH_START, function () {
    gameStart();
  });
};

enchant();
window.onload = function () {
  core = new Core(1400, 1400);
  core.preload(assets);
  // core.onload = () => { titleStart(); };
  core.onload = () => { gameStart(); };
  core.start();
  core.fps = 60;
};
