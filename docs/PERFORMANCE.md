# Performance Report

- **Test Device:** MacBook Pro 14", Apple M4, 16GB RAM, 512GB SSD
- **Browser:** Google Chrome (DevTools Performance panel + Lighthouse)
- **URL:** https://oguzhandemiroz.github.io/nesine-case-study/

> **[Türkçe](PERFORMANCE.tr.md)**

---

## Lighthouse Scores (Production — GitHub Pages)

| Category | Desktop | Mobile (throttled) |
|----------|:---:|:---:|
| **Performance** | 100 | 94 |
| **Accessibility** | 89 | 89 |
| **Best Practices** | 100 | 96 |
| **SEO** | 90 | 90 |

### Lighthouse Metrics (Production)

| Metric | Desktop | Rating | Mobile (throttled) | Rating |
|--------|:---:|:---:|:---:|:---:|
| **FCP** | 0.0s | **Good** | 0.8s | **Good** |
| **LCP** | 0.1s | **Good** | 3.1s | **Needs Improvement** |
| **TBT** | 0ms | **Good** | 20ms | **Good** |
| **CLS** | 0 | **Good** | 0 | **Good** |
| **Speed Index** | 0.5s | **Good** | 1.7s | **Good** |
| **TTI** | 0.1s | **Good** | 3.1s | **Good** |

> Mobile Lighthouse applies 4x CPU + slow 4G throttling.
---

## Production Build — DevTools Performance Trace (GitHub Pages)

Lab values measured via Chrome DevTools trace. Unlike Lighthouse, these use real network conditions.

### Desktop — No Throttling

| Metric | Value | Rating |
|--------|:---:|:---:|
| **LCP** | 71ms | **Good** |
| **CLS** | 0 | **Good** |
| **TTFB** | 2ms | **Good** |
| **Critical Path** | 16ms | **Good** |

### Mobile — 4x CPU + Fast 4G

| Metric | Value | Rating |
|--------|:---:|:---:|
| **LCP** | 330ms | **Good** |
| **CLS** | 0 | **Good** |
| **TTFB** | 1ms | **Good** |

### Mobile — 6x CPU + Fast 4G

| Metric | Value | Rating |
|--------|:---:|:---:|
| **LCP** | 731ms | **Good** |
| **CLS** | 0 | **Good** |

---

## Production Build — DevTools Performance Trace (localhost)

Values measured on localhost via `pnpm build && npx serve dist`.

### Desktop — No Throttling

| Metric | Value | Rating |
|--------|:---:|:---:|
| **LCP** | 159ms | **Good** |
| **CLS** | 0 | **Good** |

### Mobile — 4x CPU + Fast 4G

| Metric | Value | Rating |
|--------|:---:|:---:|
| **LCP** | 639ms | **Good** |
| **CLS** | 0 | **Good** |

### Mobile — 6x CPU + Fast 4G

| Metric | Value | Rating |
|--------|:---:|:---:|
| **LCP** | 731ms | **Good** |
| **CLS** | 0 | **Good** |

---

## Development Build — Desktop Core Web Vitals

### No Throttling

| Metric | Slip Empty | Slip Filled | Rating |
|--------|:---------:|:----------:|:------:|
| **LCP** | 0.20s – 0.30s | 0.76s – 0.90s | **Good** |
| **CLS** | 0 | 0 | **Good** |
| **INP** | 80ms – 140ms | 80ms – 140ms | **Good** |

### 4x CPU Slowdown

| Metric | Slip Empty | Slip Filled | Rating |
|--------|:---------:|:----------:|:------:|
| **LCP** | 0.40s – 0.76s | 0.92s – 1.44s | **Good** |
| **CLS** | 0 | 0 | **Good** |
| **INP** | 154ms – 216ms | 154ms – 216ms | **Good** / Needs Improvement |

### 6x CPU Slowdown

| Metric | Slip Empty | Slip Filled | Rating |
|--------|:---------:|:----------:|:------:|
| **LCP** | 0.96s – 1.21s | 1.98s – 2.21s | **Good** |
| **CLS** | 0 | 0 | **Good** |
| **INP** | 243ms – 304ms | 243ms – 304ms | **Needs Improvement** |

### 20x CPU Slowdown

| Metric | Slip Empty | Slip Filled | Rating |
|--------|:---------:|:----------:|:------:|
| **LCP** | 3.48s – 4.80s | 6.93s – 8.21s | **Poor** |
| **CLS** | 0 | 0 | **Good** |
| **INP** | 920ms – 2872ms | 920ms – 2872ms | **Poor** |

---

## Development Build — Mobile (Chrome Device Emulation) Core Web Vitals

### No Throttling

| Metric | Value | Rating |
|--------|:-----:|:------:|
| **LCP** | 0.48s – 0.83s | **Good** |
| **CLS** | 0 | **Good** |
| **INP** | 40ms – 64ms | **Good** |

### 4x CPU Slowdown

| Metric | Value | Rating |
|--------|:-----:|:------:|
| **LCP** | 1.18s – 1.32s | **Good** |
| **CLS** | 0 | **Good** |
| **INP** | 56ms – 96ms | **Good** |

### 6x CPU Slowdown

| Metric | Value | Rating |
|--------|:-----:|:------:|
| **LCP** | 2.05s – 2.15s | **Good** |
| **CLS** | 0 | **Good** |
| **INP** | 40ms – 96ms | **Good** |

### 20x CPU Slowdown

| Metric | Value | Rating |
|--------|:-----:|:------:|
| **LCP** | 6.53s – 7.02s | **Poor** |
| **CLS** | 0 | **Good** |
| **INP** | 272ms – 408ms | **Needs Improvement** |

---

## Summary

**CLS is 0 across all scenarios.** The toolbar and sidebar render the same components in every state (loading/error/success), preventing any layout shift.

**LCP** increases when the slip has items because the selected bets are added to the DOM inside `CartPanel`, shifting the LCP element to the last large text node in the sidebar. When the slip is empty, the LCP element is a match name in the bulletin rows, which paints much faster.

**INP** stays in the Good range up to 6x throttle. The 20x throttle scenario is unrealistic but included to show the application's breaking point.

**Bundle size (275KB)** is within the performance budget. `splitChunks` caches react-vendor separately, so when application code is updated users only re-download `main.js`.
