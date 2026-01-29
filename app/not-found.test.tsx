import { render, screen } from '@testing-library/react';
import NotFound from './not-found';

describe('NotFound Page', () => {
  it('should render 404 heading', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('should render page not found message', () => {
    render(<NotFound />);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('should render description text', () => {
    render(<NotFound />);

    expect(screen.getByText(/the page you're looking for doesn't exist/i)).toBeInTheDocument();
  });

  it('should render back to home link', () => {
    render(<NotFound />);

    const homeLink = screen.getByRole('link', { name: /back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should have proper heading hierarchy', () => {
    render(<NotFound />);

    expect(screen.getByRole('heading', { level: 1, name: '404' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Page not found' })).toBeInTheDocument();
  });
});
