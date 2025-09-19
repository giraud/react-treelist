import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

let __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/lib/index.js"),
            name: "Treelist",
            fileName: "react-treelist"
        },
        rollupOptions: {
            external: ["react"],
            output: {
                globals: {
                    react: "react"
                }
            }
        },
    },
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom"
    }
})
