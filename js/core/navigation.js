/******************************************************
 * /js/core/navigation.js
 * ----------------------------------------------------
 * 役割：
 *   - 下部ナビゲーション（.nav-btn）を監視し、
 *     SPA の画面切り替え（.view の active 切替）を行う。
 *   - index.js や events.js と競合しないように、
 *     「画面切り替えだけ」に徹する。
 ******************************************************/

export function setupNavigation() {

  /* ----------------------------------------------------
   * クリックイベントを全体に付与
   * ----------------------------------------------------
   * nav-btn が押された時だけ処理する。
   * 他のイベント（See More / Quick Actions など）は
   * index.js 側の setupGlobalEvents() が担当する。
   ---------------------------------------------------- */
  document.addEventListener('click', (e) => {

    // nav-btn（下部ナビゲーション）が押されたか判定
    const navBtn = e.target.closest('.nav-btn');
    if (!navBtn) return; // nav-btn 以外は無視


    /* ----------------------------------------------------
     * 1. 切り替え先の View ID を取得
     * ----------------------------------------------------
     * data-target="view-home" → #view-home を表示する
     ---------------------------------------------------- */
    const targetViewId = navBtn.dataset.target;


    /* ----------------------------------------------------
     * 2. ナビゲーションの active 切り替え
     * ----------------------------------------------------
     * すべての nav-btn から active を外し、
     * 押された nav-btn に active を付ける。
     ---------------------------------------------------- */
    document.querySelectorAll('.nav-btn')
      .forEach(btn => btn.classList.remove('active'));

    navBtn.classList.add('active');


    /* ----------------------------------------------------
     * 3. 画面（View）の active 切り替え
     * ----------------------------------------------------
     * すべての .view を非表示にし、
     * 対象の View のみ active を付けて表示する。
     ---------------------------------------------------- */
    document.querySelectorAll('.view')
      .forEach(view => view.classList.remove('active'));

    const targetView = document.getElementById(targetViewId);
    if (targetView) {
      targetView.classList.add('active');
    }


    /* ----------------------------------------------------
     * 4. デバッグログ（任意）
     * ----------------------------------------------------
     * 紬稀が後で画面切り替え時の処理を追加する場合、
     * この位置に書けばよい。
     ---------------------------------------------------- */
    console.log(`画面切替: ${targetViewId}`);
  });
}
