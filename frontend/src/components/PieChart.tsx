import { useGetNumberOfRentalsByCityQuery } from '../api/RentalsApi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { data: numberOfRentalsByCity = [] } = useGetNumberOfRentalsByCityQuery();

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const pieChartData = {
    labels: numberOfRentalsByCity.map(item => item[0]),
    datasets: [
      {
        label: "Number of Rentals by City",
        data: numberOfRentalsByCity.map(item => item[1]),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={pieChartData} options={options}/>;
}

export default PieChart;