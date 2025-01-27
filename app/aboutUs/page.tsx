"use client";
import { useRouter } from "next/navigation";
import {
  FaCode,
  FaBookmark,
  FaLightbulb,
  FaUsers,
  FaRocket,
} from "react-icons/fa";
import { FiMessageSquare, FiTarget, FiAward } from "react-icons/fi";
import { MdTrendingUp, MdWorkspaces } from "react-icons/md";
import { motion } from "framer-motion";

export default function AboutUs() {
  const router = useRouter();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 pb-12 to-white overflow-auto hide-scrollbar h-screen">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full z-50 h-16 text-black flex items-center justify-between border-b bg-white/90 backdrop-blur-sm"
      >
        <motion.div
          {...fadeIn}
          className="text-2xl md:text-3xl ml-4 md:ml-8 cursor-pointer font-bold text-green-600"
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
          <button className="hover:text-green-700 transition-colors">
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
        className="pt-28 md:pt-32 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
            About Us
          </h1>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              Welcome to ProNext
            </h2>
            <p className="text-gray-600 leading-relaxed">
              ProNext is a dynamic social platform created exclusively for
              developers and tech enthusiasts. We believe in building a vibrant
              community where knowledge, creativity, and inspiration flourish.
            </p>
          </div>
        </motion.div>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <FiTarget className="text-4xl text-green-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Our Vision
              </h2>
            </div>
            <motion.div
              variants={cardVariants}
              className="grid md:grid-cols-3 gap-8"
            >
              <div className="bg-green-50 p-6 rounded-xl">
                <FaUsers className="text-3xl text-green-600 mb-4" />
                <p className="text-gray-700">
                  Network seamlessly with like-minded developers worldwide
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <FaRocket className="text-3xl text-green-600 mb-4" />
                <p className="text-gray-700">
                  Foster collaborations that lead to groundbreaking projects
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <FaLightbulb className="text-3xl text-green-600 mb-4" />
                <p className="text-gray-700">
                  Promote continuous learning through knowledge sharing
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Core Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              variants={cardVariants}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <FiMessageSquare className="text-3xl text-green-600 mb-4" />
              <h3 className="text-xl  text-gray-800  font-bold mb-3">
                Share and Discover
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Share posts, articles, and experiences</li>
                <li>• Engage with a supportive community</li>
                <li>• Discover innovative ideas</li>
              </ul>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <FaCode className="text-3xl text-green-600 mb-4" />
              <h3 className="text-xl  text-gray-800 font-bold mb-3">
                Tech Stack Showcases
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Display your technical expertise</li>
                <li>• Organize your skills visually</li>
                <li>• Easy profile updates</li>
              </ul>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <FaBookmark className="text-3xl text-green-600 mb-4" />
              <h3 className="text-xl text-gray-800  font-bold mb-3">
                Resource Library
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Bookmark valuable articles</li>
                <li>• Organize learning materials</li>
                <li>• Quick access to resources</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-green-800 to-green-700 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-8">Why ProNext?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                variants={cardVariants}
                className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
              >
                <MdWorkspaces className="text-3xl mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  Skill-Based Networking
                </h3>
                <p className="text-green-100">
                  Connect with professionals who share your passions and
                  technologies.
                </p>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
              >
                <MdTrendingUp className="text-3xl mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  Showcase Your Journey
                </h3>
                <p className="text-green-100">
                  Tell your story as a developer, from first project to latest
                  achievements.
                </p>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
              >
                <FiAward className="text-3xl mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  Collaborative Environment
                </h3>
                <p className="text-green-100">
                  Foster a culture of support where feedback is constructive and
                  innovation thrives.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              ProNext was born out of the belief that developers need a space
              designed for them – a platform where their skills are celebrated,
              and their voices are amplified. Inspired by the challenges and
              triumphs of the programming journey, we built a community-driven
              app that resonates with our collective experiences.
            </p>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Join Us!
              </h3>
              <p className="text-gray-600 mb-8">
                Be part of the ProNext community. Create, share, connect, and
                grow with developers from around the globe.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
                onClick={() => router.push("/auth/signup")}
              >
                Join ProNext Today
              </motion.button>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
