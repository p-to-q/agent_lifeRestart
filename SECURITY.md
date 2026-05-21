# Security

This is a lightweight browser game and content repository.

## Reporting

Please report security-sensitive issues privately through the maintainers of the `p-to-q/agent_lifeRestart` repository.

If the issue is not security-sensitive, use a normal GitHub issue with enough reproduction detail.

## Current Security Notes

- The game runs client-side in the browser.
- AI model calls are proxied through a server-side handler (`server/agent-plugin-handler.js`). API keys are read from environment variables and never sent to the browser.
- The `.env` file is excluded from version control via `.gitignore`. Use `.env.example` as a template.
- The observer extension is optional and does not send telemetry.
- Content-pack changes should be reviewed before becoming runtime data.
