# Performans Raporu

- **Test Cihazı:** MacBook Pro 14", Apple M4, 16GB RAM, 512GB SSD
- **Tarayıcı:** Google Chrome (DevTools Performance panel)

> CWV Rating Ölçütleri:
> - **LCP:** Good < 2.5s · Needs Improvement 2.5s–4.0s · Poor > 4.0s
> - **CLS:** Good < 0.1 · Needs Improvement 0.1–0.25 · Poor > 0.25
> - **INP:** Good < 200ms · Needs Improvement 200ms–500ms · Poor > 500ms

---

## Lighthouse Skorları

|  | Development | | Production | |
|--|:---:|:---:|:---:|:---:|
| **Kategori** | **Desktop** | **Mobile** | **Desktop** | **Mobile** |
| Performance | 95 | 51 | 99 | 91 |
| Accessibility | 88 | 88 | 82 | 88 |
| Best Practices | 100 | 100 | 100 | 100 |
| SEO | 90 | 90 | 90 | 90 |

---

## Production Build — DevTools Performance Trace

Chrome DevTools trace ile ölçülmüş lab değerleri (production build, `npx serve dist`).

### Desktop — No Throttling

| Metrik | Değer | Rating |
|--------|:-----:|:------:|
| **LCP** | 159ms | **Good** |
| **CLS** | 0 | **Good** |

### Mobile — 4x CPU + Fast 4G

| Metrik | Değer | Rating |
|--------|:-----:|:------:|
| **LCP** | 639ms | **Good** |
| **CLS** | 0 | **Good** |

### Mobile — 6x CPU + Fast 4G

| Metrik | Değer | Rating |
|--------|:-----:|:------:|
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

**CLS her zaman 0.** Toolbar ve sidebar her state'de (loading/error/success) aynı component'leri render ettiği için layout shift oluşmuyor.

**Production vs Development farkı belirgin.** Production build'de mobile 4x throttle + Fast 4G'de LCP 639ms iken, development build'de aynı koşulda 1.18s–1.32s. Minify, tree-shaking ve splitChunks bu farkı yaratıyor.

**LCP** kupon doluyken belirgin şekilde artıyor çünkü `CartPanel` içindeki seçili bahisler DOM'a ekleniyor ve LCP elementi sidebar'daki son büyük text node'una kayıyor. Kupon boşken LCP elementi bülten satırlarındaki maç ismi oluyor ve çok daha hızlı çiziliyor.

**INP** 6x throttle'a kadar Good aralıkta. 20x throttle (gerçek gerçekçi bir senaryo değil ancak uygulamanın kırılma noktasını göstermek için dahil edildi.
