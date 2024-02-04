import { defineConfig } from 'vitepress'
import { sidebar } from './config/sidebar'
import {mdPlugin} from './config/plugins.ts'

export default defineConfig({
  title: `lc-plus`,
  description: 'lc-plus',
  base: '/lc-plus/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'logo.svg' }],
  ],
  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present The Muse Catcher',
    },
    nav: [
      { text: '组件', link: '/guide/features', activeMatch: '/guide/' },
      { text: 'API', link: '/api/introduce', activeMatch: '/api/' },
      {
        text: '链接',
        items: [
          { text: 'Github', link: 'https://github.com/Luochao0511/lc-plus' },
          {
            items: [
              {
                text: 'vue',
                link: 'https://cn.vuejs.org/',
              },
              {
                text: 'vitepress',
                link: 'https://vitepress.dev/',
              }
            ]
          }
        ]
      }
    ],
    sidebar,
  },
  vite: {
    ssr: {
      // 列出的是防止被 SSR 外部化依赖项。如果设为 true，将没有依赖被外部化。
        noExternal: ['ag-grid-vue3'],
    },
  },
  markdown: {
    headers: {
      level: [0, 0],
    },
    // light: #f9fafb, dark: --vp-code-block-bg
    theme: { light: 'github-light', dark: 'github-dark' },
    config: (md) => mdPlugin(md),
  },
})
