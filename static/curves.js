// FUNCTON TO CREATE WELL OPTIONS DROP DOWN
function createDropdownOptions() {
  var partnerSelector = d3.select("#siteSelection"); //SELECT <select> WHERE PARTNER NAMES WILL APPEAR
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

//CALL FUNCTION TO CREATE DROPDOWN MENU VALUES
createDropdownOptions();

// LISTENER FOR CHANGE ON DROP DOWN MENU
d3.selectAll('body').on('change', updateCurves);


function updateCurves(){
    var dropdownMenu = d3.selectAll("#siteSelection").node();
    var selectedOption = dropdownMenu.value;

    console.log(selectedOption);
    d3.json("./static/allProductionData.json").then((data) =>{ //THIS WORKS!!!
      var site_oil = [];
      var site_gas = [];
      var site_water = [];
      var site_date = [];

      data.forEach((site) => {if(site[0] === selectedOption){
        site_oil.push(site[2]);
        site_gas.push(site[3]);
        site_water.push(site[4]);
        site_date.push(site[1]);
        console.log(site[1]);
      };
    });

        //console.log(site_date)

        var dataOil = [{
          x: site_date,
          y: site_oil,
        type: "line",
        line:
          {color: "green"}
     }]; // close oil data
        // open oil layout
        var layoutOil = {
          title: "Oil BBL"
          // yaxis: {
          //   type: 'log',
          //   autorange: true
          // }
        };//close oil layout
        // call oil data and layout to plot
       Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil);

        // gas decline curve data
        // open gas data
        var dataGas = [{
          x: site_date,
          y: site_gas,
        // type: "line",
        line:
          {color: "red"} }]; //close gas data
        // open gas layout
        var layoutGas = {
          title: "Gas BBL"
          // yaxis: {
          //   // type: 'log',
          //   autorange: true
          // }
        }; //close gas layout
        //call gas data & layout to plot
        Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas);

        // water decline curve data
        //open water data
        var dataWater = [{
          x: site_date,
          y: site_water,
        type: "line" }]; //close water data
        //open water layout
        var layoutWater = {
          title: "Water BBL"
          // yaxis: {
          //   // type: 'log',
          //   autorange: true
          // }
        };//close water layout
        //call water data & layout to plot
        Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
      })};
