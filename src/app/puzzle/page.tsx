
import CodeChallenge from "../components/CodeChallenge";

export default function Puzzle() {
    return (
      <main className="min-h-screen bg-slate-50 py-24 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center">Code Challenge Platform</h1>
          <CodeChallenge />
        </div>
      </main>
    );
  }