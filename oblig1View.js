function updateView(){
    if(amountBeforeRefill > 0){

        document.getElementById('app').innerHTML = `
        <div id="choiceDisplay">
            <button class="coffeeChoice left" onClick="pickCoffee(this)">Svart Kaffe</button>
            <button class="coffeeChoice left" onClick="pickCoffee(this)">Cappuccino</button>
            <button class="coffeeChoice left" onClick="pickCoffee(this)">Americano</button>
            <br/>
            <button class="coffeeChoice left" onClick="pickCoffee(this)">Espresso</button>
            <button class="coffeeChoice left" onClick="pickCoffee(this)">Dobbel Espresso</button>
            <button class="coffeeChoice left" onClick="pickCoffee(this)">Kaffe Latte</button>
            <br/>
            <button class="coffeeChoice left" onClick="pickCoffee(this)">Kaffe Mocca</button>
            <button class="coffeeChoice left" onClick="pickCoffee(this)">Ristretto</button>
            <button class="coffeeChoice left" onClick="pickCoffee(this)">Kaffe Macchiato</button>
            <button class="coffeeChoice left" onClick="pickCoffee(this)">Varmt Vann</button>
        </div>
        <div id="changeLeft"></div>
        <div id="costDisplay"></div>
        <div id="coffeeLeft">Det er ${amountBeforeRefill} kaffe igjen før det trengs påfyll</div>
    `;
    }
    else{
        document.getElementById('app').innerHTML = `
        <div id="refillDisplay">Da er det tomt for kaffe, fyll på mer.</div>
        <button class="refillButton" onClick="refillCoffee(this)">Fyll på</button>
    `; 
    }
} 

function showPrice(){
    document.getElementById('costDisplay').innerHTML = `
    Du har valgt: ${pickedCoffee} <br/>
    Det koster: ${priceCoffee}. <br/>
    Vennligst legg på mynt: <br/>
    <div id="amountMoneyPaid">Du har betalt: ${amountPaid} det er ${priceCoffee - amountPaid} igjen å betale.</div> <br/>
    <input type="text" id="coffeePay" onChange="payForCoffee(this)"></input>

    `;
}

function showReady(){
    document.getElementById('costDisplay').innerHTML = `
    <span style="float: right;">Plasser koppen til høyre &#10142;</span> <br/>
    Trykk på knappen når du er klar: <br/>
    <button id="finishButton" class="priceChoice" onClick="youAreWelcome()">Velbekomme!</button>
    `;
}

function youAreWelcome(){
    document.getElementById('costDisplay').innerHTML = `
    <div id="gaveWater">Vær så god! :D <br/>
    <span style="font-size: 2vh;">Starter på nytt om 10 sekunder!</span></div>
    `;
    startOver();
}
function showChangeLeft(){
    var changeToGive = (priceCoffee - amountPaid)*-1;
    document.getElementById('changeLeft').innerHTML = `
    Takk, da er det ${changeToGive} tilbake.
    `;
}

function disableButtons(clickedButton){
    var list = document.getElementsByClassName('coffeeChoice');
    for(var i = 0; i<list.length;i++){
        list[i].disabled = true;
    }
}

function startOver() {
    var amountPaid = 0;
    setTimeout(function(){ updateView() }, 10000);
}
