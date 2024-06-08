import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://server-five-omega-98.vercel.app",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
