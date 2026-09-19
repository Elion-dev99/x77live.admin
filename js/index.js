import { setupNavigation } from './core/navigation.js';
import { setupEvents } from './core/events.js';
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
});

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  fetchDashboardData();
  setupGlobalEvents();
});

async function fetchDashboardData() {
  try {
    const response = await fetch('/api/status');
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    renderDashboard(data);
  } catch (error) {
    renderDashboard(getDummyData());
  }
}

function renderDashboard(items) {
  const activeCount = items.filter(item => item.isOnline).length;
  const activeEl = document.getElementById('stat-active');
  if (activeEl) activeEl.textContent = activeCount;

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

  lucide.createIcons();
}

function setupGlobalEvents() {
  document.addEventListener('click', (e) => {
    // 1. 下部ナビゲーションの切り替え（画面切り替え連動）
    const navBtn = e.target.closest('.nav-btn');
    if (navBtn) {
      const targetViewId = navBtn.getAttribute('data-target');
      
      // ナビゲーションのハイライト切り替え
      document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
      navBtn.classList.add('active');

      // 該当する画面（View）の表示切り替え
      document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
      const targetView = document.getElementById(targetViewId);
      if (targetView) {
        targetView.classList.add('active');
      }
      return;
    }

    // 2. See More ボタン
    const seeMoreBtn = e.target.closest('.see-more-btn');
    if (seeMoreBtn) {
      const card = seeMoreBtn.closest('.stat-card');
      const label = card ? card.querySelector('.card-label').textContent : '';
      alert(`詳細表示: ${label}`);
      return;
    }

    // 3. Quick Actions チップ
    const actionChip = e.target.closest('.action-chip');
    if (actionChip) {
      alert(`アクション実行: ${actionChip.textContent.trim()}`);
      return;
    }

    // 4. View All リンク
    const viewAllLink = e.target.closest('.view-all');
    if (viewAllLink) {
      e.preventDefault();
      alert('全件一覧表示');
      return;
    }
  });
}

function getDummyData() {
  return [
    { name: 'Support Agent started', isOnline: true },
    { name: 'Email workflow completed', isOnline: false },
    { name: 'Data analysis finished', isOnline: true }
  ];
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, match => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[match]));
}
