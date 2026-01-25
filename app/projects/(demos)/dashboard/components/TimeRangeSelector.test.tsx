import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimeRangeSelector } from './TimeRangeSelector';

describe('TimeRangeSelector Component', () => {
  it('should render all time range options', () => {
    render(<TimeRangeSelector selected="today" onChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'Today' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Week' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Month' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Year' })).toBeInTheDocument();
  });

  it('should highlight the selected option', () => {
    render(<TimeRangeSelector selected="week" onChange={() => {}} />);

    const weekButton = screen.getByRole('button', { name: 'Week' });
    expect(weekButton.className).toContain('text-emerald-400');
  });

  it('should not highlight non-selected options', () => {
    render(<TimeRangeSelector selected="week" onChange={() => {}} />);

    const todayButton = screen.getByRole('button', { name: 'Today' });
    expect(todayButton.className).toContain('text-zinc-400');
    expect(todayButton.className).not.toContain('text-emerald-400');
  });

  it('should call onChange when a different option is clicked', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    render(<TimeRangeSelector selected="today" onChange={mockOnChange} />);

    await user.click(screen.getByRole('button', { name: 'Month' }));

    expect(mockOnChange).toHaveBeenCalledWith('month');
  });

  it('should call onChange when clicking the already selected option', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    render(<TimeRangeSelector selected="today" onChange={mockOnChange} />);

    await user.click(screen.getByRole('button', { name: 'Today' }));

    expect(mockOnChange).toHaveBeenCalledWith('today');
  });

  it('should render four buttons', () => {
    render(<TimeRangeSelector selected="today" onChange={() => {}} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
  });
});
