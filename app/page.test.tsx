import { render, screen } from '@testing-library/react'
import Home from './page'

// Mock next/image since it requires Next.js server context
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, ...props }: { priority?: boolean } & React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} data-priority={priority} alt={props.alt} />
  },
}))

describe('Home Page', () => {
  it('renders the page heading', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the documentation link', () => {
    render(<Home />)

    expect(screen.getByRole('link', { name: /documentation/i })).toBeInTheDocument()
  })
})
