import React from 'react';
import Questions from './Components/Questions';
import {decode} from 'html-entities';

function App() {
  const [quiz, setQuiz] = React.useState([])
  const [startQuiz, setStartQuiz] = React.useState(false)
  const [submitQuiz, setSubmitQuiz] = React.useState(false)
  const [pickedAnswers, setPickedAnswers] = React.useState(new Array(5).fill(null))

  const [numberOfQuestions, setNumberOfQuestions] = React.useState(null)
  const [questionType, setQuestionType] = React.useState(null)
  const [difficulty, setDifficulty] = React.useState(null)
  const [category, setCategory] = React.useState(null)
 
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

    setNumberOfQuestions(document.getElementById("numberOfQuestions").value)
    setQuestionType(document.getElementById('questionType').value)
    setDifficulty(document.getElementById('difficulty').value)
    setCategory(document.getElementById('category').value)
   
}

  return (
    <div className="App">
      <img className='yellowBlob' src="images/yellowBlob.png" alt=""/>

      <div id='optionsContainer'>
        <h1>Quiz App</h1>
        <p className='warningNote'>
          <h4>⚠️WARNING⚠️</h4>
          Please be aware that if you don't receive any questions after 
          starting the quiz. <br></br>
          There is an issue with the current API 
          with it not supporting certain quiz types.
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

      <Questions 
      startQuiz={startQuiz}
      numberOfQuestions={numberOfQuestions}
      questionType={questionType}
      difficulty={difficulty}
      category={category}
      startQuizFunction={startQuizApp}
      setQuiz={setQuiz}
      />
      
      {!submitQuiz ? displayQuiz() : 'hideBtn' && displayCorrectAnswers()}
      {!submitQuiz ? displaySubmitBtn() : displayPlayAgainBtn()}

      <img className='blueBlob' src="images/blueBlob.png" alt=""/>
    </div>
  );
}

export default App;








