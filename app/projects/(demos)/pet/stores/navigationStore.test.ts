import { useNavigationStore } from './navigationStore';

describe('navigationStore', () => {
  beforeEach(() => {
    // Reset to initial state
    useNavigationStore.setState({ activeSection: 'pet' });
  });

  it('should have default activeSection as pet', () => {
    const { activeSection } = useNavigationStore.getState();
    expect(activeSection).toBe('pet');
  });

  it('should update activeSection to about when setActiveSection is called', () => {
    useNavigationStore.getState().setActiveSection('about');
    const { activeSection } = useNavigationStore.getState();
    expect(activeSection).toBe('about');
  });

  it('should switch activeSection back to pet', () => {
    useNavigationStore.getState().setActiveSection('about');
    useNavigationStore.getState().setActiveSection('pet');
    const { activeSection } = useNavigationStore.getState();
    expect(activeSection).toBe('pet');
  });

  it('should update state immediately', () => {
    const initialSection = useNavigationStore.getState().activeSection;
    expect(initialSection).toBe('pet');

    useNavigationStore.getState().setActiveSection('about');

    const updatedSection = useNavigationStore.getState().activeSection;
    expect(updatedSection).toBe('about');
  });
});
