"use client";
import { useRouter } from "next/navigation";
import { FaCode } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full z-50 h-16 text-black flex items-center justify-between border-b bg-white/90 backdrop-blur-sm"
      >
        <motion.div
          {...fadeIn}
          className="text-2xl md:text-3xl ml-4 md:ml-8 cursor-pointer font-bold"
        >
          ProNext
        </motion.div>

        <button className="md:hidden mr-4 p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <motion.div {...fadeIn} className="hidden md:flex gap-8 lg:gap-10">
          <button
            onClick={() => {
              router.push("/aboutUs");
            }}
            className="hover:text-green-700 transition-colors"
          >
            Features
          </button>
          <button className="hover:text-green-700 transition-colors">
            Community
          </button>
          <button className="hover:text-green-700 transition-colors">
            Blog
          </button>
        </motion.div>

        <motion.div {...fadeIn} className="hidden md:block">
          <button
            onClick={() => router.push("/auth/signin")}
            className="bg-green-600 hover:bg-green-700 transition-colors rounded-full px-6 py-2 mr-8 text-sm text-white"
          >
            Sign in
          </button>
        </motion.div>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-16 bg-gradient-to-b from-sky-100 to-white min-h-[80vh] flex justify-center items-center px-4 md:px-8"
      >
        <div className="flex flex-col justify-center items-center max-w-4xl mx-auto text-center">
          <motion.h1
            {...fadeIn}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            Connect, Collaborate, <span className="text-green-600">Code</span>
          </motion.h1>
          <motion.p
            {...fadeIn}
            className="text-lg md:text-xl mt-6 text-gray-600 max-w-2xl"
          >
            Join the ultimate developer community. Network, share knowledge, and
            build amazing projects together.
          </motion.p>
          <motion.div
            {...fadeIn}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => {
                router.push("/auth/signup");
              }}
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 text-lg transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => {
                router.push("/aboutUs");
              }}
              className="rounded-full hover:bg-slate-100 border-2 border-green-500 px-8 py-3 text-lg transition-colors"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </motion.div>

      <motion.section
        {...fadeIn}
        className="py-20 px-4 md:px-8 max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Why Choose ProNext?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <motion.div
            whileHover={{ y: -10 }}
            className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex flex-col items-center text-center">
              <MdOutlinePeopleAlt size={50} className="mb-4 text-green-600" />
              <h3 className="text-xl font-bold mb-3">Global Network</h3>
              <p className="text-gray-600">
                Connect with developers from around the world and expand your
                professional network.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex flex-col items-center text-center">
              <FiMessageSquare size={50} className="mb-4 text-green-600" />
              <h3 className="text-xl font-bold mb-3">Knowledge Sharing</h3>
              <p className="text-gray-600">
                Engage in discussions, ask questions, and share your expertise
                with the community.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex flex-col items-center text-center">
              <FaCode size={50} className="mb-4 text-green-600" />
              <h3 className="text-xl font-bold mb-3">Collaborative Coding</h3>
              <p className="text-gray-600">
                Find partners for your projects or contribute to open-source
                initiatives.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="bg-gradient-to-r from-green-900 to-green-800 py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-16">
            Community Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
            >
              <p className="text-xl font-bold text-green-300">Active Members</p>
              <p className="text-4xl md:text-5xl mt-2 mb-3 font-bold text-white">
                10,000+
              </p>
              <p className="text-green-100">
                Developers actively participating in discussions and projects.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
            >
              <p className="text-xl font-bold text-green-300">
                Projects Launched
              </p>
              <p className="text-4xl md:text-5xl mt-2 mb-3 font-bold text-white">
                500+
              </p>
              <p className="text-green-100">
                Successful collaborations and open-source projects initiated.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        {...fadeIn}
        className="py-20 px-4 md:px-8 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to join the community?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Sign up now and start connecting with fellow developers!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            className="border-2 border-gray-200 p-3 w-full sm:w-96 outline-none rounded-lg focus:border-green-500 transition-colors"
            type="email"
            placeholder="Enter your email"
          />
          <button
            onClick={() => router.push("/auth/signup")}
            className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg text-white transition-colors"
          >
            Get Started
          </button>
        </div>
      </motion.section>

      <footer className="bg-green-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold">ProNext</h2>
              <p className="mt-2 text-green-200">
                &copy; 2024 Devs.Inc. All rights reserved
              </p>
            </div>
            <div className="flex gap-8">
              <button className="hover:text-green-300 transition-colors">
                Terms
              </button>
              <button className="hover:text-green-300 transition-colors">
                Privacy
              </button>
              <button className="hover:text-green-300 transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
