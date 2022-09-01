const ferchCountries = async () => {
  const url = (path) => `https://restcountries.com/v2/${path}`;
  const contriesArray = [];
  contriesArray.push(await fetch(url("all")).then((res) => res.json()));
  console.log(contriesArray);

  let countriesLi = "";

  if (countriesLi.length === 0) {
    contriesArray[0].forEach((country) => {
      const eachCountry = `
        <li class="countryCard ${country.region}">
          <div class="countryCard__inner">
            <div class="countryCard__innerFront">
              <img class="countryCard__flag" src=${country.flags.png} alt="${country.name} flag"/>
            </div>
            <div class="countryCard__innerBack">
              <h3>
                ${country.name}
              </h3>
              <p>Nome Nativo: ${country.nativeName}</p>
              <p>Capital: ${country.capital}</p>
              <p>Região: ${country.region}</p>
              <p>Sub-região: ${country.subregion}</p>
            </div>
          </div>
        </li>
      `;

      countriesLi += eachCountry;
    });
  }
  const countryUl = document.getElementById("countryList__list");
  countryUl.innerHTML = countriesLi;
};
ferchCountries();
