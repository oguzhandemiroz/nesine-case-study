# Performans Raporu

- **Test Cihazı:** MacBook Pro 14", Apple M4, 16GB RAM, 512GB SSD
- **Tarayıcı:** Google Chrome (DevTools Performance panel + Lighthouse)
- **URL:** https://oguzhandemiroz.github.io/nesine-case-study/

---

## Lighthouse Skorları (Production — GitHub Pages)

| Kategori | Desktop | Mobile (throttled) |
|----------|:---:|:---:|
| **Performance** | 100 | 94 |
| **Accessibility** | 89 | 89 |
| **Best Practices** | 100 | 96 |
| **SEO** | 90 | 90 |

### Lighthouse Metrikleri (Production)

| Metrik | Desktop | Rating | Mobile (throttled) | Rating |
|--------|:---:|:---:|:---:|:---:|
| **FCP** | 0.0s | **Good** | 0.8s | **Good** |
| **LCP** | 0.1s | **Good** | 3.1s | **Needs Improvement** |
| **TBT** | 0ms | **Good** | 20ms | **Good** |
| **CLS** | 0 | **Good** | 0 | **Good** |
| **Speed Index** | 0.5s | **Good** | 1.7s | **Good** |
| **TTI** | 0.1s | **Good** | 3.1s | **Good** |

> Mobile Lighthouse, 4x CPU + slow 4G.
---

## Production Build — DevTools Performance Trace (GitHub Pages)

Chrome DevTools trace ile ölçülmüş lab değerleri. Lighthouse'dan farklı olarak gerçek network koşullarını kullanır.

### Desktop — No Throttling

| Metrik | Değer | Rating |
|--------|:---:|:---:|
| **LCP** | 71ms | **Good** |
| **CLS** | 0 | **Good** |
| **TTFB** | 2ms | **Good** |
| **Critical Path** | 16ms | **Good** |

### Mobile — 4x CPU + Fast 4G

| Metrik | Değer | Rating |
|--------|:---:|:---:|
| **LCP** | 330ms | **Good** |
| **CLS** | 0 | **Good** |
| **TTFB** | 1ms | **Good** |

### Mobile — 6x CPU + Fast 4G

| Metrik | Değer | Rating |
|--------|:---:|:---:|
| **LCP** | 731ms | **Good** |
| **CLS** | 0 | **Good** |

---

## Production Build — DevTools Performance Trace (localhost)

`pnpm build && npx serve dist` ile localhost üzerinden ölçülmüş değerler.

### Desktop — No Throttling

| Metrik | Değer | Rating |
|--------|:---:|:---:|
| **LCP** | 159ms | **Good** |
| **CLS** | 0 | **Good** |

### Mobile — 4x CPU + Fast 4G

| Metrik | Değer | Rating |
|--------|:---:|:---:|
| **LCP** | 639ms | **Good** |
| **CLS** | 0 | **Good** |

### Mobile — 6x CPU + Fast 4G

| Metrik | Değer | Rating |
|--------|:---:|:---:|
| **LCP** | 731ms | **Good** |
| **CLS** | 0 | **Good** |

---

## Development Build — Desktop Core Web Vitals

### No Throttling

| Metrik | Kupon Boş | Kupon Dolu | Rating |
|--------|:---------:|:----------:|:------:|
| **LCP** | 0.20s – 0.30s | 0.76s – 0.90s | **Good** |
| **CLS** | 0 | 0 | **Good** |
| **INP** | 80ms – 140ms | 80ms – 140ms | **Good** |

### 4x CPU Slowdown

| Metrik | Kupon Boş | Kupon Dolu | Rating |
|--------|:---------:|:----------:|:------:|
| **LCP** | 0.40s – 0.76s | 0.92s – 1.44s | **Good** |
| **CLS** | 0 | 0 | **Good** |
| **INP** | 154ms – 216ms | 154ms – 216ms | **Good** / Needs Improvement |

### 6x CPU Slowdown

| Metrik | Kupon Boş | Kupon Dolu | Rating |
|--------|:---------:|:----------:|:------:|
| **LCP** | 0.96s – 1.21s | 1.98s – 2.21s | **Good** |
| **CLS** | 0 | 0 | **Good** |
| **INP** | 243ms – 304ms | 243ms – 304ms | **Needs Improvement** |

### 20x CPU Slowdown

| Metrik | Kupon Boş | Kupon Dolu | Rating |
|--------|:---------:|:----------:|:------:|
| **LCP** | 3.48s – 4.80s | 6.93s – 8.21s | **Poor** |
| **CLS** | 0 | 0 | **Good** |
| **INP** | 920ms – 2872ms | 920ms – 2872ms | **Poor** |

---

## Development Build — Mobile (Chrome Device Emulation) Core Web Vitals

### No Throttling

| Metrik | Değer | Rating |
|--------|:-----:|:------:|
| **LCP** | 0.48s – 0.83s | **Good** |
| **CLS** | 0 | **Good** |
| **INP** | 40ms – 64ms | **Good** |

### 4x CPU Slowdown

| Metrik | Değer | Rating |
|--------|:-----:|:------:|
| **LCP** | 1.18s – 1.32s | **Good** |
| **CLS** | 0 | **Good** |
| **INP** | 56ms – 96ms | **Good** |

### 6x CPU Slowdown

| Metrik | Değer | Rating |
|--------|:-----:|:------:|
| **LCP** | 2.05s – 2.15s | **Good** |
| **CLS** | 0 | **Good** |
| **INP** | 40ms – 96ms | **Good** |

### 20x CPU Slowdown

| Metrik | Değer | Rating |
|--------|:-----:|:------:|
| **LCP** | 6.53s – 7.02s | **Poor** |
| **CLS** | 0 | **Good** |
| **INP** | 272ms – 408ms | **Needs Improvement** |

---

## Değerlendirme

**CLS her senaryoda 0.** Toolbar ve sidebar her state'de (loading/error/success) aynı component'leri render ettiği için layout shift oluşmuyor.

**LCP** kupon doluyken artıyor çünkü `CartPanel` içindeki seçili bahisler DOM'a ekleniyor ve LCP elementi sidebar'daki son büyük text node'una kayıyor. Kupon boşken LCP elementi bülten satırlarındaki maç ismi oluyor ve çok daha hızlı çiziliyor.

**INP** 6x throttle'a kadar Good aralıkta. 20x throttle gerçekçi bir senaryo değil ancak uygulamanın kırılma noktasını göstermek için dahil edildi.

**Bundle boyutu (275KB)** performans bütçesi dahilinde. `splitChunks` ile react-vendor ayrı cache'leniyor, uygulama kodu güncellendiğinde kullanıcı sadece `main.js`'i tekrar indiriyor.
