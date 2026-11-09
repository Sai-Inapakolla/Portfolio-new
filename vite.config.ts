import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { createPortfolioApi } from './server/portfolioApi';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const base = env.BASE_PATH || '/';
  const siteUrl = new URL(env.SITE_URL || 'https://safego1.vercel.app/').href;

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'portfolio-api',
        configureServer(server) {
          server.middlewares.use(createPortfolioApi(env));
        },
      },
      {
        name: 'portfolio-metadata',
        transformIndexHtml(html) {
          const tags = siteUrl ? [
            { tag: 'link', attrs: { rel: 'canonical', href: siteUrl }, injectTo: 'head' as const },
            { tag: 'meta', attrs: { property: 'og:url', content: siteUrl }, injectTo: 'head' as const },
            { tag: 'meta', attrs: { name: 'twitter:image', content: new URL('assets/og-image.jpg', siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`).href }, injectTo: 'head' as const },
            {
              tag: 'meta',
              attrs: {
                property: 'og:image',
                content: new URL('assets/og-image.jpg', siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`).href,
              },
              injectTo: 'head' as const,
            },
          ] : [];
          return {
            html: siteUrl ? html.replace(/<meta property="og:image" content="[^"]*"\s*\/>/, '') : html,
            tags,
          };
        },
      },
    ],
    build: {
      target: 'es2020',
      rollupOptions: {
        output: {
          manualChunks: { motion: ['framer-motion'], react: ['react', 'react-dom'] },
        },
      },
    },
  };
});
