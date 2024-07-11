const Base_Url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns) {
    for (currCode in countryList){
        // console.log(currCode, countryList[currCode]);
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;
        if(select.name === "from" && currCode ==="USD"){
            newOpt.selected = true;
        }else  if(select.name === "to" && currCode ==="INR"){
            newOpt.selected = true;
        }
        select.append(newOpt);
    }
    select.addEventListener("change",(e)=>{
        updateFlag(e.target);
    });
}

window.addEventListener("load", ()=>{
    updateExchangeRate();
})

const updateFlag =(ele)=>{
  let currCode = ele.value;
  console.log(currCode);
  let countryCode = countryList[currCode];
  console.log(countryCode);
  let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = ele.parentElement.querySelector("img");
  img.src = newSrc;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
});


const updateExchangeRate  = async ()=>{
let amount = document.querySelector("input")
    let amtVal =amount.value;
    console.log(amtVal);
    if(amtVal === "" || amtVal < 1){
        amtVal =1;
        amount.value = "1";
    }
    console.log(fromCurr.value, toCurr.value);
    const URL = `${Base_Url}/${fromCurr.value.toLowerCase()}.json`;
    console.log(URL);
    let res = await fetch(URL);
    let data = await res.json();
    let frm = fromCurr.value.toLowerCase();
    let to = toCurr.value.toLowerCase();
    
    console.log(fromCurr.value.toLowerCase());
    console.log(toCurr.value.toLowerCase());
    let rate = data[frm][to];
    console.log("Rate is",rate );

    msg.innerText = `${amtVal} ${fromCurr.value} = ${(rate*amtVal).toFixed(2)} ${toCurr.value}`
}


