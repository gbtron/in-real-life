import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Landing from '@/app/page'

test('Landing Page', ()=> {
    vi.mock('@auth0/nextjs-auth0/client', ()=> ({
        useUser: vi.fn(() => ({
            user:undefined, 
            error:undefined, 
            isLoading:undefined
        }))
    }))

    render(
        <Landing/>
    )
    const mainElement = screen.getByRole('main')
    screen.debug()
})