let isSoundOn = false;

function toggleSound() {
    const audio = document.getElementById('background-music');
    const soundIcon = document.getElementById('sound-icon');
    
    if (isSoundOn) {
        audio.pause();
        soundIcon.src = 'pics/sound_off_icon.png';
        isSoundOn = false;
    } else {
        audio.play().catch(error => {
            console.log("Не удалось воспроизвести звук, требуется действие пользователя.");
        });
        audio.volume = 0.2;
        soundIcon.src = 'pics/sound_on_icon.png';
        isSoundOn = true;
    }
}
;
