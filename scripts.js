const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];

fetch(endpoint)
  .then(raw => raw.json())
  .then(data => cities.push(...data));

function getMatches(input, cities) {
  return cities.filter(location => {
    const regex = new RegExp(input, "gi");
    return location.city.match(regex) || location.state.match(regex);
  });
}
