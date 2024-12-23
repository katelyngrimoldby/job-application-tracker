import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { testInterviews } from '../../../util/testData';
import '../../../util/matchMedia';
import InterviewCellMobile from '../../../../components/Preview/Mobile/InterviewCell';

describe('InterviewCellMobile testing', () => {
  const interview = testInterviews[0];

  beforeEach(() => {
    // BrowserRouter makes sure that Link components can be checked
    render(
      <BrowserRouter>
        <InterviewCellMobile interview={interview} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Renders all information', () => {
    expect(screen.getByText('Company: Error')).toBeInTheDocument();
    expect(
      screen.getByText(
        `Contact: ${interview.contact ? interview.contact : 'Unknown'}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Date: Jan. 5th')).toBeInTheDocument();
    expect(screen.getByText('Time: 12:30')).toBeInTheDocument();
  });

  it('Links to correct interview', () => {
    expect(screen.getByText('View Interview')).toHaveAttribute(
      'href',
      `/interviews/${interview.id}`
    );
  });
});
