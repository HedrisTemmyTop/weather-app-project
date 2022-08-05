const countryContainer = document.querySelector(".main__countries");
const formCountry = document.querySelector(".main__search--form");
const countryValue = document.querySelector(".main__search--input");
const regionDom = document.getElementById("select");
const header = document.querySelector(".header");
const main = document.querySelector(".main");
const toggleBtn = document.querySelector(".header__toggle");
const toggleIcon = document.querySelector(".header__toggle--icon");
const filterBtn = document.querySelector(".main__filter--btn");
const input = document.querySelector(".main__search--input");
const mainContent = document.querySelector(".main__content");
const mainSearch = document.querySelector(".main__search");
const backBtn = document.querySelector(".btn--back");
const mainDefault = document.querySelector(".country");

// const main = document.querySelector(".main")
//////////////////////

//Toggle function

/// Markup
const dataMarkup = function (data) {
  //   console.log(data, data.capitalInfo.latlng[0]);
  return `<a href="#${data.name.common}"><div class="main__box">
    <img src="${data.flags.png}" class="main__box--img" />
    <h3 class="main__box--country">${data.name.common}</h3>
    <div class="main__box--list">
      <h4>Population:</h4>
      <p class="main__box--text">${data.population.toLocaleString()}</p>
    </div>
    <div class="main__box--list">
      <h4>Region:</h4>
      <p class="main__box--text">${data.region}</p>
    </div>
    <div class="main__box--list">
      <h4>Capital:</h4>
      <p class="main__box--text">${
        data.capital ? data.capital : "No capital"
      }</p>
    </div>
  </div></a>`;
};

const weatherMarkup = function (data, dataCountry) {
  // ${
  //     dataCountry.name.nativeName.eng.official
  //   }
  const { nativeName } = dataCountry.name;
  const dataNativeName = Object.keys(nativeName)
    .map((key) => {
      return nativeName[key];
    })
    .pop();

  const { currencies } = dataCountry;
  const currency = Object.keys(currencies)
    .map((key) => currencies[key])
    .pop();

  const { languages } = dataCountry;
  const language = Object.keys(languages)
    .map((key) => languages[key])
    .join(", ");
  return `<button class="btn--back">
  <ion-icon name="arrow-back-outline" class="back--icon"></ion-icon>
  <span>Back</span>
</button>
  <div class="country__content">
    <img src="${dataCountry.flags.png}" alt="" class="country__content--img" />
    <div class="country__content--main">
      <div class="country__main--sub">
        <div class="left">
          <h2 class="country__content--name">${dataCountry.name.common}</h2>
          <div class="county__box--list">
            <h4>Native Name:</h4>
            <p class="county__box--text">${dataNativeName.common}</p>
          </div>
          <div class="county__box--list">
            <h4>Population:</h4>
            <p class="county__box--text">${dataCountry.population.toLocaleString()}</p>
          </div>
          <div class="county__box--list">
            <h4>Region:</h4>
            <p class="county__box--text">${dataCountry.region}</p>
          </div>
          <div class="county__box--list">
            <h4>Sub Region:</h4>
            <p class="county__box--text">${dataCountry.subregion}</p>
          </div>
          <div class="county__box--list">
            <h4>Capital:</h4>
            <p class="county__box--text">${dataCountry.capital}</p>
          </div>
        </div>
        <div class="right">
          <div class="county__box--list">
            <h4>Top Level Domain:</h4>
            <p class="county__box--text">${dataCountry.cca2.toLowerCase()}</p>
          </div>
          <div class="county__box--list">
            <h4>Currencies:</h4>
            <p class="county__box--text">${currency.name}</p>
          </div>
          <div class="county__box--list">
            <h4>Languages:</h4>
            <p class="county__box--text">${language}</p>
          </div>
        </div>
      </div>
     <!-- <div class="country__main--sub2">
        <h3 class="country__content--border">Border Countries:</h3>
        <button class="btn--border">Netherlands</button>
        <button class="btn--border">France</button>
        <button class="btn--border">France</button>
        <button class="btn--border">France</button>
      </div> -->
    </div>
  </div>
  <div class="country__details">
    <div>
      <h2 class="country__content--name">Weather ${data.name}</h2>
      <div class="country__weather">
        <div class="countr__weather--details">
          <h4>${data.weather[0].main}</h4>
          <i class="county__box--text">${data.weather[0].description}</i>
        </div>
        <img src="https://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" alt="" class="cloud" />
      </div>
      <table class="country__data">
        <tr>
          <td><h4>Temperature:</h4></td>
          <td class="table-col">
            <ion-icon name="thermometer-outline"></ion-icon>
            <p>${data.main.temp} °C</p>
          </td>
        </tr>
        <tr>
          <td><h4>Humidity:</h4></td>
          <td class="table-col">
            <ion-icon name="water"></ion-icon>
            <p>${data.main.humidity} %</p>
          </td>
        </tr>
        <tr>
          <td><h4>Cloudness:</h4></td>
          <td class="table-col">
            <ion-icon name="cloud"></ion-icon>
            <p>${data.clouds.all} %</p>
          </td>
        </tr>
        <tr class="table-row">
          <td><h4>Wind Speed:</h4></td>
          <td class="table-col">
            <p>${data.wind.speed} m/s</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="country__map" id="map"></div>
  </div> `;
};
// filter
regionDom.addEventListener("change", function () {
  const region = regionDom.options[regionDom.selectedIndex].text;
  countryContainer.innerHTML = "";
  const displayResultFilter = async function (name) {
    try {
      const dataCountry = await fetch(
        `https://restcountries.com/v3.1/region/${name}`
      );

      const data = await dataCountry.json();
      sortData(data);
      data.forEach((data) => {
        const html = dataMarkup(data);
        countryContainer.insertAdjacentHTML("beforeend", html);
      });
    } catch (err) {
      console.log(err);
    }
  };
  displayResultFilter(region);
});
///
const sortData = function (data) {
  data.sort((a, b) => {
    const firstVal = a.name.common.toUpperCase();
    const secVal = b.name.common.toUpperCase();

    if (firstVal > secVal) return 1;
    if (secVal > firstVal) return -1;
    else return 0;
  });
};

/// display all countries

const displayCountry = async function () {
  const dataCountry = await fetch("https://restcountries.com/v3.1/all");

  const data = await dataCountry.json();
  sortData(data);
  data.forEach((data) => {
    const html = dataMarkup(data);
    countryContainer.insertAdjacentHTML("beforeend", html);
  });
};

window.addEventListener("load", displayCountry);

// const displaySearchedCountry
const displayResult = async function (name) {
  try {
    const dataCountry = await fetch(
      `https://restcountries.com/v3.1/name/${name}`
    );

    const data = await dataCountry.json();

    sortData(data);
    data.forEach((data) => {
      const html = dataMarkup(data);
      countryContainer.insertAdjacentHTML("beforeend", html);
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
["submit"].forEach((ev) => {
  formCountry.addEventListener(ev, function (e) {
    e.preventDefault();
    countryContainer.innerHTML = "";
    displayResult(countryValue.value);
  });
});

const toggleFunction = function () {
  const mainBox = document.querySelectorAll(".main__box");

  // displayResultFilter();
  toggleBtn.addEventListener("click", function () {
    header.classList.toggle("change");
    toggleIcon.classList.toggle("icon-change");
    main.classList.toggle("main-change");
    input.classList.toggle("change");
    filterBtn.classList.toggle("change");
    regionDom.classList.toggle("change");

    if (header.classList.contains("change")) {
    } else {
      header.style.boxShadow = "0 0rem 0.3rem rgba(0, 0, 0, 0.3);";
    }

    // mainBox.style.backgroundColor = "black";
    mainBox.forEach((main) => {
      main.classList.toggle("change");
      //   main.style.boxShadow = ";
    });
  });
};
toggleFunction();
// location.reload();
// navigator.registerProtocolHandler()
const weatherApi = async function (country) {
  const dataWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${country}&APPID=7856a02fd3ec28bf92c20b9f06aee22f`
  );
  const dataCountryPromise = await fetch(
    `https://restcountries.com/v3.1/name/${country}`
  );
  const [dataCountry] = await dataCountryPromise.json();

  const data = await dataWeather.json();
  /// Declarations
  const { coord } = data;
  const [lat, lon] = dataCountry.latlng;
  const html = weatherMarkup(data, dataCountry);

  document.querySelector(".country").insertAdjacentHTML("beforeend", html);
  let map = L.map("map").setView([lat, lon], 4);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lon]).addTo(map).openPopup();
};
const showCountryWeather = async function () {
  const location = window.location.hash.split("").slice(1).join("");
  if (!location) {
    mainDefault.innerHTML = "";
    mainSearch.innerHTML = `<form action="" class="main__search--form">
    <input
      type="text"
      class="main__search--input"
      placeholder="Search for a country..."
    />
  </form>
  <div class="main__filter">
    <button type="button" class="main__filter--btn">
      <select name="region" id="select" class="select">
      <option class="select-item" value="1" disable>Filter by Region</option>
       
        <option class="select-item" value="1">Africa</option>
        <option class="select-item" value="2">America</option>
        <option class="select-item" value="3">Asia</option>
        <option class="select-item" value="4">Europe</option>
        <option class="select-item" value="5">Oceania</option>
      </select>
    </button>
    <!--<di class="main__content">
      <h4>Afica</h4>
    </div> -->
  </div>`;
    await displayCountry();
    const reg = document.getElementById("select");
    reg.addEventListener("change", function () {
      const region = reg.options[reg.selectedIndex].text;
      countryContainer.innerHTML = "";
      const displayResultFilter = async function (name) {
        try {
          const dataCountry = await fetch(
            `https://restcountries.com/v3.1/region/${name}`
          );

          const data = await dataCountry.json();
          sortData(data);
          data.forEach((data) => {
            const html = dataMarkup(data);
            countryContainer.insertAdjacentHTML("beforeend", html);
          });
        } catch (err) {
          console.log(err);
        }
      };
      displayResultFilter(region);
    });

    return;
  }
  // mainContent.innerHTML = "";
  countryContainer.innerHTML = "";
  mainSearch.innerHTML = "";
  mainDefault.innerHTML = "";

  await weatherApi(location);
  document.querySelector(".btn--back").addEventListener("click", function () {
    history.back();
  });
};

const arr = ["hashchange"];
arr.forEach((ev) => {
  //   location.reload(true);
  window.addEventListener(ev, showCountryWeather);
});
