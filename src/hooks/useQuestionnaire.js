import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { getUser } from '@/ducks';

import { QuestionnairesService } from '@/services';

const useQuestionnaire = (questionnaireId) => {
  const user = useSelector((store) => getUser(store));
  const [isLoading, setIsLoading] = useState(true);
  const [questionnaire, setQuestionnaire] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const getSuggestions = async () => {
      const { data: getQuestionnaireResponse } = await QuestionnairesService.retrieve(
        questionnaireId
      );

      if (getQuestionnaireResponse) {
        setQuestionnaire(getQuestionnaireResponse);
      }

      setIsLoading(false);
    };

    getSuggestions();
  }, [questionnaireId]);

  return { isLoading, questionnaire };
};

export default useQuestionnaire;
