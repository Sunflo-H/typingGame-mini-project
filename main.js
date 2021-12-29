const suggestion = document.querySelector('.suggestion');
const typing = document.querySelector('.typing');
const typing_input = typing.querySelector('input');
const timeAndScore = document.querySelector('.time_and_score');
const startBtn = document.querySelector('.start_btn');

const time = timeAndScore.firstElementChild.firstElementChild;
let suggestionList = ['a','s','d'];
let score_count = 0;
let timer;



// 타이핑 문제를 제시하는 함수
function question(text) {
    clearInterval(timer); //시간이 중복해서 흐르는걸 막기위한 인터벌 초기화 함수
    let element = suggestion.firstElementChild;
    if(text != undefined){ // 이미 제시된 단어는 필터해서 새 배열을 만든다.
        suggestionList = suggestionList.filter(item => item!==text)
        // 이 조건문에 온거는 정답을 맞춘거니까 점수 증가
        score("plus");        
    }
    
    let random_index = random(); // 필터후 랜덤숫자를 얻어온다.

    time.innerHTML=5; // 시간제한 초기화
    timer = setInterval(time_func,1000); // 시간제한

    element.innerHTML=suggestionList[random_index]; // 제시어 출제
    
    typing_input.focus();

    
    if(suggestionList.length==0){ // 모든 문제를 다 풀면 실행
        element.innerHTML="모든 문제를 다 풀었습니다!"
        typing_input.disabled=true;

        clearInterval(timer); // 시간은 흐르지 않게한다.
        
        reGame(); // 게임 시작 버튼 다시 활성화
    }
}

function random() {
    let num = Math.floor((Math.random()*suggestionList.length));
    return num;
}

function time_func() {
    time.innerHTML = time.innerHTML - 1;
    if(time.innerHTML==0){// 시간제한이 되면 다시 출제한다. 점수는 깎인다
        score("minus");
        question();
    }
}

function score(state) {
    const element = timeAndScore.firstElementChild.nextElementSibling.firstElementChild;
    if(state === "plus"){
        score_count++;
        element.innerHTML=score_count;
    } else if(state === "minus"){
        if(score_count != 0){ //점수가 0이 아니면 실행 , 음수는 안된다.
            score_count--;
            element.innerHTML=score_count;
        }
    } else if(state === "reset"){
        score_count = 0;
        element.innerHTML=score_count;
    }
    
}

function enterkey(event){
    if (window.event.keyCode == 13) {
        let element = suggestion.firstElementChild;
        let inputText = event.target;
        // 성공
        if(element.innerHTML === inputText.value){
            question(element.innerHTML);
        }
        // 실패 
        else {
        }
        inputText.value=""
        
    }
}

function gameStart() {
    question();
    startBtn.disabled=true;
    startBtn.innerHTML="게임중"

    // 타이핑 활성화
    typing_input.disabled=false;

     // 점수 초기화
    //  score_count = 0;
    score("reset");
}

function reGame() {
    // 버튼 활성화
    startBtn.disabled = false;
    startBtn.innerHTML="게임 다시하기"

    // 제시어 배열 원래대로 되돌리기
    suggestionList = ['a','s','d'];
}

startBtn.addEventListener('click',gameStart);
typing.addEventListener('keydown',enterkey)
