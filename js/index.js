/**
 * Application Entry Point
 * 認証状態監視・ビュー切り替えルーティング・初期化モジュール
 */
import { renderLogin } from './views/login.js';
import { renderSettings } from './views/settings.js';
import { initGlobalEvents, refreshIcons } from './core/events.js';

const viewRenderers = {
    'view-settings': renderSettings
};

document.addEventListener('DOMContentLoaded', () => {
    initGlobalEvents();
    checkAuthAndInit();
});

/**
 * 認証状態チェックおよび初期画面の起動制御
 */
function checkAuthAndInit() {
    const isAuthenticated = sessionStorage.getItem('x77_auth') === 'true';

    if (!isAuthenticated) {
        // 未認証時：ナビゲーション非表示＆ログイン画面を表示
        document.body.classList.add('not-authenticated');
        showView('view-login');
        renderLogin(() => {
            // ログイン成功時のコールバック
            document.body.classList.remove('not-authenticated');
            showView('view-home');
            initNavigation();
            refreshIcons();
        });
    } else {
        // 認証済み時：メイン画面表示
        document.body.classList.remove('not-authenticated');
        showView('view-home');
        initNavigation();
        refreshIcons();
    }
}

/**
 * 指定ビューのみ表示するユーティリティ関数
 */
function showView(targetViewId) {
    const views = document.querySelectorAll('.view');
    views.forEach(v => {
        if (v.id === targetViewId) {
            v.classList.add('active');
        } else {
            v.classList.remove('active');
        }
    });
}

/**
 * ナビゲーション処理の初期化
 */
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');

    navButtons.forEach(btn => {
        btn.onclick = async () => {
            const targetViewId = btn.getAttribute('data-target');
            if (!targetViewId) return;

            navButtons.forEach(b => {
                b.classList.remove('active');
                // 元々HTMLにある<span>（文字）を消去してレイアウトを破壊していた原因箇所を無効化
                // const span = b.querySelector('span');
                // if (span) span.remove();
            });

            btn.classList.add('active');
            showView(targetViewId);

            const labelText = getNavLabel(targetViewId);
            if (labelText && !btn.querySelector('span')) {
                const span = document.createElement('span');
                span.textContent = labelText;
                btn.appendChild(span);
            }

            if (typeof viewRenderers[targetViewId] === 'function') {
                await viewRenderers[targetViewId]();
            }

            refreshIcons();
        };
    });
}

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
