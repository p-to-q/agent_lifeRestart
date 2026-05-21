export function shouldEnableAgentAiPlugin(query = {}) {
    if (query.ai === 'off' || query.ai === '0' || query.ai === 'false') {
        return false;
    }
    return true;
}
