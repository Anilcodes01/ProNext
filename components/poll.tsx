'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import CreatePoll from './createPoll';
import { FaUserCircle } from "react-icons/fa";


interface PollOption {
  id: string;
  text: string;
}

interface PollCreator {
  name: string;
  image?: string; 
}

interface Poll {
  id: string;
  question: string;
  creator: PollCreator;
  createdAt: string;
  options: PollOption[];
}

export default function PollList() {
  const [polls, setPolls] = useState<Poll[]>([]); 
  const [loading, setLoading] = useState(true); 


  const fetchPolls = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Poll[]>('/api/polls'); 
      setPolls(response.data);
    } catch (error) {
      console.error('Error fetching polls:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleVote = async (optionId: string) => {
    try {
      await axios.post('/api/polls/vote', { optionId });
      alert('Vote submitted!');
    } catch (error) {
      console.error('Error voting:', error);
    }
  };


  const SkeletonLoader = () => (
    <div className="mb-8 border p-8 mt-4 rounded-lg animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="flex gap-2">
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="mt-4">
        <div className="h-10 bg-gray-300 rounded-full mb-2"></div>
        <div className="h-10 bg-gray-300 rounded-full mb-2"></div>
      </div>
    </div>
  );

  return (
    <div className='rounded-lg mt-4 text-black'>
      <CreatePoll onPollCreated={fetchPolls} /> 
      <div className='mt-8 text-2xl font-semibold'>
        Polls
      </div>
      
      {loading ? (
        <>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      ) : (
        polls.map((poll) => (
          <div key={poll.id} className="mb-8 border p-4 rounded-lg mt-4">
            {/* Poll Creator Details */}
            <div className="flex items-center gap-4 mb-4">
              {/* Display Avatar */}
              {poll.creator?.image ? (
                <Image
                  src={poll.creator.image}
                  alt={poll.creator.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <FaUserCircle size={36} className='text-gray-600' />
                </div>
              )}
              <div className='flex items-center text-center gap-2'>
               
                <p className="text-xl font-semibold">{poll.creator?.name}</p>
               
                <p className="text-xs mt-0.5 text-gray-600 ">
                  {formatDistanceToNow(new Date(poll.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>

            {/* Poll Question */}
            <h3 className="text-lg font-bold">{poll.question}</h3>

            {/* Poll Options */}
            <div className="mt-4">
              {poll.options.map((option) => (
                <button
                  className='border p-2 rounded-full mt-2 w-full text-start hover:bg-gray-200'
                  key={option.id}
                  onClick={() => handleVote(option.id)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
