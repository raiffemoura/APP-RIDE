const rideListElement = document.querySelector("#rideList");
const allRides = getAllRides();

allRides.forEach(async ([id, value]) => {
  const ride = JSON.parse(value);
  ride.id = id;

  const itemElement = document.createElement("li");
  itemElement.id = ride.id;
  itemElement.className = "d-flex p-1 align-items-center shadow-sm gap-3";
  rideListElement.appendChild(itemElement);

  itemElement.addEventListener("click", () => {
    window.location.href = `./detail.html?id=${ride.id}`;
  });
  const firstPosition = ride.data[0];
  const firstLocationData = await getLocationData(
    firstPosition.latitude,
    firstPosition.longitude
  );

  const mapElement = document.createElement("div");
  mapElement.style = "width:100px;height:100px;";
  mapElement.classList.add("bg-secondary");
  mapElement.classList.add("rounded-4");

  const dataElement = document.createElement("div");
  dataElement.className = "flex-fill d-flex flex-column";

  const cityDiv = document.createElement("div");
  cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`;
  cityDiv.className = "text-primary mb-2";

  const MaxSpeedDiv = document.createElement("div");
  MaxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} Km/h`;
  MaxSpeedDiv.className = "h5";

  const distanceDiv = document.createElement("div");
  distanceDiv.innerText = `Distance: ${getDistance(ride.data)} km`;

  const durationDiv = document.createElement("div");
  durationDiv.innerText = `Duration: ${getDuration(ride)}`;

  const dateDiv = document.createElement("div");
  dateDiv.innerText = getStartDate(ride);
  dateDiv.className = "text-secondary mt-2";

  dataElement.appendChild(cityDiv);
  dataElement.appendChild(MaxSpeedDiv);
  dataElement.appendChild(distanceDiv);
  dataElement.appendChild(durationDiv);
  dataElement.appendChild(dateDiv);

  itemElement.appendChild(mapElement);
  itemElement.appendChild(dataElement);
});
