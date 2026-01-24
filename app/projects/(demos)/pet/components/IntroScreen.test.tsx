import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntroScreen } from './IntroScreen';

describe('IntroScreen Component', () => {
  it('should render the welcome title', () => {
    render(<IntroScreen onStart={() => {}} />);

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });

  it('should render default pet options', () => {
    render(<IntroScreen onStart={() => {}} />);

    // Should show default pets (Buddy, Max, Chirpy)
    expect(screen.getByText(/Buddy/i)).toBeInTheDocument();
    expect(screen.getByText(/Max/i)).toBeInTheDocument();
    expect(screen.getByText(/Chirpy/i)).toBeInTheDocument();
  });

  it('should render create new button', () => {
    render(<IntroScreen onStart={() => {}} />);

    expect(screen.getByText(/create new/i)).toBeInTheDocument();
  });

  it('should call onStart when default pet is clicked', async () => {
    const user = userEvent.setup();
    const mockOnStart = jest.fn();

    render(<IntroScreen onStart={mockOnStart} />);

    // Click on Buddy
    const buddyButton = screen.getByText(/Buddy/i).closest('button');
    await user.click(buddyButton!);

    // Should call onStart with Buddy's data
    expect(mockOnStart).toHaveBeenCalledWith({
      name: 'Buddy',
      emoji: '🐱'
    });
  });

  it('should open modal when create new is clicked', async () => {
    const user = userEvent.setup();
    render(<IntroScreen onStart={() => {}} />);

    // Click create new button
    const createButton = screen.getByText(/create new/i);
    await user.click(createButton);

    // Modal should be visible
    expect(screen.getByText(/create your pet/i)).toBeInTheDocument();
  });

  it('should allow creating custom pet through modal', async () => {
    const user = userEvent.setup();
    const mockOnStart = jest.fn();

    render(<IntroScreen onStart={mockOnStart} />);

    // Open modal
    const createButton = screen.getByText(/create new/i);
    await user.click(createButton);

    // Fill in name in modal
    const nameInput = screen.getByLabelText(/pet name/i);
    await user.type(nameInput, 'CustomPet');

    // Select emoji
    const emojiButton = screen.getByRole('button', { name: /🐰/ });
    await user.click(emojiButton);

    // Click create pet button
    const confirmButton = screen.getByText(/create pet/i);
    await user.click(confirmButton);

    // Should call onStart with custom data
    expect(mockOnStart).toHaveBeenCalledWith({
      name: 'CustomPet',
      emoji: '🐰'
    });
  });

  it('should close modal when cancel is clicked', async () => {
    const user = userEvent.setup();
    render(<IntroScreen onStart={() => {}} />);

    // Open modal
    const createButton = screen.getByText(/create new/i);
    await user.click(createButton);

    // Modal should be visible
    expect(screen.getByText(/create your pet/i)).toBeInTheDocument();

    // Click cancel
    const cancelButton = screen.getByText(/cancel/i);
    await user.click(cancelButton);

    // Modal should be closed
    expect(screen.queryByText(/create your pet/i)).not.toBeInTheDocument();
  });
});
