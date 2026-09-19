/**
 * API Core Module
 * Fetch GET / POST 専用モジュール
 */

export async function apiGet(endpoint) {
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`[API GET Error] Endpoint ${endpoint}:`, error);
        throw error;
    }
}

export async function apiPost(endpoint, bodyData) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });
        if (!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`[API POST Error] Endpoint ${endpoint}:`, error);
        throw error;
    }
}
