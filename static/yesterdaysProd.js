d3.json("./static/allProductionData.json").then((data) => {
  tableData = data;

  const yesterdaysDate = tableData[0][1];

  tbody = d3.select("tbody")

  function buildTable(tableData) {
    tbody.html(""); //clear table
    var filteredData = tableData.filter(row => row[1] == yesterdaysDate); //FILTER DATA BASED ON MOST RECENT DATE
    var dataForTable = [];
    console.log(filteredData[0]);
    filteredData.forEach(well => {
      dataForTable.push(Array(well[0], well[2], well[3], well[4], well[5], well[7]))
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
  }; 


  function createDropdownOptions() {
    var partnerSelector = d3.select("#wellFilter"); //SELECT <select> WHERE PARTNER NAMES WILL APPEAR
    d3.json("./static/allProductionData.json").then((allData) => { //READ IN JSON FILE COINTAING ALL PARTNER'S NAMES
      allData.forEach((well) => {
        if (well[1] === yesterdaysDate) {
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

  createDropdownOptions();
  buildTable(tableData,yesterdaysDate)

  d3.selectAll('#wellFilter').on("change", handleClick);
});
async function sortByRecentProd() {
  event.preventDefault();
  let allData = await d3.json('./static/allProductionData.json');

  const yesterdaysDate = allData[0][1];
  const filteredData = allData.filter(row => row[1] == yesterdaysDate);

  filteredData.sort((a, b) => {//sorts data high to low by oil production
    const aVal = a[2];
    const bVal = b[2];
    return bVal - aVal
  });


  buildTable(filteredData,yesterdaysDate)
};

function buildTable(data,yesterdaysDate) {
  tbody = d3.select("tbody")
  tbody.html("");

  var dataForTable = [];
  console.log(data[0]);
  data.forEach(well => {
    dataForTable.push(Array(well[0], well[2], well[3], well[4], well[5], well[7]))
  });
  dataForTable.forEach((well) => {
    let row = tbody.append("tr");

    Object.values(well).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
  document.getElementById("todaysDate").innerHTML = "Production for " + yesterdaysDate
};
d3.select("#Prodfilter").on("click", function () { sortByRecentProd() })