let BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let image = document.querySelector("img");
let btn = document.querySelector("button");
let amount = document.querySelector("input");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let message=document.querySelector(".msg");
console.log(message.innerHTML);

//dropdown options adding
for (let select of dropdowns) {
  for (let currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    if (select.name === "From" && currencyCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "To" && currencyCode === "INR") {
      newOption.selected = "selected";
    }
    select.appendChild(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

//flag updating according to country
const updateFlag = (el) => {
  let currCode = el.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let image = el.parentElement.parentElement.querySelector("img");
  image.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amountVal = amount.value;
  if (amountVal === "" || amountVal < 1) {
    amountVal = 1;
    amount.value = "1";
  }
  let fromVal = fromCurr.value;
  let toVal = toCurr.value;
  const new_URL = `${BASE_URL}/${fromVal.toLowerCase()}/${toVal.toLowerCase()}.json`;
  let response = await fetch(new_URL);
  let data = await response.json();
  let rate = data[toVal.toLowerCase()];

  let exchangeValue=rate*amountVal;
  console.log(exchangeValue);

  message.innerHTML=`${amountVal} ${fromVal} = ${exchangeValue} ${toVal}`

});
