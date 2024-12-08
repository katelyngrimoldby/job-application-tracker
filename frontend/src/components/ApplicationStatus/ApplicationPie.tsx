import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const ApplicationPie = ({ data }: { data: Number[] }) => {
  const chartData = {
    labels: ['Applied', 'Assessments', 'Interviews', 'Offers'],
    datasets: [
      {
        data,
        borderWidth: 2,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default ApplicationPie;
