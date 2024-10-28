// utils/getDeviconUrl.ts

export function getDeviconUrl(tech: string): string {
    const formattedTech = tech.toLowerCase().replace(/\s+/g, '-');
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${formattedTech}/${formattedTech}-original.svg`;
  }
  