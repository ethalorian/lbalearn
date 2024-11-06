
import ChallengeList from '../components/ChallengeList';
import { challenges } from '@/lib/challenges';

export default function Home() {
  return (
    <main className="container mx-auto p-4 pt-24">
      <h1 className="text-4xl font-bold mb-8">Code Challenges</h1>
      <ChallengeList challenges={challenges} />
    </main>
  );
}