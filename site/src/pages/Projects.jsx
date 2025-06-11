import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'jeffjing.dev',
    image: '/images/site-image.png',
    description: (
      <><p>Personal portfolio site built with React, TailwindCSS, AWS Amplify, and Terraform. Fully automated deployment and custom recruiter features.</p>
        <div className="mt-2">
          🔗 <a href="https://github.com/JeffreyJing/jeffjing.dev/tree/dev/site" target="_blank" className="underline text-green-400 hover:text-green-300">Site</a>{' | '}
          <a href="https://github.com/JeffreyJing/jeffjing.dev/tree/dev/terraform" target="_blank" className="underline text-green-400 hover:text-green-300">Terraform</a>
        </div></>
    ),
  },
  {
    id: 2,
    title: 'Minikube Dashboard',
    image: '/images/minikube-image.png',
    description: (
      <><p>A dashboard of my Minikube state powered by Flask and React. Hosted on GitHub Pages.</p>
        <div className="mt-2">
          🔗 <a href="https://jeffreyjing.github.io/minikube-dashboard/" target="_blank" className="underline text-green-400 hover:text-green-300">Site</a>{' | '}
          <a href="https://github.com/JeffreyJing/minikube-dashboard?tab=readme-ov-file" target="_blank" className="underline text-green-400 hover:text-green-300">GitHub</a>
        </div></>
    ),
  },
  {
    id: 3,
    title: 'Terraform AWS Infra',
    image: '/images/terraform-aws.webp',
    description: (
      <><p>Modular infrastructure-as-code for provisioning VPC, EC2, RDS, and EKS using Terraform. Includes both dev and prod environments via separate tfvars for flexible multi-stage deployment.</p>
        <div className="mt-2">
          🔗 <a href="https://github.com/JeffreyJing/Terraform" target="_blank" className="underline text-green-400 hover:text-green-300">GitHub</a>
        </div></>
    ),
  },
];

export default function ProjectsCarousel() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((index + 1) % projects.length);
  const prev = () => setIndex((index - 1 + projects.length) % projects.length);
  const getProject = (offset) => (projects[(index + offset + projects.length) % projects.length]);

  return (
    <>
      <h1 className="text-6xl font-extrabold text-center mt-12 mb-6 text-white">My Projects</h1>
      <p className="text-lg text-center max-w-3xl mx-auto text-gray-300 mb-12 px-4">
        This page showcases a curated set of DevOps-focused projects I've built—from infrastructure automation to CI/CD and observability. More carousel cards will be added as I complete more projects currently in the pipeline. Click on any card to explore!
      </p>
      <div className="relative w-full h-[600px] sm:h-[700px] flex items-center justify-center overflow-hidden mb-24">
        <div className="relative w-full max-w-5xl h-full sm:h-[95%] flex items-center justify-center">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={index}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0 }}
              className="z-10 w-3/5 h-full bg-gray-900 rounded-3xl p-6 border-4 border-white text-white shadow-xl absolute sm:overflow-hidden overflow-y-scroll box-border scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent"
            >
              <img src={getProject(0).image} alt="current" className="rounded-xl w-full h-[50%] object-contain mb-15" />
              <h2 className="text-3xl font-bold mb-4">{getProject(0).title}</h2>
              <p className="text-lg leading-relaxed overflow-hidden text-ellipsis break-words max-h-[60%]">
                {getProject(0).description}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            key={`prev-${index}`}
            onClick={prev}
            animate={{ x: '-140%', scale: 0.9, opacity: 0.7 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute w-2/5 h-[85%] sm:h-[95%] bg-gray-900 rounded-2xl p-4 border border-white/20 text-white cursor-pointer overflow-hidden"
          >
            <img src={getProject(-1).image} alt="prev" className="rounded-xl w-full h-1/2 object-contain mb-6" />
            <h3 className="text-xl font-bold">{getProject(-1).title}</h3>
          </motion.div>

          <motion.div
            key={`next-${index}`}
            onClick={next}
            animate={{ x: '140%', scale: 0.9, opacity: 0.7 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute w-2/5 h-3/4 sm:h-[90%] bg-gray-900 rounded-2xl p-4 border border-white/20 text-white cursor-pointer"
          >
            <img src={getProject(1).image} alt="next" className="rounded-xl w-full h-1/2 object-contain mb-6" />
            <h3 className="text-xl font-bold">{getProject(1).title}</h3>
          </motion.div>
        </div>
      </div>
    </>
  );
}