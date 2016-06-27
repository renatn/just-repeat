onmessage = (e) => {
    console.log('[WORKER] Receive:', e.data);    
};

console.info('[WORKER] Installed');
