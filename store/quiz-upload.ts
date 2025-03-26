import type { FileUploadSelectEvent } from 'primevue/fileupload';
import type { PopulatedQuestionType } from '~/types';
import { excelToJson } from '~/utils/excelToJson';
import { v4 as uuid } from 'uuid';

export const useQuizUploadStore = defineStore('quiz-upload', () => {
  const populatedQuestions = ref<PopulatedQuestionType[]>([]);
  const selectedQuestion = ref<PopulatedQuestionType | null>(null);

  // Handle question file select
  const handleFileSelect = async (event: FileUploadSelectEvent) => {
    const file = event.files[0];
    try {
      const jsonFormat = await excelToJson(file);
      // Add unique id to each question for edit purpose
      const questionsWithIds = jsonFormat.map((question) => ({
        ...question,
        id: uuid(),
      }));
      populatedQuestions.value = questionsWithIds;
    } catch (error) {
      console.error('Error processing Excel file:', error);
    }
  };

  // Handle clear
  const handleClear = () => {
    console.log('cleared');
    populatedQuestions.value = [];
  };

  // Handle delete question
  const handleDelete = (id: string) => {
    populatedQuestions.value = populatedQuestions.value.filter(
      question => question.id !== id
    );
  };

  // Handle select question for edit
  const handleSelectForEdit = (question: PopulatedQuestionType) => {
    selectedQuestion.value = question;
  };

  return { 
    populatedQuestions, 
    selectedQuestion,
    handleClear, 
    handleFileSelect,
    handleDelete,
    handleSelectForEdit 
  };
});
