/**
 * Settings View Module
 */
import { refreshIcons } from '../core/events.js';

export async function renderSettings() {
    const container = document.getElementById('settings-content');
    if (!container) return;

    container.innerHTML = `
        <div style="background: var(--card-bg); padding: 20px; border-radius: 16px; border: 1px solid var(--card-border);">
            <p style="color: var(--text-muted);">Configuration options...</p>
        </div>
    `;

    refreshIcons();
}
