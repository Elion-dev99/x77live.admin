/**
 * Activity View Module
 */
import { refreshIcons } from '../core/events.js';

export async function renderActivity() {
    const container = document.getElementById('activity-content');
    if (!container) return;

    container.innerHTML = `
        <div style="background: var(--card-bg); padding: 20px; border-radius: 16px; border: 1px solid var(--card-border);">
            <p style="color: var(--text-muted);">Full system log history...</p>
        </div>
    `;

    refreshIcons();
}
