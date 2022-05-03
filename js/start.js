const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //사용자가 선택한 답변 담을 배열

//결과 계산 함수
const calResult = () =>{
   
    //최댓값 반환
    let result = select.indexOf(Math.max(...select));
    return result;
    
}

//결과값 함수
const setResult = () =>{
    let point = calResult();
    const resultEx = document.querySelector('.resultEx');
    resultEx.innerHTML = infoList[point].ex;

    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    let resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    let imgURL = `img/image-${point}.png`;
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

//결과지 보여주는 함수
const goResult = () =>{
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            qna.style.display = "none";
            result.style.display = "block";
        },450)})

        setResult();
        calResult();
        
}

//선택지 만드는 함수
const addAnswer = (answerText, qIdx, idx) =>{
    let a = document.querySelector('.answerBox');
    //선택지버튼을 여기서 추가해줌
    let answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('px-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    a.appendChild(answer);
    answer.innerHTML = answerText;
    //선택지 버튼 클릭시
    answer.addEventListener("click",()=>{
        let children = document.querySelectorAll('.answerList');
        for(let i=0; i<children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(()=>{
            let target = qnaList[qIdx].a[idx].type;
            //선택한 값의 인덱스 값을 1 증가
            for(let i=0; i<target.length; i++){
                select[target[i]] += 1;
            }

            for(let i = 0; i<children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);//다음 질문으로 넘어가기 위해 idx값 증가
        },450)
        
    }, false);
}

//다음 질문 가져오는 함수
const goNext = (qIdx) =>{
    if(qIdx === endPoint){
        goResult();
        return;
    }

    let q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for (let i in qnaList[qIdx].a){
        //답변 배열 돌아가면서 선택지 추가
        addAnswer(qnaList[qIdx].a[i].answer,qIdx,i);
    }
    let status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

//시작버튼 누른 후 화면 보여주는 함수
const begin = () =>{
    //넘어갈때 페이드를 줘서 자연스럽게
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            main.style.display = "none";
            qna.style.display = "block";
        },450)
        //질문 번호 선택
        let qIdx = 0;
        goNext(qIdx);
    },450);

}
