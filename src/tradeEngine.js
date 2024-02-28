function reviewPortfolio(rowIndex){
    console.log("reviewing PF");

    let discounts = [];

    for (var i = 0; i < companies.length ; i++) { 

        let last_price = parseFloat(companyPricesCSV.getColumn(companies[i].name)[rowIndex]);
    
        discounts[i] = (fairValues[i].fv - last_price)/ fairValues[i].fv * 100;
        
      };
      debugger
    let weightings = updateWeightings(discounts);

    console.log(weightings);

}

function updateWeightings(discounts){

    //let discounts = [0.14,-0.05,-0.69,0.07,-0.24];
    
    function getSum(total, num) {
        return total + num;
    }
    
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