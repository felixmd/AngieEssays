import { EssayFeedback, FinalAssessment } from '../types';

interface FeedbackDisplayProps {
  feedback: EssayFeedback | null;
  finalAssessment: FinalAssessment | null;
  isLoading: boolean;
  hasContent: boolean;
}

const CATEGORY_ICONS = {
  Structure: '🏗️',
  Argument: '💭',
  Grammar: '✍️',
  Evidence: '📚',
};

const CATEGORY_COLORS = {
  Structure: 'bg-purple-50 border-purple-200 text-purple-800',
  Argument: 'bg-blue-50 border-blue-200 text-blue-800',
  Grammar: 'bg-green-50 border-green-200 text-green-800',
  Evidence: 'bg-orange-50 border-orange-200 text-orange-800',
};

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({
  feedback,
  finalAssessment,
  isLoading,
  hasContent,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600 text-center">Analyzing your essay...</p>
          <p className="text-sm text-gray-500 text-center mt-2">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  if (finalAssessment) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Essay Submitted! 🎉</h2>
          <p className="text-green-50 mb-6">{finalAssessment.summary}</p>

          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Overall Quality</span>
              <span className="text-4xl font-bold">{finalAssessment.overallScore}/100</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Feedback</h3>
          <div className="space-y-4">
            {finalAssessment.categories.map((cat, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 ${CATEGORY_COLORS[cat.category]}`}
              >
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <span>{CATEGORY_ICONS[cat.category]}</span>
                  <span>{cat.category}</span>
                </h4>
                <ul className="space-y-2">
                  {cat.suggestions.map((suggestion, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (feedback) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">💡</span>
          <h3 className="text-xl font-bold text-gray-900">Progress Feedback</h3>
        </div>

        <div className="space-y-4">
          {feedback.categories.map((cat, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 ${CATEGORY_COLORS[cat.category]}`}
            >
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span>{CATEGORY_ICONS[cat.category]}</span>
                <span>{cat.category}</span>
              </h4>
              <ul className="space-y-2">
                {cat.suggestions.map((suggestion, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2 text-sm">
                    <span className="text-primary-600 font-bold mt-0.5">→</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg border border-primary-200">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Keep going!</span> Review these suggestions and continue
            improving your essay. Click "Check My Progress" again after making changes, or submit when
            you're ready for final assessment.
          </p>
        </div>
      </div>
    );
  }

  if (!hasContent) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Start Writing!</h3>
          <p className="text-gray-600">
            Your feedback will appear here once you write at least 50 words and click "Check My Progress".
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">👀</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Ready for Feedback?</h3>
        <p className="text-gray-600">
          Click "Check My Progress" to get personalized suggestions for improving your essay.
        </p>
      </div>
    </div>
  );
};
