async function getAllCountries() {
  const countries = await (
    await fetch("https://restcountries.com/v3.1/all")
  ).json();
  for (country of countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  )) {
    let object = {
      name: country.name.common,
      nativeName: country.name.nativeName
        ? Object.entries(country.name.nativeName)[0][1].common
        : country.name.common,
      capital: country.capital ? country.capital[0] : "",
      region: country.region,
      subregion: country.subregion,
      flag: country.flags?.png
        ? country.flags.png
        : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg",
    };
    createCountryFlag(object);
  }
}

function createCountryFlag(country) {
  const container = document.getElementById("container");
  let flipContainer = document.createElement("div");
  flipContainer.classList.add("container__flip-container");
  container.appendChild(flipContainer);

  let containerFlipper = document.createElement("div");
  containerFlipper.classList.add("container__flipper", country.region);
  flipContainer.appendChild(containerFlipper);

  let containerFront = document.createElement("div");
  containerFront.classList.add("container__front");
  containerFlipper.appendChild(containerFront);

  let imageFlag = document.createElement("img");
  imageFlag.src = country.flag;
  imageFlag.classList.add("container__image-front");
  imageFlag.alt = country.name + " flag";
  containerFront.appendChild(imageFlag);

  let containerBack = document.createElement("div");
  containerBack.classList.add("container__back");
  containerFlipper.appendChild(containerBack);

  let h4 = document.createElement("h4");
  h4.classList.add("container__title-country");
  h4.textContent = country.name;

  let pNativeName = document.createElement("p");
  pNativeName.classList.add("container__country-info");
  pNativeName.textContent = "Native Name: " + country.nativeName;

  let pCapital = document.createElement("p");
  pCapital.classList.add("container__country-info");
  pCapital.textContent = "Capital: " + country.capital;

  let pRegion = document.createElement("p");
  pRegion.classList.add("container__country-info");
  pRegion.textContent = "Region: " + country.region;

  let pSubRegion = document.createElement("p");
  pSubRegion.classList.add("container__country-info");
  pSubRegion.textContent = "Sub-Region: " + country.subregion;

  containerBack.append(h4, pNativeName, pCapital, pRegion, pSubRegion);
}

getAllCountries();
