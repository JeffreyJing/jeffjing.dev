import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'jeffjing.dev',
    image: '/images/site-image.png',
    description: (
      <>
        <p>Personal portfolio site built with React, TailwindCSS, AWS Amplify, and Terraform. Fully automated deployment and custom recruiter features.</p>
        <div className="mt-2">
          🔗 <a href="https://github.com/JeffreyJing/jeffjing.dev/tree/dev/site" target="_blank" className="underline text-green-400 hover:text-green-300">Site</a>{' | '}
          <a href="https://github.com/JeffreyJing/jeffjing.dev/tree/dev/terraform" target="_blank" className="underline text-green-400 hover:text-green-300">Terraform</a>
        </div>
      </>
    ),
  },
  {
    id: 2,
    title: 'Minikube Dashboard',
    image: '/images/minikube-image.png',
    description: (
      <>
        <p>A dashboard of my Minikube state powered by Flask and React. Hosted on GitHub Pages.</p>
        <div className="mt-2">
          🔗 <a href="https://jeffreyjing.github.io/minikube-dashboard/" target="_blank" className="underline text-green-400 hover:text-green-300">Site</a>{' | '}
          <a href="https://github.com/JeffreyJing/minikube-dashboard?tab=readme-ov-file" target="_blank" className="underline text-green-400 hover:text-green-300">GitHub</a>
        </div>
      </>
    ),
  },
  {
    id: 3,
    title: 'Terraform AWS Infra',
    image: '/images/terraform-aws.webp',
    description: (
      <>
        <p>Modular infrastructure-as-code for provisioning VPC, EC2, RDS, and EKS using Terraform. Includes dev & prod environments via separate tfvars.</p>
        <div className="mt-2">
          🔗 <a href="https://github.com/JeffreyJing/Terraform" target="_blank" className="underline text-green-400 hover:text-green-300">GitHub</a>
        </div>
      </>
    ),
  },
  {
    id: 4,
    title: 'DevOps for PokerNOWAI',
    image: '/images/pokernowai.png',
    description: (
      <>
        <p>[In Progress] EKS-based infrastructure for Dockerized Flask microservices. Built with Terraform, Istio, and GitHub Actions CI/CD; images pushed to GCR.</p>
        <div className="mt-2">
          <p>🔗 Links coming soon!</p>
        </div>
      </>
    ),
  },
];

export default function ProjectsCarousel() {
  /* ---------- desktop carousel state ---------- */
  const [index, setIndex] = useState(0);
  const next = () => setIndex((index + 1) % projects.length);
  const prev = () => setIndex((index - 1 + projects.length) % projects.length);
  const getProject = (o) =>
    projects[(index + o + projects.length) % projects.length];

  return (
    <>
      <h1 className="text-6xl font-extrabold text-center mt-12 mb-6 text-white">
        My Projects
      </h1>
      <p className="text-lg text-center max-w-3xl mx-auto text-gray-300 mb-12 px-4">
        DevOps-focused projects spanning IaC, CI/CD, Kubernetes, and
        observability. More cards coming soon—click any project to explore.
      </p>

      {/* ---------- MOBILE: vertical cards ---------- */}
      <div className="sm:hidden flex flex-col gap-8 px-4 mb-24">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-gray-900 rounded-3xl p-6 border-4 border-white text-white shadow-xl"
          >
            <img
              src={p.image}
              alt={p.title}
              className="rounded-xl w-full h-48 object-contain mb-6"
            />
            <h2 className="text-3xl font-bold mb-4">{p.title}</h2>
            <div className="text-lg leading-relaxed break-words">
              {p.description}
            </div>
          </div>
        ))}
      </div>

      {/* ---------- DESKTOP: carousel ---------- */}
      <div className="hidden sm:flex relative w-full h-[700px] items-center justify-center overflow-hidden mb-24">
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={index}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0 }}
              className="z-10 w-3/5 h-full bg-gray-900 rounded-3xl p-6
                         border-4 border-white text-white shadow-xl absolute
                         overflow-hidden"
            >
              <img
                src={getProject(0).image}
                alt={getProject(0).title}
                className="rounded-xl w-full h-1/2 object-contain mb-6"
              />
              <h2 className="text-3xl font-bold mb-4">
                {getProject(0).title}
              </h2>
              <div className="text-lg leading-relaxed break-words max-h-[35%] overflow-y-auto scrollbar-thin scrollbar-thumb-white/30">
                {getProject(0).description}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* side cards */}
          <motion.div
            key={`prev-${index}`}
            onClick={prev}
            animate={{ x: '-140%', scale: 0.9, opacity: 0.7 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute w-2/5 h-[85%] bg-gray-900 rounded-2xl p-4
                       border border-white/20 text-white cursor-pointer overflow-hidden"
          >
            <img
              src={getProject(-1).image}
              alt={getProject(-1).title}
              className="rounded-xl w-full h-1/2 object-contain mb-6"
            />
            <h3 className="text-xl font-bold">{getProject(-1).title}</h3>
          </motion.div>

          <motion.div
            key={`next-${index}`}
            onClick={next}
            animate={{ x: '140%', scale: 0.9, opacity: 0.7 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute w-2/5 h-[90%] bg-gray-900 rounded-2xl p-4
                       border border-white/20 text-white cursor-pointer"
          >
            <img
              src={getProject(1).image}
              alt={getProject(1).title}
              className="rounded-xl w-full h-1/2 object-contain mb-6"
            />
            <h3 className="text-xl font-bold">{getProject(1).title}</h3>
          </motion.div>
        </div>
      </div>
    </>
  );
}
