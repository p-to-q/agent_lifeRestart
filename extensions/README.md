# Extensions

Extensions are sidecar features that attach to the runtime without owning the base game loop.

Current policy:

- extensions should be optional;
- extensions should install through explicit bootstrap code;
- extensions should degrade gracefully;
- product UX should not depend on hidden extension-only behavior.
