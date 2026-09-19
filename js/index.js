/******************************************************
 * x77 Executive Dashboard - index.js
 * ----------------------------------------------------
 * このファイルは「初期化専用」。
 * 画面遷移・イベント処理・API呼び出し・画面描画などの
 * ロジックは core/ と views/ に分離して管理する。
 ******************************************************/

/* ----------------------------------------------------
 * 1. 必要なモジュールを読み込む
 * ----------------------------------------------------
 * navigation.js → SPAの画面切り替え
 * events.js     → data-action のボタン押下イベント
 ---------------------------------------------------- */
import { setupNavigation } from './core/navigation.js';
import { setupEvents } from './core/events.js';


/* ----------------------------------------------------
 * 2. ページ読み込み完了時の初期化処理
 * ----------------------------------------------------
 * ※ index.js は「初期化だけ」に徹する
 ---------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

  // 画面切り替え（navbar の nav-btn を監視）
  setupNavigation();

  // data-action のボタン押下イベント
  setupEvents();

  // Lucide アイコンを描画
  lucide.createIcons();

  // ダッシュボードのデータ取得
  fetchDashboardData();

  // グローバルイベント（See More / Quick Actions / View All）
  setupGlobalEvents();
});


/* ----------------------------------------------------
 * 3. ダッシュボードデータ取得（API）
 * ----------------------------------------------------
 * /api/status を叩き、失敗したらダミーデータを使う
 ---------------------------------------------------- */
async function fetchDashboardData() {
  try {
    const response = await fetch('/api/status');
    if (!response.ok) throw new Error('API Error');

    const data = await response.json();
    renderDashboard(data);

  } catch (error) {
    // API失敗時はダミーデータで描画
    renderDashboard(getDummyData());
  }
}


/* ----------------------------------------------------
 * 4. ダッシュボード描画処理
 * ----------------------------------------------------
 * Active Agents / Recent Activity を更新する
 ---------------------------------------------------- */
function renderDashboard(items) {

  /* Active Agents 数を更新 */
  const activeCount = items.filter(item => item.isOnline).length;
  const activeEl = document.getElementById('stat-active');
  if (activeEl) activeEl.textContent = activeCount;

  /* Recent Activity のリスト描画 */
  const listContainer = document.getElementById('activity-list');
  if (listContainer) {
    listContainer.innerHTML = items.map(item => `
      <div class="activity-card">
        <div class="activity-left">
          <div class="activity-icon-box">
            <i data-lucide="${item.isOnline ? 'headphones' : 'moon'}" size="18"></i>
          </div>
          <div>
            <div class="activity-title">${escapeHtml(item.name)}</div>
            <div class="activity-time">${item.isOnline ? 'Active now' : 'Offline'}</div>
          </div>
        </div>
        <button class="icon-btn-sub menu-btn" aria-label="Menu">
          <i data-lucide="more-vertical" size="16"></i>
        </button>
      </div>
    `).join('');
  }

  // Lucide アイコン再描画
  lucide.createIcons();
}


/* ----------------------------------------------------
 * 5. グローバルイベント（クリック系）
 * ----------------------------------------------------
 * navbar の nav-btn / See More / Quick Actions / View All
 * などをまとめて処理する
 ---------------------------------------------------- */
function setupGlobalEvents() {
  document.addEventListener('click', (e) => {

    /* ------------------------------
     * ① 下部ナビゲーション（画面切り替え）
     * ------------------------------ */
    const navBtn = e.target.closest('.nav-btn');
    if (navBtn) {
      const targetViewId = navBtn.getAttribute('data-target');

      // ナビゲーションの active 切り替え
      document.querySelectorAll('.nav-btn')
        .forEach(btn => btn.classList.remove('active'));
      navBtn.classList.add('active');

      // View の active 切り替え
      document.querySelectorAll('.view')
        .forEach(view => view.classList.remove('active'));

      const targetView = document.getElementById(targetViewId);
      if (targetView) targetView.classList.add('active');

      return; // 他のイベントと競合させない
    }


    /* ------------------------------
     * ② See More ボタン
     * ------------------------------ */
    const seeMoreBtn = e.target.closest('.see-more-btn');
    if (seeMoreBtn) {
      const card = seeMoreBtn.closest('.stat-card');
      const label = card ? card.querySelector('.card-label').textContent : '';
      alert(`詳細表示: ${label}`);
      return;
    }


    /* ------------------------------
     * ③ Quick Actions チップ
     * ------------------------------ */
    const actionChip = e.target.closest('.action-chip');
    if (actionChip) {
      alert(`アクション実行: ${actionChip.textContent.trim()}`);
      return;
    }


    /* ------------------------------
     * ④ View All リンク
     * ------------------------------ */
    const viewAllLink = e.target.closest('.view-all');
    if (viewAllLink) {
      e.preventDefault();
      alert('全件一覧表示');
      return;
    }
  });
}


/* ----------------------------------------------------
 * 6. ダミーデータ（API失敗時用）
 ---------------------------------------------------- */
function getDummyData() {
  return [
    { name: 'Support Agent started', isOnline: true },
    { name: 'Email workflow completed', isOnline: false },
    { name: 'Data analysis finished', isOnline: true }
  ];
}


/* ----------------------------------------------------
 * 7. HTMLエスケープ（XSS対策）
 ---------------------------------------------------- */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, match => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[match]));
}
