
import LearningPlatform from "../components/LearningPlatform";
import { QuizBuilder } from "../components/QuizBuilder";

export default function LearningPathways() {
    return (
      <main className="min-h-screen pt-24"> {/* Added pt-24 for top padding */}
        <LearningPlatform />
        <QuizBuilder />
      </main>
    );
  }