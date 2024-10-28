// components/TechStackSelector.tsx

import { useState } from 'react';
import axios from 'axios';

type TechStackSelectorProps = {
  userId: string;
  onAddTech: (tech: string) => void;
};

export default function TechStackSelector({ userId, onAddTech }: TechStackSelectorProps) {
  const [query, setQuery] = useState<string>('');
  const techSuggestions = ['React', 'Node.js', 'JavaScript', 'Python', 'TypeScript', 'Django', 'Vue.js'];

  const filteredTechs = techSuggestions.filter((tech) =>
    tech.toLowerCase().includes(query.toLowerCase())
  );

  async function handleAddTech(tech: string) {
    try {
      await axios.post('/api/user/techstack', { userId, tech });
      onAddTech(tech);
    } catch (error) {
      console.error('Failed to add technology', error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search technologies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filteredTechs.map((tech) => (
          <li key={tech} onClick={() => handleAddTech(tech)}>
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}
