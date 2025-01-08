"use client";
import { useRouter } from "next/navigation";
import { FaCode } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  useEffect(() => {});
  return (
    <div className="bg-white text-black min-h-screen">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-16 text-black flex items-center justify-between border-b  bg-white"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0.4px)",
          }}
          className="text-3xl  ml-8 cursor-pointer font-bold "
        >
          ProNext
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0.4px)",
          }}
          className="flex  gap-10"
        >
          <button className="hover:text-green-700">Features</button>
          <button className="hover:text-green-700">Community</button>
          <button className="hover:text-green-700">Blog</button>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0.4px)",
          }}
        >
          <button
            onClick={() => {
              router.push("/auth/signin");
            }}
            className="bg-green-600 hover:bg-green-700 rounded-full p-2 w-24 mr-8 text-sm text-white "
          >
            Sign in
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0.5px)" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-sky-100 h-[60vh] flex justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="text-6xl text-center font-bold">
            Connect, Colaborate, Code{" "}
          </div>
          <div className="text-xl mt-4">
            Join the ultimate developer community. Network, share Knowledge,
          </div>
          <div className="text-xl">and build amazing projects together.</div>
          <div className="mt-6 flex gap-6">
            <button className="bg-green-600 hover:bg-green-700 text-white rounded-full w-32 p-2">
              Get Started
            </button>
            <button className="rounded-full hover:bg-slate-100  border-green-500 w-32 bg-white p-2 ">
              Learn More
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className=" h-[50vh] flex flex-col justify-center items-center px-6"
      >
        <div className="text-4xl font-semibold mb-8">Why Programher?</div>
        <div className=" grid grid-cols-1 sm:grid-cols-3 gap-20 w-full text-center">
          <div className="flex flex-col items-center">
            <MdOutlinePeopleAlt size={50} className="mb-4 text-green-700" />
            <p className="font-bold text-xl">Global Network</p>
            <p className="mt-2">
              Connect with developers from around the world and expand your
              professional network.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FiMessageSquare size={50} className="mb-4 text-green-700" />
            <p className="font-bold text-xl">Knowledge Sharing</p>
            <p className="mt-2">
              Engage in discussions, ask questions, and share your expertise
              with the community.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaCode size={50} className="mb-4 text-green-700" />
            <p className="font-bold text-xl">Collaborative Coding</p>
            <p className="mt-2">
              Find partners for your projects or contribute to open-source
              initiatives.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="bg-green-900 h-[50vh] flex flex-col justify-center items-center">
        <div className="text-white text-4xl font-bold">
          Community Highlights
        </div>
        <div className="text-white flex mt-10 w-full gap-6 justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-800 ml-12 w-full rounded-lg p-5"
          >
            <p className="text-xl font-bold">Active Members</p>
            <p className="text-5xl mt-1 mb-1 font-bold">10,000+</p>
            <p>
              Developers actively paritcipating in discussions and projects.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="bg-green-800 mr-12  w-full rounded-lg p-5"
          >
            <p className="text-xl font-bold">Projects Launched</p>
            <p className="text-5xl mt-1 mb-1 font-bold">500+</p>
            <p className="">
              Successful collaborations and open-source projects initiated.
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0.5px)" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white h-[40vh] flex flex-col gap-6 justify-center items-center"
      >
        <div className="text-3xl font-bold">Ready to join the community?</div>
        <div className="text-2xl">
          Sign up now and start connecting with felow developers!
        </div>
        <div className="flex  gap-6">
          <input
            className="border p-2 w-96 outline-none rounded-lg"
            type="text"
            placeholder="Enter your email"
          />
          <button
            onClick={() => {
              router.push("/auth/signup");
            }}
            className="bg-green-600 p-2  flex text-center item-center rounded-lg text-white"
          >
            Get Started
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1, filter: "blur(0.5px)" }}
        transition={{ duration: 0.5, delay: 1 }}
        className="bg-green-900 text-white  flex justify-between items-center h-[16vh]"
      >
        <div className="ml-8">
          <div className="text-4xl cursor-pointer font-bold">Programher</div>
          <div className="text-sm mt-1">
            &copy; 2024 Devs.Inc. All rights reserved
          </div>
        </div>
        <div className="flex gap-6 mr-12">
          <button className="hover:text-green-400">Terms</button>
          <button className="hover:text-green-400">Privacy</button>
          <button className="hover:text-green-400">Contact</button>
        </div>
      </motion.div>
    </div>
  );
}
