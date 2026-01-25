import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PetSidebar } from './PetSidebar';
import { usePetStore } from '../stores/petStore';
import { useNavigationStore } from '../stores/navigationStore';

describe('PetSidebar Component', () => {
  beforeEach(() => {
    usePetStore.setState({ pet: null });
    useNavigationStore.setState({ activeSection: 'pet' });
    localStorage.clear();
  });

  it('should return null when there is no pet', () => {
    const { container } = render(<PetSidebar />);

    expect(container.firstChild).toBeNull();
  });

  it('should render pet info when pet exists', () => {
    usePetStore.getState().createPet('Fluffy', '🐱');

    render(<PetSidebar />);

    expect(screen.getByText('Fluffy')).toBeInTheDocument();
    expect(screen.getByText('🐱')).toBeInTheDocument();
  });

  it('should render stat bars when expanded', () => {
    usePetStore.getState().createPet('TestPet', '🐶');

    render(<PetSidebar />);

    expect(screen.getByText('Energy')).toBeInTheDocument();
    expect(screen.getByText('Hunger')).toBeInTheDocument();
    expect(screen.getByText('Happiness')).toBeInTheDocument();
  });

  it('should toggle collapse state when button is clicked', async () => {
    const user = userEvent.setup();
    usePetStore.getState().createPet('TestPet', '🐱');

    render(<PetSidebar />);

    // Initially expanded - should show StatBar labels
    expect(screen.getByText('Energy')).toBeInTheDocument();

    // Click collapse button
    const collapseButton = screen.getByRole('button', { name: /collapse pet stats/i });
    await user.click(collapseButton);

    // Should now show compact stats
    expect(screen.getByText(/Energy:/)).toBeInTheDocument();
  });

  it('should expand when clicking expand button after collapsed', async () => {
    const user = userEvent.setup();
    usePetStore.getState().createPet('TestPet', '🐱');

    render(<PetSidebar />);

    // Collapse first
    const collapseButton = screen.getByRole('button', { name: /collapse pet stats/i });
    await user.click(collapseButton);

    // Now expand
    const expandButton = screen.getByRole('button', { name: /expand pet stats/i });
    await user.click(expandButton);

    // Should show StatBar labels again
    expect(screen.getByText('Energy')).toBeInTheDocument();
  });

  it('should render the Your Pet heading', () => {
    usePetStore.getState().createPet('TestPet', '🐱');

    render(<PetSidebar />);

    expect(screen.getByText('Your Pet')).toBeInTheDocument();
  });

  it('should show collapse icon when expanded', () => {
    usePetStore.getState().createPet('TestPet', '🐱');

    render(<PetSidebar />);

    expect(screen.getByText('◀')).toBeInTheDocument();
  });

  it('should show expand icon when collapsed', async () => {
    const user = userEvent.setup();
    usePetStore.getState().createPet('TestPet', '🐱');

    render(<PetSidebar />);

    const collapseButton = screen.getByRole('button', { name: /collapse pet stats/i });
    await user.click(collapseButton);

    expect(screen.getByText('▶')).toBeInTheDocument();
  });
});
