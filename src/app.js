import { alert, defaultModules, error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/core/dist/BrightTheme.css";
import debounce from "lodash.debounce";

import fetchCountries from "./fetchcountries";


defaultModules.set(PNotifyMobile, {});

const inp = document.querySelector('input');
const list = document.querySelector('.holst');

const countryName = document.querySelector('.countryName');
const capital = document.querySelector('.capital');
const population = document.querySelector('.population');
const languagesList = document.querySelector('.languagesList');


const searchCountries = (event) => {
    list.innerHTML = '';
    const countryname = event.target.value.trim();
    fetchCountries(countryname).then(res => {
        if (res.length > 10) {
            error({
                text: "зробіть запит більш специфічним",
                delay: 2000,
            });
            return
        }
        if (res.length <= 10 && res.length >= 2) {
            // list.innerHTML = '';
            const countries = res.map(country => {

                return `<li>${country.name.common}</li>`
            }).join('')
            list.innerHTML = countries;
        }
        if (res.length === 1) {
            list.innerHTML = '';
            const countries = res.map(country => {
                console.log(country);
                // countryName.textContent = country.name.common;
                return `

                <h1 class="countryName">${country.name.common}</h1>
                    
                        <ul class="js-list">
                            <li>
                                <div class="leftSide">
                                    <div class="capital">capital: <span class="valuesRequest">${country.capital ? country.capital[0] : 'N/A'}</span></div>
                                    <div class="population">population: <span class="valuesRequest">${country.population}</span></div>
                                    <div class="languages"> languages:
                                        <ul class="languagesList">
                                            ${country.languages ? Object.values(country.languages).map(lang => `<li>${lang}</li>`).join('') : '<li>Language information not available</li>'}
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li><img src="${country.flags.png}" alt="Flag of ${country.name.common}"></li>
                        </ul>
                    
                
                `
            }).join('');
            list.innerHTML = countries;
        }
    })
}

inp.addEventListener('input', debounce(searchCountries, 500));

// error({
//   text: "Notice me, hero!",
// });