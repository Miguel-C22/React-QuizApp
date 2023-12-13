import React from "react";

function Questions(props){

    React.useEffect(() => {
        fetch(
          `https://opentdb.com/api.php?amount=${props.numberOfQuestions}${
            props.category === "any" ? " " : `&category=${props.category}`
          }${props.difficulty === "any" ? " " : `&difficulty=${props.difficulty}`}${
            props.questionType === "any" ? " " : `&type=${props.questionType}`
          }`
        )      
          .then((res) => res.json())
          .then((data) => {
            const quizData = data.results.map((data) => {
              const answers = [data.correct_answer, ...data.incorrect_answers];
              const shuffledAnswers = shuffleArray(answers);
              return {
                ...data,
                shuffledAnswers: shuffledAnswers
              }
            })
      
            props.setQuiz(quizData);
          })
        
          
      }, [props.startQuiz])
    
    
    
      function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      }
}

export default Questions