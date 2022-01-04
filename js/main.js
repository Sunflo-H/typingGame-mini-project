const FINAL_SCORE = 10;
let words = ['a','s','d'];
let score = 0;
let timeInterval;
let random_index;

const wordDisplay = document.querySelector('.word-display');
const wordInput = document.querySelector('.word-input');
const timeDisplay = document.querySelector('.time');
const scoreDisplay =document.querySelector('.score');
const startBtn = document.querySelector('.start_btn');
const time = timeDisplay.firstElementChild;

// 게임 시작
function gameStart() {
    question(); // 문제 내고
    wordInput.disabled=false; // 인풋 활성화
    wordInput.focus();
    wordInput.addEventListener('keydown',matchQuestion); // 인풋에 엔터누르면 문제와 매치하는 함수 적용
    scoreState("reset");
    btnState('게임중');     
}

function btnState(text){
    if(text =="게임중"){
        startBtn.classList.add('loading');
        startBtn.innerHTML="게임중"
        startBtn.disabled=true;
    } else if(text == "다시하기"){
        startBtn.classList.remove('loading');
        startBtn.innerHTML="게임 다시하기"
        startBtn.disabled = false;

        // 제시어 배열 원래대로 되돌리기
        words = ['a','s','d'];
    }
}
// 타이핑 문제를 제시하는 함수
function question(text) {
    clearInterval(timeInterval); //시간이 중복해서 흐르는걸 막기위한 인터벌 초기화 함수
    if(text != undefined){ // 이미 제시된 단어는 필터해서 새 배열을 만든다. 중복허용 X
        words = words.filter(word => word!==text)
        scoreState("plus");// 이 조건문에 온거는 정답을 맞춘거니까 점수 증가
    }
    
    random_index = random(); // 필터후 랜덤숫자를 얻어온다.
    time.innerHTML=5; // 시간제한 초기화
    timeInterval = setInterval(timer,1000);
    wordDisplay.innerHTML=words[random_index]; // 제시어 출제
    wordInput.focus();

    if(words.length==0){ // 모든 문제를 다 풀면 실행
        wordDisplay.innerHTML="SUCCESS!"
        wordInput.disabled=true;
        clearInterval(timeInterval); // 시간은 흐르지 않게한다.
        btnState('다시하기'); // 게임 시작 버튼 다시 활성화
    }
}

function random() {
    let num = Math.floor((Math.random()*words.length));
    return num;
}

function timer() {
    time.innerHTML--;
    if(time.innerHTML==0){// 시간제한이 되면 다시 출제한다. 점수는 깎인다
        scoreState("minus");
        question();
    }
}

function scoreState(state) {
    const element = timeDisplay.nextElementSibling.firstElementChild;
    if(state === "plus"){
        score++;
        element.innerHTML=score;
    } else if(state === "minus"){
        if(score != 0){ //점수가 0이 아니면 실행 , 음수는 안된다.
            score--;
            element.innerHTML=score;
        }
    } else if(state === "reset"){
        score = 0;
        element.innerHTML=score;
    }    
}

function matchQuestion(event){
    if (window.event.keyCode == 13) { //엔터키가 눌리면
        let inputText = event.target;
        if(wordDisplay.innerHTML === inputText.value){
            question(wordDisplay.innerHTML);
        }

        inputText.value=""
    }
}

startBtn.addEventListener('click',gameStart);

