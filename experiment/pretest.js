/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
 

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////






/////////////// Write the MCQ below in the exactly same described format ///////////////


  const myQuestions = [
    {
      question: "1.	Slicing of which samples can NOT be easily performed for TEM sample preparation:",  ///// Write the question inside double quotes
      answers: {
        a: "Biological sample",                  ///// Write the option 1 inside double quotes
        b: "Polymeric sample",
        c: "Metallic sample",
        d:"Ceramic sample",///// Write the option 2 inside double quotes
      },
      correctAnswer: "d"                ///// Write the correct option inside double quotes
    },

{
      question: "2. The slicing of sample is performed to obtain a sheet of thickness less than:",
      answers: {
        a: "1 mm",
        b: "100 µm",
        c: "1 µm",
        d: "100 nm"
      },
      correctAnswer: "b"
    },
{
      question: "3.	The punching off a disc from the sheet is usually of what size?",
      answers: {
        a: "3 mm",
        b: "1mm",
        c: "100 µm",
        d: "1 µm"
      },
      correctAnswer: "a"
    },
{
      question: "4.	The dimpling is performed to bring down the thickness to approximately what size?",
      answers: {
        a: "2-5 nm",
        b: "20-50 nm",
        c: "2-5 µm",
        d: "20-50 µm"
      },
      correctAnswer: "c"
    },
{
      question: "5.	Generically, which is the maximum thickness level of coating that allows it to be called “nano-coating”",
      answers: {
        a: "< 1 nm",
        b: "< 10 nm",
        c: "<100 nm",
        d: "< 1000 nm"
      },
      correctAnswer: "c"
    },


    /* To add more MCQ's, copy the below section, starting from open curly braces ( { )
        till closing curly braces comma ( }, )

        and paste it below the curly braces comma ( below correct answer }, ) of above 
        question

    Copy below section

    {
      question: "This is question n?",
      answers: {
        a: "Option 1",
        b: "Option 2",
        c: "Option 3",
        d: "Option 4"
      },
      correctAnswer: "c"
    },

    Copy above section

    */




  ];




/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////


  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////