import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { testApplications } from '../../../util/testData';
import ApplicationCellDesktop from '../../../../components/Preview/Desktop/ApplicationCell';

describe('ApplicationCellDesktop testing', () => {
  const application = testApplications[0];

  const getDateDiff = (date: Date) => {
    const diffDays = Math.floor(
      (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    const diffMonths = Math.floor(diffDays / 30);

    const diffWeeks = Math.floor(diffDays / 7);

    if (diffMonths != 0) return [diffMonths, 'months'];
    else if (diffWeeks != 0) return [diffWeeks, 'weeks'];
    else if (diffDays != 0) return [diffDays, 'days'];
    else return null;
  };

  beforeEach(() => {
    // BrowserRouter just makes sure Link components can be checked
    render(
      <BrowserRouter>
        <ApplicationCellDesktop application={application} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Renders all information', () => {
    const dateDiff = getDateDiff(application.applyDate);
    expect(screen.getByText(application.company));
    expect(screen.getByText(application.positionTitle));
    expect(
      screen.getByText(dateDiff ? `${dateDiff[0]} ${dateDiff[1]} ago` : 'Today')
    );
    expect(screen.getByText('Offered')).toBeInTheDocument();
  });

  it('Links to correct application', () => {
    expect(screen.getByText('Go to Application')).toHaveAttribute(
      'href',
      `/applications/${application.id}`
    );
  });
});
