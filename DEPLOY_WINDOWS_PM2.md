# Deploy on Windows Server (PM2)

## 1) Prereqs

- Install Node.js (LTS recommended) on the server.
- Copy this project to a folder like `C:\apps\hrmetrics_product`.
- Create a `.env` file (based on `.env.example`) and set at least:
  - `PORT` (default `3002`)
  - `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
  - `MAIL_FROM_NAME`, `MAIL_FROM_EMAIL`

## 2) Build the app

From the project folder:

```powershell
npm.cmd ci
npm.cmd run build
```

This generates `dist/`, which `server/server.cjs` serves in production.

## 3) Install + start with PM2

Option A (recommended on Windows): install PM2 globally:

```powershell
npm.cmd i -g pm2
pm2 start ecosystem.config.cjs --env production
pm2 save
```

Option B: use the project-local PM2 (requires dev deps installed):

```powershell
npm.cmd run pm2:start
npm.cmd run pm2:save
```

## 4) Keep it running after reboot

PM2 "startup" is not always reliable on Windows. Common options:

- Use Windows Task Scheduler to run `pm2 resurrect` on system startup (after `pm2 save`).
- Or run PM2 as a Windows service using a service wrapper (for example NSSM) that executes `pm2 resurrect`.

## 5) Networking

- Open the firewall for `PORT` (e.g. `3001`) or place IIS/Nginx in front and reverse-proxy to `http://127.0.0.1:3001`.
- The SQLite DB lives in `data/hrmetrics.sqlite` and uploads in `public/uploads/` - keep those folders persistent across deployments.
