import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Minikube Dashboard',
    image: '/images/project1.png',
    description: 'A React/Flask hybrid dashboard for monitoring a Minikube cluster.',
  },
  {
    id: 2,
    title: 'CI/CD Pipelines',
    image: '/images/project2.png',
    description: 'Fully automated GitLab pipeline with Docker, testing, and deployment.',
  },
  {
    id: 3,
    title: 'Terraform AWS Infra',
    image: '/images/project3.png',
    description: 'Modular Terraform for VPC, EC2, RDS, and EKS with best practices.',
  },
];

export default function ProjectsCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % projects.length);
  const prev = () => setIndex((index - 1 + projects.length) % projects.length);

  const getProject = (offset) => {
    const i = (index + offset + projects.length) % projects.length;
    return projects[i];
  };

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl z-20 bg-black rounded-full w-10 h-10 flex items-center justify-center border-none"
      >
        <span className="text-black">◀</span>
      </button>

      <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={index}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0 }}
            className="z-10 w-3/5 h-[90%] bg-gray-900 rounded-3xl p-6 border-4 border-white text-white shadow-xl absolute"
          >
            <img src={getProject(0).image} alt="current" className="rounded-xl w-full h-[50%] object-cover mb-4" />
            <h2 className="text-3xl font-bold mb-2">{getProject(0).title}</h2>
            <p className="text-lg leading-relaxed">{getProject(0).description}</p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          key={`prev-${index}`}
          animate={{ x: '-140%', scale: 0.9, opacity: 0.7 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute w-2/5 h-3/4 bg-gray-900 rounded-2xl p-4 border border-white/20 text-white"
        >
          <img src={getProject(-1).image} alt="prev" className="rounded-xl w-full h-1/2 object-cover mb-2" />
          <h3 className="text-xl font-bold">{getProject(-1).title}</h3>
        </motion.div>

        <motion.div
          key={`next-${index}`}
          animate={{ x: '140%', scale: 0.9, opacity: 0.7 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute w-2/5 h-3/4 bg-gray-900 rounded-2xl p-4 border border-white/20 text-white"
        >
          <img src={getProject(1).image} alt="next" className="rounded-xl w-full h-1/2 object-cover mb-2" />
          <h3 className="text-xl font-bold">{getProject(1).title}</h3>
        </motion.div>
      </div>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl z-20 bg-black rounded-full w-10 h-10 flex items-center justify-center border-none"
      >
        <span className="text-black">▶</span>
      </button>
    </div>
  );
}

