import { topics } from './topics.js';

const contentElm = document.getElementById('content');
const modal = document.getElementById("modal");
const nextNumber = [];
const timeoutDuration = 2000;


for(let i = 1; i< topics.length;i++)
    nextNumber[i] = 0;

for(let i = 0;i < topics.length ;i++){
    const linkElm = document.createElement('a');
    linkElm.setAttribute('id', 'link');
    linkElm.setAttribute('name', i);
    linkElm.textContent = i+1;
    contentElm.appendChild(linkElm);
}

const openBtn = document.querySelectorAll("#link");

// console.log(topics);
function openModal() {
    modal.style.display = "block";

    const modalContent = document.getElementById("topic");
    const topicIdElm  = document.getElementById("topicId");
    const nextElm = document.getElementById("next");
    const countdownElement = document.getElementById('countdown');

    let randNextNumber;

    while(true){
        randNextNumber = Math.floor(Math.random() * 70)
        if(nextNumber[randNextNumber] === 0){
            nextNumber[randNextNumber]++;
            console.log(nextNumber);
            break;
        }
    }

    nextElm.innerHTML = 'Next number is ' + (randNextNumber+1);

    topicIdElm.innerText = 'Topic-' + (+event.target.name+1);
    modalContent.textContent = topics[+event.target.name].topic;
    // console.log((event.target.name);
    timer(event);

    const targetTime = Date.now() + timeoutDuration;

    const intervalID = setInterval(updateCountdown, 1000);

    // const timeoutID = setTimeout(() => {
    //     clearInterval(intervalID);
    //     console.log('Inside timeout');
    //     countdownElement.textContent = 'Time up';
    // }, timeoutDuration);


    function updateCountdown() {
        const currentTime = Date.now();
        const timeLeft = targetTime - currentTime;
    
        countdownElement.textContent = `Time left: ${Math.ceil(timeLeft / 1000)} seconds`;
    
        if (timeLeft <= 0) {
            // clearTimeout(timeoutID);
            clearInterval(intervalID);
            console.log('Inside function');
            countdownElement.textContent = 'Time up';
        }
    }

}



function timer(event) {
    setTimeout(() => {
        // console.log('fds');
        closeModal();
        event.target.style.display = "none";
    }, timeoutDuration);
}

function closeModal() {
  modal.style.display = "none";
}

// console.log(openBtn);
for(let i=0;i<topics.length;i++)
    openBtn[i].addEventListener("click", openModal  );

// window.addEventListener("click", function(event) {
//     if (event.target == modal) {
//       closeModal();
//     }
//   });