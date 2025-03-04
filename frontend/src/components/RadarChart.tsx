import { useGetNumberOfUsersByRoleQuery } from "../api/UsersApi";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const { data: numberOfUsersByRole = [] } = useGetNumberOfUsersByRoleQuery();

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const radarChartData = {
    labels: numberOfUsersByRole.map(item => item[0]),
    datasets: [
      {
        label: "Number of Users by Role",
        data: numberOfUsersByRole.map(item => item[1]),
        backgroundColor: 'rgba(143, 252, 179, 0.29)',
        borderColor: 'rgb(79, 211, 252)',
        borderWidth: 1,
      }
    ]
  };

  return <Radar data={radarChartData} options={options} />;
};

export default RadarChart;