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
                // 【修正】ここで b.querySelector('span').remove() を実行していたため
                // HTML構造が破壊され、レイアウトが崩壊してビューが全露出していました。
                // 構造を壊さないよう、要素の物理削除処理を完全に無効化しています。
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

// ---------------------------------------------------------
// ダッシュボード・統計・アクティビティ関連の全ハンドラー群（完全保持）
// ---------------------------------------------------------

/**
 * ダッシュボードの統計数値やデータの非同期更新処理
 */
export async function updateDashboardStats() {
    try {
        const activeStat = document.getElementById('stat-active');
        const workflowsStat = document.getElementById('stat-workflows');
        const tasksStat = document.getElementById('stat-tasks');
        const rateStat = document.getElementById('stat-rate');

        if (activeStat) activeStat.textContent = '12';
        if (workflowsStat) workflowsStat.textContent = '8';
        if (tasksStat) tasksStat.textContent = '144';
        if (rateStat) rateStat.textContent = '98%';
    } catch (e) {
        console.error('Failed to update dashboard stats:', e);
    }
}

/**
 * アクティビティログの動的レンダリング処理
 */
export function renderActivityList() {
    const activityListContainer = document.getElementById('activity-list');
    if (!activityListContainer) return;

    const activities = [
        { title: 'Workflow Executed', subtitle: 'Agent Alpha completed task #402', time: '2m ago', icon: 'zap' },
        { title: 'New Agent Deployed', subtitle: 'Creative Agent v2.4 initialized', time: '15m ago', icon: 'user-plus' },
        { title: 'System Backup', subtitle: 'Automated snapshot saved securely', time: '1h ago', icon: 'shield' }
    ];

    activityListContainer.innerHTML = activities.map(item => `
        <div class="activity-card">
            <div class="activity-icon-box">
                <i data-lucide="${item.icon}" size="20"></i>
            </div>
            <div class="activity-details">
                <div class="activity-title">${item.title}</div>
                <div class="activity-subtitle">${item.subtitle}</div>
            </div>
            <span style="font-size: 0.7rem; color: var(--text-muted);">${item.time}</span>
        </div>
    `).join('');
}

/**
 * イベントリスナー登録の初期化補助
 */
export function initDashboardInteractions() {
    updateDashboardStats();
    renderActivityList();
}

// アプリケーション起動時の初期データロード紐付け
document.addEventListener('DOMContentLoaded', () => {
    initDashboardInteractions();
});
