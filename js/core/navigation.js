// /js/core/navigation.js

export function setupNavigation() {
  document.addEventListener('click', (e) => {
    const navBtn = e.target.closest('.nav-btn');
    if (!navBtn) return;

    const targetViewId = navBtn.dataset.target;

    // ナビのハイライト切り替え
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    navBtn.classList.add('active');

    // 画面切替（抜け殻）
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.getElementById(targetViewId)?.classList.add('active');

    // ★ 後で書く処理（抜け殻）
    console.log(`画面切替: ${targetViewId}`);
  });
}
