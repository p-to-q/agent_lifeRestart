export function shouldEnableAgentObserver(query = {}) {
    if (query.observer === 'off' || query.observer === '0' || query.observer === 'false') {
        return false;
    }
    if (query.observer === 'on' || query.observer === '1' || query.observer === 'true') {
        return true;
    }
    return true;
}
