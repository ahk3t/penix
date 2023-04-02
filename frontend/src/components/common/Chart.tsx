import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title
);

export const LineChart = ({ data }) => {
  const labels = data?.map((item) => item.ds);
  const datasets = data?.map((item) => item.trend);

  return (
    <Line
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
      data={{
        labels: labels,
        datasets: [
          {
            data: datasets,
            fill: false,
            borderColor: "#f6f42f",
            tension: 0.1,
          },
        ],
      }}
      // {...props}
    />
  );
};

export const DoughnutChart = ({ value }) => {
  return (
    <Doughnut
      data={{
        datasets: [
          {
            data: [value || 0],
            backgroundColor: "#f6f42f",
            hoverOffset: 2,
          },
        ],
      }}
      options={{
        circumference: 3.6 * (value || 0),
      }}
    />
  );
};
