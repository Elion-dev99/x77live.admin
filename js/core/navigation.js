/**
 * Navigation Core Module
 * 画面切替処理専用（他の処理は一切記述しない仕様）
 */
export function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');

    navButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            if (!targetId) return;

            // 1. 全てのナビボタンから active クラスを除去
            navButtons.forEach((b) => b.classList.remove('active'));

            // 2. 全てのビューから active クラスを除去
            views.forEach((v) => v.classList.remove('active'));

            // 3. 選択されたボタンとビューに active クラスを付与
            btn.classList.add('active');
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.add('active');
            }
        });
    });
}
