import { handleAgentPluginRequest } from '../server/agent-plugin-handler.js';

export default async function handler(req, res) {
    await handleAgentPluginRequest(req, res);
}
