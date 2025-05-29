import { useGetNumberOfUsersByRoleQuery } from "../api/UsersApi";
import { mockUsersByRole } from "./chartMockData";
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
  const { data: numberOfUsersByRole = [], isLoading, error } = useGetNumberOfUsersByRoleQuery();
  
  // Use mock data if API fails or in development
  const chartData = error || numberOfUsersByRole.length === 0 ? mockUsersByRole : numberOfUsersByRole;

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const radarChartData = {
    labels: chartData.map(item => item[0]),
    datasets: [
      {
        label: "Number of Users by Role",
        data: chartData.map(item => item[1]),
        backgroundColor: 'rgba(143, 252, 179, 0.29)',
        borderColor: 'rgb(79, 211, 252)',
        borderWidth: 1,
      }
    ]
  };

  if (isLoading) return <div>Loading...</div>;

  return <Radar data={radarChartData} options={options} />;
};

export default RadarChart;
