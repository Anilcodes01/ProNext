"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        username,
        password,
      });

      if (response.status === 200) {
        toast.success("Signup successfull!", { position: "top-right" });

        const signInResponse = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (signInResponse && signInResponse.ok) {
          toast.success("Signed in successfully!", {
            position: "top-right",
          });
          router.push("/");
        }
      } else {
        toast.error("Error while signing in. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Error while signing up. Please try again.", {
        position: "top-right",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen  flex justify-center items-center">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white h-auto text-black lg:w-1/3  rounded-xl shadow-2xl p-10">
        <div className="text-4xl  text-left">Get Started Now</div>
        <div className="text-sm mt-1">
          Enter your credentials to create a new account
        </div>
        <div className="mt-8">
          <div className="flex flex-col w-full">
            <label className="font-medium text-sm" htmlFor="name">
              Name
            </label>
            <input
              value={name}
              className="rounded-xl text-black border text-sm  p-2 mb-4 w-full outline-none "
              type="text"
              placeholder="Enter your name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium text-sm" htmlFor="username">
              Username
            </label>
            <input
              value={username}
              className="rounded-xl text-black border text-sm  p-2 mb-4 w-full outline-none "
              type="text"
              placeholder="Enter your Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-sm" htmlFor="name">
              Email
            </label>
            <input
              value={email}
              className="rounded-xl border text-sm p-2 mb-4 outline-none "
              type="text"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-sm" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              className="rounded-xl p-2 text-sm border mb-6 outline-none "
              type="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex text-sm ">
            <input
              className="rounded-md p-1  outline-none  "
              type="checkbox"
              placeholder="Enter your password"
            />
            <p className="ml-1">I agree to the</p>
            <p className="underline ml-1">terms and policies</p>
          </div>
          <div className="mt-6">
            <button
              onClick={handleSignup}
              className="bg-green-700 text-white p-1 w-full rounded-lg"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </div>

          <div className="flex justify-center mt-8 mb-8">
            <p>or</p>
          </div>

          <div className="flex  text-sm gap-4 jusitfy-center">
            <button className="bg-white border p-1 w-full hover:bg-slate-100 rounded-lg">
              Sign in with Google
            </button>
            <button className="bg-white border p-1 w-full hover:bg-slate-100 rounded-lg">
              Sign in with Github
            </button>
          </div>
          <div className="flex text-sm justify-center mt-4">
            <p>Have an account?</p>
            <button
              onClick={() => {
                router.push("/auth/signin");
              }}
              className="ml-1 text-blue-700 font-medium"
            >
              Signin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
