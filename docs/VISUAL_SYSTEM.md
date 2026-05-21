# Visual System

This visual system keeps the sidecar UI close to the Cyber theme already used by the game.

It is not a generic dashboard skin. It should feel like a small console clipped onto the same arcade machine as the main `Agent 重开模拟器` screen.

## Palette

Sampled from `design/cyber/pages/*` and `public/images/*`.

- `void`: `#001020`  
  Main background.
- `deep-panel`: `#082030`  
  Secondary surface.
- `panel`: `#103040`  
  Active panel surface.
- `panel-hi`: `#305860`  
  Card and frame highlight.
- `cyan-line`: `#40a0c8`  
  Thin neon border.
- `cyan-core`: `#30d0d0`  
  Active button and glow.
- `cyan-soft`: `#109090`  
  Low-intensity grid and hover.
- `purple-accent`: `#7b5cff`  
  Route and rare-state accent.
- `gold-warn`: `#ffc16b`  
  Risk and budget warning.
- `text-main`: `#f4ffff`
- `text-muted`: `#8aa4b0`

## Objects

### Pixel Text

Use compact, strong text. Prefer short labels.

- Titles: white with soft cyan glow.
- Section labels: muted cyan-gray, uppercase feeling without forced uppercase.
- Numbers: bright, tabular, slightly larger.

### Neon Line

Small dividers and section marks should use `cyan-core` or `cyan-line`, with soft glow.

Good for:

- section heading ticks;
- tab active state;
- timeline age markers;
- route highlight.

### Cut-Corner Panel

Most surfaces should look like framed game UI, not rounded web cards.

Rules:

- radius 0-4px;
- thin cyan-gray border;
- dark blue fill;
- optional top/bottom glow;
- use clipped or angled corners on important buttons/cards.

### Arcade Button

Buttons should feel like `button_main@3x.png`:

- dark inner fill;
- cyan outline;
- active state filled cyan;
- strong label;
- small bottom shadow or inner line.

### Stat Tile

Use for compact values such as age, stage, status.

- dark panel fill;
- cyan-gray border;
- centered label/value pair;
- value should be the visual anchor.

### Signal Bar

Use for parameters, risk, and route tendency.

- low, compact track;
- glowing fill;
- different accent per semantic type:
  - parameter: cyan;
  - risk: gold/orange;
  - route: purple.

### Candidate Card

Use for saved co-creation material.

- dark panel body;
- left/top edge cyan line;
- route title as main text;
- metadata muted;
- latest event as readable body.

### Timeline Item

Use for yearly events.

- age marker on the left;
- event text on the right;
- optional tags below.

## Scale

Small:

- tags;
- section ticks;
- action buttons;
- risk labels.

Medium:

- stat tiles;
- candidate cards;
- timeline rows;
- share-line box.

Large:

- observer shell;
- tab navigation;
- writing/co-creation workbench.

## What To Avoid

- Rounded SaaS cards.
- Beige or office-dashboard palettes.
- Large marketing gradients.
- Generic admin tables.
- Too many colors at once.
- Long explanatory copy inside the game UI.
