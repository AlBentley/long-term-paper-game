function updateLatestStockPrice(){
    for (let r = 0; r < companyPricesCSV.getRowCount(); r++) {
        let row = companyPricesCSV.getRow(r);
        let csvDate = row.getString(0); // Assuming the date is in the first column
        
        console.log()
        if (csvDate === formatDate(currentDate)) {
          // Update each company's latestPrice based on the CSV columns
          companies.forEach((company, index) => {
            // Assuming the first company's price is in the second column, hence index + 1
            let newPrice = row.getNum(index + 1);

            // Push last price to array
            company.latestPrice.push(newPrice);

            // Keep array at 80 items max
            if (company.latestPrice.length > 80) {
              // Remove the oldest price to maintain the array size at 80
              company.latestPrice.shift(); // Removes the first element from the array
            }
          });
          console.log('Companies',companies);
          break; // Exit the loop once the date is found and prices are updated
        }
      }
};


function formatDate(date) {
  // Extract the year, month, and day from the date object
  let year = date.getFullYear();
  let month = nf(date.getMonth() + 1, 2); // Months are 0-indexed; add 1 to get the correct month number
  let day = nf(date.getDate(), 2); // Pad the day with a leading zero if necessary

  // Concatenate the parts together with dashes
  return `${year}-${month}-${day}`;
}
