import { render, screen, act } from '@testing-library/react';
import { ContentArea } from './ContentArea';
import { useNavigationStore } from '../stores/navigationStore';
import { usePetStore } from '../stores/petStore';

describe('ContentArea Component', () => {
  beforeEach(() => {
    useNavigationStore.setState({ activeSection: 'pet' });
    usePetStore.setState({ pet: null });
    usePetStore.getState().createPet('TestPet', '🐱');
    localStorage.clear();
  });

  it('should render PetSection when activeSection is pet', () => {
    useNavigationStore.setState({ activeSection: 'pet' });

    render(<ContentArea />);

    expect(screen.getByText('Virtual Pet Game')).toBeInTheDocument();
  });

  it('should render AboutSection when activeSection is about', () => {
    useNavigationStore.setState({ activeSection: 'about' });

    render(<ContentArea />);

    expect(screen.getByText('About This Demo')).toBeInTheDocument();
  });

  it('should not render AboutSection when activeSection is pet', () => {
    useNavigationStore.setState({ activeSection: 'pet' });

    render(<ContentArea />);

    expect(screen.queryByText('About This Demo')).not.toBeInTheDocument();
  });

  it('should not render PetSection when activeSection is about', () => {
    useNavigationStore.setState({ activeSection: 'about' });

    render(<ContentArea />);

    expect(screen.queryByText('Virtual Pet Game')).not.toBeInTheDocument();
  });

  it('should switch content when navigation changes', () => {
    const { rerender } = render(<ContentArea />);

    act(() => {
      useNavigationStore.setState({ activeSection: 'pet' });
    });
    rerender(<ContentArea />);
    expect(screen.getByText('Virtual Pet Game')).toBeInTheDocument();

    act(() => {
      useNavigationStore.setState({ activeSection: 'about' });
    });
    rerender(<ContentArea />);
    expect(screen.getByText('About This Demo')).toBeInTheDocument();
  });
});
