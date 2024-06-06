import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ReportedComments = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reports = [] } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/reports");
      return data;
    },
  });
  return (
    <div className="my-20">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Report Activities</h1>
      </div>
      <div className="my-10">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Reporter</th>
                <th>Reported Comment</th>
                <th>Report</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports?.map((report, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{report.Reporter}</td>
                  <td>{report.commentText}</td>
                  <td>{report.ReportText}</td>
                  <td>
                    <button 
                    
                     className="bg-red-500 text-white px-3 py-1 rounded-md">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportedComments;
