# Migration Notes

## This Phase

This reorganization is intentionally lightweight.

We are not moving the whole runtime tree yet. We are:

- rewriting the public repository surface;
- formalizing content and extension ownership;
- preserving the existing build and deploy paths;
- creating an index for future refactors.

## Legacy to Current Mapping

- Original repository entry docs -> `docs/legacy/`
- Chinese agent rewrite patch pack -> `content/agent-zh-patch/`
- Right-side observer plugin -> `extensions/agent-observer/`
- Stable game runtime -> current `src/modules`, `src/functions`, `data`

## Future Migration Candidates

- move extension bootstrap config out of `src/index.js`;
- promote content-pack metadata into machine-readable manifest files;
- split product metadata from the inherited site template.
