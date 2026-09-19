/**
 * Settings View Module
 * アカウント管理機能・システム設定画面描画専用モジュール
 */
import { refreshIcons } from '../core/events.js';

export async function renderSettings() {
    const container = document.getElementById('settings-content');
    if (!container) return;

    container.innerHTML = `
        <!-- Account Profile Card -->
        <section class="section-container">
            <div class="account-profile-card">
                <div class="profile-header">
                    <div class="avatar-wrapper">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" class="profile-avatar">
                        <button class="avatar-edit-btn" data-action="edit-avatar" aria-label="Edit Avatar">
                            <i data-lucide="camera"></i>
                        </button>
                    </div>
                    <div class="profile-details">
                        <div class="profile-name-row">
                            <h3 class="profile-name">Max John Doe</h3>
                            <span class="role-badge">Executive</span>
                        </div>
                        <p class="profile-email">max.doe@x77executive.com</p>
                        <p class="profile-id">ID: X77-88902-ADMIN</p>
                    </div>
                </div>
                <button class="secondary-btn" data-action="edit-profile">
                    <i data-lucide="user-cog"></i> プロフィール編集
                </button>
            </div>
        </section>

        <!-- Account Security & Credentials Section -->
        <section class="section-container">
            <div class="section-header">
                <h3>アカウントセキュリティ</h3>
            </div>
            <div class="settings-list">
                <!-- Change Password -->
                <div class="settings-item" data-action="change-password">
                    <div class="settings-item-icon">
                        <i data-lucide="key-round"></i>
                    </div>
                    <div class="settings-item-content">
                        <div class="settings-item-title">パスワード変更</div>
                        <div class="settings-item-subtitle">最終更新: 30日前</div>
                    </div>
                    <i data-lucide="chevron-right" class="arrow-icon"></i>
                </div>

                <!-- Two-Factor Authentication -->
                <div class="settings-item">
                    <div class="settings-item-icon">
                        <i data-lucide="shield-check"></i>
                    </div>
                    <div class="settings-item-content">
                        <div class="settings-item-title">2段階認証 (2FA)</div>
                        <div class="settings-item-subtitle">認証アプリによる保護が有効です</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" checked id="toggle-2fa" data-action="toggle-2fa">
                        <span class="toggle-slider"></span>
                    </label>
                </div>

                <!-- Active Sessions -->
                <div class="settings-item" data-action="view-sessions">
                    <div class="settings-item-icon">
                        <i data-lucide="smartphone"></i>
                    </div>
                    <div class="settings-item-content">
                        <div class="settings-item-title">ログイン中のデバイス</div>
                        <div class="settings-item-subtitle">2台のデバイスでアクティブ</div>
                    </div>
                    <i data-lucide="chevron-right" class="arrow-icon"></i>
                </div>
            </div>
        </section>

        <!-- Application & Preferences Section -->
        <section class="section-container">
            <div class="section-header">
                <h3>システム通知設定</h3>
            </div>
            <div class="settings-list">
                <!-- Push Notifications -->
                <div class="settings-item">
                    <div class="settings-item-icon">
                        <i data-lucide="bell"></i>
                    </div>
                    <div class="settings-item-content">
                        <div class="settings-item-title">プッシュ通知</div>
                        <div class="settings-item-subtitle">重要アラートおよびワークフロー完了通知</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" checked id="toggle-push" data-action="toggle-push">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            </div>
        </section>

        <!-- Session Logout Section -->
        <section class="section-container">
            <button class="logout-btn" data-action="logout">
                <i data-lucide="log-out"></i> アカウントからログアウト
            </button>
        </section>
    `;

    // アイコン再描画実行
    refreshIcons();
}
