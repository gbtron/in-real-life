import { expect, test, vi, describe, beforeAll } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import Landing from '@/app/page'
import { setup } from '../__tests__/setup'
import { useUser } from '@auth0/nextjs-auth0/client'

describe('The landing page', () => {
    beforeAll(() => {
        vi.mock('@auth0/nextjs-auth0/client', () => ({
            useUser: vi.fn(() => ({
                user:undefined, 
                error:undefined, 
                isLoading:undefined
            })), 
            
        }))
    })
    
    test('Logged out header text', () => {
        vi.mock('@auth0/nextjs-auth0/client', () => ({
            useUser: vi.fn(() => ({
                user:undefined,
                error:undefined, 
                isLoading:undefined
            })), 
            
        }))
        setup(<Landing/>)
        const heading = screen.getByRole('heading')
        const mainContent = screen.getByRole('main')
        const link = screen.getAllByRole('link')

        expect(heading.innerHTML).toContain('Welcome')
        expect(mainContent.innerHTML).toContain('we look forward to serving you.')
        expect(link[0].innerHTML).toBe('Begin')
    })

    test('Logged in header text', async () => {
        useUser.mockReturnValue({
            user: {name:'Phil'}, 
            error: undefined, 
            isLoading: true
        })
        const { user } = setup(<Landing/>)  
        const links = screen.getAllByRole('link')
        await user.click(links[0])

        const heading = screen.getByRole('heading')
        expect(heading.innerHTML).toContain('Hello, Phil')
        
        //console.log('heading logged in- ', screen.getByRole('heading'))
        //expect(screen.getByRole('heading').innerHTML).toContain('Hello')
    })

    test('Loading spinner', () => {
        useUser.mockReturnValue({
            user: undefined, 
            error: undefined, 
            isLoading: true
        })
        setup(<Landing/>)
        const mainContent = screen.getByRole('main')
        expect(mainContent.innerHTML).toContain('animate-spin')
        //console.log(mainContent.innerHTML)
    })

    test("Login error", () => {
        useUser.mockReturnValue({
            user:undefined, 
            error:{message:"The user could not be logged in."}, 
            isLoading:false
        })
        setup(<Landing/>)
        const errorMessage = screen.getByRole('status')
        expect(errorMessage.innerHTML).toContain('The user could not be logged in.')
    })

    test("footer links", () => {
        setup(<Landing/>)
        const links = screen.getByRole('contentinfo')
        expect(links.innerHTML).toContain('Contact')
        expect(links.innerHTML).toContain('IRL_Logo_Final')
    })
})