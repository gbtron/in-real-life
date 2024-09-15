import { expect, test, vi, describe, beforeAll } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import Landing from '@/app/page'
import { setup } from './setup'

describe('The landing page', () => {
    beforeAll(() => {
        vi.mock('@auth0/nextjs-auth0/client', () => ({
            useUser: vi.fn(() => ({
                user:undefined, 
                error:undefined, 
                isLoading:undefined
            })), 
            UserProvider: vi.fn(() => ({
                children: [vi.fn()]
            }))
        }))
    })

    test.skip('dark mode toggle', async ()=> {
        const { user } = setup(<Landing/>)
        const image = screen.getByRole('img')
        const footer = screen.getByRole('contentinfo')
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
    
    test('Logged out Header text', () => {
        setup(<Landing/>)
        const mainContent = screen.getByRole('main')
        const link = screen.getAllByRole('link')
        const heading = screen.getByRole('heading')

        expect(heading.innerHTML).toContain('Welcome')
        expect(mainContent.innerHTML).toContain('we look forward to serving you.')
        expect(link[0].innerHTML).toBe('Begin')
    })

    test.skip('Logged in header text', async () => {
        const useUser = vi.fn(() => ({
            user:true, 
            error: undefined, 
            isLoading: undefined
        }))
        vi.mock('/api/auth/login', () => {
            console.log('logged in')
            return ({
                useUser: useUser
        })})
        const { user } = setup(<Landing/>)
        const link = screen.getAllByRole('link')
        await user.click(link[0])
        expect(useUser).toHaveBeenCalled()
        //console.log('heading logged in- ', screen.getByRole('heading'))
        //expect(screen.getByRole('heading').innerHTML).toContain('Hello')
    })
})