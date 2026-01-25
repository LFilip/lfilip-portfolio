import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock ProgressIndicator to simplify Navbar tests
jest.mock('./ProgressIndicator', () => {
  return function MockProgressIndicator() {
    return <div data-testid="progress-indicator">Progress</div>;
  };
});

describe('Navbar Component', () => {
  it('should render the site title/logo', () => {
    render(<Navbar />);

    expect(screen.getByText('Louis Filip')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Navbar />);

    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
  });

  it('should link to correct paths', () => {
    render(<Navbar />);

    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
  });

  it('should render progress indicator on desktop', () => {
    render(<Navbar />);

    expect(screen.getAllByTestId('progress-indicator').length).toBeGreaterThanOrEqual(1);
  });

  it('should render mobile menu toggle button', () => {
    render(<Navbar />);

    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument();
  });

  it('should open mobile menu when toggle is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', { name: /toggle menu/i });
    await user.click(toggleButton);

    // Mobile menu should now show nav links (duplicates of desktop links)
    const aboutLinks = screen.getAllByRole('link', { name: 'About' });
    expect(aboutLinks.length).toBeGreaterThan(1);
  });

  it('should close mobile menu when toggle is clicked again', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', { name: /toggle menu/i });

    // Open menu
    await user.click(toggleButton);
    const aboutLinksOpen = screen.getAllByRole('link', { name: 'About' });
    expect(aboutLinksOpen.length).toBeGreaterThan(1);

    // Close menu
    await user.click(toggleButton);
    const aboutLinksClosed = screen.getAllByRole('link', { name: 'About' });
    expect(aboutLinksClosed).toHaveLength(1);
  });

  it('should highlight current page in navigation', () => {
    render(<Navbar />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink.className).toContain('text-emerald-400');
  });

  it('should render logo as a link to home', () => {
    render(<Navbar />);

    const logoLink = screen.getByRole('link', { name: 'Louis Filip' });
    expect(logoLink).toHaveAttribute('href', '/');
  });
});

