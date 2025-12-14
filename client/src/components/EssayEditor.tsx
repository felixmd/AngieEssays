import React, { useState } from 'react';
import { EssayType, EssayFeedback, FinalAssessment } from '../types';
import { FeedbackDisplay } from './FeedbackDisplay';

interface EssayEditorProps {
  essayType: EssayType;
  topic: string;
  onBack: () => void;
}

export const EssayEditor: React.FC<EssayEditorProps> = ({ essayType, topic, onBack }) => {
  const [content, setContent] = useState('');
  const [feedback, setFeedback] = useState<EssayFeedback | null>(null);
  const [finalAssessment, setFinalAssessment] = useState<FinalAssessment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;

  const handleCheckProgress = async () => {
    if (!content.trim() || wordCount < 50) {
      alert('Please write at least 50 words before checking your progress.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          essayType,
          topic,
          content,
          isFinal: false,
        }),
      });

      if (!response.ok) throw new Error('Failed to get feedback');

      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      console.error('Error getting feedback:', error);
      alert('Failed to get feedback. Please make sure the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalSubmission = async () => {
    if (!content.trim() || wordCount < 100) {
      alert('Please write at least 100 words before final submission.');
      return;
    }

    const confirmed = window.confirm(
      'Are you ready to submit your essay for final assessment? You can still check your progress if you want to make more improvements first.'
    );

    if (!confirmed) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          essayType,
          topic,
          content,
          isFinal: true,
        }),
      });

      if (!response.ok) throw new Error('Failed to get assessment');

      const data = await response.json();
      setFinalAssessment(data);
      setHasSubmitted(true);
    } catch (error) {
      console.error('Error getting assessment:', error);
      alert('Failed to get assessment. Please make sure the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNew = () => {
    if (window.confirm('Start a new essay? Your current work will be lost.')) {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                disabled={hasSubmitted}
              >
                ← Back
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AngieWrites</h1>
                <p className="text-sm text-gray-600">{topic}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{wordCount}</span> words • <span className="font-semibold">{charCount}</span> characters
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <label htmlFor="essay-content" className="block text-lg font-semibold text-gray-900 mb-4">
                Write Your Essay
              </label>
              <textarea
                id="essay-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={hasSubmitted}
                className="w-full h-[500px] p-4 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none resize-none font-serif text-lg leading-relaxed disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Start writing your essay here..."
              />

              {!hasSubmitted && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleCheckProgress}
                    disabled={isLoading || wordCount < 50}
                    className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? 'Analyzing...' : '🔍 Check My Progress'}
                  </button>
                  <button
                    onClick={handleFinalSubmission}
                    disabled={isLoading || wordCount < 100}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? 'Submitting...' : '✓ Final Submission'}
                  </button>
                </div>
              )}

              {hasSubmitted && (
                <div className="mt-4">
                  <button
                    onClick={handleStartNew}
                    className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    ✏️ Start New Essay
                  </button>
                </div>
              )}

              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Tip:</span> Write at least 50 words to check your progress, or 100 words for final submission.
                </p>
              </div>
            </div>
          </div>

          <div>
            <FeedbackDisplay
              feedback={feedback}
              finalAssessment={finalAssessment}
              isLoading={isLoading}
              hasContent={wordCount > 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
