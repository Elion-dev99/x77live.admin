/**
 * Application Entry Point & Controller Module
 * (ログイン実装前の初期バージョン)
 */
import { renderSettings } from './views/settings.js';
import { initGlobalEvents, refreshIcons } from './core/events.js';

const viewRenderers = {
    'view-settings': renderSettings
};

document.addEventListener('DOMContentLoaded', () => {
    initGlobalEvents();
    initNavigation();
    showView('view-home');
    initDashboardInteractions();
    refreshIcons();
});

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
            });

            btn.classList.add('active');
            showView(targetViewId);

            if (typeof viewRenderers[targetViewId] === 'function') {
                await viewRenderers[targetViewId]();
            }

            refreshIcons();
        };
    });
}

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
