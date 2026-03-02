This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Monitoring Integration (VictoriaMetrics)

The app exposes a server-side monitoring endpoint at `/api/monitoring` that proxies
VictoriaMetrics queries and returns a curated health payload.

### Required Environment Variables

```bash
VM_BASE_URL=https://<private-observability-endpoint>
VM_BASIC_USER=your_basic_auth_user
VM_BASIC_PASS=your_basic_auth_password
```

### Security Notes

- Monitoring requests are executed server-side only.
- Basic Auth credentials are read from server environment variables and are never
  sent to the frontend.
- The API route uses a fixed internal PromQL query map, so client input cannot
  inject arbitrary queries.

### Example Test

```bash
curl https://yourdomain.com/api/monitoring
```
