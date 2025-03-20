import {
  getCourses,
  getLecturerDetails,
  getNumberOfCourses,
  getNumberOfQuizzes,
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
