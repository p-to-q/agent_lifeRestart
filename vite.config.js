import { defineConfig, loadEnv } from 'vite';
import { handleAgentPluginRequest } from './server/agent-plugin-handler.js';

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
    Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

    return {
        base: './',
        plugins: [{
            name: 'agent-ai-plugin-api',
            configureServer(server) {
                server.middlewares.use(async (req, res, next) => {
                    if (!req.url?.startsWith('/api/agent-plugin')) {
                        next();
                        return;
                    }
                    let body = '';
                    for await (const chunk of req) body += chunk;
                    req.body = body;
                    await handleAgentPluginRequest(req, res);
                });
            },
        }],
        build: {
            outDir: 'template/public',
        },
    };
});
