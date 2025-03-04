import { useGetNumberOfDealershipsByStateQuery } from '../api/DealershipsApi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const { data: numberOfDealershipsByState = [] } = useGetNumberOfDealershipsByStateQuery();

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const doughnutChartData = {
    labels: numberOfDealershipsByState.map(item => item[0]),
    datasets: [
      {
        label: "Number of Dealerships by State",
        data: numberOfDealershipsByState.map(item => item[1]),
        backgroundColor: [
          'rgba(255, 159, 64, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 99, 132, 0.4)',
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={doughnutChartData} options={options} />
}

export default DoughnutChart;