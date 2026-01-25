import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PetHeader } from './PetHeader';
import { usePetStore } from '../stores/petStore';

describe('PetHeader Component', () => {
  beforeEach(() => {
    usePetStore.setState({ pet: null });
    localStorage.clear();
  });

  it('should render the title', () => {
    render(<PetHeader onReset={() => {}} />);

    expect(screen.getByText('LocalPet Demo')).toBeInTheDocument();
    expect(screen.getByText('LocalPet')).toBeInTheDocument();
  });

  it('should render the reset button', () => {
    render(<PetHeader onReset={() => {}} />);

    expect(screen.getByRole('button', { name: /choose a different pet/i })).toBeInTheDocument();
  });

  it('should call onReset when reset button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnReset = jest.fn();

    render(<PetHeader onReset={mockOnReset} />);

    const resetButton = screen.getByRole('button', { name: /choose a different pet/i });
    await user.click(resetButton);

    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  it('should not show pet status when there is no pet', () => {
    render(<PetHeader onReset={() => {}} />);

    expect(screen.queryByText(/E:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/H:/)).not.toBeInTheDocument();
  });

  it('should show pet status on mobile when pet exists', () => {
    usePetStore.getState().createPet('TestPet', '🐱');

    render(<PetHeader onReset={() => {}} />);

    // Pet emoji should be visible
    expect(screen.getByText('🐱')).toBeInTheDocument();
    // Energy and Happiness stats should be shown
    expect(screen.getByText(/E:/)).toBeInTheDocument();
    expect(screen.getByText(/H:/)).toBeInTheDocument();
  });

  it('should display pet stats values', () => {
    usePetStore.getState().createPet('TestPet', '🐶');
    const pet = usePetStore.getState().pet;

    render(<PetHeader onReset={() => {}} />);

    expect(screen.getByText(`E:${pet?.stats.energy}`)).toBeInTheDocument();
    expect(screen.getByText(`H:${pet?.stats.happiness}`)).toBeInTheDocument();
  });
});
