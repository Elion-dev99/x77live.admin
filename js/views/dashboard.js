/**
 * Dashboard View Module
 * 2枚目画像のUI構造およびデータを完全復元・描画
 */
import { refreshIcons } from '../core/events.js';

export async function renderDashboard() {
    const container = document.getElementById('dashboard-content');
    if (!container) return;

    // 2枚目画像のUIレイアウトを完全に構築
    container.innerHTML = `
        <!-- Metrics Grid (2x2) -->
        <div class="metrics-grid">
            <!-- Active Agents -->
            <div class="metric-card">
                <div class="card-icon-wrapper">
                    <i data-lucide="users"></i>
                </div>
                <span class="card-label">Active Agents</span>
                <div class="card-value">2</div>
                <button class="see-more-btn" data-action="see-more">
                    See More <i data-lucide="arrow-right"></i>
                </button>
            </div>

            <!-- Running Workflows -->
            <div class="metric-card">
                <div class="card-icon-wrapper">
                    <i data-lucide="git-fork"></i>
                </div>
                <span class="card-label">Running Workflows</span>
                <div class="card-value">8</div>
                <button class="see-more-btn" data-action="see-more">
                    See More <i data-lucide="arrow-right"></i>
                </button>
            </div>

            <!-- Tasks Completed -->
            <div class="metric-card">
                <div class="card-icon-wrapper">
                    <i data-lucide="check-square"></i>
                </div>
                <span class="card-label">Tasks Completed</span>
                <div class="card-value">144</div>
                <button class="see-more-btn" data-action="see-more">
                    See More <i data-lucide="arrow-right"></i>
                </button>
            </div>

            <!-- Success Rate -->
            <div class="metric-card">
                <div class="card-icon-wrapper">
                    <i data-lucide="trending-up"></i>
                </div>
                <span class="card-label">Success Rate</span>
                <div class="card-value">98%</div>
                <button class="see-more-btn" data-action="see-more">
                    See More <i data-lucide="arrow-right"></i>
                </button>
            </div>
        </div>

        <!-- Quick Actions Section -->
        <section class="section-container">
            <div class="section-header">
                <h3>Quick Actions</h3>
                <button class="view-all-btn" data-action="view-all">View all</button>
            </div>
            <div class="quick-actions-group">
                <button class="action-chip" data-action="creative-agent">
                    <i data-lucide="plus"></i> Creative Agent
                </button>
                <button class="action-chip" data-action="view-analytics">
                    <i data-lucide="bar-chart-2"></i> View Analytics
                </button>
            </div>
        </section>

        <!-- Recent Activity Section -->
        <section class="section-container">
            <div class="section-header">
                <h3>Recent Activity</h3>
                <button class="view-all-btn" data-action="view-all">View all</button>
            </div>
            <div class="activity-list">
                <!-- Activity Item 1 -->
                <div class="activity-card">
                    <div class="activity-icon-box">
                        <i data-lucide="headphones"></i>
                    </div>
                    <div class="activity-details">
                        <div class="activity-title">Support Agent started</div>
                        <div class="activity-subtitle">Active now</div>
                    </div>
                    <button class="more-btn" aria-label="More options">
                        <i data-lucide="more-vertical"></i>
                    </button>
                </div>

                <!-- Activity Item 2 -->
                <div class="activity-card">
                    <div class="activity-icon-box">
                        <i data-lucide="moon"></i>
                    </div>
                    <div class="activity-details">
                        <div class="activity-title">Email workflow completed</div>
                        <div class="activity-subtitle">Offline</div>
                    </div>
                    <button class="more-btn" aria-label="More options">
                        <i data-lucide="more-vertical"></i>
                    </button>
                </div>
            </div>
        </section>
    `;

    // 描画直後に必ず Lucide アイコンを創出
    refreshIcons();
}
