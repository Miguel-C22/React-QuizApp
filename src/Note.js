import React from 'react';
import {decode} from 'html-entities';
function App() {
  //API: https://opentdb.com/api_config.php
  const [quiz, setQuiz] = React.useState([])
  const [startQuiz, setStartQuiz] = React.useState(false)
  const [submitQuiz, setSubmitQuiz] = React.useState(false)
  const [pickedAnswers, setPickedAnswers] = React.useState(new Array(5).fill(null))
 
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        //Mapping out the data from the API and storing it in a variable call quizData
        const quizData = data.results.map((data) => {
          //combining the correct answer and incorrect answers in a new object for each question in a variable called answers
          const answers = [data.correct_answer, ...data.incorrect_answers];
          //passing the new object to the shuffleArray function so that it can shuffle the answers
          const shuffledAnswers = shuffleArray(answers);
          //returning the new array with all the same data from the API but adding the new shuffledAnswers object to each question
          return {
            ...data,
            shuffledAnswers: shuffledAnswers
          }
        })
  
        //setting the useState to the new quizData
        setQuiz(quizData);
      })
  }, [startQuiz])


  function shuffleArray(array) {
    //...array is any array that is past to this function
    const shuffledArray = [...array];
    //This code sets up a loop that starts at the end of an array and goes backward, moving through each item one at a time until it reaches the first item.
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      //Of course! This line generates a random number (j) between 0 and the current value of i, which is used to randomly select an item's position in an array.
      const j = Math.floor(Math.random() * (i + 1));
      // This line uses array destructuring to swap the values between shuffledArray[i] and shuffledArray[j, effectively shuffling the array by exchanging the values of two positions.
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
 //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
 
  function displayQuiz(){
    if(startQuiz){
      return quiz.map((data, index) => {
        return (
          <div className='quizContainer'>
             <p className='questionNumber'>{index + 1}.</p>
              <p 
                key={data.question}
                className="question"
                >{decode(data.question)}
              </p>
              {data.shuffledAnswers.map(choiceOptions =>
              <button 
                id={choiceOptions}
                onClick={() => pickedAnswer(index, choiceOptions) + console.log(index)}
                className={pickedAnswers[index] === choiceOptions ? "pickedAnswer" : ""}
                >  
                {decode(choiceOptions)}
              </button>
              )}
          </div>
        )
      })
    }    
  }

  function displayCorrectAnswers(){
    if(startQuiz){
      return quiz.map((data, index) => {
        return (
          <div className='quizContainer'>
            <p className='questionNumber'>{index + 1}.</p>
              <div 
              key={data.question}
              className="question"
              >{data.question}
              </div>
              {data.shuffledAnswers.map(choiceOptions => 
              <button 
                id={choiceOptions} 
                className={ pickedAnswers[index] === choiceOptions && data.correct_answer === choiceOptions ? "correctAnswers" :
                data.correct_answer === choiceOptions  ? "correctAnswers" : pickedAnswers[index] === choiceOptions ? 'wrongAnswer' : ''}
                >  
                {decode(choiceOptions)}
              </button>
              )}
          </div>
        )
      })
    }    
  }


  function pickedAnswer(questionIndex, answer) {
    const updatedAnswers = [...pickedAnswers];
    updatedAnswers[questionIndex] = answer;
    setPickedAnswers(updatedAnswers);
  }
  

function finalScore(){
  let score = 0
  const allCorrectAnswers = quiz.map((data) => data.correct_answer)
   allCorrectAnswers.forEach((correctAnswers) => {
    pickedAnswers.forEach((pickedAnswers) => {
      if(pickedAnswers === correctAnswers){
        score++
      }
    })
  })
  return (
    <div className='finalScore'>
      <p>You Scored <span>{score}</span>/{quiz.length} correct answers</p>
    </div>
  )
}

     
function startQuizApp(){
  setStartQuiz(start => !start)
  if(startQuiz === false){
    document.getElementById('optionsContainer').style.display="none"
  }
  else(
    document.getElementById('optionsContainer').style.display="block"
  )
}

function submitQuizApp(){
  setSubmitQuiz(start => !start)
}


function displaySubmitBtn(){
  return (
    <>
    <button 
      onClick={submitQuizApp}
      className = {startQuiz ? 'displayBtn' : 'hideBtn'}
      >Submit</button>
    </>
  )
}

function displayPlayAgainBtn(){
  return (
    <div className='finalScoreContainer'>
      {finalScore()}
    <button 
      onClick={resetState}
      className = {startQuiz ? 'displayBtn' : 'hideBtn'}
      >PlayAgain</button>
    </div>
  )
}

function resetState(){
  submitQuizApp()
  startQuizApp()
}
      
  return (
    <div className="App">
      <img className='yellowBlob' src="images/yellowBlob.png" alt=""/>

      <div id='optionsContainer'>
        <h1>Quiz App</h1>
        <p className='warningNote'>Please be aware that if you don't receive any questions after 
          starting the quiz, <br></br>
          there might be an issue with the current API, 
          and it may not support certain types of quizzes.
        </p>
        <div className='quizOptions'>
          <div className='questionAmount'>
            <p>Enter in Question Amount</p>
            <input type="number" id="numberOfQuestions" min="1" max="10" defaultValue="5"/>
          </div>

          <select id="questionType" name="questionType">
            <option value="any" selected disabled>Select Question Type</option>
            <option value="any">Any</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>

          <select id="difficulty" name="difficulty">
            <option value="any" selected disabled>Select Difficulty</option>
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select id="category" name="category">
            <option value="any" selected disabled>Select Category</option>
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals & Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime & Manga</option>
            <option value="32">Entertainment: Cartoon & Animations</option>
          </select>
        </div>
        
        <button 
        onClick={startQuizApp}
        className = {!startQuiz ? 'displayBtn' : 'hideBtn'}
        >Start Quiz</button>
      </div>

      {!submitQuiz ? displayQuiz() : 'hideBtn' && displayCorrectAnswers()}
      {!submitQuiz ? displaySubmitBtn() : displayPlayAgainBtn()}

      <img className='blueBlob' src="images/blueBlob.png" alt=""/>
    </div>
  );
}

export default App;



/*
import React from 'react';
import {decode} from 'html-entities';

function App() {
  const [quiz, setQuiz] = React.useState([])
  const [startQuiz, setStartQuiz] = React.useState(false)
  const [submitQuiz, setSubmitQuiz] = React.useState(false)
  const [pickedAnswers, setPickedAnswers] = React.useState(new Array(5).fill(null))

  React.useEffect(() => {
    const numberOfQuestions = document.getElementById("numberOfQuestions").value;
    const questionType = document.getElementById('questionType').value
    const difficulty = document.getElementById('difficulty').value
    const category = document.getElementById('category').value

    fetch(
      `https://opentdb.com/api.php?amount=${numberOfQuestions}${
        category === "any" ? " " : `&category=${category}`
      }${difficulty === "any" ? " " : `&difficulty=${difficulty}`}${
        questionType === "any" ? " " : `&type=${questionType}`
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
  
        setQuiz(quizData);
      })
    
      
  }, [startQuiz])

  console.log(quiz)


  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
 
  function displayQuiz(){
    if(startQuiz){
      return quiz.map((data, index) => {
        return (
          <div className='quizContainer'>
             <p className='questionNumber'>{index + 1}.</p>
              <p 
                key={data.question}
                className="question"
                >{decode(data.question)}
              </p>
              {data.shuffledAnswers.map(choiceOptions =>
              <button 
                id={choiceOptions}
                onClick={() => pickedAnswer(index, choiceOptions)}
                className={pickedAnswers[index] === choiceOptions ? "pickedAnswer" : ""}
                >  
                {decode(choiceOptions)}
              </button>
              )}
          </div>
        )
      })
    }    
  }

  function displayCorrectAnswers(){
    if(startQuiz){
      return quiz.map((data, index) => {
        return (
          <div className='quizContainer'>
            <p className='questionNumber'>{index + 1}.</p>
              <div 
              key={data.question}
              className="question"
              >{data.question}
              </div>
              {data.shuffledAnswers.map(choiceOptions => 
              <button 
                id={choiceOptions} 
                className={ pickedAnswers[index] === choiceOptions && data.correct_answer === choiceOptions ? "correctAnswers" :
                data.correct_answer === choiceOptions  ? "correctAnswers" : pickedAnswers[index] === choiceOptions ? 'wrongAnswer' : ''}
                >  
                {decode(choiceOptions)}
              </button>
              )}
          </div>
        )
      })
    }    
  }


  function pickedAnswer(questionIndex, answer) {
    const updatedAnswers = [...pickedAnswers];
    updatedAnswers[questionIndex] = answer;
    setPickedAnswers(updatedAnswers);
  }
  

function finalScore(){
  let score = 0
  const allCorrectAnswers = quiz.map((data) => data.correct_answer)
   allCorrectAnswers.forEach((correctAnswers) => {
    pickedAnswers.forEach((pickedAnswers) => {
      if(pickedAnswers === correctAnswers){
        score++
      }
    })
  })
  return (
    <div className='finalScore'>
      <p>You Scored <span>{score}</span>/{quiz.length} correct answers</p>
    </div>
  )
}

     
function startQuizApp(){
  setStartQuiz(start => !start)
  if(startQuiz === false){
    document.getElementById('optionsContainer').style.display="none"
  }
  else(
    document.getElementById('optionsContainer').style.display="block"
  )
}

function submitQuizApp(){
  setSubmitQuiz(start => !start)
}


function displaySubmitBtn(){
  return (
    <>
    <button 
      onClick={submitQuizApp}
      className = {startQuiz ? 'displayBtn' : 'hideBtn'}
      >Submit</button>
    </>
  )
}

function displayPlayAgainBtn(){
  return (
    <div className='finalScoreContainer'>
      {finalScore()}
    <button 
      onClick={resetState}
      className = {startQuiz ? 'displayBtn' : 'hideBtn'}
      >PlayAgain</button>
    </div>
  )
}

function resetState(){
  submitQuizApp()
  startQuizApp()
}
      
  const handleSubmit = (e) => {
  e.preventDefault();
    startQuizApp();
}

  return (
    <div className="App">
      <Questions 
        quizOptions={quizOptions}
      />
      <img className='yellowBlob' src="images/yellowBlob.png" alt=""/>

      <div id='optionsContainer'>
        <h1>Quiz App</h1>
        <p className='warningNote'>Please be aware that if you don't receive any questions after 
          starting the quiz. <br></br>
          There is an issue with the current API, 
          with it not supporting certain types of quizzes.
        </p>
        <div className='quizOptions'>
          <div className='questionAmount'>
            <p>Enter in Question Amount</p>
            <input type="number" id="numberOfQuestions" min="1" max="10" defaultValue="5"/>
          </div>

        <form onSubmit={handleSubmit}>
          <select id="questionType" name="questionType" required>
            <option value="" selected disabled>Select Question Type</option>
            <option value="any">Any</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>

          <select id="difficulty" name="difficulty" required>
            <option value="" selected disabled>Select Difficulty</option>
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select id="category" name="category" required>
            <option value="" selected disabled>Select Category</option>
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals & Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime & Manga</option>
            <option value="32">Entertainment: Cartoon & Animations</option>
          </select>

          <button 
            type='submit'
            className = {!startQuiz ? 'displayBtn' : 'hideBtn'}
            >Start Quiz
          </button>

        </form>
        </div>
      </div>

      {!submitQuiz ? displayQuiz() : 'hideBtn' && displayCorrectAnswers()}
      {!submitQuiz ? displaySubmitBtn() : displayPlayAgainBtn()}

      <img className='blueBlob' src="images/blueBlob.png" alt=""/>
    </div>
  );
}

export default App; 

*/