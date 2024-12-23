import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import '../util/matchMedia';
import ApplicationStats from '../../components/ApplicationStats';

describe('ApplicationStats testing', () => {
  afterEach(() => {
    cleanup();
  });

  it('Renders when numbers are 0', () => {
    render(<ApplicationStats data={[0, 0, 0, 0]} />);

    expect(screen.getByText('0 Applications')).toBeInTheDocument();
    expect(screen.getByText('0 Assessments')).toBeInTheDocument();
    expect(screen.getByText('0 Interviews')).toBeInTheDocument();
    expect(screen.getByText('0 Offers')).toBeInTheDocument();
  });

  it('Renders with singular when numbers are 1', () => {
    render(<ApplicationStats data={[1, 1, 1, 1]} />);

    expect(screen.getByText('1 Application')).toBeInTheDocument();
    expect(screen.getByText('1 Assessment')).toBeInTheDocument();
    expect(screen.getByText('1 Interview')).toBeInTheDocument();
    expect(screen.getByText('1 Offer')).toBeInTheDocument();
  });

  it('Renders with any other numbers', () => {
    render(<ApplicationStats data={[18, 5, 9, 10]} />);

    expect(screen.getByText('18 Applications')).toBeInTheDocument();
    expect(screen.getByText('5 Assessments')).toBeInTheDocument();
    expect(screen.getByText('9 Interviews')).toBeInTheDocument();
    expect(screen.getByText('10 Offers')).toBeInTheDocument();
  });
});
