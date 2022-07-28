// Cumulative production
d3.json('./static/cumProd.json').then((data) => {
  tableData = data;

  //global declaration of tbody, since it will be accessed in and out of functions
  tbody = d3.select("tbody")

  function createDropdownOptions() {
    var partnerSelector = d3.select("#siteFilter"); //SELECT <select> WHERE PARTNER NAMES WILL APPEAR
    d3.json("./static/allProductionData.json").then((allData) => { //READ IN JSON FILE COINTAING ALL PARTNER'S NAMES
      repeatedWells = [] //EMPTY ARRAY TO CONTAIN ALL PARTNER'S NAME (REPEATED)
      allData.forEach((row) => { //LOOP THROUGH NET_INTEREST FILE
        repeatedWells.push(row[0]) //PUSH ALL PARTNER'S NAME TO LIST 
      });
      wells = [...new Set(repeatedWells)].sort()
      wells.forEach((well) => {
        partnerSelector
          .append('option')
          .text(well)
          .property('Value', well)
      });
    });
  };

  function handleClick() {
    // the value entered in the sitename filter becomes the value for the siteName variable
    let requestedSiteName = d3.select("#siteFilter").property("value");
    // set data be filtered to imported data (the data ready to be filtered)
    let filteredData = tableData;
    if (requestedSiteName) {
      filteredData = filteredData.filter(row => row[0] == requestedSiteName)
      console.log(filteredData);
    };
    //build table using the filteredData variable
    buildTable(filteredData);
  };
  createDropdownOptions();
  buildTable(tableData)
  //create listener for when user wants to filter data
  d3.selectAll('#siteFilter').on("change", handleClick);
});

async function sortByProd() {
  event.preventDefault();
  let allData = await d3.json('./static/cumProd.json');

  allData.sort((a, b) => {//sorts data high to low by oil production
    const aVal = a[1];
    const bVal = b[1];
    return bVal - aVal
  });

  buildTable(allData)
};


function buildTable(allData) {
  tbody.html("");
  allData.forEach((well) => {
    let row = tbody.append("tr");
    Object.values(well.slice(0, 4)).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    })
  });
};
d3.select("#Prodfilter").on("click", function () { sortByProd() })