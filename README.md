# Nesine Case Study

Iddaa bulletin board and betting slip application. Lists ~3000 matches on a single page with high performance, allowing users to build a betting slip by selecting odds. The UI follows the nesine.com design language and is fully responsive to provide a consistent experience on mobile devices.

**Demo:** https://oguzhandemiroz.github.io/nesine-case-study/

> **[Türkçe README](README.tr.md)**

| Desktop | Mobile | Mobile Slip |
|:---:|:---:|:---:|
| ![Desktop View](src/assets/desktop-view.png) | ![Mobile View](src/assets/mobile-view.png) | ![Mobile Slip](src/assets/mobile-cart-view.png) |

## Setup

Node.js **≥18.12** is required. The project includes an `.nvmrc` file, so if you use nvm:

```bash
nvm use # loads Node 22 from .nvmrc
pnpm install
pnpm start # localhost:3000
pnpm build # Production build → dist/

pnpm format # Prettier
pnpm lint # ESLint
pnpm typecheck # TypeScript check
```

## Project Structure

```
src/
├── app/
│   ├── index.tsx              # Entry point, providers, web-vitals
│   ├── App.tsx                # Root component, data pipeline
│   └── Layout/                # Page shell (header, main, sidebar)
│
├── features/
│   ├── bets/
│   │   ├── components/
│   │   │   ├── BetBoard/      # Virtualized list via react-window
│   │   │   ├── BetRow/        # Single match row
│   │   │   ├── OddCell/       # Clickable odds cell
│   │   │   ├── LeagueHeader/  # League header row
│   │   │   └── SearchBar/     # Search + favorites filter
│   │   ├── store/
│   │   │   ├── betsSlice.ts   # Redux: bulletin data
│   │   │   └── favoritesSlice.ts  # Redux: favorite matches
│   │   ├── utils/             # filter, group, sort, flatList
│   │   ├── config/columns.ts  # Bulletin column definitions
│   │   └── types.ts
│   │
│   └── cart/
│       ├── components/
│       │   ├── CartPanel/     # Betting slip panel
│       │   └── CartItem/      # Single slip entry
│       ├── context/           # Context API: cart state
│       └── utils/             # Stake amount list generator
│
├── components/atoms/          # Button, Input, Badge, Icon, Spinner
├── hooks/                     # useDebounce, useMediaQuery
├── store/                     # Redux store configuration
├── styles/                    # Global SCSS, variables, mixins
└── utils/                     # Intl.NumberFormat formatting
```

## Technical Decisions

### Why both Redux and Context API?

The project has two distinct state domains:

**Bulletin data: Redux Toolkit**

~3000 match records in a read-heavy structure. Data is fetched once and then continuously read (filter, search, group). It is normalized with `createEntityAdapter`, enabling O(1) access via `selectBetById(state, id)`. Favorites also live in Redux because they are tightly coupled with bulletin data and consumed per-row through the `selectIsFavorite` selector.

**Betting slip (Cart): Context API + useReducer**

Cart data is write-heavy and small (max 20-30 selections). Users constantly add and remove odds. There is no need to route these through Redux's middleware chain — `useReducer` is sufficient. Additionally, slip logic (single selection per match, MBS rule) stays isolated within its own context.

Both favorites and cart data are persisted to `localStorage`.

### Data Processing Pipeline

Raw data from the API flows through the following stages:

```
API → Redux Store → filter (favorites/search) → groupByLeague → buildFlatList → react-window
```

Each step is wrapped with `useMemo`. The search input is debounced via `useDebounce(300ms)`, so filtering 3000 records doesn't fire on every keystroke.

`buildFlatList` converts grouped league data into a flat array where each element is either a `league-header` or a `match`. react-window renders this flat list, and `RowRenderer` picks the correct component based on the item type.

### Performance Approach

**Performance Report:** [PERFORMANCE.md](docs/PERFORMANCE.md)

The goal was smooth operation on low-end devices, so minimizing render cost was critical:

**Virtualization:** ~3000 rows are never flushed to the DOM. `react-window` renders only the visible rows (~25 at a time), keeping the DOM node count constant (~700).

**Memoization:** Frequently rendered components like `BetRow`, `OddCell`, `CartPanel`, and `SearchBar` are wrapped with `React.memo`. `useCallback` stabilizes callback references.

**CLS = 0:** Across loading, error, and success states, the toolbar and sidebar always render the same components. Only the main content slot changes, resulting in zero layout shift.

**Bundle optimization (production):**
- `TerserPlugin` for minification and `console.log` stripping
- `CssMinimizerPlugin` for CSS minification
- `splitChunks` for separating react/vendor code (cache efficiency)
- `contenthash` for long-term caching

**Other:**
- Runtime measurement of LCP, INP, CLS via `web-vitals`
- `browserslist` target: `> 0.5%`, `last 2 versions`, `not dead`, `Android >= 5`, `iOS >= 10` — Babel and autoprefixer use this list for polyfills and vendor prefixes
- Early connection to the API origin via `<link rel="preconnect">`

### Betting Slip Logic

Only one odds selection per match is allowed:

- Selecting a new odd → adds it to the slip
- Clicking the same odd again → removes it from the slip
- Selecting a different odd from the same match → replaces the previous selection

MBS (Minimum Bet Count) rule: The "Place Bet" button is disabled when the slip doesn't meet the required minimum.
Maximum potential payout is capped at 12,500,000 TL.

### Responsive Design

Two distinct layouts for desktop and tablet (≤768px):

- **Desktop:** Fixed sidebar with the betting slip panel, bulletin in the main area
- **Tablet/Mobile:** Sidebar is hidden, a "Slip (X)" button appears in the toolbar. Tapping it opens the slip as a fullscreen overlay. BetRow and LeagueHeader switch to a two-row grid layout.

Responsive behavior is managed through a `useMediaQuery` custom hook. Row height is 34px on desktop, 68px on mobile.

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI | React 19 + TypeScript |
| Build | Webpack 5 + Babel 7 |
| State (bulletin) | Redux Toolkit (`createEntityAdapter`) |
| State (cart) | Context API + `useReducer` |
| Virtualization | react-window v2 |
| Styling | SCSS Modules + PostCSS (autoprefixer) |
| Lint/Format | ESLint + Prettier |
| Metrics | web-vitals (LCP, INP, CLS) |
