import { useState } from "react";
import Layout from "../components/Layout";

export default function Home() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [terminalSize, setTerminalSize] = useState("medium");

  const terminalSections = [
    { label: 'echo $TITLE', lines: ['DevOps / Infrastructure / Automation Engineer'] },
    { label: 'env | grep -i TOOLCHAIN', lines: ['ToolChain: Version Control, GitLab CI, GitHub Actions, TeamCity, Prometheus, Grafana, Docker'] },
    { label: 'cat skills.txt', lines: ['Python', 'Java', 'Bash scripting', 'Linux'] },
    { label: 'ls ~/projects | head -3', lines: ['minikube-dashboard', 'site-jeffjing.dev', 'EKS & RDS via Terraform'] },
    { label: 'cat achievements.txt', lines: ["Bachelor's – University of Washington 2020", 'Certified Kubernetes Administrator (CKA)'] },
    { label: 'cat upcoming_projects.txt', lines: ['1. Production-Grade K8s on AWS— real-world EKS deployment with Terraform, Prometheus, and Grafana', '2. K8s Unpacked— blog series K8s under the hood'] }
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
      <h2 className="text-3xl font-bold text-center mt-4">I'm a Kubernetes and AWS specialist.</h2>

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
        <p className="mb-4">I specialize in building reliable, scalable infrastructure for modern cloud-native applications. I care about clean automation, robust CI/CD, and making things easy to maintain.</p>
        <p className="mb-4 font-semibold">And yes, I am currently looking for a job in the space!</p>
        <p className="mb-4">Feel free to look around and <a href="/about" className="text-green-400 underline hover:text-green-300">get to know me</a>!</p>
        <p><span className="font-semibold">Are you considering me for a role?</span> Feel free to visit the <a href="/for-recruiters" className="text-green-400 underline hover:text-green-300">recruiter page</a> I designed just for you!</p>
      </div>
    </div>
  );
}
