import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  data: Record<string, string[]>;
}

const DEVICON_MAP: Record<string, string> = {
  Java: 'java',
  'Spring Boot': 'spring',
  'Node.js': 'nodejs',
  Python: 'python',
  Rust: 'rust',
  React: 'react',
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  HTML5: 'html5',
  CSS3: 'css3',
  'Tailwind CSS': 'tailwindcss',
  PostgreSQL: 'postgresql',
  Redis: 'redis',
  'Apache Kafka': 'apachekafka',
  RabbitMQ: 'rabbitmq',
  Docker: 'docker',
  Kubernetes: 'kubernetes',
  AWS: 'amazonwebservices',
  Git: 'git',
  Linux: 'linux',
  Nginx: 'nginx',
};

const DEVICON_VARIANT: Record<string, string> = {
  amazonwebservices: 'original-wordmark',
};

function getDeviconUrl(tech: string): string {
  const slug =
    DEVICON_MAP[tech] || tech.toLowerCase().replace(/[^a-z0-9]/g, '');
  const variant = DEVICON_VARIANT[slug] || 'original';
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-${variant}.svg`;
}

export default function TechStack({ data }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {Object.entries(data).map(([category, techs]) => (
        <div key={category}>
          <h4 className="mb-3 text-lg font-semibold text-black dark:text-white">
            {category}
          </h4>
          <div className="flex flex-wrap gap-3">
            {techs.map((tech) => (
              <motion.div
                key={tech}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-1 rounded-lg border border-gray-200 p-3 dark:border-gray-700 dark:bg-gray-800"
              >
                <img
                  src={getDeviconUrl(tech)}
                  alt={tech}
                  width={40}
                  height={40}
                  className="h-10 w-10"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
