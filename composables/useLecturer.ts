import {
  deleteQuiz,
  getCourse,
  getCourseQuizzes,
  getCourses,
  getLecturerDetails,
  getNumberOfCourses,
  getNumberOfQuizzes,
  getQuestions,
  getQuiz,
  getQuizzes,
} from '~/supabase-queries/lecturer';

export const useGetLecturerDetails = ({ user_id }: { user_id: string }) => {
  const {
    data: lecturerData,
    error,
    refresh,
    status,
  } = useAsyncData(
    `lecturer-${user_id}`,
    async () => {
      const response = await getLecturerDetails({ user_id });
      if (response.error) {
        throw new Error(response.message);
      }
      return response.lecturer;
    },
    {
      server: false,
    }
  );

  return {
    lecturerData,
    error,
    refresh,
    status,
  };
};

export const useGetCourseCount = () => {
  const {
    data: courseCount,
    error,
    refresh,
    status,
    execute,
  } = useAsyncData(
    'course-count',
    async () => {
      const response = await getNumberOfCourses();
      if (response.error) {
        throw new Error(response.message);
      }
      return response.count;
    },
    {
      server: false,
    }
  );

  return {
    courseCount,
    error,
    refresh,
    status,
    execute,
  };
};
export const useGetQuizCount = () => {
  const {
    data: quizCount,
    error,
    refresh,
    status,
    execute,
  } = useAsyncData(
    'quiz-count',
    async () => {
      const response = await getNumberOfQuizzes();
      if (response.error) {
        throw new Error(response.message);
      }
      return response.count;
    },
    {
      server: false,
    }
  );

  return {
    quizCount,
    error,
    refresh,
    status,
    execute,
  };
};

export const useGetCourses = () => {
  const {
    data: courses,
    error,
    refresh,
    status,
    execute,
  } = useAsyncData(
    'lecturer-courses',
    async () => {
      const response = await getCourses();
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    },
    {
      server: false,
    }
  );

  return {
    courses,
    error,
    refresh,
    status,
    execute,
  };
};
export const useGetCourseQuizzes = (course_id: number) => {
  const {
    data: quizzes,
    error,
    refresh,
    status,
    execute,
  } = useAsyncData(
    `course-quizzes-${course_id}`,
    async () => {
      const response = await getCourseQuizzes(course_id);
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    },
    {
      server: false,
      transform: (data) => {
        return data?.map((quiz) => {
          return {
            ...quiz,
            status:
              new Date(quiz.date).getTime() > Date.now() ? 'upcoming' : 'due',
          };
        });
      },
    }
  );

  return {
    quizzes,
    error,
    refresh,
    status,
    execute,
  };
};

export const useGetQuizzes = () => {
  const {
    data: quizzes,
    error,
    refresh,
    status,
    execute,
  } = useAsyncData(
    'lecturer-quizzes',
    async () => {
      const response = await getQuizzes();
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    },
    {
      server: false,
      transform: (data) => {
        return data?.map((quiz) => {
          return {
            ...quiz,
            status:
              new Date(quiz.date).getTime() > Date.now() ? 'upcoming' : 'due',
          };
        });
      },
    }
  );

  return {
    quizzes,
    error,
    refresh,
    status,
    execute,
  };
};
export const useDeleteQuiz = (quiz_id: number) => {
  const {
    error,
    refresh,
    status,
    execute,
    data: message,
  } = useAsyncData(
    `delete-${quiz_id}`,
    async () => {
      const response = await deleteQuiz(quiz_id);
      if (response.error) {
        throw new Error(response.message);
      }
      return response.message;
    },
    {
      server: false,
      immediate: false,
    }
  );

  return {
    message,
    error,
    refresh,
    status,
    execute,
  };
};
export const useGetQuiz = (quiz_id: number) => {
  const {
    data: quiz,
    error,
    refresh,
    status,
    execute,
  } = useAsyncData(
    `quiz-${quiz_id}`,
    async () => {
      const response = await getQuiz(quiz_id);
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    },
    {
      server: false,
      transform: (data) => {
        if (!data) return null;
        return {
          ...data,
          status:
            new Date(data.date).getTime() > Date.now() ? 'upcoming' : 'due',
        };
      },
    }
  );

  return {
    quiz,
    error,
    refresh,
    status,
    execute,
  };
};
export const useGetCourse = (course_id: number) => {
  const {
    data: course,
    error,
    refresh,
    status,
    execute,
  } = useAsyncData(
    `course-${course_id}`,
    async () => {
      const response = await getCourse(course_id);
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    },
    {
      server: false,
    }
  );

  return {
    course,
    error,
    refresh,
    status,
    execute,
  };
};

// Quiz Questions
export const useGetQuestions = (quiz_id: number) => {
  const {
    data: questions,
    error,
    refresh,
    status,
    execute,
  } = useAsyncData(
    `quiz-questions-${quiz_id}`,
    async () => {
      const response = await getQuestions(quiz_id);
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    },
    {
      server: false,
    }
  );

  return {
    questions,
    error,
    refresh,
    status,
    execute,
  };
};
