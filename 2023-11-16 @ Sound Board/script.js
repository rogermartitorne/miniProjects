const audios = [
    {
        name: "applause",
        src: "sounds/applause.mp3"
    },
    {
        name: "boo",
        src: "sounds/boo.mp3"
    },
    {
        name: "gasp",
        src: "sounds/gasp.mp3"
    },
    {
        name: "tada",
        src: "sounds/tada.mp3"
    },
    {
        name: "victory",
        src: "sounds/victory.mp3"
    },
    {
        name: "wrong",
        src: "sounds/wrong.mp3"
    },
]

const buttons = document.getElementsByTagName("button")
let currentlyPlaying
console.log(currentlyPlaying)

for (let btn = 0; btn < audios.length; btn++) {
    buttons[btn].addEventListener("click", () => {

        if (currentlyPlaying) {
            currentlyPlaying.pause();
            currentlyPlaying.currentTime = 0;
        }
        const audio = new Audio(audios[btn].src);
        audio.play();
        currentlyPlaying = audio;
    });
}
