function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  const bodyColor = document.querySelector("body");
  const startBtn = document.querySelector("button[data-start]");
  const stopBtn = document.querySelector("button[data-stop]");
  
  let timeID = null;
  
  
  stopBtn.disabled = true;
  
  startBtn.addEventListener("click", () => {
      setInterval(() => {
      bodyColor.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  });
  
  stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });
