setInterval(time)
function time(){
  time = new Date().toLocaleTimeString();
  document.querySelector(".time").textContent = time;
}
