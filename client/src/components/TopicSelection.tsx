import { useState } from 'react';
import { EssayType } from '../types';
import { SUGGESTED_TOPICS, ESSAY_TYPE_INFO } from '../data/topics';

interface TopicSelectionProps {
  essayType: EssayType;
  onTopicSelect: (topic: string) => void;
  onBack: () => void;
}

export const TopicSelection: React.FC<TopicSelectionProps> = ({ essayType, onTopicSelect, onBack }) => {
  const [customTopic, setCustomTopic] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const suggestedTopics = SUGGESTED_TOPICS.filter((t) => t.type === essayType);
  const essayInfo = ESSAY_TYPE_INFO[essayType];

  const handleCustomTopicSubmit = () => {
    if (customTopic.trim()) {
      onTopicSelect(customTopic.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <span>←</span>
          <span>Back to essay types</span>
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{essayInfo.title}</h1>
          <p className="text-lg text-gray-600">{essayInfo.description}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Topic</h2>

          <div className="space-y-4 mb-6">
            {suggestedTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => onTopicSelect(topic.title)}
                className="w-full text-left p-6 rounded-xl border-2 border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-all group"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                  {topic.title}
                </h3>
                <p className="text-gray-600">{topic.description}</p>
              </button>
            ))}
          </div>

          <div className="border-t-2 border-gray-200 pt-6">
            {!showCustomInput ? (
              <button
                onClick={() => setShowCustomInput(true)}
                className="w-full p-6 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary-400 hover:bg-primary-50 transition-all text-gray-600 hover:text-primary-600 font-semibold"
              >
                + Write about your own topic
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="custom-topic" className="block text-sm font-semibold text-gray-700 mb-2">
                    Enter your custom topic:
                  </label>
                  <input
                    id="custom-topic"
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCustomTopicSubmit()}
                    placeholder="e.g., My summer vacation experience"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none text-gray-900"
                    autoFocus
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleCustomTopicSubmit}
                    disabled={!customTopic.trim()}
                    className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Start Writing
                  </button>
                  <button
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomTopic('');
                    }}
                    className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-6 border-2 border-primary-200">
          <h3 className="font-semibold text-gray-900 mb-3">Tips for this essay type:</h3>
          <ul className="space-y-2">
            {essayInfo.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700">
                <span className="text-primary-600 font-bold">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
