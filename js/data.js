const data = JSON.parse(sessionStorage.getItem("data"));






// 1) in most cases, only the last digit matters
// 2) special cases are 11,12,13,111,112,113,211,212,213 (all 'th')
// 3) for non special cases, the pattern is
// last digit:
// 1 = st
// 2 = nd
// 3 = rd
// everything else is th

const returnSuffix = (number) => {
  // Deal with sepcial cases
  const specialCases = [11, 12, 13, 111, 112, 113, 211, 212, 213];
  if (specialCases.includes(number)) {
    return "th";
  }

  //Deal with the first 3 numbers and then everything else
  const lastDigit = number % 10;
  switch (lastDigit) {
    case 1:
      return "st";
      break;
    case 2:
      return "nd";
      break;
    case 3:
      return "rd";
      break;
    default:
      return "th";
  }
};

//flag in the html
const flagElement = document.querySelector("#flag")
flagElement.src = data.flag;

//to put the localNames object in the HTML
const languagesAndNames = document.querySelector(".local-names");
data.localNames.forEach((obj) => {
  languagesAndNames.innerHTML += `<li class="info__text">${obj.language}: ${obj.name}</li>`;
});


const populationRankElement = document.querySelector(".population-rank");

// If it's the most populated country, we don't want to say
// 'the 1st most populated country'
const populationRankString =
  data.populationRank === 1
    ? `${data.englishName} is the <b>most populated</b> country on Earth`
    : `${data.englishName} is the <b> ${data.populationRank}${returnSuffix(
        data.populationRank
      )} </b> most populated country on Earth`;

populationRankElement.innerHTML = populationRankString;


//to add commas to a long number
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//adding population number with commas to the html
const populationElement = document.querySelector(".population");
populationElement.innerHTML = numberWithCommas(data.population);


//Capital in the html 
const capitalElement = document.querySelector("#capital")
capitalElement.innerHTML = data.capital;

//continent in the html
const continentElement = document.querySelector("#continent")
continentElement.innerHTML = data.continent;

//currency in the html
const currencyElement = document.querySelector("#currency")
currencyElement = data.currencies;
