import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [terminalSize, setTerminalSize] = useState("medium");

  const terminalSections = [
    { label: 'echo $TITLE', lines: ['DevOps Engineer - Kubernetes, Cloud Infrastructure & AI/ML Ops'] },
    { label: 'cat current_role.txt', lines: ['Ecoloai - DevOps Engineer (Jul 2025 – Present)', 'Running production Kubernetes, GPU inference pipelines (PyTorch/CUDA, ComfyUI), and the observability stack behind them'] },
    { label: 'env | grep -i TOOLCHAIN', lines: ['ToolChain: Kubernetes, Helm, ArgoCD, Docker, Terraform, LocalStack, GitHub Actions, GitLab CI, Prometheus, Grafana, Loki'] },
    { label: 'cat skills.txt', lines: ['DevOps: Kubernetes, Helm, Grafana, Prometheus, Docker, GitHub Actions, GitLab CI, Terraform, Loki', 'AWS: EC2, S3, Lambda, EKS, RDS, Fargate, Route53, Amplify, VPCs, IAM'] },
    { label: 'cat work_history.txt', lines: ['Ecoloai - DevOps Engineer (2025–Present)', 'Castle Hill Gaming - DevOps Engineer (2023–2024)', 'Ethfinity Studios - Software/DevOps Engineer (2021–2023)'] },
    { label: 'ls ~/projects | head -3', lines: ['site-jeffjing.dev', 'PokerNOWAI - EKS migration via Terraform', 'LancerPower - AWS + Amplify freelance build'] },
    { label: 'cat achievements.txt', lines: ["Bachelor's – University of Washington, 2020", 'Certified Kubernetes Administrator (CKA) – Feb 2025'] }
  ];

  const handleResizeClick = () => {
    setTerminalSize(prev => prev === "large" ? "small" : prev === "medium" ? "large" : "medium");
  };

  const widthClasses = {
    small: "w-full sm:max-w-xl md:max-w-2xl",
    medium: "w-full sm:max-w-md md:max-w-xl lg:max-w-3xl",
    large: "w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl"
  };

  const sizeClasses = {
    small: "text-base px-2 pt-2 pb-1",
    medium: "text-xl px-3 pt-3 pb-2",
    large: "text-2xl px-4 pt-4 pb-2"
  };

  return (
    <div className="w-full flex flex-col items-center pt-12 px-4">
      <h1 className="text-3xl font-bold text-center">Hi, I'm Jeffrey</h1>
      <img
        src="/images/pfp.png"
        alt="Jeffrey Jing"
        className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover mt-6 shadow-lg ring-2 ring-white/20"
      />
      <h2 className="text-3xl font-bold text-center mt-6">I'm a Kubernetes and AWS specialist.</h2>

      <div className={`bg-black text-green-400 font-mono mt-6 shadow-lg leading-relaxed mb-32 overflow-hidden ${widthClasses[terminalSize]} rounded-2xl`}>
        <div className={`flex items-center justify-start gap-2 px-4 h-8 bg-gray-200 ${isMinimized ? 'rounded-t-2xl rounded-b-none' : 'rounded-t-2xl'}`}>
          <div className="w-4 h-4 bg-yellow-400 rounded-full relative group cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
            <span className="absolute inset-0 hidden group-hover:flex items-center justify-center text-sm text-black font-bold">–</span>
          </div>
          <div className="w-4 h-4 bg-green-400 rounded-full relative group cursor-pointer" onClick={handleResizeClick}>
            <span className="absolute inset-0 hidden group-hover:flex items-center justify-center text-sm text-black font-bold">+</span>
          </div>
        </div>

        {isMinimized ? (
          <div className="text-white bg-black text-center py-2 cursor-pointer text-xl font-bold" onClick={() => setIsMinimized(false)}>Click to Expand</div>
        ) : (
          <div className={`${sizeClasses[terminalSize]}`}>
            {terminalSections.map((section, i) => (
              <div key={i} className={i !== 0 ? "mt-4" : ""}>
                <p>&gt; {section.label}</p>
                {section.lines.map((line, j) => <p key={j}>{line}</p>)}
              </div>
            ))}
            <div className="mt-4 mb-1 flex items-center">
              <span>visitor@jeffjing.dev ~ %</span>
              <span className="ml-2 w-[10px] h-[20px] bg-green-400 animate-blink"></span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-900 text-white mt-[-24px] px-6 py-6 rounded-2xl shadow-lg w-full max-w-3xl text-xl leading-relaxed text-center mb-32">
        <p className="mb-4">I specialize in building reliable, scalable infrastructure for modern cloud-native applications - clean automation, resilient CI/CD, and systems that are easy to maintain long after I've shipped them.</p>
        <p className="mb-4 font-semibold">And yes, I'm actively seeking new opportunities in the DevOps and cloud infrastructure space!</p>
        <p className="mb-4">
          <a
            href="/resume.pdf"
            download
            className="text-green-400 underline hover:text-green-300"
          >
            Click to grab a copy of my resume.
          </a>
        </p>

        <p className="mb-4">Feel free to look around and <Link to="/about" className="text-green-400 underline hover:text-green-300">get to know me</Link>!</p>
        <p>
          <span className="font-semibold">Are you considering me for a role?</span> Feel free to visit the{" "}
          <Link to="/for-recruiters" className="text-green-400 underline hover:text-green-300">
            recruiter page
          </Link>{" "}
          I designed just for you!
        </p>
      </div>
    </div>
  );
}
