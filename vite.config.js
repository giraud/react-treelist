import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

let __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, "src/lib/index.js"),
            formats: ["es"]
        },
        rollupOptions: {
            external: ["react", "react/jsx-runtime"],
            output: {
                entryFileNames: "[name].js"
            }
        },
    },
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom"
    }
})
