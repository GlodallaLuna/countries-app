const theme = sessionStorage.getItem("theme");
const teacherImg = document.querySelector("#teacher");
const scientistImg = document.querySelector("#scientist");

if (theme === "blue") {
  teacherImg.src = "images/teacher-blue.svg";
  scientistImg.src = "images/woman-blue.svg";
} else {
  teacherImg.src = "images/teacher-green.svg";
  scientistImg.src = "images/woman-green.svg";
  document.body.classList.toggle("green-mode");
}

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

//name in the html title
const titleNameElement = document.querySelector("#name-title");
titleNameElement.innerHTML = data.englishName;

//flag in the html
const flagElement = document.querySelector("#flag");
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

const areaRankElement = document.querySelector(".area-rank");
const areaRankString =
  data.areaRank === 1
    ? `<b>biggest</b> in area!`
    : `<b> ${data.areaRank}${returnSuffix(
        data.areaRank
      )} </b> biggest in area!`;

areaRankElement.innerHTML = areaRankString;

//to add commas to a long number
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//adding population number with commas to the html
const populationElement = document.querySelector(".population");
populationElement.innerHTML = numberWithCommas(data.population);

//adding area number with commas to the html
const areaElement = document.querySelector(".area");
areaElement.innerHTML = `${numberWithCommas(data.area)}  km<sup>2</sup>;`;

//Capital in the html
const capitalElement = document.querySelector("#capital");
capitalElement.innerHTML = data.capital;

//continent in the html
const continentElement = document.querySelector("#continent");
continentElement.innerHTML = data.continent;

//currency in the html
const currencyElement = document.querySelector("#currency");
currencyElement.innerHTML = `${data.currencies.name}, ${data.currencies.symbol}`;

const geolocation = document.querySelector("#geolocation");

const place = data.englishName.split(" ").join("+");

geolocation.innerHTML = `<iframe class='geo-map'
frameborder="0" style="border:0"
referrerpolicy="no-referrer-when-downgrade"
src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCy7fl1hPLnwlV-YRAdLbaWbxhGaN4L_OQ&q=${place}"
allowfullscreen>
</iframe>`;
