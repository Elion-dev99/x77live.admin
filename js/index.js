document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  fetchDashboardData();
});

async function fetchDashboardData() {
  try {
    const response = await fetch('/api/status');
    if (!response.ok) throw new Error('API fetch failed');
    const data = await response.json();
    renderDashboard(data);
  } catch (error) {
    console.warn('API未接続のため、ダミーデータを表示します:', error);
    renderDashboard(getDummyData());
  }
}

function renderDashboard(items) {
  const activeCount = items.filter(item => item.isOnline).length;
  document.getElementById('stat-active').textContent = activeCount;
  
  const listContainer = document.getElementById('activity-list');
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
      <i data-lucide="more-vertical" size="16" style="color: var(--text-sub); cursor: pointer;"></i>
    </div>
  `).join('');

  lucide.createIcons();
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
