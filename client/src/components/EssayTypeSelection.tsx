import React from 'react';
import { EssayType } from '../types';
import { ESSAY_TYPE_INFO } from '../data/topics';

interface EssayTypeSelectionProps {
  onSelect: (type: EssayType) => void;
}

const ESSAY_TYPES: EssayType[] = ['narrative', 'descriptive', 'compare-contrast', 'argumentative'];

const TYPE_COLORS = {
  narrative: 'from-purple-500 to-pink-500',
  descriptive: 'from-blue-500 to-cyan-500',
  'compare-contrast': 'from-green-500 to-teal-500',
  argumentative: 'from-orange-500 to-red-500',
};

const TYPE_ICONS = {
  narrative: '📖',
  descriptive: '🎨',
  'compare-contrast': '⚖️',
  argumentative: '💡',
};

export const EssayTypeSelection: React.FC<EssayTypeSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Angie<span className="text-primary-600">Writes</span>
          </h1>
          <p className="text-xl text-gray-600">Choose your essay type to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ESSAY_TYPES.map((type) => {
            const info = ESSAY_TYPE_INFO[type];
            return (
              <button
                key={type}
                onClick={() => onSelect(type)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-left border-2 border-transparent hover:border-primary-300 transform hover:-translate-y-1"
              >
                <div className={`absolute top-0 left-0 w-full h-2 rounded-t-2xl bg-gradient-to-r ${TYPE_COLORS[type]}`} />

                <div className="flex items-start gap-4">
                  <div className="text-5xl">{TYPE_ICONS[type]}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{info.description}</p>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700">Key Tips:</p>
                      <ul className="space-y-1">
                        {info.tips.slice(0, 3).map((tip, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-primary-500 mt-0.5">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end text-primary-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                  <span>Start writing</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-white rounded-xl shadow-md p-6 max-w-2xl">
            <p className="text-gray-700">
              <span className="font-semibold text-primary-600">New to essay writing?</span> Don't worry!
              Each essay type comes with suggested topics and helpful tips. You'll receive personalized feedback
              as you write to help improve your skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
