import React from "react";

function Questions(props){

  React.useEffect(() => {
    if(props.startQuiz){
      fetch(
        `https://opentdb.com/api.php?amount=${props.numberOfQuestions}${
          props.category === "any" ? " " : `&category=${props.category}`
        }${props.difficulty === "any" ? " " : `&difficulty=${props.difficulty}`}`
      )      
        .then((res) => res.json())
        .then((data) => {
          console.log(data.results)
          const quizData = data.results && Array.isArray(data.results)
          ? data.results.map((item) => {
              const answers = [item.correct_answer, ...item.incorrect_answers];
              const shuffledAnswers = shuffleArray(answers);
              return {
                ...item,
                shuffledAnswers: shuffledAnswers,
              };
            })
          : [];
         
          props.setQuiz(quizData);
        })
    }
     
        
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


