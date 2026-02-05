/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorComponent from './error';

describe('Error Page', () => {
  const mockError = new Error('Test error message');
  const mockReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.error for cleaner test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render error heading', () => {
    render(<ErrorComponent error={mockError} reset={mockReset} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should render error description', () => {
    render(<ErrorComponent error={mockError} reset={mockReset} />);

    expect(screen.getByText(/an unexpected error occurred/i)).toBeInTheDocument();
  });

  it('should render try again button', () => {
    render(<ErrorComponent error={mockError} reset={mockReset} />);

    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('should render go home link', () => {
    render(<ErrorComponent error={mockError} reset={mockReset} />);

    expect(screen.getByRole('link', { name: /go home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go home/i })).toHaveAttribute('href', '/');
  });

  it('should call reset when try again is clicked', async () => {
    const user = userEvent.setup();
    render(<ErrorComponent error={mockError} reset={mockReset} />);

    await user.click(screen.getByRole('button', { name: /try again/i }));

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('should log error to console', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<ErrorComponent error={mockError} reset={mockReset} />);

    expect(consoleSpy).toHaveBeenCalledWith(mockError);
  });

  it('should render sad face emoticon', () => {
    render(<ErrorComponent error={mockError} reset={mockReset} />);

    expect(screen.getByText(':(')).toBeInTheDocument();
  });
});
