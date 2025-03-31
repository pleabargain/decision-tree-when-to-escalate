import { useState } from 'react';
import Head from 'next/head';
import { DecisionTree, DecisionTreeNode } from '@/lib/supabase';

// This is a mock decision tree for development purposes
// In production, this would be fetched from Supabase
const mockDecisionTree: DecisionTree = {
  tree_id: 'escalation_decision_tree_v1',
  name: 'Issue Escalation Decision Tree',
  description: 'Determines whether an issue should be escalated to management',
  version: '1.0',
  root_node_id: 'q1',
  nodes: {
    'q1': {
      id: 'q1',
      type: 'question',
      text: 'What is the severity level of the issue?',
      help_text: 'Consider the impact on business operations, customers, or employees',
      options: [
        {
          text: 'Critical - Severe impact on business operations',
          next_node_id: 'q2_critical',
        },
        {
          text: 'High - Significant impact but workarounds exist',
          next_node_id: 'q2_high',
        },
        {
          text: 'Medium - Limited impact on specific functions',
          next_node_id: 'q2_medium',
        },
        {
          text: 'Low - Minimal impact, mostly inconvenience',
          next_node_id: 'q3_low',
        },
      ],
    },
    'q2_critical': {
      id: 'q2_critical',
      type: 'question',
      text: 'Is the issue affecting multiple departments or teams?',
      options: [
        {
          text: 'Yes',
          next_node_id: 'r1_escalate',
        },
        {
          text: 'No',
          next_node_id: 'q3_critical',
        },
      ],
    },
    'q3_critical': {
      id: 'q3_critical',
      type: 'question',
      text: 'Do you have the authority to resolve this issue?',
      options: [
        {
          text: 'Yes',
          next_node_id: 'r2_handle',
        },
        {
          text: 'No',
          next_node_id: 'r1_escalate',
        },
      ],
    },
    'q2_high': {
      id: 'q2_high',
      type: 'question',
      text: 'Is this issue time-sensitive (needs resolution within 24 hours)?',
      options: [
        {
          text: 'Yes',
          next_node_id: 'q3_high_urgent',
        },
        {
          text: 'No',
          next_node_id: 'q3_high_normal',
        },
      ],
    },
    'q3_high_urgent': {
      id: 'q3_high_urgent',
      type: 'question',
      text: 'Do you have all the resources needed to resolve this issue?',
      options: [
        {
          text: 'Yes',
          next_node_id: 'r2_handle',
        },
        {
          text: 'No',
          next_node_id: 'r1_escalate',
        },
      ],
    },
    'q3_high_normal': {
      id: 'q3_high_normal',
      type: 'question',
      text: 'Does this issue involve a key client or high-value project?',
      options: [
        {
          text: 'Yes',
          next_node_id: 'r1_escalate',
        },
        {
          text: 'No',
          next_node_id: 'r2_handle',
        },
      ],
    },
    'q2_medium': {
      id: 'q2_medium',
      type: 'question',
      text: 'Has this issue occurred before?',
      options: [
        {
          text: 'Yes, frequently',
          next_node_id: 'r1_escalate',
        },
        {
          text: 'Yes, but rarely',
          next_node_id: 'r2_handle',
        },
        {
          text: 'No, this is the first time',
          next_node_id: 'q3_medium',
        },
      ],
    },
    'q3_medium': {
      id: 'q3_medium',
      type: 'question',
      text: 'Could this issue potentially grow in severity if not addressed properly?',
      options: [
        {
          text: 'Yes',
          next_node_id: 'r1_escalate',
        },
        {
          text: 'No',
          next_node_id: 'r2_handle',
        },
      ],
    },
    'q3_low': {
      id: 'q3_low',
      type: 'question',
      text: 'Is this issue part of a pattern of similar issues?',
      options: [
        {
          text: 'Yes',
          next_node_id: 'r1_escalate',
        },
        {
          text: 'No',
          next_node_id: 'r2_handle',
        },
      ],
    },
    'r1_escalate': {
      id: 'r1_escalate',
      type: 'result',
      text: 'Based on your responses, this issue should be escalated to management after attempting direct resolution.',
      result: 'escalate',
      title: 'Escalate to Management',
      description: 'This issue requires management attention due to its severity, scope, or the authority needed to resolve it. However, it\'s important to first attempt direct communication with relevant parties before formal escalation.',
      next_steps: [
        'Attempt to contact the person or team directly responsible',
        'Document the issue details thoroughly, including your resolution attempts',
        'Prepare relevant data, evidence, and business impact assessment',
        'Contact your direct manager with a clear summary of the situation',
        'Be prepared to explain why the issue cannot be resolved at your level',
        'Schedule a meeting if necessary, with a proposed agenda',
      ],
    },
    'r2_handle': {
      id: 'r2_handle',
      type: 'result',
      text: 'Based on your responses, this issue can be handled at your level without management escalation.',
      result: 'handle',
      title: 'Handle at Current Level',
      description: 'This issue can be addressed without management escalation. Taking ownership of the resolution demonstrates initiative and helps maintain efficient workflow within the organization.',
      next_steps: [
        'Develop a clear plan for resolving the issue',
        'Communicate with all affected stakeholders about your approach',
        'Document your resolution process thoroughly',
        'Set a realistic deadline for resolution and track your progress',
        'Keep relevant team members informed of your progress',
        'Consider if this issue reveals any process improvements that could prevent similar issues',
        'Follow up after resolution to ensure the solution is working'
      ],
    },
  },
};

export default function Home() {
  const [currentNodeId, setCurrentNodeId] = useState<string>(mockDecisionTree.root_node_id);
  const [path, setPath] = useState<{ nodeId: string; answer: string }[]>([]);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const currentNode = mockDecisionTree.nodes[currentNodeId];

  const handleOptionSelect = (optionText: string, nextNodeId: string) => {
    setPath([...path, { nodeId: currentNodeId, answer: optionText }]);
    setCurrentNodeId(nextNodeId);

    if (mockDecisionTree.nodes[nextNodeId].type === 'result') {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentNodeId(mockDecisionTree.root_node_id);
    setPath([]);
    setIsComplete(false);
  };

  return (
    <>
      <Head>
        <title>Issue Escalation Decision Tree</title>
        <meta name="description" content="Determine whether to escalate an issue to management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <header className="bg-primary-700 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-0">Issue Escalation Decision Tree</h1>
          </div>
        </header>

        <main className="flex-grow container mx-auto p-4 md:p-8">
          <div className="max-w-3xl mx-auto">
            {/* Progress indicator */}
            {!isComplete && (
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-2">Question {path.length + 1}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full"
                    style={{ width: `${(path.length / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Question or Result card */}
            <div className="card mb-6">
              {currentNode.type === 'question' ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">{currentNode.text}</h2>
                  {currentNode.help_text && (
                    <p className="text-gray-600 mb-6 italic">{currentNode.help_text}</p>
                  )}
                  <div className="space-y-3">
                    {currentNode.options?.map((option) => (
                      <button
                        key={option.next_node_id}
                        className="btn-primary w-full text-left flex items-center justify-between"
                        onClick={() => handleOptionSelect(option.text, option.next_node_id)}
                      >
                        <span>{option.text}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`p-4 mb-6 rounded-lg ${
                      currentNode.result === 'escalate'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    <h2 className="text-xl font-bold mb-2">{currentNode.title}</h2>
                    <p>{currentNode.text}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Why this recommendation?</h3>
                    <p>{currentNode.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {currentNode.next_steps?.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className="btn-secondary mt-8 w-full"
                    onClick={handleReset}
                  >
                    Start Over
                  </button>
                </>
              )}
            </div>

            {/* Path history */}
            {path.length > 0 && !isComplete && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Your path so far:</h3>
                <ul className="space-y-2">
                  {path.map((item, index) => (
                    <li key={index} className="text-sm">
                      <span className="font-medium">
                        {mockDecisionTree.nodes[item.nodeId].text}
                      </span>
                      <span className="text-primary-600 ml-2">{item.answer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>

        <footer className="bg-gray-100 p-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Issue Escalation Tool</p>
        </footer>
      </div>
    </>
  );
}
