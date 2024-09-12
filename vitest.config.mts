import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins:[react()],
    test: {
        globals:true, 
        environment: 'jsdom',
        setupFiles:'./__tests__/setup.ts'
    },
    resolve: {
        alias: {
            '@/app/ui/fonts': resolve(__dirname, './__mocks__/fontMock.ts'),
            '@': resolve(__dirname, './')
        }
    }
})