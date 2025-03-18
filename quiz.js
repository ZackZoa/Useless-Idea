const quizData = [
    {
      question: "Who is the best character to take on a picnic?",
      options: ["Venti (for the vibes)", "Zhongli (he brings the rocks)", "Qiqi (she brings the ice)", "Diluc (he burns the snacks)"],
      correct: 0
    },
    {
      question: "What is Paimon’s true purpose?",
      options: ["To guide you through Teyvat", "To eat all the delicious food", "To be the final boss in disguise", "To just hover and look cute"],
      correct: 3
    },
    {
      question: "Which of these does NOT belong in Teyvat?",
      options: ["Zhongli’s geo constructs", "Ganyu’s ice flower", "A Fortnite Battle Pass", "Amber’s explosive arrows"],
      correct: 2
    },
    {
      question: "What’s Albedo’s favorite hobby?",
      options: ["Painting", "Playing chess", "Throwing things into volcanoes", "Collecting rocks (scientifically)"],
      correct: 3
    },
    {
      question: "If Bennett was a superhero, his catchphrase would be:",
      options: ["'Let's go, team!'", "'I am always on fire!'", "'You can't beat my cooking!'", "'I’m too cool for this.'"],
      correct: 1
    },
    {
      question: "Which one of these songs could you totally imagine playing during a battle with Scaramouche?",
      options: ["'Eye of the Tiger'", "'Take On Me'", "'Smooth Criminal'", "'Old Town Road'"],
      correct: 2
    },
    {
      question: "What does a Geo Traveler do when they get bored?",
      options: ["Build a statue", "Talk to rocks", "Invent new Geo powers", "Just meditate forever"],
      correct: 1
    },
    {
      question: "If you could change Diluc’s color scheme, which one would you pick?",
      options: ["Rainbow", "Pastel pinks", "Neon green", "Glittery silver"],
      correct: 3
    },
    {
      question: "How do you think Venti would spend a rainy day?",
      options: ["Write a poem about the rain", "Throw a party in Mondstadt’s tavern", "Steal everyone’s apples", "Build a boat and float around"],
      correct: 1
    },
    {
      question: "Which element does NOT match with Diluc?",
      options: ["Pyro", "Electro", "Geo", "Cryo"],
      correct: 2
    },
    {
      question: "Which game would you challenge Paimon to play?",
      options: ["The Sims (to build her own house)", "Super Mario Kart (watch out for the blue shells)", "Tetris (watch those falling blocks!)", "Among Us (she might be the impostor…)"],
      correct: 3
    },
    // Continue adding more questions...
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  function loadQuestion() {
    const quiz = document.getElementById('quiz');
    const nextButton = document.getElementById('next-button');
    const questionData = quizData[currentQuestion];
  
    if (currentQuestion >= quizData.length) {
      // Show the results and the "Back to Main Menu" button at the end of the quiz
      quiz.innerHTML = `
        <h2>Quiz Finished!</h2>
        <p>Your score is ${score} out of ${quizData.length}</p>
        <button id="back-to-main" onclick="window.location.href='index.html'">Back to Main Menu</button>
      `;
      nextButton.style.display = "none"; // Hide the next button at the end
      return;
    }
  
    quiz.innerHTML = `
      <div class="question">${questionData.question}</div>
      <ul class="options">
        ${questionData.options.map((option, index) => `
          <li class="option" onclick="checkAnswer(${index})">${option}</li>
        `).join('')}
      </ul>
    `;
  
    nextButton.style.display = "none"; // Hide the next button initially (we'll show it after an answer is clicked)
  }
  
  function checkAnswer(selected) {
    const correctAnswer = quizData[currentQuestion].correct;
    const nextButton = document.getElementById('next-button');
    const options = document.querySelectorAll('.option');
  
    // Highlight the selected answer
    if (selected === correctAnswer) {
      options[selected].style.backgroundColor = "green";
      score++; // Increment score if correct
    } else {
      options[selected].style.backgroundColor = "red";
    }
  
    // Disable the options after an answer is selected
    options.forEach(option => {
      option.style.pointerEvents = "none";
    });
  
    nextButton.style.display = "block"; // Show the next button when an answer is selected
  }
  
  document.getElementById('next-button').addEventListener('click', () => {
    currentQuestion++; // Move to the next question
    loadQuestion(); // Load the next question
  });
  
  loadQuestion(); // Load the first question on page load
  