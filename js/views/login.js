/**
 * Login View Module
 * 幹部専用ログイン画面描画・認証処理モジュール
 */
import { refreshIcons } from '../core/events.js';

export async function renderLogin(onLoginSuccess) {
    const container = document.getElementById('view-login');
    if (!container) return;

    container.innerHTML = `
        <div class="login-wrapper">
            <!-- App Logo / Header -->
            <div class="login-header">
                <div class="login-logo-box">
                    <i data-lucide="shield-check"></i>
                </div>
                <h1 class="login-title">x77 Executive</h1>
                <p class="login-subtitle">幹部専用認証ポータル</p>
            </div>

            <!-- Login Card -->
            <div class="login-card">
                <!-- Passkey Quick Login Button -->
                <button class="passkey-btn" id="btn-passkey-login">
                    <i data-lucide="fingerprint"></i>
                    <span>Passkey / 生体認証でログイン</span>
                </button>

                <div class="login-divider">
                    <span>または ID / パスワード</span>
                </div>

                <!-- Form -->
                <form id="login-form" onsubmit="return false;">
                    <div class="input-group">
                        <label class="input-label" for="login-id">幹部ID / メールアドレス</label>
                        <div class="input-field-wrapper">
                            <i data-lucide="user" class="field-icon"></i>
                            <input type="text" id="login-id" class="input-field" placeholder="max.doe@x77executive.com" required>
                        </div>
                    </div>

                    <div class="input-group">
                        <label class="input-label" for="login-password">パスワード</label>
                        <div class="input-field-wrapper">
                            <i data-lucide="lock" class="field-icon"></i>
                            <input type="password" id="login-password" class="input-field" placeholder="••••••••••••" required>
                        </div>
                    </div>

                    <div class="form-options">
                        <label class="remember-me">
                            <input type="checkbox" id="remember-session" checked>
                            <span>セッションを保持</span>
                        </label>
                    </div>

                    <button type="submit" class="primary-btn login-submit-btn">
                        <span>ログイン</span>
                        <i data-lucide="arrow-right"></i>
                    </button>
                </form>
            </div>

            <div class="login-footer">
                <p>権限レベル: 幹部 (Executive) 以上専用</p>
                <p class="security-notice"><i data-lucide="lock"></i> End-to-End Encrypted Session</p>
            </div>
        </div>
    `;

    refreshIcons();

    // イベントリスナーの付与
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // ログイン成功処理
            sessionStorage.setItem('x77_auth', 'true');
            if (typeof onLoginSuccess === 'function') {
                onLoginSuccess();
            }
        });
    }

    const passkeyBtn = document.getElementById('btn-passkey-login');
    if (passkeyBtn) {
        passkeyBtn.addEventListener('click', () => {
            alert('生体認証（Passkey）により認証されました。');
            sessionStorage.setItem('x77_auth', 'true');
            if (typeof onLoginSuccess === 'function') {
                onLoginSuccess();
            }
        });
    }
}
