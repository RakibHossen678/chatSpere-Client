import { Chart } from "react-google-charts";

const PieChar = ({ adminStats }) => {
  const { totalUsers, totalPosts, totalComments } = adminStats;
  const data = [
    ["Admin Data", "Count"],
    ["Users", totalUsers],
    ["Posts", totalPosts],
    ["Comments", totalComments],
  ];

  const options = {
    title: "User Activities Overview",
    is3D: true,
    pieHole: 0.4,
    slices: {
      0: { color: "#4285F4" },
      1: { color: "#EA4335" },
      2: { color: "#FBBC05" },
    },
    fontName: "Roboto",
    fontSize: 16,
    titleTextStyle: {
      color: "#333",
      fontSize: 20,
      bold: true,
    },
    legend: {
      position: "bottom",
      textStyle: {
        fontSize: 14,
        color: "#555",
      },
    },
    tooltip: {
      textStyle: {
        color: "#333",
        fontSize: 14,
      },
      showColorCode: true,
    },
    chartArea: {
      left: 30,
      top: 50,
      width: "100%",
      height: "75%",
    },
    backgroundColor: "#f9f9f9",
  };

  return (
    <div className="w-full h-full">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default PieChar;
