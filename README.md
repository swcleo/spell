# Spell - 英語聽寫練習

英語聽寫練習 Web 應用程式，支援自訂單字清單與語音播放功能。

## 功能特色

- 📝 自訂單字清單
- 🔊 Google TTS 語音播放
- 🎯 即時聽寫練習
- 📊 答題結果統計
- 💾 本地儲存進度
- 🐳 完整 Docker 支援

## 技術棧

- **前端框架**: Next.js 14 + React 18
- **UI 元件**: Material-UI (MUI)
- **樣式**: Tailwind CSS
- **語音**: Google TTS API
- **部署**: Docker

## 快速開始

### 使用 Docker（推薦）

```bash
# 直接執行
docker run -d -p 3000:3000 swcleo/spell:latest

# 或使用 docker-compose
docker-compose up -d
```

開啟瀏覽器訪問 http://localhost:3000

### 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build
npm start
```

## Docker 部署

### 建置 Image

```bash
# 本地建置
docker build -t spell:latest .

# 使用 docker-compose
docker-compose -f docker-compose.build.yml up -d
```

### 推送到 Docker Hub

```bash
docker tag spell:latest YOUR_USERNAME/spell:latest
docker push YOUR_USERNAME/spell:latest
```

## 專案結構

```
spell/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API 路由
│   │   └── page.jsx      # 首頁
│   ├── components/       # React 元件
│   ├── hooks/            # 自訂 Hooks
│   └── utils/            # 工具函式
├── public/               # 靜態資源
├── Dockerfile            # Docker 設定
├── docker-compose.yml    # Docker Compose 設定
└── package.json          # 專案依賴
```

## License

MIT
