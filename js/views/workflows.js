/**
 * Workflows View Module
 */
import { refreshIcons } from '../core/events.js';

export async function renderWorkflows() {
    const container = document.getElementById('workflows-content');
    if (!container) return;

    container.innerHTML = `
        <div style="background: var(--card-bg); padding: 20px; border-radius: 16px; border: 1px solid var(--card-border);">
            <p style="color: var(--text-muted);">Workflow pipeline items...</p>
        </div>
    `;

    refreshIcons();
}
