import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PetNavigation } from './PetNavigation';
import { useNavigationStore } from '../stores/navigationStore';

describe('PetNavigation Component', () => {
  beforeEach(() => {
    useNavigationStore.setState({ activeSection: 'pet' });
  });

  it('should render Pet Game tab', () => {
    render(<PetNavigation />);

    expect(screen.getAllByText('Pet Game').length).toBeGreaterThan(0);
    expect(screen.getAllByText('🎮').length).toBeGreaterThan(0);
  });

  it('should render About tab', () => {
    render(<PetNavigation />);

    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
    expect(screen.getAllByText('📖').length).toBeGreaterThan(0);
  });

  it('should change active section when tab is clicked', async () => {
    const user = userEvent.setup();

    render(<PetNavigation />);

    // Initially pet is active
    expect(useNavigationStore.getState().activeSection).toBe('pet');

    // Click About button (get the first one, as there are mobile and desktop versions)
    const aboutButtons = screen.getAllByRole('button', { name: /about this demo/i });
    await user.click(aboutButtons[0]);

    expect(useNavigationStore.getState().activeSection).toBe('about');
  });

  it('should switch back to pet tab', async () => {
    const user = userEvent.setup();
    useNavigationStore.setState({ activeSection: 'about' });

    render(<PetNavigation />);

    const petButtons = screen.getAllByRole('button', { name: /play with your virtual pet/i });
    await user.click(petButtons[0]);

    expect(useNavigationStore.getState().activeSection).toBe('pet');
  });

  it('should mark active tab with aria-current', () => {
    useNavigationStore.setState({ activeSection: 'pet' });

    render(<PetNavigation />);

    const petButtons = screen.getAllByRole('button', { name: /play with your virtual pet/i });
    expect(petButtons[0]).toHaveAttribute('aria-current', 'page');
  });

  it('should not mark inactive tab with aria-current', () => {
    useNavigationStore.setState({ activeSection: 'pet' });

    render(<PetNavigation />);

    const aboutButtons = screen.getAllByRole('button', { name: /about this demo/i });
    expect(aboutButtons[0]).not.toHaveAttribute('aria-current');
  });
});
