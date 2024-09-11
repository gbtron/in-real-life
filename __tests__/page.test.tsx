import { expect, test, vi, describe, beforeAll } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import Landing from '@/app/page'
import { setup } from './setup'

describe('The landing page', () => {
    beforeAll(() => {
        vi.mock('@auth0/nextjs-auth0/client', ()=> ({
            useUser: vi.fn(() => ({
                user:undefined, 
                error:undefined, 
                isLoading:undefined
            }))
        }))
    
    })

    test('dark mode toggle', async ()=> {
        const { user } = setup(<Landing/>)

        const header = screen.getByRole('banner')
        expect(header.getAttribute('aria-label')).toBe('Moon icon and log in buttons.')
        
        const darkModeButton = screen.getByRole('button')
        await user.pointer([
            {keys:'[TouchA>]', target:darkModeButton}, 
            {keys:'[/TouchA]'}
        ])
        
        await waitFor(()=> {
            expect(header.getAttribute('aria-label')).toBe('Sun icon and log in buttons.')
        })

        //expect(screen.getByRole('link'))
        //expect(await screen.findByText('Hello, ') ).toBeInTheDocument()
        expect(screen.getByRole('main'))
        expect(screen.getByRole('contentinfo'))
        screen.debug()
    })
})