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
    title: "User Activities",
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
};

export default PieChar;
