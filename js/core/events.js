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

    document.addEventListener('change', (e) => {
        const actionTarget = e.target.closest('[data-action]');
        if (!actionTarget) return;

        const action = actionTarget.getAttribute('data-action');
        handleAction(action, actionTarget);
    });
}

function handleAction(action, target) {
    switch (action) {
        // Dashboard Actions
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

        // Account & Settings Actions
        case 'edit-avatar':
            console.log('[Account Event] Edit avatar triggered');
            break;
        case 'edit-profile':
            console.log('[Account Event] Edit profile triggered');
            break;
        case 'change-password':
            console.log('[Account Event] Change password triggered');
            break;
        case 'toggle-2fa':
            console.log(`[Account Event] 2FA toggled: ${target.checked}`);
            break;
        case 'view-sessions':
            console.log('[Account Event] View sessions triggered');
            break;
        case 'toggle-push':
            console.log(`[Settings Event] Push notifications toggled: ${target.checked}`);
            break;
        // handleAction 内の switch に追記
        case 'request-role-upgrade':
            alert('管理者および開発者へ権限昇格申請を送信いたしました。');
            break;
        case 'logout':
            console.log('[Account Event] Logout sequence initiated');
            if (confirm('ログアウトしますか？')) {
                // セッションクリアおよび初期画面への切替等の処理
                location.reload();
            }
            break;

        default:
            console.log(`[UI Event] Action triggered: ${action}`);
            break;
    }
}
