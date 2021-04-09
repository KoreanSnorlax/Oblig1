function updateView(){
    document.getElementById('app').innerHTML = `
    <div id="coffeeLeft">Det er ${amountBeforeRefill} kaffe igjen før det trengs påfyll</div>
    <div id="choiceDisplay">
        <button ${disabled} class="coffeeChoice left" onClick="pickCoffee(this)">Svart Kaffe</button>
        <button ${disabled} class="coffeeChoice left" onClick="pickCoffee(this)">Cappuccino</button>
        <button ${disabled} class="coffeeChoice left" onClick="pickCoffee(this)">Americano</button>
        <br/>
        <button ${disabled} class="coffeeChoice left" onClick="pickCoffee(this)">Espresso</button>
        <button ${disabled} class="coffeeChoice left" onClick="pickCoffee(this)">Dobbel Espresso</button>
        <button ${disabled} class="coffeeChoice left" onClick="pickCoffee(this)">Kaffe Latte</button>
        <br/>
        <button ${disabled} class="coffeeChoice left" onClick="pickCoffee(this)">Kaffe Mocca</button>
        <button ${disabled} class="coffeeChoice left" onClick="pickCoffee(this)">Ristretto</button>
        <button ${disabled} class="coffeeChoice left" onClick="pickCoffee(this)">Kaffe Macchiato</button>
        <button ${hotWaterStatus} class="coffeeChoice left" onClick="pickCoffee(this)">Varmt Vann</button>
    </div>
    <div id="changeLeft">${changeToGiveBack}</div>
    <div id="costDisplay">${displayPayment}</div>
    <div id="refillDisplay">${refillNeeded}${refill}</div>    
    `;
} 










function showPrice(){
    displayPayment = `
    Du har valgt: ${pickedCoffee} <br/>
    Det koster: ${priceCoffee}. <br/>
    Vennligst legg på mynt: <br/>
    <div id="amountMoneyPaid">Du har betalt: ${amountPaid} det er ${priceCoffee - amountPaid} igjen å betale.</div> <br/>
    <input type="text" id="coffeePay" onChange="payForCoffee(this)"></input>
    `;
    disabled = "disabled";
    hotWaterStatus = "disabled";
    updateView();
}

function showReady(){
    displayPayment = `
    <span style="float: right;">Plasser koppen til høyre &#10142;</span> <br/>
    Trykk på knappen når du er klar: <br/>
    <button id="finishButton" class="priceChoice" onClick="youAreWelcome()">Klar!</button>
    `;
    updateView();
}

function youAreWelcome(){
    displayPayment = `
    <div id="gaveWater">Vær så god! :D <br/>
    <span style="font-size: 2vh;">Starter på nytt om 5 sekunder!</span></div>
    `;
    updateView();
    startOver();
}


function showChangeLeft(){
    var changeToGive = calcChange(priceCoffee, amountPaid);
    changeToGiveBack = `
    Takk, da er det ${changeToGive} tilbake.
    `;
    console.log(priceCoffee);
    console.log(amountPaid);
    console.log(changeToGive);
    console.log(changeToGiveBack);
    updateView();
}
function checkIfRefillNeeded(){
    if (amountBeforeRefill>0){
        return
    }
    else if(refillNeeded != ""){
        disabled = "disabled";
        return
    }
    else{
        showRefill();
    }
}
function showRefill(){
    disabled = "disabled";
    hotWaterStatus = "";
    refillNeeded = `
    Da er det tomt for kaffe, fyll på!
    `;
    refill = `
    <br/>
    <button onClick="refillCoffee()">Fyll på kaffe</button>`
    updateView();
}

function pickCoffee(chosenCoffee){
    amountPaid = 0;
    coffeePick = chosenCoffee.innerHTML;
    if(amountBeforeRefill > 0 && coffeePick != 'Varmt Vann'){
        pickedCoffee = coffeePick; 
        showPrice();
    }
    else if(coffeePick == 'Varmt Vann'){
        showReady();                
    }
}

function payForCoffee(amount){
    var paid = parseInt(amount.value);
    if(paid < 0 || isNaN(paid) == true || paid > 150){
        showPrice();
    }
    else{
        amountPaid += paid;
        if(amountPaid > priceCoffee){
            amountBeforeRefill--;
            showReady();
            showChangeLeft();
        }
        else if(amountPaid == priceCoffee){
            amountBeforeRefill--;
            showReady();
        }
        else{
            showPrice();
        }
    }
}

function refillCoffee(){
    amountBeforeRefill = getRandomNumber();
    refillNeeded = `
    Da er det fylt på ${amountBeforeRefill} kaffe.<br/>
    Starter på nytt om 5 sekunder!
    `;
    updateView();
    startOver();
}

function getRandomNumber(){
    var randNum = Math.floor((Math.random()*9)+1);
    return randNum;
}

function calcChange(price, paid){
    var change = (price - paid)*-1;
    if(change < 0 || isNaN(change) == true){
        return null
    }
    else {return change}
}

function startOver() {
    amountPaid = 0;
    pickedCoffee = "";
    displayPayment = "";
    changeToGiveBack = "";
    disabled = "";
    hotWaterStatus = "";
    refillNeeded = "";
    refill = ""; 
    setTimeout(function(){ updateView() }, 5000);
    checkIfRefillNeeded();
}
