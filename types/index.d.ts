type QuestionType = 'multi_choice' | 'true_false';

interface MultiChoiceQuestionType {
  id: string;
  question_type: 'multi_choice';
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  answer: 'A' | 'B' | 'C' | 'D';
}

interface TrueFalseQuestionType {
  id: string;
  question_type: 'true_false';
  question: string;
  answer: boolean;
}

export type PopulatedQuestionType =
  | MultiChoiceQuestionType
  | TrueFalseQuestionType;
