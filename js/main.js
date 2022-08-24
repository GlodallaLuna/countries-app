console.log('ciao')

// const input = document.querySelector("#form-input");
// const container = document.querySelector("#container");
// const button = document.querySelector("#button");

// //onClick --> crei nuova stringa poi la aggiungi editando inner html di container

// const getData = async () => {
//   try {
//     const response = await fetch("https://restcountries.com/v3.1/all");
//     const data = await response.json();

//     const inputValue = input.value;

//     // Filter returns an array with 1 element, so we use [0]
//     // to pick out the actual object
//     const country = data.filter((obj) => {
//       return inputValue == obj.name.common;
//     })[0];

//     //getting the english name
//     const englishName = country.name.common;

//     //going through the country obj to nativeName obj
//     const localNamesObject = country.name.nativeName;
//     //getting the keys inside the object
//     const nameKeys = Object.keys(localNamesObject);
//     //creating a new array,
//     //looping through the keys to turn them into objs
//     //pushing them inside a new array
//     const localNames = nameKeys.map((key) => {
//       const newObject = {
//         language: country.languages[key],
//         name: country.name.nativeName[key].common
//       };
//       return newObject;
//     });
//     //getting the flag
//     const flag = country.flags.svg;
//     //getting capital
//     const capital = country.capital[0];
//     //getting continent
//     const continent = country.continents[0];
//     //getting the currencies
//     const currencies = country.currencies;
    
//     //getting the population
//     const population = country.population;
//     //to create a new array with all the population numbers
//     const populationsArray = data.map(countryObj => {
//       return countryObj.population
//     })
//     //to sort the numbers and get the index to rank the countries
//     populationsArray.sort((a, b) => b - a)
//     const populationRank = populationsArray.indexOf(population) + 1

//     //getting the area
//     const area = country.area;
//     //to create a new array with all the area numbers
//     const areasArray = data.map(countryObj => {
//       return countryObj.area
//     })
//     //to sort the numbers and get the index to rank the countries
//     areasArray.sort((a, b) => b - a)
//     const areaRank = areasArray.indexOf(area) + 1

//     //to get the googlemaps link
//     const map = country.maps.googleMaps
//     console.log(map)

//     /////////////////////////////////////////////
//     /////////////////////////////////////////////

    
//   } catch {
//     console.log("Error");
//   }
// };

// button.addEventListener("click", () => {
//   getData();
// });



//change theme
let themeToggler = document.querySelector('#themeToggler');
let planetImg = document.querySelector('.header__img')

themeToggler.addEventListener('click', () => { 
    document.body.classList.toggle('green-mode');
    console.log(document.body.classList)

    if(document.body.classList.value === 'green-mode') {
      planetImg.src = 'images/planet-green.svg'
    } else {
      planetImg.src = 'images/planet-blue.svg'
    }

    
});

