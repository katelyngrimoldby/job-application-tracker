import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { testInterviews } from '../../../util/testData';
import '../../../util/matchMedia';
import InterviewCellDesktop from '../../../../components/Preview/Desktop/InterviewCell';

describe('InterviewCellDesktop testing', () => {
  const interview = testInterviews[0];

  beforeEach(() => {
    // BrowserRouter makes sure that Link components can be checked
    render(
      <BrowserRouter>
        <InterviewCellDesktop interview={interview} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Renders all information', () => {
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(
      screen.getByText(interview.contact ? interview.contact : 'Unknown')
    ).toBeInTheDocument();
    expect(screen.getByText('Jan. 5th')).toBeInTheDocument();
    expect(screen.getByText('12:30')).toBeInTheDocument();
  });

  it('Links to correct interview', () => {
    expect(screen.getByText('View Interview')).toHaveAttribute(
      'href',
      `/interviews/${interview.id}`
    );
  });
});
