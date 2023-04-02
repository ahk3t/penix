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

export const LineChart = () => {
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
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            data: [65, 59, 80, 81, 56, 55, 40],
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

export const DoughnutChart = () => {
  return (
    <Doughnut
      data={{
        datasets: [
          {
            data: [70],
            backgroundColor: "#f6f42f",
            hoverOffset: 2,
          },
        ],
      }}
      options={{
        circumference: 3.6 * 70,
      }}
    />
  );
};
