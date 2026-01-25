import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PetDemoPage from './page';
import { usePetStore } from './stores/petStore';
import { useNavigationStore } from './stores/navigationStore';

// Mock window.confirm
const mockConfirm = jest.fn();
window.confirm = mockConfirm;

describe('PetDemoPage', () => {
  beforeEach(() => {
    usePetStore.setState({ pet: null });
    useNavigationStore.setState({ activeSection: 'pet' });
    localStorage.clear();
    mockConfirm.mockReset();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render back to projects link', () => {
    render(<PetDemoPage />);

    expect(screen.getByRole('link', { name: /back to projects/i })).toBeInTheDocument();
  });

  it('should show intro screen when no pet exists', () => {
    render(<PetDemoPage />);

    expect(screen.getByText('Welcome to LocalPet!')).toBeInTheDocument();
  });

  it('should show default pet options on intro screen', () => {
    render(<PetDemoPage />);

    expect(screen.getByText('Buddy')).toBeInTheDocument();
    expect(screen.getByText('Max')).toBeInTheDocument();
    expect(screen.getByText('Chirpy')).toBeInTheDocument();
    expect(screen.getByText('Create New')).toBeInTheDocument();
  });

  it('should create pet and show main layout after selecting a default pet', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PetDemoPage />);

    // Click on a default pet (Buddy the cat)
    const buddyButton = screen.getByText('Buddy').closest('button')!;
    await user.click(buddyButton);

    // Show the "Begin Adventure" button (from DiagonalWipe)
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Click Begin Adventure
    const beginButton = screen.getByRole('button', { name: /begin adventure/i });
    await user.click(beginButton);

    // Complete the animation
    act(() => {
      jest.advanceTimersByTime(900);
    });

    // Now should see the main layout with pet header
    expect(screen.getByText('LocalPet Demo')).toBeInTheDocument();
  });

  describe('with existing pet', () => {
    beforeEach(() => {
      usePetStore.getState().createPet('TestPet', '🐱');
    });

    it('should show main layout when pet exists', () => {
      render(<PetDemoPage />);

      // Should show header (even with animation overlay)
      expect(screen.getByText('LocalPet Demo')).toBeInTheDocument();
    });

    it('should show reset button when pet exists', () => {
      render(<PetDemoPage />);

      expect(screen.getByRole('button', { name: /choose a different pet/i })).toBeInTheDocument();
    });

    it('should confirm before resetting pet', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockConfirm.mockReturnValue(false);

      render(<PetDemoPage />);

      const resetButton = screen.getByRole('button', { name: /choose a different pet/i });
      await user.click(resetButton);

      expect(mockConfirm).toHaveBeenCalled();
      // Pet should still exist since we cancelled
      expect(usePetStore.getState().pet).not.toBeNull();
    });

    it('should reset pet when confirmed', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      mockConfirm.mockReturnValue(true);

      render(<PetDemoPage />);

      const resetButton = screen.getByRole('button', { name: /choose a different pet/i });
      await user.click(resetButton);

      expect(mockConfirm).toHaveBeenCalled();
      // Pet should be cleared
      expect(usePetStore.getState().pet).toBeNull();
    });
  });
});
