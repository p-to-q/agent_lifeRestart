const ENDPOINT = '/api/agent-plugin';

export async function requestAgentAi({ mode, payload }) {
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ mode, payload }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.error || `AI request failed: ${response.status}`);
    }
    return data;
}
