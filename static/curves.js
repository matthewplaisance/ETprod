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
d3.select("#siteSelection").on('change', LinearCurves);



//FUNCTION FOR LINEAR SCALE//
function LinearCurves(){
  dropdownMenu = d3.select("#siteSelection").node();
  selectedOption = dropdownMenu.value;
  
  console.log(selectedOption);
  
  d3.json("./static/allProductionData.json").then((data) =>{ 
    var site_oil = [];
    var site_gas = [];
    var site_water = [];
    var site_date = [];

    data.forEach((site) => {if(site[0] === selectedOption){
      site_oil.push(site[2]);
      site_gas.push(site[3]);
      site_water.push(site[4]);
      site_date.push(site[1]);
    };
  });
  
  var dataOil = [{
    x: site_date,
    y: site_oil,
    line:
    {color: "green"}
  }];
  var layoutOil = {
    title: "Oil BBL"
  };
  Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil, {displayModeBar: true}, {responsive: true});
  
  var dataGas = [{
    x: site_date,
    y: site_gas,
    line:
    {color: "red"}
  }];
  var layoutGas = {
    title: "Gas BBL"
  };
  Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas);
  
  var dataWater = [{
    x: site_date,
    y: site_water,
    type: "line"
  }];
  var layoutWater = {
    title: "Water BBL"
  };
  Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);

})
};




//FUNCTION FOR LOGARITHMIC SCALE//
function LogCurves(){
  var dropdownMenu = d3.selectAll("#siteSelection").node();
  var selectedOption = dropdownMenu.value;
  
  console.log("hello", selectedOption);
  d3.json("./static/allProductionData.json").then((data) =>{
    var site_oil = [];
    var site_gas = [];
    var site_water = [];
    var site_date = [];
    
    data.forEach((site) => {if(site[0] === selectedOption){
      site_oil.push(site[2]);
      site_gas.push(site[3]);
      site_water.push(site[4]);
      site_date.push(site[1]);
      //console.log(site[1]);
    };
  });
  
  var dataOil = [{
    x: site_date,
    y: site_oil,
    type: "line",
    line:
    {color: "green"}
  }];
  
  var layoutOil = {
    title: "Oil BBL",
    yaxis: {
      type: 'log',
      autorange: true
    }
  };
  
  Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil, {displayModeBar: true});
  
  var dataGas = [{
    x: site_date,
    y: site_gas,
    type: "line",
    line:
    {color: "red"}
  }];
  
  var layoutGas = {
    title: "Gas BBL",
    yaxis: {
      type: 'log',
      autorange: true
    }
  };
  
  Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas);
  
  var dataWater = [{
    x: site_date,
    y: site_water,
    type: "line" }];
    
  var layoutWater = {
    title: "Water BBL",
    yaxis: {
      type: 'log',
      autorange: true
    }
  };
  
  Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
})};

d3.select("#logarithmic").on('click', LogCurves);
d3.select("#linear").on('click', LinearCurves);




