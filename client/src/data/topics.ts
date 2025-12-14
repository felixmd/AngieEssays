import { EssayTopic } from '../types';

export const SUGGESTED_TOPICS: EssayTopic[] = [
  // Narrative Essays
  {
    id: 'n1',
    title: 'A Life-Changing Moment',
    type: 'narrative',
    description: 'Write about a specific moment that changed your perspective or life direction.',
  },
  {
    id: 'n2',
    title: 'Overcoming a Challenge',
    type: 'narrative',
    description: 'Describe a time when you faced and overcame a significant obstacle.',
  },
  {
    id: 'n3',
    title: 'An Unforgettable Journey',
    type: 'narrative',
    description: 'Tell the story of a memorable trip or adventure and what you learned from it.',
  },

  // Descriptive Essays
  {
    id: 'd1',
    title: 'Your Favorite Place',
    type: 'descriptive',
    description: 'Describe a place that holds special meaning to you using sensory details.',
  },
  {
    id: 'd2',
    title: 'A Person Who Inspires You',
    type: 'descriptive',
    description: 'Paint a vivid picture of someone who has influenced your life.',
  },
  {
    id: 'd3',
    title: 'A Moment Frozen in Time',
    type: 'descriptive',
    description: 'Describe a specific scene or moment in rich, sensory detail.',
  },

  // Compare-and-Contrast Essays
  {
    id: 'c1',
    title: 'Online vs. Traditional Learning',
    type: 'compare-contrast',
    description: 'Compare and contrast the benefits and drawbacks of online and in-person education.',
  },
  {
    id: 'c2',
    title: 'City Life vs. Rural Living',
    type: 'compare-contrast',
    description: 'Examine the differences and similarities between urban and rural lifestyles.',
  },
  {
    id: 'c3',
    title: 'Books vs. Movies',
    type: 'compare-contrast',
    description: 'Compare how books and films tell stories and their unique strengths.',
  },

  // Argumentative Essays
  {
    id: 'a1',
    title: 'Should Schools Start Later?',
    type: 'argumentative',
    description: 'Argue for or against later school start times for teenagers.',
  },
  {
    id: 'a2',
    title: 'Social Media: Help or Harm?',
    type: 'argumentative',
    description: 'Take a position on whether social media is beneficial or harmful to society.',
  },
  {
    id: 'a3',
    title: 'The Importance of Arts Education',
    type: 'argumentative',
    description: 'Argue whether arts should be a required part of school curriculum.',
  },
];

export const ESSAY_TYPE_INFO = {
  narrative: {
    title: 'Narrative Essay',
    description: 'Tell a story from your personal experience with a clear beginning, middle, and end.',
    tips: ['Use first-person perspective', 'Include vivid details', 'Show, don\'t just tell', 'Have a clear point or lesson'],
  },
  descriptive: {
    title: 'Descriptive Essay',
    description: 'Paint a picture with words using sensory details to describe a person, place, object, or experience.',
    tips: ['Use all five senses', 'Choose specific, vivid details', 'Create a dominant impression', 'Organize spatially or by importance'],
  },
  'compare-contrast': {
    title: 'Compare-and-Contrast Essay',
    description: 'Analyze similarities and differences between two subjects to reveal new insights.',
    tips: ['Choose comparable subjects', 'Use a clear structure (point-by-point or block)', 'Go beyond obvious comparisons', 'Draw meaningful conclusions'],
  },
  argumentative: {
    title: 'Argumentative Essay',
    description: 'Take a clear position on an issue and support it with evidence and logical reasoning.',
    tips: ['State a clear thesis', 'Use credible evidence', 'Address counterarguments', 'Build logical connections between ideas'],
  },
};
