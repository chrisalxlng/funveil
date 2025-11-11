# Funveil

Funveil is a digital gift-wrapping platform for sharing images and other digital content in a special way.
You can wrap a file, set a release date, and share it with someone. The recipient sees a countdown and can open the gift when the time has come.

---

## 🚀 Features

- **Digital gift wrapping**
  Upload files and give each gift a title and a recipient.

- **Scheduled releases**
  Set a date and time when the gift becomes available.

- **Easy sharing**
  Share gifts via link or printable QR code.

---

## 🛠 Tech Stack

- **Framework:** SvelteKit
- **Language:** TypeScript
- **Database:** PostgreSQL with Drizzle ORM
- **Authentication:** Keycloak with server-side sessions
- **File storage:** [Stash](https://github.com/chrisalxlng/stash)
- **Styling:** Tailwind
- **I18n:** Paraglide JS

---

## ⚙️ Development Setup

```bash
git clone https://github.com/chrisalxlng/funveil.git
cd funveil
pnpm install
```

Configure your environment in `.env.development`.

Start the dev server:

```bash
pnpm dev
```

The app runs on:
<http://localhost:5173>

---

## 🐳 Deployment with Docker

Set the required environment variables, for example:

```bash
ORIGIN=https://funveil.example.com
PUBLIC_KEYCLOAK_REALM=example-realm
PUBLIC_KEYCLOAK_URL=https://auth.example.com
PUBLIC_STASH_URL=https://stash.example.com
PUBLIC_KEYCLOAK_CLIENT_ID=funveil-app
DATABASE_URL=postgres://funveil:funveil@localhost:5433/funveil
KEYCLOAK_CLIENT_SECRET=this-is-a-secret
STASH_FILE_ACCESS_SECRET=a-string-secret-at-least-256-bits-long
```

Then build and run the app using the provided [Dockerfile](./Dockerfile).
