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

export async function submitLead(payload) {
    const body = {
        ...payload,
        submittedAt: new Date().toISOString()
    };

    const request = fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true
    });

    return withTimeout(
        request.then((response) => {
            if (!response.ok) throw new Error('Lead API failed');
        }),
        15000
    );
}
