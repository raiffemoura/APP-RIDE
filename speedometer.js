const speedElement = document.querySelector("#speed");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");

let watchId = null;
let currentRide = null;
startBtn.addEventListener("click", () => {
  if (watchId) {
    return;
  }

  function handleSuccess(position) {
    addPosition(currentRide, position);
    console.log(position);
    speedElement.innerText = position.coords.speed
      ? (position.coords.speed * 3.6).toFixed(1)
      : 0;
  }

  function handleError(error) {
    console.log(error.msg);
  }
  const options = { enableHighAccuracy: true };
  currentRide = createNewRide();
  watchId = navigator.geolocation.watchPosition(
    handleSuccess,
    handleError,
    options
  );

  startBtn.classList.add("d-none");
  stopBtn.classList.remove("d-none");
});

stopBtn.addEventListener("click", () => {
  if (!watchId) {
    return;
  }
  navigator.geolocation.clearWatch(watchId);
  watchId = null;

  updateStopTime(currentRide);
  currentRide = null;

  stopBtn.classList.add("d-none");
  startBtn.classList.remove("d-none");

  window.location.href = "./";
});
