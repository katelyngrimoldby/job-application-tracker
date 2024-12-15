import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { useStateValue } from '../../state';

Chart.register(ArcElement, Tooltip, Legend);

const ApplicationPie = ({ data }: { data: Number[] }) => {
  const [{ theme }] = useStateValue();

  const chartData = {
    labels: ['Applied', 'Assessments', 'Interviews', 'Offers'],
    datasets: [
      {
        data,
        borderWidth: 2,
        backgroundColor: ['#005bd1', '#00a0d1', '#00d1b9', '#00d134'],
        borderColor: theme == 'dark' ? '#242831' : '#f2f6fc',
      },
    ],
  };

  const legendOptions = {
    color: theme == 'dark' ? '#f2f6fc' : '#242831',
  };

  return (
    <Pie
      data={chartData}
      options={{ plugins: { legend: { labels: legendOptions } } }}
    />
  );
};

export default ApplicationPie;
