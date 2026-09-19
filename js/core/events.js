/**
 * Global Events Module
 * UIアクションの処理および Lucide アイコン再描画専用モジュール
 */

/**
 * Lucide アイコンの再描画実行関数
 */
export function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

/**
 * グローバル UI イベントリスナー（data-action属性の監視）
 */
export function initGlobalEvents() {
    document.addEventListener('click', (e) => {
        const actionTarget = e.target.closest('[data-action]');
        if (!actionTarget) return;

        const action = actionTarget.getAttribute('data-action');
        handleAction(action, actionTarget);
    });
}

function handleAction(action, target) {
    switch (action) {
        case 'see-more':
            console.log('[UI Event] See More triggered');
            break;
        case 'view-all':
            console.log('[UI Event] View All triggered');
            break;
        case 'creative-agent':
            console.log('[UI Event] Creative Agent action triggered');
            break;
        case 'view-analytics':
            console.log('[UI Event] View Analytics action triggered');
            break;
        case 'notifications':
            console.log('[UI Event] Notifications clicked');
            break;
        default:
            console.log(`[UI Event] Action triggered: ${action}`);
            break;
    }
}
