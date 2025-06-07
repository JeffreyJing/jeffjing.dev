import Layout from "../components/Layout";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center pt-12 px-4">
      <h1 className="text-3xl font-bold text-center">
        Hi, I'm Jeffrey
      </h1>
      <h2 className="text-3xl font-bold text-center mt-4">
        I build fast, secure infrastructure.
      </h2>

      <div className="bg-black text-green-400 font-mono mt-6 px-4 pt-4 pb-2 rounded-3xl shadow-lg w-full max-w-4xl text-2xl leading-relaxed mb-32">
        <p>&gt; echo $TITLE</p>
        <p>DevOps Engineer / Infrastructure Builder</p>

        <p className="mt-4">&gt; env | grep -i TOOLCHAIN</p>
        <p>ToolChain: Version Control, GitLab CI, GitHub Actions, TeamCity, Prometheus, Grafana, Docker</p>

        <p className="mt-4">&gt; cat skills.txt</p>
        <p>Python, Java, Bash scripting, Linux</p>

        <p className="mt-4">&gt; ls ~/projects | head -3</p>
        <p>minikube-dashboard</p>
        <p>site-jeffjing.dev</p>
        <p>EKS & RDS via Terraform</p>

        <p className="mt-4">&gt; cat achievements.txt</p>
        <p>Bachelor's – University of Washington 2020</p>
        <p>Certified Kubernetes Administrator (CKA)</p>

        <p className="mt-4">&gt; cat upcoming_projects.txt</p>
        <p className="ml-4">1. Production-Grade K8s on AWS— real-world EKS deployment with Terraform, Prometheus, and Grafana</p>
        <p className="ml-4 mt-2">2. K8s Unpacked— blog series K8s under the hood</p>
      </div>
    </div>
  );
}
