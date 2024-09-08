import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react' 
import Landing from '@/app/page'

test('Landing', ()=> {
    render(<Landing />)
}) 