const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //sounds
  const sounds = document.querySelectorAll(".sound-picker button");

  //time Display
  const timeDisplay = document.querySelector(".time-display");

  //time select
  const timeSelect = document.querySelectorAll(".time-select button");

  //get the lenght of the outline
  const outlineLength = outline.getTotalLength(); //I get the length of the circle

  //Duration
  let fakeDuration = 600;

  //to animate the circle for when the music plays:
  outline.style.strokeDasharray = outlineLength; //it makes all the circle blue
  outline.style.strokeDashoffset = outlineLength; // it makes all the circle white

  //pick different sounds
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  //play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //select sound
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });
  //Specific function to stop and plat the sounds
  const checkPlaying = (song) => {
    //paused is a property of the song attribute
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  //this function runs every time the song runs and while the song runs it keeps updating
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //animating de circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //animating the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();
