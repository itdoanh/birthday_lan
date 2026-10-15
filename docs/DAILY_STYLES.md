# Daily Styles System

## Tổng quan

Hệ thống tự sinh style cho mỗi ngày trong năm (1-365), đảm bảo mỗi ngày có 1 bộ:
- Ảnh nền khác nhau (Picsum)
- Palette màu khác nhau (30+ palettes)
- Font heading/body khác nhau (7 heading + 4 body fonts)
- Layout khác nhau (5 loại)
- Motion khác nhau (4 loại animation)
- Lời chúc khác nhau (365+ messages vi/en)

## Generator

`src/utils/dayStyle.ts` — `generateDailyStyle(date)`:
- Seed từ ngày: `year * 1000 + dayOfYear`
- Dùng `mulberry32` PRNG deterministic
- Cache theo ngày (`YYYY-MM-DD`)

## Palette

30+ palettes trong `src/data/dailyPalettes.ts`:
Aurora, Sunset, Ocean, Forest, Lavender, Cherry, Mint, Gold, Rose, Cosmic, Ember, Glacier, Sakura, Neon, Twilight, Meadow, Midnight, Amber, Jade, Rose Gold, Electric, Fuchsia, Peach, Sapphire, Coral, Iris, Lime, Crimson, Moonstone, Citrus, Volcano, Arctic

## Layouts

| Layout | Mô tả |
|--------|--------|
| `centered` | Overlay giữa màn hình, card glassmorphism |
| `split` | Ảnh trái, countdown phải |
| `overlay` | Countdown ở góc dưới, ảnh full-screen |
| `tilted` | Ảnh xoay 3D 8°, có perspective |
| `minimal` | Chỉ text + gradient mờ, không ảnh |

## Motions

| Motion | Animation |
|--------|-----------|
| `fade` | opacity 0→1, 800ms |
| `slide` | translateY(40px)→0, fade in |
| `blur-zoom` | scale 1.1 blur(20px)→1 blur(0) |
| `rotate-3d` | perspective rotateX(15deg)→0 |

## Messages

365+ câu chúc tiếng Việt/Anh trong `src/data/dailyMessages.ts`, indexed theo `dayOfYear % messages.length`.
