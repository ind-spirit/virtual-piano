window.onload = function() {
    const piano = document.querySelector('.piano');
    const pianoKeys = document.querySelectorAll('.piano-key');
    const keys = ['KeyR', 'KeyT', 'KeyU', 'KeyI', 'KeyO', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'];
    const letters = ['R', 'T', 'U', 'I', 'O', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    let isDown = false;


    // FUNCTIONS
    function playAudio(data) {
        if (letters.includes(data)) {
            let letter = document.querySelector(`audio[data-letter=${data}]`);
            letter.currentTime = 0;
            letter.play();
        } else {
            let note = document.querySelector(`audio[data-note=${data}]`);
            note.currentTime = 0;
            note.play();
        }
    };

    function makeActive(button) {
        pianoKeys.forEach((el) => {
            if (el.classList.contains('active')) {
                el.classList.remove('active');
            }
        });
        button.classList.add('active');
    };

    function makeInActive() {
        pianoKeys.forEach((el) => {
            if (el.classList.contains('active')) {
                el.classList.remove('active');
            }
        });
    }

    // BUTTON PRESS
    window.addEventListener('keydown', (event) => {
        if (keys.includes(event.code) && !event.repeat) {
            let letter = event.code[3];
            let button = document.querySelector(`div[data-letter=${letter}]`);
            playAudio(letter);
            makeActive(button);
        }
    });
    window.addEventListener('keyup', (event) => {
        if (keys.includes(event.code)) {
            makeInActive();
        }
    });

    // MOUSE SWIPPING
    piano.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('piano-key')) {
            isDown = true;
            let note = event.target.dataset.note;
            playAudio(note);
            makeActive(event.target);
        }
    });
    window.addEventListener('mouseup', () => {
        isDown = false;
        makeInActive();
    });

    piano.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('piano-key') && isDown) {
            let note = event.target.dataset.note;
            playAudio(note);
            makeActive(event.target);
        }
    });

    // NOTES/LETTERS SWAP

    let btnLetters = document.querySelector('.btn-letters');
    let btnNotes = document.querySelector('.btn-notes');

    btnLetters.addEventListener('click', () => {
        pianoKeys.forEach((el) => el.classList.add('piano-key-letter'));
        btnLetters.classList.add('btn-active');
        btnNotes.classList.remove('btn-active');
    });

    btnNotes.addEventListener('click', () => {
        pianoKeys.forEach((el) => el.classList.remove('piano-key-letter'));
        btnLetters.classList.remove('btn-active');
        btnNotes.classList.add('btn-active');
    });

    // FULLSCREEN

    let btnFS = document.querySelector('.fullscreen');

    btnFS.addEventListener('click', (event) => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            btnFS.classList.add('isFS');
        } else {
            document.exitFullscreen();
            btnFS.classList.remove('isFS');
        }
    })
};