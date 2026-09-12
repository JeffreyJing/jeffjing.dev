import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'jeffjing.dev',
    image: '/images/site-image.png',
    description: (
      <>
        <p>My personal portfolio, built with React, TailwindCSS, AWS Amplify, and Terraform - fully automated CI/CD, plus custom recruiter-facing features like an LLM-powered Q&A assistant and a feedback form backed by AWS Lambda.</p>
        <div className="mt-2">
          🔗 <a href="https://github.com/JeffreyJing/jeffjing.dev/tree/dev/site" target="_blank" className="underline text-green-400 hover:text-green-300">Site</a>{' | '}
          <a href="https://github.com/JeffreyJing/jeffjing.dev/tree/dev/terraform" target="_blank" className="underline text-green-400 hover:text-green-300">Terraform</a>
        </div>
      </>
    ),
  },

  {
    id: 5,
    title: 'LancerPower',
    image: '/images/lancerpower.png',
    description: (
      <>
        <p>Freelance build for a GPU hardware vendor - built and deployed a production website on AWS end-to-end, with Amplify CI/CD, Terraform-managed infrastructure, and Route53 DNS.</p>
        <div className="mt-2">
          🔗 <a href="https://lancerpower.us" target="_blank" className="underline text-green-400 hover:text-green-300">lancerpower.us</a>
        </div>
      </>
    ),
  },
  {
    id: 3,
    title: 'Minikube Dashboard',
    image: '/images/minikube-image.png',
    description: (
      <>
        <p>A real-time dashboard for my local Minikube cluster, powered by Flask and React and hosted on GitHub Pages - a lightweight way to check cluster health without reaching for kubectl.</p>
        <div className="mt-2">
          🔗 <a href="https://jeffreyjing.github.io/minikube-dashboard/" target="_blank" className="underline text-green-400 hover:text-green-300">Site</a>{' | '}
          <a href="https://github.com/JeffreyJing/minikube-dashboard?tab=readme-ov-file" target="_blank" className="underline text-green-400 hover:text-green-300">GitHub</a>
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
        <p>Migrated a Vercel-hosted monolithic app to containerized AWS EKS infrastructure - provisioned the environment with Terraform and stood up automated CI/CD deployments end to end.</p>
      </>
    ),
  },
  {
    id: 2,
    title: 'Terraform AWS Infra',
    image: '/images/terraform-aws.webp',
    description: (
      <>
        <p>Modular, reusable infrastructure-as-code for provisioning VPCs, EC2, RDS, and EKS with Terraform - separate dev and prod environments via dedicated tfvars for safe, repeatable deployments.</p>
        <div className="mt-2">
          🔗 <a href="https://github.com/JeffreyJing/Terraform" target="_blank" className="underline text-green-400 hover:text-green-300">GitHub</a>
        </div>
      </>
    ),
  },
  {
    id: 6,
    title: 'Slab Portfolio Tracker',
    image: '/images/slab-tracker-img.jpeg',
    description: (
      <>
        <span className="inline-block bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-wide uppercase px-2 py-1 rounded-full mb-2">
          In Progress
        </span>
        <p>A portfolio tracker for graded card ("slab") collections - add a card by its PSA cert number and pull live pricing, last 5 sales, and average sale price. Building this for myself and the other repackers I work with, since that's exactly how our inventory gets priced.</p>
      </>
    ),
  },
];

const cardGradients = [
  "from-emerald-900 via-gray-900 to-slate-900",
  "from-indigo-900 via-gray-900 to-slate-900",
  "from-fuchsia-900 via-gray-900 to-slate-900",
  "from-amber-900 via-gray-900 to-slate-900",
];

const gradientFor = (project) => cardGradients[(project.id - 1) % cardGradients.length];

// Projects without a screenshot yet (still in progress) get a placeholder
// instead of a broken <img>, sized identically so the card layout stays consistent.
function ProjectThumb({ project, className }) {
  if (!project.image) {
    return (
      <div className={`${className} flex items-center justify-center bg-black/20 text-5xl`}>
        🚧
      </div>
    );
  }
  return <img src={project.image} alt={project.title} className={className} />;
}

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
        observability. More cards coming soon - click any project to explore.
      </p>

      {/* ---------- MOBILE: vertical cards ---------- */}
      <div className="sm:hidden flex flex-col gap-8 px-4 mb-24">
        {projects.map((p) => (
          <div
            key={p.id}
            className={`bg-gradient-to-br ${gradientFor(p)} rounded-3xl p-6 ring-1 ring-white/10 text-white shadow-xl shadow-black/30`}
          >
            <ProjectThumb project={p} className="rounded-xl w-full h-48 object-contain mb-6" />
            <h2 className="text-3xl font-bold mb-4">{p.title}</h2>
            <div className="text-lg leading-relaxed break-words">
              {p.description}
            </div>
          </div>
        ))}
      </div>

      {/* ---------- DESKTOP: carousel ---------- */}
      <div className="hidden sm:block mb-24">
        <div className="relative w-full h-[700px] flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className={`z-10 w-3/5 h-full bg-gradient-to-br ${gradientFor(getProject(0))} rounded-3xl p-6
                           ring-1 ring-white/10 text-white shadow-2xl shadow-black/40 absolute
                           overflow-hidden`}
              >
                <ProjectThumb project={getProject(0)} className="rounded-xl w-full h-1/2 object-contain mb-6" />
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
              whileHover={{ scale: 0.95, opacity: 0.9 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className={`absolute w-2/5 h-[85%] bg-gradient-to-br ${gradientFor(getProject(-1))} rounded-2xl p-4
                         ring-1 ring-white/10 text-white cursor-pointer overflow-hidden shadow-lg shadow-black/30`}
            >
              <ProjectThumb project={getProject(-1)} className="rounded-xl w-full h-1/2 object-contain mb-6" />
              <h3 className="text-xl font-bold">{getProject(-1).title}</h3>
            </motion.div>

            <motion.div
              key={`next-${index}`}
              onClick={next}
              animate={{ x: '140%', scale: 0.9, opacity: 0.7 }}
              whileHover={{ scale: 0.95, opacity: 0.9 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className={`absolute w-2/5 h-[90%] bg-gradient-to-br ${gradientFor(getProject(1))} rounded-2xl p-4
                         ring-1 ring-white/10 text-white cursor-pointer overflow-hidden shadow-lg shadow-black/30`}
            >
              <ProjectThumb project={getProject(1)} className="rounded-xl w-full h-1/2 object-contain mb-6" />
              <h3 className="text-xl font-bold">{getProject(1).title}</h3>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === index ? "bg-green-400" : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
