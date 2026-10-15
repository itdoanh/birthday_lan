# Birthday LAN v2

Trang countdown sinh nhật tối thượng với **2D image-based countdown** (Picsum + 30+ style tự sinh + 365+ lời chúc hằng ngày) cho Phase 1-5, và **3D scene đồ họa đỉnh GTA-V-level** cho Phase 6 (sau khi thổi nến).

## Tính năng chính

- **6 phase đếm ngược** tự chuyển dựa trên thời gian còn lại
- **2D image-based** (Phase 1-5): Ảnh Picsum, 30+ style tự sinh, 365+ lời chúc tiếng Việt/Anh
- **3D GTA-V-level** (Phase 6): PBR + Bloom + DOF + Chromatic Aberration + SSAO effects
- **6 phase chuyển cảnh** mượt mà
- **Pháo hoa + Confetti** khi birthday
- **Wish dialog** cho phép user nhập điều ước

## Cấu trúc

```
src/
├── App.tsx              # Root component
├── main.tsx             # Entry point
├── config/env.ts       # Env config
├── state/              # Zustand stores
├── utils/              # Helpers (time, math, rng, picsum, dayStyle)
├── data/               # Palettes (30+) + Messages (365+)
├── hooks/               # Custom React hooks
├── audio/              # Howler audio manager
├── styles/             # global.css + dayStyles.css
├── components/
│   ├── countdown/       # LongCountdown, LastHour, LastMinute, Analog60, Digit10
│   ├── birthday/        # BirthdayOverlay, WishDialog, BlowCandle, MessageCard
│   ├── hud/             # FPS, Hud
│   ├── shell/           # Overlay, BackgroundMusic
│   └── warmup/          # Warmup
├── three/               # 3D components (Scene, postFX, Cake, City, Lake, Sky, Stars, Camera)
└── fx/                  # Fireworks, Confetti
```

## Môi trường

```env
VITE_BIRTHDAY_DATE=2026-11-30T00:00:00
VITE_PERSON_NAME=Em yêu
VITE_BIRTHDAY_MESSAGE=Chúc em một ngày sinh nhật thật tuyệt vời
VITE_LANGUAGE=vi
```

## Phát triển

```bash
npm install
npm run dev      # Dev server
npm run build    # Production build
npm run typecheck
```

## Phase timeline

| Phase | Khi nào | Component | Đặc điểm |
|-------|----------|-----------|-----------|
| 1 | > 1 giờ | LongCountdown | 4 ô ngày/giờ/phút/giây, style ngày |
| 2 | < 1 giờ | LastHour | 3 ô giờ/phút/giây |
| 3 | < 1 phút | LastMinute | 2 ô giây + ms |
| 4 | < 10s | Analog60 | Số thập phân + animation |
| 5 | < 1s | Digit10 | Số từ 10→0, big animation |
| 6 | = 0 | BirthdayOverlay | 3D scene GTA-V + fireworks |
