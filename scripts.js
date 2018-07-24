const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];
const search = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

fetch(endpoint)
  .then(raw => raw.json())
  .then(data => cities.push(...data));

function getMatches(input, cities) {
  return cities.filter(location => {
    const regex = new RegExp(input, "gi");
    return location.city.match(regex) || location.state.match(regex);
  });
}

function displayMatches() {
  const matches = getMatches(this.value, cities);
  const matchesHTML = matches
    .map(location => {
      const regex = new RegExp(this.value, "gi");
      const highlightedCity = location.city.replace(
        regex,
        `<span class="highlighted">${this.value}</span>`
      );
      const highlightedState = location.state.replace(
        regex,
        `<span class="highlighted">${this.value}</span>`
      );
      return `
        <li>
            <span class="name">${highlightedCity}, ${highlightedState}</span>
            <span class="population">Population: ${location.population}</span>
        </li>
        `;
    })
    .join();
  suggestions.innerHTML = matchesHTML;
}

search.addEventListener("change", displayMatches);
search.addEventListener("keyup", displayMatches);
