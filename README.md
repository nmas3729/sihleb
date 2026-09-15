# SihleB

SihleB is a Next.js website with a server-side project enquiry route.

## Getting Started

First, run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

The enquiry route reads these variables only on the server. Keep the values in Coolify or a local ignored `.env.local` file; never use a `NEXT_PUBLIC_` name for them.

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL=

## Coolify deployment

Use Coolify's standard Node.js build flow. No Dockerfile is required:

- Build command: `pnpm build`
- Start command: `pnpm start`
- Node.js: `>=20.9.0`
- Package manager: `pnpm@10.33.0`

Set the Resend variables in Coolify only after the application is running on its generated preview URL. Test the preview URL before configuring DNS or the production domain. Actual Resend delivery and the `sihleb.co.za` / `www.sihleb.co.za` setup are post-deployment tasks.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
