import React, { useState } from 'react';
import { EssayType } from './types';
import { EssayTypeSelection } from './components/EssayTypeSelection';
import { TopicSelection } from './components/TopicSelection';
import { EssayEditor } from './components/EssayEditor';

type AppStep = 'type-selection' | 'topic-selection' | 'writing';

function App() {
  const [step, setStep] = useState<AppStep>('type-selection');
  const [selectedType, setSelectedType] = useState<EssayType | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleTypeSelect = (type: EssayType) => {
    setSelectedType(type);
    setStep('topic-selection');
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setStep('writing');
  };

  const handleBackToTypes = () => {
    setSelectedType(null);
    setSelectedTopic(null);
    setStep('type-selection');
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setStep('topic-selection');
  };

  return (
    <>
      {step === 'type-selection' && <EssayTypeSelection onSelect={handleTypeSelect} />}

      {step === 'topic-selection' && selectedType && (
        <TopicSelection
          essayType={selectedType}
          onTopicSelect={handleTopicSelect}
          onBack={handleBackToTypes}
        />
      )}

      {step === 'writing' && selectedType && selectedTopic && (
        <EssayEditor
          essayType={selectedType}
          topic={selectedTopic}
          onBack={handleBackToTopics}
        />
      )}
    </>
  );
}

export default App;
