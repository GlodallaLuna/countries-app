const input = document.querySelector("#form-input");
const button = document.querySelector("#button");

async function getData(userInput) {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    // Filter returns an array with 1 element, so we use [0]
    // to pick out the actual object
    const countryArray = data.filter((obj) => {
      return userInput == obj.name.common;
    });

    if (countryArray.length === 0) {
      const suggestions = getClosestWords(data, userInput);
      showSuggestions(suggestions);
      return;
    }

    const country = countryArray[0];

    //getting the english name
    const englishName = country.name.common;

    //going through the country obj to nativeName obj
    const localNamesObject = country.name.nativeName;
    //getting the keys inside the object
    const nameKeys = Object.keys(localNamesObject);
    //creating a new array,
    //looping through the keys to turn them into objs
    //pushing them inside a new array
    const localNames = nameKeys.map((key) => {
      const newObject = {
        language: country.languages[key],
        name: country.name.nativeName[key].common
      };
      return newObject;
    });
    //getting the flag
    const flag = country.flags.svg;
    //getting capital
    const capital = country.capital[0];
    //getting continent
    const continent = country.continents[0];
    //getting the currencies
    const currenciesObject = country.currencies;
    const currencyKey = Object.keys(currenciesObject)[0];
    const currencies = currenciesObject[currencyKey];

    //getting the population
    const population = country.population;
    //to create a new array with all the population numbers
    const populationsArray = data.map((countryObj) => {
      return countryObj.population;
    });
    //to sort the numbers and get the index to rank the countries
    populationsArray.sort((a, b) => b - a);
    const populationRank = populationsArray.indexOf(population) + 1;

    //getting the area
    const area = country.area;
    //to create a new array with all the area numbers
    const areasArray = data.map((countryObj) => {
      return countryObj.area;
    });
    //to sort the numbers and get the index to rank the countries
    areasArray.sort((a, b) => b - a);
    const areaRank = areasArray.indexOf(area) + 1;

    //to get the googlemaps link
    const map = country.maps.googleMaps;

    /////////////////////////////////////////////
    /////////////////////////////////////////////
    //object to store all our date and pass it to the
    //other data.html page
    const countryData = {
      englishName: englishName,
      localNames: localNames,
      flag: flag,
      capital: capital,
      continent: continent,
      currencies: currencies,
      population: population,
      populationRank: populationRank,
      area: area,
      areaRank: areaRank,
      map: map
    };

    // Save data in session storage for next page
    const dataString = JSON.stringify(countryData);
    sessionStorage.setItem("data", dataString);

    // Change page
    window.location.href = "data.html";
  } catch {
    console.log("Error");
  }
}

input.addEventListener("keyup", e => {
  if (e.keyCode == "13") {
    button.click();
  }
});

button.addEventListener("click", () => {
  const userInput = input.value;
  getData(userInput);
});



//change theme
let themeToggler = document.querySelector("#themeToggler");
let planetImg = document.querySelector(".header__img");

// default sessionstorage theme to blue if there isn't a current value
const theme = sessionStorage.getItem("theme");

if (theme === null) {
  sessionStorage.setItem("theme", "blue");
} else if (theme === "green") {
  document.body.classList.toggle("green-mode");
  planetImg.src = "images/planet-green.svg";
  themeToggler.checked = true;
}

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("green-mode");

  if (document.body.classList.value === "green-mode") {
    planetImg.src = "images/planet-green.svg";
    sessionStorage.setItem("theme", "green");
  } else {
    planetImg.src = "images/planet-blue.svg";
    sessionStorage.setItem("theme", "blue");
  }
});

// returns an array of names of the 3 closest countires to
// what the user entered
function getClosestWords(data, name) {
  const names = data.map((element) => element.name.common);

  // Compute distances between name and each country name
  const distances = names.map((element) => {
    return {
      name: element,
      distance: computeLevenshteinDistance(name, element)
    };
  });

  const sortedDistances = distances.sort((a, b) => {
    if (a.distance < b.distance) return -1;
    if (a.distance > b.distance) return 1;
    if (a.distance === b.distance) return 0;
  });

  // get the first three country objects
  // then extract their names
  const suggestions = sortedDistances.slice(0, 3).map((obj) => obj.name);

  return suggestions;
}

//to show suggestions in the html
function showSuggestions(suggestions) {
  const errorContainer = document.querySelector(".error");
  errorContainer.innerHTML = ` <p class="error__message">Did you mean:</p>
  <ul class="error__list">
    <li id="first">${suggestions[0]}</li>
    <li id="second">${suggestions[1]}</li>
    <li id="third">${suggestions[2]}</li>
  </ul>`;

  //add the event listener to the country names to make them clickable
  document.getElementById("first").onclick = () => getData(suggestions[0]);
  document.getElementById("second").onclick = () => getData(suggestions[1]);
  document.getElementById("third").onclick = () => getData(suggestions[2]);
}

function computeLevenshteinDistance(a, b) {
  /*
  Computes the Levenshtein distance between two strings a and b
  Algorithm adapted from https://dl.acm.org/doi/10.1145/321796.321811
  */

  const A = a.length;
  const B = b.length;

  const insertCost = 1;
  const deleteCost = 1;
  let changeCost;
  // Initialize matrix of distances between partial strings
  let D = new Array(A).fill(0).map(() => new Array(B).fill(0));

  // Complete first rows and columns of D
  for (let i = 1; i < A; i++) {
    D[i][0] = D[i - 1][0] + deleteCost;
  }
  for (let i = 1; i < B; i++) {
    D[0][i] = D[0][i - 1] + insertCost;
  }

  let m1, m2, m3;
  // Complete D
  for (let i = 1; i < A; i++) {
    for (let j = 1; j < B; j++) {
      // No cost if letters are equal
      // Could be generalized to weigh cost according to keyboard distance
      changeCost = a[i] === b[j] ? 0 : 1;

      m1 = D[i - 1][j - 1] + changeCost;
      m2 = D[i - 1][j] + deleteCost;
      m3 = D[i][j - 1] + insertCost;
      D[i][j] = Math.min(m1, m2, m3);
    }
  }

  return D[A - 1][B - 1];
}
