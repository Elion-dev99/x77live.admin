/**
 * Application Entry Point
 * ビュー切り替えルーティングおよび初期化処理専用モジュール
 */
import { renderSettings } from './views/settings.js';
import { initGlobalEvents, refreshIcons } from './core/events.js';

// ビューごとの描画処理マップ
const viewRenderers = {
    'view-settings': renderSettings,
    // 他のビュー描画関数が存在する場合はここに追加いたします
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. グローバルイベントリスナーの初期化
    initGlobalEvents();

    // 2. ナビゲーションタブ切替処理の初期化
    initNavigation();

    // 3. Lucideアイコンの初回生成
    refreshIcons();
});

/**
 * ボトムナビゲーションのタブ切り替えイベントを制御する関数
 */
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');

    navButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const targetViewId = btn.getAttribute('data-target');
            if (!targetViewId) return;

            // --- A. アクティブ表示のクリア ---
            navButtons.forEach(b => {
                b.classList.remove('active');
                // 非アクティブ化時にボタン内のテキスト（span）を取り除く
                const span = b.querySelector('span');
                if (span) span.remove();
            });

            views.forEach(v => {
                v.classList.remove('active');
            });

            // --- B. 選択されたタブ・ビューのアクティブ化 ---
            btn.classList.add('active');
            const targetView = document.getElementById(targetViewId);
            if (targetView) {
                targetView.classList.add('active');
            }

            // --- C. アクティブボタンへテキストラベルを復元 ---
            const labelText = getNavLabel(targetViewId);
            if (labelText && !btn.querySelector('span')) {
                const span = document.createElement('span');
                span.textContent = labelText;
                btn.appendChild(span);
            }

            // --- D. 該当ビューのコンテンツ描画関数の実行 ---
            if (typeof viewRenderers[targetViewId] === 'function') {
                await viewRenderers[targetViewId]();
            }

            // --- E. 動的に追加されたアイコンの再生成 ---
            refreshIcons();
        });
    });
}

/**
 * タブIDに応じた表示テキストを取得するユーティリティ
 */
function getNavLabel(targetId) {
    const labels = {
        'view-home': 'Home',
        'view-agents': 'Agents',
        'view-workflows': 'Workflows',
        'view-activity': 'Activity',
        'view-settings': 'Settings'
    };
    return labels[targetId] || '';
}
