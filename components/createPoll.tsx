'use client'
import { useState } from 'react';
import axios from 'axios';

export default function CreatePoll({ onPollCreated }: { onPollCreated: () => void }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleSubmit = async () => {
    if (question.trim() === '' || options.length < 2) {
      alert('Please provide a question and at least 2 options');
      return;
    }

    try {
      await axios.post('/api/polls/create', {
        question,
        options: options.filter((opt) => opt.trim() !== ''),
      });


      setQuestion('');            
      setOptions(['', '']);        
      
      onPollCreated();             
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };

  return (
    <div className='flex border p-4 rounded-lg flex-col'>
      <h2 className='text-2xl font-bold text-gray-700 mb-4'>Create Poll</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question"
        className='border p-2 mb-2 text-black rounded-md outline-none'
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          className='border mt-4 text-black rounded p-1 outline-none'
          onChange={(e) => handleOptionChange(index, e.target.value)}
          placeholder={`Option ${index + 1}`}
        />
      ))}
      <button className='bg-sky-200 text-black w-6 rounded-full mt-4' onClick={addOption}>+</button>
      <div className='flex flex-col items-end'>
        <button className='bg-sky-200 hover:bg-sky-300 items-end text-black p-1 w-16 rounded-full mt-4' onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
}
