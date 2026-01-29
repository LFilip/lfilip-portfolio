import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

describe('Accordion Component', () => {
  it('should render the title', () => {
    render(
      <Accordion title="Test Title">
        <p>Test content</p>
      </Accordion>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should be collapsed by default', () => {
    render(
      <Accordion title="Test Title">
        <p>Test content</p>
      </Accordion>
    );

    expect(screen.queryByText('Test content')).not.toBeInTheDocument();
  });

  it('should expand when clicked', async () => {
    const user = userEvent.setup();
    render(
      <Accordion title="Test Title">
        <p>Test content</p>
      </Accordion>
    );

    const button = screen.getByRole('button', { name: /test title/i });
    await user.click(button);

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should collapse when clicked again', async () => {
    const user = userEvent.setup();
    render(
      <Accordion title="Test Title">
        <p>Test content</p>
      </Accordion>
    );

    const button = screen.getByRole('button', { name: /test title/i });

    // Expand
    await user.click(button);
    expect(screen.getByText('Test content')).toBeInTheDocument();

    // Collapse
    await user.click(button);
    expect(screen.queryByText('Test content')).not.toBeInTheDocument();
  });

  it('should be expanded by default when defaultOpen is true', () => {
    render(
      <Accordion title="Test Title" defaultOpen>
        <p>Test content</p>
      </Accordion>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render children content correctly', async () => {
    const user = userEvent.setup();
    render(
      <Accordion title="Features">
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
        </ul>
      </Accordion>
    );

    await user.click(screen.getByRole('button', { name: /features/i }));

    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
  });

  it('should have accessible button role', () => {
    render(
      <Accordion title="Accessible Section">
        <p>Content</p>
      </Accordion>
    );

    expect(screen.getByRole('button', { name: /accessible section/i })).toBeInTheDocument();
  });
});
