/**
 * Application Entry & Main Initialization
 * モジュールの統制と初期化専用
 */
import { initNavigation } from './core/navigation.js';
import { initGlobalEvents, refreshIcons } from './core/events.js';
import { renderDashboard } from './views/dashboard.js';
import { renderAgents } from './views/agents.js';
import { renderWorkflows } from './views/workflows.js';
import { renderActivity } from './views/activity.js';
import { renderSettings } from './views/settings.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. ナビゲーション初期化
    initNavigation();

    // 2. グローバルイベントリスナー登録
    initGlobalEvents();

    // 3. 各 View の初期レンダリング実行
    await renderDashboard();
    await renderAgents();
    await renderWorkflows();
    await renderActivity();
    await renderSettings();

    // 4. 初回 Lucide アイコンレンダリング
    refreshIcons();

    // 5. Service Worker (PWA) 登録
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .catch((err) => console.error('[PWA SW Register Error]:', err));
    }
});
