/* Visit for more key events => https://keycode.info/ */

function playSound(e){
    // Show the number => console.log(e.keyCode);
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

    if(!audio) return; //Continue with the function
    audio.currentTime = 0; // Loop
    audio.play();
    key.classList.add('playing'); //Color and border!
}

function removeTransition(e){
    if(e.propertyName !== 'transform') return; 
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend',removeTransition));
window.addEventListener('keydown', playSound);