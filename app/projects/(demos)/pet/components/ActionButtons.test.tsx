import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionButtons } from './ActionButtons';
import { usePetStore } from '../stores/petStore';

describe('ActionButtons Component', () => {
  beforeEach(() => {
    // Reset store before each test and create a pet
    usePetStore.setState({ pet: null });
    usePetStore.getState().createPet('TestPet', '🐱');
    localStorage.clear();
  });

  it('should render three action buttons', () => {
    render(<ActionButtons />);

    // Check for button text/labels
    expect(screen.getByRole('button', { name: /feed/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pet/i })).toBeInTheDocument();
  });

  it('should call feed action when Feed button is clicked', async () => {
    const user = userEvent.setup();

    // Set hunger to 50 so we can test the increase
    const state = usePetStore.getState();
    if (state.pet) {
      usePetStore.setState({
        pet: {
          ...state.pet,
          stats: { ...state.pet.stats, hunger: 50 }
        }
      });
    }

    render(<ActionButtons />);

    const initialHunger = usePetStore.getState().pet?.stats.hunger || 0;

    const feedButton = screen.getByRole('button', { name: /feed/i });
    await user.click(feedButton);

    const newHunger = usePetStore.getState().pet?.stats.hunger || 0;
    expect(newHunger).toBeGreaterThan(initialHunger);
  });

  it('should call play action when Play button is clicked', async () => {
    const user = userEvent.setup();

    // Set stats so we can test the changes
    const state = usePetStore.getState();
    if (state.pet) {
      usePetStore.setState({
        pet: {
          ...state.pet,
          stats: { happiness: 50, energy: 50, hunger: 50 }
        }
      });
    }

    render(<ActionButtons />);

    const initialHappiness = usePetStore.getState().pet?.stats.happiness || 0;
    const initialEnergy = usePetStore.getState().pet?.stats.energy || 0;

    const playButton = screen.getByRole('button', { name: /play/i });
    await user.click(playButton);

    const newHappiness = usePetStore.getState().pet?.stats.happiness || 0;
    const newEnergy = usePetStore.getState().pet?.stats.energy || 0;

    expect(newHappiness).toBeGreaterThan(initialHappiness);
    expect(newEnergy).toBeLessThan(initialEnergy);
  });

  it('should call pet action when Pet button is clicked', async () => {
    const user = userEvent.setup();

    // Set happiness to 50 so we can test the increase
    const state = usePetStore.getState();
    if (state.pet) {
      usePetStore.setState({
        pet: {
          ...state.pet,
          stats: { ...state.pet.stats, happiness: 50 }
        }
      });
    }

    render(<ActionButtons />);

    const initialHappiness = usePetStore.getState().pet?.stats.happiness || 0;

    const petButton = screen.getByRole('button', { name: /pet/i });
    await user.click(petButton);

    const newHappiness = usePetStore.getState().pet?.stats.happiness || 0;
    expect(newHappiness).toBeGreaterThan(initialHappiness);
  });

  it('should have visual feedback on hover', () => {
    render(<ActionButtons />);

    const feedButton = screen.getByRole('button', { name: /feed/i });

    // Check that button has hover-related Tailwind classes
    expect(feedButton.className).toMatch(/hover:/);
  });

  it('should display appropriate emojis/icons for each action', () => {
    render(<ActionButtons />);

    const feedButton = screen.getByRole('button', { name: /feed/i });
    const playButton = screen.getByRole('button', { name: /play/i });
    const petButton = screen.getByRole('button', { name: /pet/i });

    // Buttons should have some content
    expect(feedButton.textContent).toBeTruthy();
    expect(playButton.textContent).toBeTruthy();
    expect(petButton.textContent).toBeTruthy();
  });
});
