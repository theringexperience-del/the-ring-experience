function withTimeout(promise, timeoutMs = 1600) {
    return new Promise((resolve) => {
        const timeoutId = window.setTimeout(() => resolve(false), timeoutMs);
        promise
            .then(() => {
                window.clearTimeout(timeoutId);
                resolve(true);
            })
            .catch(() => {
                window.clearTimeout(timeoutId);
                resolve(false);
            });
    });
}

export async function saveLeadToSheet(webhookUrl, payload) {
    if (!webhookUrl || typeof webhookUrl !== 'string') return false;
    if (!/^https?:\/\//i.test(webhookUrl)) return false;

    const body = {
        ...payload,
        submittedAt: new Date().toISOString()
    };

    const request = fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true
    });

    return withTimeout(request, 1600);
}
