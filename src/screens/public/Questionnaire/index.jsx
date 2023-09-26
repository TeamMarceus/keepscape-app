import React, { useState } from 'react';

import cn from 'classnames';

import { useRouter, useSearchParams } from 'next/navigation';
import { Range } from 'react-range';
import { useSelector } from 'react-redux';

import Female from '%/images/Questions/female.png';
import Male from '%/images/Questions/male.png';

import No from '%/images/Questions/no.png';
import Yes from '%/images/Questions/yes.png';

import { 
  buttonKinds, 
  buttonTypes, 
  colorClasses, 
  colorNames, 
  inputKinds, 
  inputTypes, 
  spinnerSizes, 
  textTypes 
} from '@/app-globals';

import { 
  Button, 
  ButtonLink, 
  CardImage,
  ControlledInput, 
  DatePicker, 
  Separator,
  Spinner, 
  Text 
} from '@/components';

import { getGeneralQuestions, getNewQuestions, getSuggestions } from '@/ducks';
import { actions as questionsAction } from '@/ducks/reducers/questions';
import { actions as productsActions } from '@/ducks/reducers/suggestions';
import { useCookies } from '@/hooks';

import useActionDispatch from '@/hooks/useActionDispatch';
import { QuestionnairesService } from '@/services';

import GiftPreloader from './Preloader';

import hobbiesDetails from './contants/hobbiesDetails';
import occasionsDetails from './contants/occasionsDetails';
import questionsData from './contants/questions';

import styles from './styles.module.scss';

function Questionnaire() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentIndexParam = Number(searchParams.get('index'));

  const questionsUpdate = useActionDispatch(questionsAction.questionActions.questionUpdate);
  const productUpdate = useActionDispatch(productsActions.productActions.productUpdate);
  
  const storedGeneralQuestions = useSelector((store) => getGeneralQuestions(store));
  const storedNewQuestions = useSelector((store) => getNewQuestions(store));
  const storedSuggestions = useSelector((store) => getSuggestions(store));

  const { getCookie, setCookie, removeCookie } = useCookies();

  // General Question States
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [age, setAge] = useState('');
  const [toggleGender, setToggleGender] = useState(null);
  const [occasion, setOccasion] = useState('');
  const [occassionInput, setOccassionInput] = useState('');
  const [isOtherOccasionSelected, setIsOtherOccasionSelected] = useState(false);
  const [toggleHobby, setToggleHobby] = useState(null);
  const [hobbies, setHobbies] = useState('');
  const [hobbyInput, setHobbyInput] = useState('');
  const [isOtherHobbySelected, setIsOtherHobbySelected] = useState(false);
  const [toggleProblem, setToggleProblem] = useState(null);
  const [problem, setProblem] = useState('');
  const [intimate, setIntimate] = useState('');
  const [budget, setBudget] = useState(0);
  const [color, setColor] = useState('');
  const [practicalOrSentimental, setPracticalOrSentimental] = useState('');
  const [outdoorActivities, setOutdoorActivities] = useState('');
  const [introvertedOrExtroverted, setIntrovertedOrExtroverted] = useState('');
  const [sportsTeamsOrAthletes, setSportsTeamsOrAthletes] = useState('');
  const [dietaryOrAllergies, setDietaryOrAllergies] = useState('');
  const [technologyOrGadgets, setTechnologyOrGadgets] = useState('');
  const [fashionOrAccessories, setFashionOrAccessories] = useState('');
  const [tvShowsOrMoviesOrCelebrities, setTvShowsOrMoviesOrCelebrities] = useState('');

  const [userMessage, setUserMessage] = useState('');
  
  const [generalQuestions, setGeneralQuestions] = useState(questionsData.map((question) => ({
    question,
    answer: '',
  })));
  const [newQuestions, setNewQuestions] = useState([]);

  const [isGeneratingNewQuestions, setIsGeneratingNewQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(currentIndexParam || 0);
  
  const [giftSuggestions, setGiftSuggestions] = useState(storedSuggestions || []);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const getMoreQuestions = async () => {
    setIsGeneratingNewQuestions(true);

    try {
      const { data: questionnaireResponse } = await QuestionnairesService.generate(
        generalQuestions
      );
  
      setIsGeneratingNewQuestions(false);
      
      let improvedQuestions = null
      if (!isGeneratingNewQuestions) {
          improvedQuestions = questionnaireResponse.map((question) => ({
          question,
          answer: '',
        }));
        setUserMessage('');
        setCurrentQuestionIndex(0);
        setNewQuestions(improvedQuestions);
  
        // Update the question state
        questionsUpdate({
          newQuestions: improvedQuestions,
        });
      }
    } catch (error) {
      setIsGeneratingNewQuestions(false);
    }
  };
  
  const getTop3Products = (products, budgetRange) => {
    const sortedProducts = products.sort((a, b) => b.price - a.price);
    const top3Products = sortedProducts.filter((product) => product.price <= budgetRange).slice(0, 3);
    return top3Products;
  };

  const getGiftSuggestion = async () => {
    setIsSuggesting(true);

    try {
      const { data: questionnaireResponse } = await QuestionnairesService.suggest(
        [...generalQuestions, ...newQuestions]
      );

      // Only get the top 3 gift suggestions with top 3 products based on the budget
      // Filter the product based on the budget
      if (!isSuggesting) {
        const top3GiftSuggestions = questionnaireResponse.map((gift) => ({
          ...gift,
          products: getTop3Products(gift.products, budget),
        }));
  
        // Update the product state
        productUpdate({
          gifts: top3GiftSuggestions,
          wasRedirected: true,
        });
  
        setGiftSuggestions(top3GiftSuggestions);
        setCurrentQuestionIndex(0);
      }

      setIsSuggesting(false);

    } catch (error) {
      setIsSuggesting(false);
    }
  };

  const handleSubmitGeneralQuestions = async (e) => {
    e.preventDefault();

    if (currentQuestionIndex === 0) {
      generalQuestions[currentQuestionIndex].answer = name;
    }

    if (currentQuestionIndex === 1) {
      generalQuestions[currentQuestionIndex].answer = date;
    }

    if (currentQuestionIndex === 2) {
      generalQuestions[currentQuestionIndex].answer = age;
    }

    if (currentQuestionIndex === 3 && !toggleGender) {
      generalQuestions[currentQuestionIndex].answer = 'Male';
    }

    if (currentQuestionIndex === 3 && toggleGender) {
      generalQuestions[currentQuestionIndex].answer = 'Female';
    }

    if (currentQuestionIndex === 4) {
      if (occassionInput !== '' && occasion !== '') {
        generalQuestions[currentQuestionIndex].answer = `${occasion}, ${occassionInput}`;
      } else if (occasion !== '') {
        generalQuestions[currentQuestionIndex].answer = occasion;
      } else {
        generalQuestions[currentQuestionIndex].answer = occassionInput;
      }
    }

    if (currentQuestionIndex === 5 && toggleHobby) {
      generalQuestions[currentQuestionIndex].answer = 'Yes';
    }

    if (currentQuestionIndex === 5 && !toggleHobby) {
      generalQuestions[currentQuestionIndex].answer = 'No';
    }

    if (currentQuestionIndex === 6) {
      if (hobbyInput !== '' && hobbies !== '') {
        generalQuestions[currentQuestionIndex].answer = `${hobbies}, ${hobbyInput}`;
      } else if (hobbies !== '') {
        generalQuestions[currentQuestionIndex].answer = hobbies;
      } else {
        generalQuestions[currentQuestionIndex].answer = hobbyInput;
      }
    }

    if (currentQuestionIndex === 7 && toggleProblem) {
      generalQuestions[currentQuestionIndex].answer = 'Yes';
    }

    if (currentQuestionIndex === 7 && !toggleProblem) {
      generalQuestions[currentQuestionIndex].answer = 'No';
    }

    if (currentQuestionIndex === 8) {
      generalQuestions[currentQuestionIndex].answer = problem;
    }

    if (currentQuestionIndex === 9) {
      generalQuestions[currentQuestionIndex].answer = `${intimate} out of 5`;
    }

    if (currentQuestionIndex === 10) {
      generalQuestions[currentQuestionIndex].answer = budget.toString();
    }

    if (currentQuestionIndex === 11) {
      generalQuestions[currentQuestionIndex].answer = color;
    }

    if (currentQuestionIndex === 12) {
      generalQuestions[currentQuestionIndex].answer = practicalOrSentimental;
    }

    if (currentQuestionIndex === 13) {
      generalQuestions[currentQuestionIndex].answer = outdoorActivities;
    }

    if (currentQuestionIndex === 14) {
      generalQuestions[currentQuestionIndex].answer = introvertedOrExtroverted;
    }

    if (currentQuestionIndex === 15) {
      generalQuestions[currentQuestionIndex].answer = sportsTeamsOrAthletes;
    }

    if (currentQuestionIndex === 16) {
      generalQuestions[currentQuestionIndex].answer = dietaryOrAllergies;
    }

    if (currentQuestionIndex === 17) {
      generalQuestions[currentQuestionIndex].answer = technologyOrGadgets;
    }

    if (currentQuestionIndex === 18) {
      generalQuestions[currentQuestionIndex].answer = fashionOrAccessories;
    }

    if (currentQuestionIndex === 19) {
      generalQuestions[currentQuestionIndex].answer = tvShowsOrMoviesOrCelebrities;
      // Update the question state
      questionsUpdate({
        general_questions: generalQuestions,
      });
      
      getMoreQuestions();
    }

    if (currentQuestionIndex !== generalQuestions.length - 1) {
      if ((currentQuestionIndex === 5 && !toggleHobby) || 
      (currentQuestionIndex === 7 && !toggleProblem)) {
        setCurrentQuestionIndex(currentQuestionIndex + 2);

        router.push(`/keepscape/questionnaire?index=${currentQuestionIndex + 2}`)
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        router.push(`/keepscape/questionnaire?index=${currentQuestionIndex + 1}`)
      }
    } 
  };
  
  const handleSubmitNewQuestions = async (e) => {
    e.preventDefault();
    if (currentQuestionIndex !== newQuestions.length - 1) {
      newQuestions[currentQuestionIndex].answer = userMessage;

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      router.push(`/keepscape/questionnaire?index=${currentQuestionIndex + 1}`)
      setUserMessage('');
    } else {
      newQuestions[currentQuestionIndex].answer = userMessage;

      // Remove all the index of new questions in the cookies
      for (let i = 0; i < newQuestions.length; i++) {
        removeCookie(`newQuestion-${i}`);
      }
  
      // Update the question state
      questionsUpdate({
        new_questions: newQuestions,
      });

      getGiftSuggestion();
    }
  };

  return (
    isSuggesting ? 
      (
        <GiftPreloader name={generalQuestions[0].answer}/>
      ) : (
      <section className={styles.Questionnaire}>
        {giftSuggestions.length === 0 ? (
          <>
            <div className={styles.Questionnaire_progress}>
              {newQuestions.length === 0 ? (
                generalQuestions.map((question, index) => (
                    <Separator 
                      key={index} 
                      className={cn(styles.Questionnaire_progress_bar,
                        {
                          [styles.Questionnaire_progress_bar_active]:
                            index <= currentQuestionIndex,
                        },
                        styles.Questionnaire_progress_bar_general
                      )}
                    />
                  ))
                ) : (
                  newQuestions.map((question, index) => (
                    <Separator 
                      key={index} 
                      className={cn(styles.Questionnaire_progress_bar,
                        {
                          [styles.Questionnaire_progress_bar_active]:
                            index <= currentQuestionIndex,
                        }
                      )}
                    />
                  ))
                )
              }
            </div>

            <Text
              colorClass={colorClasses.NEUTRAL['700']}
              type={textTypes.HEADING.SM}
            >
      
              {newQuestions.length === 0
                ? generalQuestions[currentQuestionIndex].question
                : newQuestions[currentQuestionIndex].question}
          </Text>

            <Separator className={styles.Questionnaire_separator}/>

            <form
              className={styles.Questionnaire_content}
              onSubmit={
                newQuestions.length === 0
                  ? handleSubmitGeneralQuestions
                  : handleSubmitNewQuestions
              }
            >
              {(newQuestions.length !== 0 || 
                currentQuestionIndex !== 3 && 
                currentQuestionIndex !== 4 && 
                currentQuestionIndex !== 5 && 
                currentQuestionIndex !== 6 &&
                currentQuestionIndex !== 7) &&
                <div className={styles.Questionnaire_background} />
              }

              {newQuestions.length === 0  ? ( 
              <>
                {currentQuestionIndex === 0 &&  
                  <ControlledInput
                    className={styles.Questionnaire_content_input}
                    name="question"
                    placeholder="Enter Recipient's Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                }
    
                {currentQuestionIndex === 1 &&
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    name="from"
                    placeholder='dd/mm/yyyy'
                    selected={date !== '' ? new Date(date) : null}
                    type={inputTypes.FORM}
                    onChange={(d) => {
                      setDate(d);
                    }}
                    className={styles.Questionnaire_content_input}
                    // error={errors.from}
                    icon="today"
                  />
                }
    
                {currentQuestionIndex === 2 &&  
                  <ControlledInput
                    className={styles.Questionnaire_content_input}
                    kind={inputKinds.NUMBER}
                    name="question"
                    placeholder="Enter Recipient's Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                }
    
                {currentQuestionIndex === 3 && 
                  <div className={styles.Questionnaire_content_choice}>
                    <CardImage
                      isClickable
                      image= {Female}
                      imageWidth={180}
                      isClicked={toggleGender === true}
                      name="FEMALE"
                      onClick={() => { 
                        setToggleGender(true);
                      }}
                    />
    
                    <CardImage
                      isClickable
                      image={Male}
                      imageWidth={180}
                      isClicked={toggleGender === false}
                      name="MALE"
                      onClick={() => {
                        setToggleGender(false);
                      }}
                    />  
                  </div>
                }
    
                {currentQuestionIndex === 4 && 
                  <>
                    <div className={styles.Questionnaire_content_occasion}>
                      {occasionsDetails.map((oc, index) => (
                        <CardImage
                          key={index}
                          isClickable
                          image={oc.image}
                          imageHeight={180}
                          imageWidth={180}
                          isClicked={occasion.includes(oc.name) || (oc.name === 'OTHERS' && isOtherOccasionSelected)}
                          name={oc.name}
                          onClick={() => {
                            // Remove occasion if it is already selected
                            if (occasion.includes(oc.name)) {
                              const updatedOccasion = occasion.split(', ')
                                .filter((item) => item !== oc.name)
                                .join(', ');
                            
                              setOccasion(updatedOccasion);
                            } else if (oc.name === 'OTHERS') {
                              setIsOtherOccasionSelected(!isOtherOccasionSelected);
                              setOccasion(occasion);
                            } else if (occasion === '') {
                                setOccasion(oc.name);
                            } else {
                              setOccasion(`${occasion}, ${oc.name}`);
                            }
                          }}
                        />
                      ))}
                    </div>

                    {isOtherOccasionSelected &&
                      <ControlledInput
                        className={cn(styles.Questionnaire_content_input, styles.Questionnaire_content_input_others)}
                        name="question"
                        placeholder="Enter Occasion"
                        value={occassionInput}
                        onChange={(e) => setOccassionInput(e.target.value)}
                      />
                    }
                  </>
                }
    
                {currentQuestionIndex === 5 && 
                  <div className={styles.Questionnaire_content_choice}>
                    <CardImage
                      isClickable
                      image= {No}
                      imageWidth={180}
                      isClicked={toggleHobby === false}
                      name="NO"
                      onClick={() => { 
                        setToggleHobby(false);
                      }}
                    />
    
                    <CardImage
                      isClickable
                      image={Yes}
                      imageWidth={180}
                      isClicked={toggleHobby === true}
                      name="YES"
                      onClick={() => {
                        setToggleHobby(true);
                      }}
                    />  
                  </div>
                }
    
                {currentQuestionIndex === 6 && 
                  <>
                    <div className={styles.Questionnaire_content_hobbies}>
                      {hobbiesDetails.map((hobby, index) => (
                        <CardImage 
                        key={index}
                          isClickable 
                          className={styles.Questionnaire_content_hobbies_suggestion}
                          image={hobby.image}
                          imageHeight={180}
                          imageWidth={180}
                          isClicked={hobbies.includes(hobby.name) || (hobby.name === 'OTHERS' && isOtherHobbySelected)}
                          name={hobby.name}
                          onClick={() => {
                            // Remove hobbies if it is already selected
                            if (hobbies.includes(hobby.name)) {
                              const updatedHobbies = hobbies.split(', ')
                                .filter((item) => item !== hobby.name)
                                .join(', ');
                            
                              setHobbies(updatedHobbies);
                            } else if (hobby.name === 'OTHERS') {
                              setIsOtherHobbySelected(!isOtherHobbySelected);
                              setHobbies(hobbies);
                            } else if (hobbies === '') {
                              setHobbies(hobby.name);
                            } else {
                              setHobbies(`${hobbies}, ${hobby.name}`);
                            }
                          }}
                        />
                      ))}
                    </div>

                    {isOtherHobbySelected && 
                      <ControlledInput
                        className={cn(styles.Questionnaire_content_input, styles.Questionnaire_content_input_others)}
                        name="question"
                        placeholder="Enter Hobbies or Interests"
                        value={hobbyInput}
                        onChange={(e) => setHobbyInput(e.target.value)}
                      />
                    }
                  </>
                }
                
                {currentQuestionIndex === 7 && 
                  <div className={styles.Questionnaire_content_choice}>
                    <CardImage
                      isClickable
                      image= {No}
                      imageWidth={180}
                      isClicked={toggleProblem === false}
                      name="NO"
                      onClick={() => { 
                        setToggleProblem(false);
                      }}
                    />
    
                    <CardImage
                      isClickable
                      image={Yes}
                      imageWidth={180}
                      isClicked={toggleProblem === true}
                      name="YES"
                      onClick={() => {
                        setToggleProblem(true);
                      }}
                    />  
                  </div>
                }
    
                {currentQuestionIndex === 8 &&  
                  <ControlledInput
                    className={styles.Questionnaire_content_input}
                    name="question"
                    placeholder="Enter Problem Explanation"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                  />
                }
    
                {currentQuestionIndex === 9 &&  
                  <>
                    <div
                      className={styles.Questionnaire_content_rangeContainer}
                      >
                      <Range
                        max={5}
                        min={0}
                        renderThumb={({ props }) => (
                          <div
                            {...props}
                            className={styles.Questionnaire_content_rangeThumb}
                          />
                        )}
                        renderTrack={({ props, children }) => (
                          <div
                            {...props}
                            className={styles.Questionnaire_content_rangeTrack}
                          >
                            <div
                            className={styles.Questionnaire_content_rangeFilled}
                            style={{
                              width: `${(intimate / 5) * 100 || 0}%`, 
                            }}
                          />
                            {children}
                          </div>
                        )}
                        step={0.1}
                        values={[intimate]}
                        onChange={(values) => setIntimate(values[0])}
                      />
                    </div>

                    <div className={styles.Questionnaire_content_rangeLabels}>
                      <Text type={textTypes.HEADING.SM}>0</Text>
                      <Text type={textTypes.HEADING.SM}>1</Text>
                      <Text type={textTypes.HEADING.SM}>2</Text>
                      <Text type={textTypes.HEADING.SM}>3</Text>
                      <Text type={textTypes.HEADING.SM}>4</Text>
                      <Text type={textTypes.HEADING.SM}>5</Text>
                    </div>
                  </>
                }
    
                {currentQuestionIndex === 10 &&  
                  <ControlledInput
                    className={styles.Questionnaire_content_input}
                    kind={inputKinds.NUMBER}
                    name="question"
                    placeholder="Enter Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />

                  // <>
                  // <div
                  //   className={styles.Questionnaire_content_rangeContainer}
                  //   >
                  //   <Range
                  //     max={5000}
                  //     min={0}
                  //     renderThumb={({ props }) => (
                  //       <div
                  //         {...props}
                  //         className={styles.Questionnaire_content_rangeThumb}
                  //       />
                  //     )}
                  //     renderTrack={({ props, children }) => (
                  //       <div
                  //         {...props}
                  //         className={styles.Questionnaire_content_rangeTrack}
                  //       >
                  //         <div
                  //         className={styles.Questionnaire_content_rangeFilled}
                  //         style={{
                  //           width: `${(budget / 5000) * 100 || 0}%`, 
                  //         }}
                  //       />
                  //         {children}
                  //       </div>
                  //     )}
                  //     step={1}
                  //     values={[budget]}
                  //     onChange={(values) => setBudget(values[0])}
                  //   />
                  // </div>

                  // <div className={styles.Questionnaire_content_rangeLabels}>
                  //   <div
                  //     className={styles.Questionnaire_content_rangeLabel}
                  //     style={{
                  //       left: `${(budget / 5000) * 90 || 0}%`,
                  //     }}
                  //   >
                  //     <Text type={textTypes.HEADING.SM}>₱{budget}</Text>
                  //   </div>
                  // </div>
                  // </>
                }

                {currentQuestionIndex > 10 &&
                  <ControlledInput
                    className={styles.Questionnaire_content_input}
                    name="question"
                    placeholder={(() => {
                      if (currentQuestionIndex === 11) {
                        return 'Enter Color Preference';
                      } if (currentQuestionIndex === 12) {
                        return 'Enter Practical or Sentimental';
                      } if (currentQuestionIndex === 13) {
                        return 'Enter Outdoor Activities';
                      } if (currentQuestionIndex === 14) {
                        return 'Enter Introverted or Extroverted';
                      } if (currentQuestionIndex === 15) {
                        return 'Enter Sports Teams or Athletes';
                      } if (currentQuestionIndex === 16) {
                        return 'Enter Restrictions or Allergies';
                      } if (currentQuestionIndex === 17) {
                        return 'Enter Technology or Gadgets';
                      } if (currentQuestionIndex === 18) {
                        return 'Enter Fashion or Accessories';
                      } if (currentQuestionIndex === 19) {
                        return 'Enter TV Shows or Movies or Celebrities';
                      } 
                        return '';
                      
                    })()
                    }
                    value={(() => {
                      if (currentQuestionIndex === 11) {
                        return color;
                      } if (currentQuestionIndex === 12) {
                        return practicalOrSentimental;
                      } if (currentQuestionIndex === 13) {
                        return outdoorActivities;
                      } if (currentQuestionIndex === 14) {
                        return introvertedOrExtroverted;
                      } if (currentQuestionIndex === 15) {
                        return sportsTeamsOrAthletes;
                      } if (currentQuestionIndex === 16) {
                        return dietaryOrAllergies;
                      } if (currentQuestionIndex === 17) {
                        return technologyOrGadgets;
                      } if (currentQuestionIndex === 18) {
                        return fashionOrAccessories;
                      } if (currentQuestionIndex === 19) {
                        return tvShowsOrMoviesOrCelebrities;
                      } 
                        return '';
                      
                    })()
                    }
                    onChange={(e) => {
                        if (currentQuestionIndex === 11) {
                          setColor(e.target.value);
                        } if (currentQuestionIndex === 12) {
                          setPracticalOrSentimental(e.target.value);
                        } if (currentQuestionIndex === 13) {
                          setOutdoorActivities(e.target.value);
                        } if (currentQuestionIndex === 14) {
                          setIntrovertedOrExtroverted(e.target.value);
                        } if (currentQuestionIndex === 15) {
                          setSportsTeamsOrAthletes(e.target.value);
                        } if (currentQuestionIndex === 16) {
                          setDietaryOrAllergies(e.target.value);
                        } if (currentQuestionIndex === 17) {
                          setTechnologyOrGadgets(e.target.value);
                        } if (currentQuestionIndex === 18) {
                          setFashionOrAccessories(e.target.value);
                        } if (currentQuestionIndex === 19) {
                          setTvShowsOrMoviesOrCelebrities(e.target.value);
                        } 
                      }
                    }
                  />
                }
                
              </>
              ) : (
                <ControlledInput
                  className={styles.Questionnaire_content_input}
                  name="question"
                  placeholder="Enter your answer..."
                  value={getCookie(`newQuestion-${currentQuestionIndex}`) || userMessage }
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setUserMessage(newValue); // Update the userMessage state
                    setCookie(`newQuestion-${currentQuestionIndex}`, newValue, { path: '/' }); // Update the cookie
                  }}
                />
              )}

              <div className={styles.Questionnaire_content_buttonGroup}>
                <Button
                  className={styles.Questionnaire_content_button}
                  disabled={isGeneratingNewQuestions || currentQuestionIndex === 0}
                  type={buttonTypes.PRIMARY.NEUTRAL}
                  onClick={() => { 
                    if (newQuestions.length === 0 &&
                      ((currentQuestionIndex === 9  && generalQuestions[7].answer.includes('No')) ||
                      (currentQuestionIndex === 7  && generalQuestions[5].answer.includes('No')))
                    ) {
                      setCurrentQuestionIndex(currentQuestionIndex - 2);
                      router.push(`/keepscape/questionnaire?index=${currentQuestionIndex - 2}`)
                    } else {
                      setCurrentQuestionIndex(currentQuestionIndex - 1);
                      router.push(`/keepscape/questionnaire?index=${currentQuestionIndex - 1}`)
                    }
                  }}
                >
                  <span
                    className={styles.Questionnaire_content_buttonGroup_buttonText}
                  >
                    BACK
                  </span>
                </Button>

                <Button
                  className={styles.Questionnaire_content_button}
                  disabled={isGeneratingNewQuestions || isSuggesting}
                  kind={buttonKinds.SUBMIT}
                  onClick={() => {

                  }}
                >
                  <span
                    className={styles.Questionnaire_content_buttonGroup_buttonText}
                  >
                    {(newQuestions.length !== 0 && currentQuestionIndex === newQuestions.length - 1) ? 'SUBMIT' : 'NEXT'}
                    {(isGeneratingNewQuestions || isSuggesting) && (
                      <Spinner
                        className={styles.Questionnaire_content_buttonGroup_spinner}
                        colorName={colorNames.WHITE}
                        size={spinnerSizes.SM}
                      />
                    )}
                  </span>
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <Text
              colorClass={colorClasses.NEUTRAL['700']}
              type={textTypes.HEADING.MD}
            >
              Here are the <span className={styles.Questionnaire_top3}>top 3</span>{' '} 
              gifts for <span className={styles.Questionnaire_top3}>{generalQuestions[0].answer}</span> 
              <br />
              Want to save the results? {' '}
            <ButtonLink
              className={styles.Questionnaire_save}
              to="/login"
              type={buttonTypes.TEXT.RED}
            >
              Login Now!
            </ButtonLink>
          </Text>

            <div className={styles.Questionnaire_gifts}>
              {giftSuggestions.map((gift, index) => (
                  // !gift.isLocked 
                  true
                  ? (
                  <div key={index} className={styles.Questionnaire_gifts_suggestion}>
                    <div className={styles.Questionnaire_gifts_suggestion_text}>
                      <Text
                        className={styles.Questionnaire_gifts_suggestion_name}
                        type={textTypes.HEADING.SM}
                      >
                        {gift.name}
                      </Text>

                      <Text
                        className={styles.Questionnaire_gifts_suggestion_description}
                        type={textTypes.BODY.LG}
                      >
                        {gift.description}
                      </Text>
                    </div>

                    <div 
                    className={
                        gift.products.length !== 0 ? 
                        styles.Questionnaire_gifts_suggestion_products :
                        styles.Questionnaire_gifts_suggestion_productsEmpty
                      }
                    >
                      { gift.products.length !== 0 ? 
                        (gift.products.map((product, productIndex) => (
                          <CardImage 
                            key={productIndex}
                            buttonLink={product.url}
                            className={styles.Questionnaire_gifts_suggestion_product}
                            imageHeight={180}
                            imageString={product.image}
                            imageWidth={180}
                            name={product.title}
                            price={product.price}
                          />
                          ))
                        ) : (
                          <Text
                            colorClass={colorClasses.NEUTRAL['600']}  
                            type={textTypes.HEADING.SM}
                          >
                            No specific products available
                          </Text>
                        )
                      }
                    </div>
                  </div>
                ) : (
                  <div key={index} className={styles.Questionnaire_gifts_lock}>
                    <Text
                      className={styles.Questionnaire_gifts_lock_text}
                      colorClass={colorClasses.NEUTRAL['0']}  
                      type={textTypes.HEADING.SM}
                    >
                      Unlock this suggested gift for only <span className={styles.Questionnaire_gifts_lock_price}>₱20</span>
                    </Text>

                    <Button
                      className={styles.Questionnaire_gifts_lock_button}
                    >
                      UNLOCK NOW
                    </Button>
                  </div>
                )
              ))}
            </div>
          </>
        )}
      </section>
    )
  );
}

export default Questionnaire;
