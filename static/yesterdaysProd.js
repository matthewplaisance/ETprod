d3.json("./static/allProductionData.json").then((data) => {
    tableData = data;
    var yesterdaysDate = tableData[0][1];
    tbody = d3.select("tbody")

 function buildTable(tableData) {
   tbody.html(""); //clear table
   var filteredData = tableData.filter(row => row[1] == yesterdaysDate); //FILTER DATA BASED ON MOST RECENT DATE
   var dataForTable = [];
   console.log(filteredData[0]);
   filteredData.forEach(well => {
    dataForTable.push(Array(well[0],well[2],well[3],well[4],well[5],well[7]))
   });
   dataForTable.forEach((well) => {
     let row = tbody.append("tr");
     // loop through each value to add a cell for each of it
     Object.values(well).forEach((val) => {
       let cell = row.append("td");
       cell.text(val);
      });
    });
    // DYNAMIC HEADING 
    document.getElementById("todaysDate").innerHTML = "Production for " + yesterdaysDate
  }; // closing forEach
  
  buildTable(tableData)

function createDropdownOptions() {
    var partnerSelector = d3.select("#wellFilter"); //SELECT <select> WHERE PARTNER NAMES WILL APPEAR
    d3.json("./static/allProductionData.json").then((allData) => { //READ IN JSON FILE COINTAING ALL PARTNER'S NAMES
      allData.forEach((well) => {
        if(well[1] === yesterdaysDate){
          partnerSelector
            .append('option')
            .text(well[0])
            .property('Value', well)
          }
          });
        });
      };
  
  //CALL FUNCTION TO CREATE DROPDOWN MENU VALUES
  createDropdownOptions();

  function handleClick() {
    // the value entered in the sitename filter becomes the value for the siteName variable
    let requestedSiteName = d3.select("#wellFilter").property("value");
    console.log(requestedSiteName);
    // set data be filtered to imported data (the data ready to be filtered)
    let filteredData = tableData;
      filteredData = filteredData.filter(row => row[0] == requestedSiteName)
    //build table using the filteredData variable
    buildTable(filteredData);
  };
  
  d3.selectAll('#wellFilter').on("change", handleClick);

  //FUCTION TO CLEAR FILTERED TABLE, NEED TO CLEAR OUT THE DROPDOWN MENU FROM SELECTED OPTION
  function clearTable(tableData) {
    d3.json("./static/allProductionData.json").then(tableData => {
      tbody.html(""); //clear table
      var filteredData = tableData.filter(row => row[1] == yesterdaysDate); //FILTER DATA BASED ON MOST RECENT DATE
      var dataForTable = [];
      filteredData.forEach(well => {
       dataForTable.push(Array(well[0],well[2],well[3],well[4],well[7]))
      });
      dataForTable.forEach((well) => {
        let row = tbody.append("tr"); //for each well create a row and append a tr
        Object.values(well).forEach((val) => { // loop through each value to add a cell for each of it
          let cell = row.append("td");
          cell.text(val);
         });
       });
       
       //CODE TO RESET DROPDOWN i.e. CLEAR SELECTION
       var dropDown = document.getElementById("wellFilter");
       dropDown.selectedIndex = 0
     })};
    
 
   //LISTENER TO TRIGGER ClearTable FUNCTION
   d3.selectAll('#clear-filter-btn').on("click",clearTable);

   

  
  });