import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const { signIn, signInWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { mutateAsync } = useMutation({
    mutationFn: async (userInfo) => {
      const { data } = await axiosPublic.post(
        "https://server-five-omega-98.vercel.app/users",
        userInfo
      );
      console.log(data);
    },
    onSuccess: async () => {
      await navigate(from);
      toast.success("Sign up Successful");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await signIn(data.email, data.pass);
      navigate(from);
      toast.success("Sign in successful");
    } catch (err) {
      console.log(err);
    }
  };
  const handleGoogleSingIn = async () => {
    try {
      const result = await signInWithGoogle();
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
        role: "user",
        badge: "bronze",
      };
      console.log(userInfo);
      await mutateAsync(userInfo);
      toast.success("Sign in successful");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen max-w-lg  mx-auto">
      <div className="flex w-full flex-col  p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">Login to access your account</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#70e000] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
              {errors.email && (
                <span className="text-red-green">This field is required</span>
              )}
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                id="password"
                required
                placeholder="*******"
                {...register("pass", { required: true })}
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#70e000]
                bg-gray-200 text-gray-900"
              />
              {errors.email && (
                <span className="text-red-green">This field is required</span>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#70e000] w-full rounded-md py-3 text-white"
            >
              Continue
            </button>
          </div>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button
          onClick={handleGoogleSingIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/register"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
