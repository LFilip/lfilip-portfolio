import { render, screen } from '@testing-library/react';
import { PetSection } from './PetSection';
import { usePetStore } from '../stores/petStore';

describe('PetSection Component', () => {
  beforeEach(() => {
    usePetStore.setState({ pet: null });
    usePetStore.getState().createPet('TestPet', '🐱');
    localStorage.clear();
  });

  it('should render the heading', () => {
    render(<PetSection />);

    expect(screen.getByText('Virtual Pet Game')).toBeInTheDocument();
  });

  it('should render the Pet component', () => {
    render(<PetSection />);

    // Pet component shows the pet emoji
    expect(screen.getByText('🐱')).toBeInTheDocument();
  });

  it('should render the ActionButtons', () => {
    render(<PetSection />);

    expect(screen.getByRole('button', { name: /feed/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pet/i })).toBeInTheDocument();
  });

  it('should have proper heading level', () => {
    render(<PetSection />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Virtual Pet Game');
  });
});
