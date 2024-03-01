function reviewPortfolio(rowIndex){
    

    let discounts = [];
    let holdings_target = [];

    for (var i = 0; i < companies.length ; i++) { 

        discounts[i] = fairValues[i].discount;
        
      };
    
    let weightings = updateWeightings(discounts);

    console.log("weightings", weightings, weightings.reduce(getSum));

    //calculate transactions
    // for (var i = 0; i < companies.length ; i++) { 
    //     holdings_target.push(weightings[i] * fairValues[i].amount_invested);
    // }
    
    if(bankBalance < 0){
        // end the game, you lost all your money
        tradeLog.unshift("FUND IS BANKRUPT!");
        alert("BANKRUPT");
        return null;
    }

    //at start of the game when play has 0 holdings, start off with 100k
    if(bankBalance == 0) {tradeLog.unshift("Starting with cash of $100,000"); bankBalance = 100000};

    console.log("reviewing PF");

    tradeLog.unshift("Rebalancing Portfolio of $" + bankBalance);

    holdings_target = weightings.map(function(x) {return max(x * bankBalance, 0)});

    console.log("holdings_target", holdings_target, holdings_target.reduce(getSum));

    //debugger

    for (var i = 0; i < companies.length ; i++) { 
        let diff = holdings_target[i] - fairValues[i].current_value;

        if(diff != 0){                                                                                                                                                     
            
            let sharePrice = companies[i].latestPrice
            let numShares = round(diff / sharePrice);
            let existingShares = fairValues[i].no_shares;

            numShares = existingShares + numShares < 0 ? -existingShares : numShares; // can't sell more than you own

            if(numShares === 0) {continue;} //skip if nothing happening

            let gain = 0;

            let updateText = (diff > 0 ? "Buy " : "Sell ") + numShares.toFixed(0) + " " + companies[i].name.slice(0,7) + " " + "at $" + sharePrice.toFixed(2) + "($" + (numShares*sharePrice).toFixed(0) + ") ";

            //debugger

            if(diff < 0){
                //selling!
                gain = abs(numShares) * (sharePrice - fairValues[i].avg_price);

                //add to capital gain/ loss
                fairValues[i].capital_gain += gain;

                updateText += " (" + (gain > 0 ? "Gain" : "Loss") + " of $" + gain.toFixed(0) + ")";
                //debugger
            }
            else if (existingShares + numShares == 0) {
                fairValues[i].avg_price = 0;
            }
            else {
                //update avg_price if its a buy
            fairValues[i].avg_price = ((existingShares * fairValues[i].avg_price) + (numShares * sharePrice)) / (existingShares + numShares);

            }
            
            //update holding
            fairValues[i].amount_invested = ((existingShares + numShares) * sharePrice);
            fairValues[i].no_shares = (existingShares + numShares);
            
            //debugger
            let txt2 = (diff > 0 ? "The tradedesk just bought " + numShares.toFixed(0) + " shares of " + companies[i].name + " based on your fair value!!" :
                                    "The tradedesk just sold " + numShares.toFixed(0) + " shares of " + companies[i].name + " based on your fair value!!");
            helpOverlay.push({txt: txt2, img: tradeImg[int(random(0, 2))], milliSec: millis() + (2000*i)});
            // Set a timeout to play the sound after 3000 milliseconds (3 seconds)
            
            // setTimeout(() => {
                
            // }, 2000*i);
            
            tradeLog.unshift(updateText);
            console.log(updateText);


        }
        
    }
    cashSong.play();

}

function getSum(total, num) {
    return total + num;
}

function updateWeightings(discounts){

    //let discounts = [0.14,-0.05,-0.69,0.07,-0.24];
    
    //calc weights
    let weights = [];
    let total = 0;
    
    for ( var i = 0; i < discounts.length; i++) { //this makes it suited for any width
            let factor = 6;
            let power = min(round(abs(discounts[i]/0.05),0)+1,factor)
            weights[i] = pow(1+discounts[i], power);
            total+=weights[i];
            // =(1+J3)^(min(round(abs(J3/0.05),0)+1,6))
        } 
    
    //calc avg
    let weighted_avg = [];
    let weighted_avg_mod = [];
    let weighted_avg_round = [];
    let final_weight = [];
    
    for ( var j = 0; j < discounts.length; j++) { //this makes it suited for any width
            weighted_avg[j] = weights[j] / total;
        weighted_avg_mod[j] = weighted_avg[j] % 0.05;
        weighted_avg_round[j] = round( weighted_avg[j] * 20 ) / 20;
        
        }
    
    //B27+
    // if(sum(B$27:B$31)>1,
    //    if(B19=min(B$19:B$23),-1,0)*0.05,
    //   if(sum(B$27:B$31)<1,
    //      if(B19=max(B$19:B$23),1,0)*0.05,0))
    
    for ( var k = 0; k < discounts.length; k++) { //this makes it suited for any width
            final_weight[k] = weighted_avg_round[k];
            
            if(weighted_avg_round.reduce(getSum) > 1){
            if (weighted_avg_mod[k] == min(weighted_avg_mod)){
                final_weight[k]-=0.05;
            }
            }
            else if(weighted_avg_round.reduce(getSum) < 1){
            if (weighted_avg_mod[k] == max(weighted_avg_mod)){
                final_weight[k]+=0.05;
            }
            }
        
        }
    
    if(final_weight.reduce(getSum) != 1) {console.log("WARNING TOTAL NOT 1");}

    
    
    // console.log(discounts);
    // console.log(weights);
    // console.log(total);
    // console.log(weighted_avg);
    // //console.log(weighted_avg_mod);
    // console.log(weighted_avg_round);
    // console.log(weighted_avg_round.reduce(getSum));
    // console.log(final_weight);
    // console.log(final_weight.reduce(getSum));

    return final_weight;

}