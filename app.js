const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
    for(code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code === "USD") {
            newOption.selected = true;
        } else if(select.name === "to" && code === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
} 

const updateConversion = async () => {
    let input = document.querySelector("input");
    let amt = input.value;
    if(amt === "" || amt < 1) {
        amt = 1;
        input.value = "1";
    }

    const url = `${URL}/${from.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
    let finalAmt = amt*rate;
    msg.innerText = `${amt} ${from.value} = ${finalAmt} ${to.value}`;
};

const updateFlag = (element) => {
    let code = element.value;
    let country = countryList[code];
    let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateConversion();
})

window.addEventListener("load", updateConversion);