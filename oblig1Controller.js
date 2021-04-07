function pickCoffee(chosenCoffee){
    amountPaid = 0;
    coffeePick = chosenCoffee.innerHTML;
    if(amountBeforeRefill > 0 && coffeePick != 'Varmt Vann'){
        disableButtons(chosenCoffee);
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
    updateView();
}

function getRandomNumber(){
    var randNum = Math.floor(Math.random()*10);
    return randNum;
}