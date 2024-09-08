import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins:[react()],
    test: {
        environment: 'jsdom',
        setupFiles:'./setupTests.ts'
    },
    resolve: {
        alias: {
            '@/app/ui/fonts': resolve(__dirname, './__mocks__/fontMock.ts'),
            '@': resolve(__dirname, './')
        }
    }
})