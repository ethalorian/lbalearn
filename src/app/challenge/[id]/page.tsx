import { notFound } from 'next/navigation';
import CodeEditor from '@/app/components/CodeEditor';
import { challenges } from '@/lib/challenges';

export default function ChallengePage({ params }: { params: { id: string } }) {
  const challenge = challenges.find(c => c.id === params.id);
  
  if (!challenge) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4 pt-24">
      <h1 className="text-3xl font-bold mb-4">{challenge.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="prose max-w-none">
            <h2>Problem Description</h2>
            <p>{challenge.description}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Test Cases</h2>
            <div className="space-y-2">
              {challenge.testCases.map((test, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded">
                  <p><strong>Input:</strong> {JSON.stringify(test.input)}</p>
                  <p><strong>Expected:</strong> {JSON.stringify(test.expected)}</p>
                  <p className="text-sm text-gray-600">{test.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <CodeEditor
          challenge={challenge}
          className="h-[calc(100vh-12rem)]"
        />
      </div>
    </div>
  );
}