# Deploy Viksit Vidyarthi on a Hostinger VPS

Live domain: `https://viksitvidyarthi.com`  
GitHub: `https://github.com/akshayamin62/Viksit-Vidyarthi`

The site has two apps on the same VPS:

- Frontend (Next.js) on `127.0.0.1:3016`
- Enquiry API (Node) on `127.0.0.1:5016`

Nginx receives public traffic on ports 80 and 443 and forwards it to the frontend. The frontend forwards `/api` to the enquiry API. Visitors never connect to ports 3016 or 5016. These ports are specific to this project so it can run beside the other apps on the same VPS.

`backend/.env` is not in GitHub. Create it on the server. Do not commit it.

## What is running today

These two DNS records send the domain to the current Hostinger website:

| Type | Name | Current content | Action |
| --- | --- | --- | --- |
| ALIAS | `@` | `viksitvidyarthi.com.cdn.hstgr.net` | Delete, then add an A record to the VPS |
| CNAME | `www` | `www.viksitvidyarthi.com.cdn.hstgr.net` | Delete, then add an A record to the VPS |

Leave every mail record unchanged:

- CNAME `hostingermail-a._domainkey`, `hostingermail-b._domainkey`, `hostingermail-c._domainkey`
- CNAME `autodiscover`, `autoconfig`
- TXT `_dmarc`
- TXT `@` (the SPF record)
- MX `@` → `mx1.hostinger.com` (priority 5) and `mx2.hostinger.com` (priority 10)

## 1. Stop the current website

1. Open Hostinger hPanel.
2. Go to **Websites** and open the site attached to `viksitvidyarthi.com`.
3. Remove this domain from that site, or delete that site if you no longer need it.
4. Open **Domains → viksitvidyarthi.com → DNS / DNS Zone**.

Hostinger locks the `@` and `www` records while a Website or CDN plan owns the domain. After the domain is detached, those two records can be replaced.

## 2. Point the domain at the VPS

In the DNS zone, copy your VPS IPv4 address from **VPS → Overview** (example only: `123.45.67.89`).

1. Delete the ALIAS record: `@` → `viksitvidyarthi.com.cdn.hstgr.net`.
2. Delete the CNAME record: `www` → `www.viksitvidyarthi.com.cdn.hstgr.net`.
3. Add:

| Type | Name | Content | TTL |
| --- | --- | --- | --- |
| A | `@` | your VPS IPv4 | 300 |
| A | `www` | your VPS IPv4 | 300 |

Do not add a second `@` record beside the ALIAS. Delete the ALIAS first. Do not change the MX, SPF, DKIM, DMARC, autodiscover, or autoconfig rows.

Check from your computer:

```bash
nslookup viksitvidyarthi.com
nslookup www.viksitvidyarthi.com
```

Both answers should be the VPS IPv4. This can take from a few minutes up to a few hours. Continue with the server setup while DNS updates. Issue the SSL certificate only after both names resolve to the VPS.

## 3. Install Node, Nginx, and PM2

SSH into the VPS as root (hPanel → **VPS → SSH access**).

```bash
apt update && apt upgrade -y
apt install -y nginx git ufw
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
npm install -g pm2
node -v
```

`node -v` must print v22.x. This frontend needs Node 20.9 or newer.

## 4. Clone the repository

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/akshayamin62/Viksit-Vidyarthi.git
cd Viksit-Vidyarthi
```

If GitHub asks for a password, use a personal access token. A public repository clones with no login.

## 5. Start the enquiry API

```bash
cd /var/www/Viksit-Vidyarthi/backend
npm ci
nano .env
```

Paste the same mail settings used locally, with the live site origin:

```env
PORT=5016
FRONTEND_ORIGIN=https://viksitvidyarthi.com
MAIL_SMTP_HOST=smtp.gmail.com
MAIL_SMTP_PORT=587
MAIL_SMTP_USER=your-sending-email@gmail.com
MAIL_SMTP_PASSWORD=your-gmail-app-password
MAIL_FROM=your-sending-email@gmail.com
MAIL_TO=abc62@gmail.com
```

`MAIL_FROM` must be the same Gmail address as `MAIL_SMTP_USER`. `MAIL_SMTP_PASSWORD` must be a Gmail app password from https://myaccount.google.com/apppasswords (Google Account → Security → 2-Step Verification → App passwords).

```bash
pm2 start src/server.js --name viksit-backend
curl http://127.0.0.1:5016/api/health
```

A working API returns `{"ok":true}`.

## 6. Build and start the website

```bash
cd /var/www/Viksit-Vidyarthi/frontend
npm ci
npm run build
pm2 start npm --name viksit-frontend -- start -- -H 127.0.0.1 -p 3016
pm2 save
pm2 startup
```

Run the extra command that `pm2 startup` prints, then run `pm2 save` again. Both processes then come back after a reboot.

Check the site on the server before Nginx is connected:

```bash
curl -I http://127.0.0.1:3016
```

## 7. Nginx

```bash
nano /etc/nginx/sites-available/viksitvidyarthi
```

```nginx
server {
    listen 80;
    server_name viksitvidyarthi.com www.viksitvidyarthi.com;

    location / {
        proxy_pass http://127.0.0.1:3016;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

```bash
ln -s /etc/nginx/sites-available/viksitvidyarthi /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

## 8. HTTPS and the firewall

Run this only after `nslookup` shows the VPS IP for both `viksitvidyarthi.com` and `www.viksitvidyarthi.com`.

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d viksitvidyarthi.com -d www.viksitvidyarthi.com
ufw allow OpenSSH
ufw allow "Nginx Full"
ufw enable
```

Certbot adds the HTTPS server block and renews the certificate automatically. Ports 3016 and 5016 stay closed. Public ports are 22, 80, and 443.

## 9. Confirm the new site

1. Open `https://viksitvidyarthi.com`.
2. Open `https://www.viksitvidyarthi.com`.
3. Click **Start a Conversation**, fill every field, and send a test enquiry.
4. Confirm the message arrives at `MAIL_TO`.

The form posts to `https://viksitvidyarthi.com/api/enquiry`. Next.js passes that request to the API on port 5016.

Useful checks on the VPS:

```bash
pm2 status
pm2 logs viksit-backend --lines 50
pm2 logs viksit-frontend --lines 50
```

## Later updates

On your computer, commit and push to `main`. On the VPS:

```bash
cd /var/www/Viksit-Vidyarthi
git pull
cd backend && npm ci && pm2 restart viksit-backend
cd ../frontend && npm ci && npm run build && pm2 restart viksit-frontend
```

Changing `backend/.env` needs only `pm2 restart viksit-backend`. A frontend change needs `npm run build` before `pm2 restart viksit-frontend`.
