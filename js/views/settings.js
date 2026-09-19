/**
 * Settings View Module
 * 幹部向けアカウント管理・権限階層対応設定画面描画モジュール
 */
import { refreshIcons } from '../core/events.js';

export async function renderSettings() {
    const container = document.getElementById('settings-content');
    if (!container) return;

    container.innerHTML = `
        <!-- 1. Profile & Role Level Card -->
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
                            <span class="role-badge role-executive">👔 幹部</span>
                        </div>
                        <p class="profile-email">max.doe@x77executive.com</p>
                        <p class="profile-id">ID: X77-88902-EXEC</p>
                    </div>
                </div>

                <!-- Permission Hierarchy Display -->
                <div class="permission-tier-card">
                    <div class="permission-tier-header">
                        <span class="tier-title"><i data-lucide="shield-alert"></i> アクセス権限階層</span>
                        <span class="current-tier-tag">Level 1: 幹部</span>
                    </div>
                    <div class="permission-steps">
                        <div class="perm-step active">
                            <div class="step-dot"></div>
                            <div class="step-info">
                                <span class="step-name">幹部 (Executive)</span>
                                <span class="step-desc">要約レポート閲覧・意思決定・データ操作</span>
                            </div>
                        </div>
                        <div class="perm-step">
                            <div class="step-dot"></div>
                            <div class="step-info">
                                <span class="step-name">管理者 (Admin)</span>
                                <span class="step-desc">ユーザーアカウント管理・監査ログ操作</span>
                            </div>
                        </div>
                        <div class="perm-step">
                            <div class="step-dot"></div>
                            <div class="step-info">
                                <span class="step-name">開発者 (Developer)</span>
                                <span class="step-desc">システム全域・API連携・デバッグ全権限</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="profile-actions-grid">
                    <button class="secondary-btn" data-action="edit-profile">
                        <i data-lucide="user-cog"></i> プロフィール編集
                    </button>
                    <button class="secondary-btn" data-action="request-role-upgrade">
                        <i data-lucide="arrow-up-right"></i> 権限変更リクエスト
                    </button>
                </div>
            </div>
        </section>

        <!-- 2. Security & Passkey -->
        <section class="section-container">
            <div class="section-header">
                <h3>セキュリティ＆認証</h3>
            </div>
            <div class="settings-list">
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

                <div class="settings-item">
                    <div class="settings-item-icon">
                        <i data-lucide="fingerprint"></i>
                    </div>
                    <div class="settings-item-content">
                        <div class="settings-item-title">幹部用 Passkey ログイン</div>
                        <div class="settings-item-subtitle">生体認証による高速アクセス</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" checked id="toggle-passkey" data-action="toggle-passkey">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            </div>
        </section>

        <!-- 3. API Key & Developer Access -->
        <section class="section-container">
            <div class="section-header">
                <h3>開発者 / 外部連携 API</h3>
            </div>
            <div class="card-box">
                <div class="api-key-header">
                    <span class="api-key-label">Executive Access Token (開発者権限必須項目)</span>
                    <button class="text-btn" data-action="regenerate-api-key">再発行</button>
                </div>
                <div class="api-key-input-wrapper">
                    <input type="password" readonly value="x77_exec_9982340192837410293847" id="api-key-field" class="api-key-input">
                    <button class="icon-btn-inline" data-action="toggle-api-key-visibility" aria-label="Toggle Key Visibility">
                        <i data-lucide="eye" id="api-key-eye-icon"></i>
                    </button>
                    <button class="icon-btn-inline" data-action="copy-api-key" aria-label="Copy API Key">
                        <i data-lucide="copy"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- 4. Danger Zone Section -->
        <section class="section-container">
            <div class="danger-zone-box">
                <button class="logout-btn" data-action="logout">
                    <i data-lucide="log-out"></i> アカウントからログアウト
                </button>
            </div>
        </section>
    `;

    refreshIcons();
}
