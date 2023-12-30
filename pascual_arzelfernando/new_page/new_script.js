function searchCountry() {
    const countryName = document.getElementById("country_name").value;

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            const region = data[0]?.region;

            displayCountryDetails(data[0]);

            fetch(`https://restcountries.com/v3.1/region/${region}`)
                .then(response => response.json())
                .then(nearbyCountries => {
                    displayNearbyCountries(nearbyCountries);
                })
                .catch(error => console.error
                    ("Error fetching nearby countries:", error));
        })
        .catch(error => console.error
            ("Error fetching country details:", error));
}

function displayCountryDetails(country) {
    const countryDetailsContainer = document.getElementById("country_details");
    countryDetailsContainer.innerHTML = `
        <h2>Country Details</h2>
        <p>Capital: ${country.capital[0]}</p>
        <p>Population: ${country.population}</p>
        <p>Area: ${country.area} km²</p>
        <p>Time Zone: ${country.timezones[0]}</p>
        <p>Languages:</p>
        <ul>
            ${Object.values(country.languages).map(language => `
            <li>${language}</li>`).join('')}
        </ul>
    `;
}

function displayNearbyCountries(nearbyCountries) {
    const nearbyCountriesContainer = 
    document.getElementById("nearby_countries");
    nearbyCountriesContainer.innerHTML = "<h2>Nearby Countries</h2>";

    // Display nearby countries
    nearbyCountries.forEach(country => {
        nearbyCountriesContainer.innerHTML += `<p>${country.name.common}</p>`;
    });
}