import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DiagonalWipe } from './DiagonalWipe';

describe('DiagonalWipe Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render nothing when hasCompleted is true', async () => {
    const { container, rerender } = render(
      <DiagonalWipe isAnimating={true} onComplete={() => {}} />
    );

    // Show the button
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Click begin
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const button = screen.getByRole('button', { name: /begin adventure/i });
    await user.click(button);

    // Complete animation
    act(() => {
      jest.advanceTimersByTime(900);
    });

    rerender(<DiagonalWipe isAnimating={true} onComplete={() => {}} />);

    expect(container.firstChild).toBeNull();
  });

  it('should show Begin Adventure button after delay when animating', async () => {
    render(<DiagonalWipe isAnimating={true} onComplete={() => {}} />);

    // Button should not be visible initially
    expect(screen.queryByRole('button', { name: /begin adventure/i })).not.toBeInTheDocument();

    // Advance past the delay
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Button should now be visible
    expect(screen.getByRole('button', { name: /begin adventure/i })).toBeInTheDocument();
  });

  it('should not show button when not animating', () => {
    render(<DiagonalWipe isAnimating={false} onComplete={() => {}} />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.queryByRole('button', { name: /begin adventure/i })).not.toBeInTheDocument();
  });

  it('should call onComplete after animation finishes', async () => {
    const mockOnComplete = jest.fn();
    render(<DiagonalWipe isAnimating={true} onComplete={mockOnComplete} />);

    // Show the button
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Click the button
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const button = screen.getByRole('button', { name: /begin adventure/i });
    await user.click(button);

    // onComplete should not be called yet
    expect(mockOnComplete).not.toHaveBeenCalled();

    // Advance past animation duration (900ms)
    act(() => {
      jest.advanceTimersByTime(900);
    });

    expect(mockOnComplete).toHaveBeenCalledTimes(1);
  });

  it('should hide button after clicking Begin Adventure', async () => {
    render(<DiagonalWipe isAnimating={true} onComplete={() => {}} />);

    // Show the button
    act(() => {
      jest.advanceTimersByTime(300);
    });

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const button = screen.getByRole('button', { name: /begin adventure/i });
    await user.click(button);

    // Button should be hidden immediately after click
    expect(screen.queryByRole('button', { name: /begin adventure/i })).not.toBeInTheDocument();
  });

  it('should render the wipe panels', () => {
    const { container } = render(<DiagonalWipe isAnimating={true} onComplete={() => {}} />);

    // Should have the fixed container
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('fixed', 'inset-0');

    // Should have two triangle panels
    const panels = container.querySelectorAll('.bg-emerald-600, .bg-emerald-500');
    expect(panels.length).toBe(2);
  });
});
