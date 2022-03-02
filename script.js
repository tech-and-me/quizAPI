// Global Variable 
let apiUrl = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
let level = "";
let questAnsArr = [];
let randomOrderArr = [];
let amount = "10";

//Fetch Api
const fetchData = (e) => {
    e.style.backgroundColor = "black";
    amount = document.querySelector("input").value;
    if (+amount < 10){
        amount = 10;
    } 
    level = "&difficulty=" + e.textContent.toLowerCase();
    apiUrl = "https://opentdb.com/api.php?amount=" + amount + "&category=18" + level + "&type=multiple";
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        questAnsArr = data.results;
        console.log(questAnsArr);
        // questAnsArr.push(obj);
        displayQuiz(questAnsArr);
        return questAnsArr;
    })
}

// function to pick random number
const generateRandomOrder = () => {
    randomOrderArr = [];
    while (true){
        let rndInt = Math.floor(Math.random() * 4) + 1;
        if (!randomOrderArr.includes(rndInt)) randomOrderArr.push(rndInt);
        if (randomOrderArr.length === 4){
            break;
        } 
    }
}

// Function to display data of questions and answers**********************
const displayQuiz = (arr) => {
    // hide welcome section
    document.querySelector("#quizBlock").style.display = "block";

    //display quiz section
    start.style.display = "none";

    // build htmlElement for quiz to be displayed
    let str = "";
    console.log(questAnsArr);

    arr.forEach((element,index) => {
        // generate random order of li 
        generateRandomOrder();
        str += `
        <ul class="list-group my-4 fs-5">
            <div > Q${index+1} - ${element['question']}
                <div class='d-flex flex-column mt-2'>
                    <li class="list-group-item order-${randomOrderArr[0]}" id="li_${index}_0">
                        <input type="radio" name="radio${index}" id="radio_${index}_0" > 
                        ${element['correct_answer']}
                    </li>
                    <li class="list-group-item order-${randomOrderArr[1]}">
                        <input type="radio" name="radio${index}"> 
                        ${element['incorrect_answers'][0]}
                    </li>
                    <li class="list-group-item order-${randomOrderArr[2]}" >
                        <input type="radio" name="radio${index}"> 
                        ${element['incorrect_answers'][1]}
                    </li>
                    <li class="list-group-item order-${randomOrderArr[3]}">
                        <input type="radio" name="radio${index}"> 
                        ${element['incorrect_answers'][2]}
                    </li>
                </div>
            </div>
        </ul> ` 
    });
        
    // display quiz on page **********************
    document.querySelector("#quizWrap").innerHTML = str;

}  // END OF DISPLAY QUIZ FUNCTION **********************

// FUNCTION HANDLE WHEN SUBMIT **********************
const handleSubmit = () => {
    let score = 0;

    questAnsArr.forEach((element,index) => {  
        let firstLiElm = document.getElementById(`li_${index}_${0}`);
        //select the first radio button ( it is the correct answer radio button)  
        let firstRadioElm = document.getElementById(`radio_${index}_${0}`);
        // if the first radio button is checked, then, increase score by 1
        if (firstRadioElm.checked)
        {
            score++;
        }  

        firstLiElm.style.backgroundColor = "cyan";

    });

    btnSubmitElm.style.display = 'none';
    document.getElementById("score").innerText = `SCORE : ${score} `
    
}
// END OF FUNCTION HANDLE WHEN SUBMIT **********************


// invoke HandleSumit when submit button is clicked
const btnSubmitElm = document.getElementById("btnSubmit")
btnSubmitElm.addEventListener("click",handleSubmit);

// invoke reload function when reload button clicked
document.getElementById("btnReset").addEventListener("click",()=>window.location.reload());


