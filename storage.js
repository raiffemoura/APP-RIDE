function createNewRide() {
  const rideID = Date.now();
  const rideRecord = {
    data: [],
    startTime: rideID,
    stopTime: null,
  };

  saveRideRecord(rideID, rideRecord);
  return rideID;
}

function getAllRides() {
  return Object.entries(localStorage);
}
function getRideRecord(rideID) {
  return JSON.parse(localStorage.getItem(rideID));
}
function saveRideRecord(rideID, rideRecord) {
  localStorage.setItem(rideID, JSON.stringify(rideRecord));
}
function addPosition(rideID, position) {
  const rideRecord = getRideRecord(rideID);
  const newData = {
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude,
    altitudeAccuracy: position.coords.altitudeAccuracy,
    heading: position.coords.heading,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    speed: position.coords.speed,
    timestamp: position.timestamp,
  };
  rideRecord.data.push(newData);
  saveRideRecord(rideID, rideRecord);
}
function updateStopTime(rideId) {
  const rideRecord = getRideRecord(rideId);
  rideRecord.stopTime = Date.now();
  saveRideRecord(rideId, rideRecord);
}
