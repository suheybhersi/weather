setInterval(time)
function time(){
  time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  document.querySelector(".time2").textContent = time;
}

date = new Date().toLocaleDateString([], {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
document.querySelector(".date").textContent = date;
