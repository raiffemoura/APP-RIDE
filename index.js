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

  const mapID = `map${ride.id}`;
  const mapElement = document.createElement("div");
  mapElement.id = mapID;
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
  dateDiv.className = "text-primary mt-2";

  dataElement.appendChild(cityDiv);
  dataElement.appendChild(MaxSpeedDiv);
  dataElement.appendChild(distanceDiv);
  dataElement.appendChild(durationDiv);
  dataElement.appendChild(dateDiv);

  itemElement.appendChild(mapElement);
  itemElement.appendChild(dataElement);

  const map = L.map(mapID, {
    zoomControl: false,
    dragging: false,
    attributionControl: false,
    scrollWheelZoom: false,
  });
  map.setView([firstPosition.latitude, firstPosition.longitude], 13);
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      minZoom: 5,
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: "png",
    }
  ).addTo(map);

  L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map);
});
