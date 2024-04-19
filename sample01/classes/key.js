class Key {
  // キーの状態
  static #keys = [];

  // キー入力の受付開始
  static start() {
    // キーを押した時に呼び出す
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    // キーを離した時に呼び出す
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  };

  // キーを押した時に呼び出される
  static onKeyDown(event) {
    // 押したキー
    const keyCode = event.keyCode;

    // キーコードをチェック
    // console.log(keyCode);

    // キーの状態を押している状態に変更
    this.#keys[keyCode] = true;
  }

  // キーを離した時に呼び出す
  static onKeyUp(event) {
    // 離したキー
    const keyCode = event.keyCode;

    // キーの状態を押していない状態に変更
    this.#keys[keyCode] = null;
  }

  // 指定したキーが押されているかを返す
  static keyDown(keyCode) {
    return this.#keys[keyCode];
  }

  // 指定した複数のキーが押されているか数を返す
  /*
      指定したキーの数によって返される値も大きくなる。

      例えば、指定したキーが2つの場合に、全てキーが押されていた場合は2が返される。
      1つしか押されていない場合は1が返される。
      全て押されていない場合は0が返される。

      ※引数は配列
  */
  static keysDown(keys) {
    // 押されている数をカウントする変数
    let keyCount = 0;

    // 押されている数をカウントする
    for (const key of keys) {
      keyCount += this.#keys[key];
      // console.log(keyCount);
    }

    // 押されている数を返す
    return keyCount;
  }
}