import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [
        VueRouter({
          routesFolder: [
            {
              src: 'src/pages'
            }
          ],
          exclude: ['**/components*/**/*'],
          importMode: 'async'
        }),
        vue()
      ],
      esbuild: {
        minifyWhitespace: true
      },
      build: {
        minify: 'esbuild',
        commonjsOptions: {
          ignoreTryCatch: false
        }
      },
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    }
  } else {
    return {
      plugins: [
        VueRouter({
          routesFolder: [
            {
              src: 'src/pages'
            }
          ],
          exclude: ['**/components*/**/*'],
          importMode: 'async'
        }),
        vue()
      ],
      esbuild: {
        minifyWhitespace: true,
        drop: ['console', 'debugger'] // disable console logs for builds
      },
      build: {
        minify: 'esbuild',
        commonjsOptions: {
          ignoreTryCatch: false
        }
      },
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    }
  }
})
