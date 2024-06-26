import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    }),
    vueJsx(),
    dts({
      outDir: './dist',
      rollupTypes: true,
      pathsToAliases: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/release/index.ts', import.meta.url)), //指定组件编译入口文件
      name: 'ArtoUI', // 包名
      fileName: 'arto-ui', // 打包文件名
      formats: ['umd', 'es', 'iife']
    }
    // rollupOptions: {
    //   // 确保外部化处理那些你不想打包进库的依赖
    //   external: ['vue'],
    //   output: {
    //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    //     globals: {
    //       vue: 'Vue'
    //     }
    //   }
    // }
    // sourcemap: true
  }
})
