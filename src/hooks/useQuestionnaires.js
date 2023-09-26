import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { getUser } from '@/ducks';

import { QuestionnairesService } from '@/services';

const useQuestions = () => {
  const user = useSelector((store) => getUser(store));

  const [isLoading, setIsLoading] = useState(true);
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const getQuestionnaires = async () => {
      const { data: getQuestionnaire } = await QuestionnairesService.list();

      if (getQuestionnaire) {
        setQuestionnaires(getQuestionnaire);
      }

      setIsLoading(false);
    };

    getQuestionnaires();
  }, []);

  return { isLoading, questionnaires };
};

export default useQuestions;
