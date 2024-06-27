import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

// Define the structure of your data
interface FormData {
  email: string;
  password: string;
}

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: (newData: FormData) => {
      return axios.post("http://localhost:3500/users", newData);
    },
    onSuccess: (data) => {
      console.log("User Created successfully:", data);
      // You can add additional logic here, like updating the UI or invalidating queries
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      // Handle the error, e.g., show an error message to the user
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    const newData: FormData = {
      // Your form data here
      email,
      password,
    };
    mutation.mutate(newData);
  };

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <img
        src="src/assets/logo-dark-text.png"
        alt=""
        className="relative mt-7 md:mt-0 mb-7 md:mb-0 md:absolute md:top-6 md:left-6"
      />
      <form
        action=""
        className="flex flex-col gap-y-4 w-screen md:w-[500px] h-screen md:h-[523px] shadow-[#E5E1E6] shadow-xl px-6 rounded-md"
      >
        <h1 className="text-3xl font-extrabold text-center mt-6 mb-2">
          CREATE AN ACCOUNT
        </h1>

        <button className="w-full border border-solid border-[#E5E1E6] p-2 rounded-md">
          Sign up with Google
        </button>

        <div className="flex items-center justify-evenly">
          <hr className="border-t-2 border-[#E5E1E6] my-4 w-[45%]" />
          <p className="text-center">or</p>
          <hr className="border-t-2 border-[#E5E1E6] my-4 w-[45%]" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[#808194]">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="border border-solid border-[#E5E1E6] p-2 rounded-md"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-[#808194]">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="border border-solid border-[#E5E1E6] p-2 rounded-md"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <input
          type="submit"
          value="Sign Up"
          className="bg-rose-600 p-4 rounded-md text-white font-bold text-center cursor-pointer hover:bg-rose-800"
          onClick={(e) => handleSubmit(e)}
        />
        <span>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold underline decoration-2 decoration-rose-600"
          >
            Login
          </Link>
        </span>
      </form>
    </main>
  );
};

export default Signup;
