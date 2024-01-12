const global = {
  currentPage: window.location.pathname,
  search: {
      term: '',
      type: '',
      page: 1,
  }
};




const welcome = document.querySelector('.welcome');

function dropInfo(){
}


async function getQuestions(){
 const response = await fetch('./question&answers.json')
  const data = await response.json();
  return data;
}

const ques = document.querySelector('.questions');
let count = 0;

async function putQuestions(){
  const questions = await getQuestions();
  const button = document.createElement('button');
  button.classList.add('button-style');
  button.textContent = 'Submit'
  button.addEventListener('click',check);

  questions.forEach((question)=>{
    const div = document.createElement('div');
    div.classList.add('question');
    count++;
    div.innerHTML = `
    <h1 class="que">${question.Question}</h1>
    <div class="options">
    <span><label><input type="radio" name="question${count}" value="A" class="ans">${question.A}</label></span>
    <span><label><input type="radio" name="question${count}" value="B" class="ans">${question.B}</label></span>
    <span><label><input type="radio" name="question${count}" value="C" class="ans">${question.C}</label></span>
    <span><label><input type="radio" name="question${count}" value="D" class="ans">${question.D}</label></span>
    </div>
    `
   ques.appendChild(div); 
  })
  ques.appendChild(button);
  console.log(questions);
}

const userAnswers = [];
function check() {

  for (let i = 1; i <= count; i++) {
    const selectedOption = document.querySelector(`input[name="question${i}"]:checked`);

    if (selectedOption) {
      userAnswers.push({ questionNumber: i, answer: selectedOption.value });
    } else {
      alert(`Please answer question ${i}`);
      return; // Exit the function if any question is not answered
    }
  }

  // Do something with the userAnswers array, such as sending it to a server or displaying results
  console.log(userAnswers);
  localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
}
const frr = localStorage.getItem('userAnswers');
const word = JSON.parse(frr)


let correct = 0;
function marking(){
  const rightAnswers = ['B','C','A','D','B','B','D','C','C','C'];

  for(let i = 0; i<10; i++){
    if(word[i].answer === rightAnswers[i]){
  
      correct++;
    } 
  }

  displayScore();
}

function displayScore(){
 const pool = document.querySelector('.score-details');
 const percent = (correct / 10)*100;
 pool.innerHTML = `
 <h1 class="score">${percent}%</h1>
 <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">
   <div class="progress-bar" style="width: ${percent}%"></div>
 </div>
 `
}






function init(){
  switch (global.currentPage){
    case '/':
      case '/login.html':
        const firstName = document.querySelector('.first-name').textContent;
        localStorage.setItem('first-name',firstName);
        break;
        case '/Exam.html':
          welcome.innerHTML = `<h1>Welcome student, This is your English Examination</h1>`
          // dropInfo();
          localStorage.getItem('first-name');
          putQuestions();
          break;
          
          case '/result.html':
        marking();
        // setTimeout(displayScore,3000);
        // displayScore();
      break
    }
  
  }
    
  init();