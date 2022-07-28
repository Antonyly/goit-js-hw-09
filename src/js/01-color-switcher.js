const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');

let timerId = 0;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const backgroundColorSwitcher = function() {
    document.body.style.backgroundColor = getRandomHexColor();
}
btnStopEl.disabled = true;
btnStartEl.addEventListener('click', () => {
    timerId = setInterval(backgroundColorSwitcher, 1000)
    btnStartEl.disabled = true;
    btnStopEl.disabled = false;
});
btnStopEl.addEventListener('click', () => {
    clearInterval(timerId);
    btnStartEl.disabled = false;
    btnStopEl.disabled = true;
})






// let timerId = null;
// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }
// // function to switch color to random
// btnStopEl.disabled = true;
// const backgroundColorSwitcher = function () {
//     document.body.style.backgroundColor = getRandomHexColor();
// };

// // start changing color

// btnStartEl.addEventListener('click', () => {
//   timerId = setInterval(backgroundColorSwitcher, 1000);
//     btnStartEl.disabled = true;
//     btnStopEl.disabled = false;
// });

// // stop changing color

// btnStopEl.addEventListener('click', () => {
//   clearInterval(timerId);
//     btnStartEl.disabled = false;
//     btnStopEl.disabled = true;
// });

