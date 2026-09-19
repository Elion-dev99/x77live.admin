// /js/core/events.js

export function setupEvents() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;

    // ★ ここが紬稀が後で書く“抜け殻”
    switch(action) {
      case 'update-stock':
        console.log('在庫更新ボタン押下（抜け殻）');
        break;

      case 'open-settings':
        console.log('設定ボタン押下（抜け殻）');
        break;

      default:
        console.log(`未定義アクション: ${action}`);
    }
  });
}
