import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardDemoPage from './page';

describe('DashboardDemoPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render the page heading', () => {
    render(<DashboardDemoPage />);

    expect(screen.getByRole('heading', { level: 1, name: 'Analytics Dashboard' })).toBeInTheDocument();
  });

  it('should render back to projects link', () => {
    render(<DashboardDemoPage />);

    expect(screen.getByRole('link', { name: /back to projects/i })).toBeInTheDocument();
  });

  it('should render time range selector', () => {
    render(<DashboardDemoPage />);

    expect(screen.getByRole('button', { name: 'Today' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Week' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Month' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Year' })).toBeInTheDocument();
  });

  it('should render refresh button', () => {
    render(<DashboardDemoPage />);

    expect(screen.getByRole('button', { name: /refresh data/i })).toBeInTheDocument();
  });

  it('should render metric cards', () => {
    render(<DashboardDemoPage />);

    // Check for metric titles
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });

  it('should change time range when selector is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<DashboardDemoPage />);

    const weekButton = screen.getByRole('button', { name: 'Week' });
    await user.click(weekButton);

    // Week should now be highlighted
    expect(weekButton.className).toContain('text-emerald-400');
  });

  it('should show refresh animation when refresh is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<DashboardDemoPage />);

    const refreshButton = screen.getByRole('button', { name: /refresh data/i });
    await user.click(refreshButton);

    // Button should be disabled during refresh
    expect(refreshButton).toBeDisabled();

    // Complete the refresh
    act(() => {
      jest.advanceTimersByTime(800);
    });

    expect(refreshButton).not.toBeDisabled();
  });

  it('should render footer note', () => {
    render(<DashboardDemoPage />);

    expect(screen.getByText(/This is a demo dashboard with mock data/i)).toBeInTheDocument();
  });
});
