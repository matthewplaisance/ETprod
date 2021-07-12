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
    var comments = [];

    data.forEach((site) => {if(site[0] === selectedOption){
      site_oil.push(site[2]);
      site_gas.push(site[3]);
      site_water.push(site[4]);
      site_date.push(site[1]);
      comments.push(site[7])
    };
  });

  var dataOil = [{
    x: site_date,
    y: site_oil,
    text: comments,
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
    text: comments,
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
    text: comments,
    type: "line"
  }];
  var layoutWater = {
    title: "Water BBL"
  };
  Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);

  var hide = document.getElementById("timeframesLog");
  hide.style.display = "none";

  var hide = document.getElementById("timeframes");
  hide.style.display = "block";

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
    var comments = [];
    
    data.forEach((site) => {if(site[0] === selectedOption){
      site_oil.push(site[2]);
      site_gas.push(site[3]);
      site_water.push(site[4]);
      site_date.push(site[1]);
      comments.push(site[7])
    };
  });
  
  var dataOil = [{
    x: site_date,
    y: site_oil,
    text: comments,
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
    text: comments,
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
    text: comments,
    type: "line" }];
    
  var layoutWater = {
    title: "Water BBL",
    yaxis: {
      type: 'log',
      autorange: true
    }
  };
  
  Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);

  var hide = document.getElementById("timeframes");
  hide.style.display = "none";
  var logShow = document.getElementById("timeframesLog");
  logShow.style.display = "block";
})};
function CurveLinear30Days(){
  var dropdownMenu = d3.selectAll("#siteSelection").node();
  var selectedOption = dropdownMenu.value;
  
  console.log("hello", selectedOption);
  d3.json("./static/allProductionData.json").then((data) =>{
    var site_oil = [];
    var site_gas = [];
    var site_water = [];
    var site_date = [];
    var comments = [];
    
    data.forEach((site) => {if(site[0] === selectedOption){
      site_oil.push(site[2]);
      site_gas.push(site[3]);
      site_water.push(site[4]);
      site_date.push(site[1]);
      comments.push(site[7])
    };
  });

  
  var days30 = site_date.slice(0,31);
  var oil30 = site_oil.slice(0,31);
  var gas30 = site_gas.slice(0,31);
  var water30 = site_water.slice(0,31);
  var comments30 = comments.slice(0,31);
  console.log(days30);
  
  var dataOil = [{
    x: days30,
    y: oil30,
    text: comments30,
    type: "line",
    line:
    {color: "green"}
  }];
  
  var layoutOil = {
    title: "Oil BBL"
  };
  
  Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil, {displayModeBar: true});
  
  var dataGas = [{
    x: days30,
    y: gas30,
    text: comments30,
    type: "line",
    line:
    {color: "red"}
  }];
  
  var layoutGas = {
    title: "Gas BBL"
  };
  
  Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas);
  
  var dataWater = [{
    x: days30,
    y: water30,
    text: comments30,
    type: "line" }];
    
  var layoutWater = {
    title: "Water BBL"
  };
  
  Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
})};
//FUNCTION FOR LINEAR 180 DAYS CURVE//
function CurveLinear180Days(){
  var dropdownMenu = d3.selectAll("#siteSelection").node();
  var selectedOption = dropdownMenu.value;
  
  console.log("hello", selectedOption);
  d3.json("./static/allProductionData.json").then((data) =>{
    var site_oil = [];
    var site_gas = [];
    var site_water = [];
    var site_date = [];
    var comments = [];
    
    data.forEach((site) => {if(site[0] === selectedOption){
      site_oil.push(site[2]);
      site_gas.push(site[3]);
      site_water.push(site[4]);
      site_date.push(site[1]);
      comments.push(site[7])
    };
  });

  
  var days180 = site_date.slice(0,181);
  var oil180 = site_oil.slice(0,181);
  var gas180 = site_gas.slice(0,181);
  var water180 = site_water.slice(0,181);
  var comments180 = comments.slice(0,181);
  console.log(days180);
  
  var dataOil = [{
    x: days180,
    y: oil180,
    text: comments180,
    type: "line",
    line:
    {color: "green"}
  }];
  
  var layoutOil = {
    title: "Oil BBL"
  };
  
  Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil, {displayModeBar: true});
  
  var dataGas = [{
    x: days180,
    y: gas180,
    text: comments180,
    type: "line",
    line:
    {color: "red"}
  }];
  
  var layoutGas = {
    title: "Gas BBL"
  };
  
  Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas);
  
  var dataWater = [{
    x: days180,
    y: water180,
    text: comments180,
    type: "line" }];
    
  var layoutWater = {
    title: "Water BBL"
  };
  
  Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
})};
//FUNCTION FOR LINEAR 360 DAYS CURVE//
function CurveLinear365Days(){
  var dropdownMenu = d3.selectAll("#siteSelection").node();
  var selectedOption = dropdownMenu.value;
  
  console.log("hello", selectedOption);
  d3.json("./static/allProductionData.json").then((data) =>{
    var site_oil = [];
    var site_gas = [];
    var site_water = [];
    var site_date = [];
    var comments = [];
    
    data.forEach((site) => {if(site[0] === selectedOption){
      site_oil.push(site[2]);
      site_gas.push(site[3]);
      site_water.push(site[4]);
      site_date.push(site[1]);
      comments.push(site[7])
    };
  });

  
  var days365 = site_date.slice(0,366);
  var oil365 = site_oil.slice(0,366);
  var gas365 = site_gas.slice(0,366);
  var water365 = site_water.slice(0,366);
  var comments365 = comments.slice(0,366);
  //console.log(days365);
  
  var dataOil = [{
    x: days365,
    y: oil365,
    text: comments365,
    type: "line",
    line:
    {color: "green"}
  }];
  
  var layoutOil = {
    title: "Oil BBL"
  };
  
  Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil, {displayModeBar: true});
  
  var dataGas = [{
    x: days365,
    y: gas365,
    text: comments365,
    type: "line",
    line:
    {color: "red"}
  }];
  
  var layoutGas = {
    title: "Gas BBL"
  };
  
  Plotly.newPlot("gasDeclineCurve", dataGas, layoutGas);
  
  var dataWater = [{
    x: days365,
    y: water365,
    text: comments365,
    type: "line" }];
    
  var layoutWater = {
    title: "Water BBL"
  };
  
  Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
})};
function Log30DayCurves(){
  var dropdownMenu = d3.selectAll("#siteSelection").node();
  var selectedOption = dropdownMenu.value;
  
  console.log("hello", selectedOption);
  d3.json("./static/allProductionData.json").then((data) =>{
    var site_oil = [];
    var site_gas = [];
    var site_water = [];
    var site_date = [];
    var comments = [];
    
    data.forEach((site) => {if(site[0] === selectedOption){
      site_oil.push(site[2]);
      site_gas.push(site[3]);
      site_water.push(site[4]);
      site_date.push(site[1]);
      comments.push(site[7])
    };
  });

  var daysLog30 = site_date.slice(0,31);
  var oilLog30 = site_oil.slice(0,31);
  var gasLog30 = site_gas.slice(0,31);
  var waterLog30 = site_water.slice(0,31);
  var commentsLog30 = comments.slice(0,31);
  
  var dataOil = [{
    x: daysLog30,
    y: oilLog30,
    text: commentsLog30,
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
    x: daysLog30,
    y: gasLog30,
    text: commentsLog30,
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
    x: daysLog30,
    y: waterLog30,
    text: commentsLog30,
    type: "line" }];
    
  var layoutWater = {
    title: "Water BBL",
    yaxis: {
      type: 'log',
      autorange: true
    }
  };
  
  Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
  var hide = document.getElementById("timeframes");
  hide.style.display = "none";
  var logShow = document.getElementById("timeframesLog");
  logShow.style.display = "block";
})};
function Log180DayCurves(){
  var dropdownMenu = d3.selectAll("#siteSelection").node();
  var selectedOption = dropdownMenu.value;
  
  console.log("hello", selectedOption);
  d3.json("./static/allProductionData.json").then((data) =>{
    var site_oil = [];
    var site_gas = [];
    var site_water = [];
    var site_date = [];
    var comments = [];
    
    data.forEach((site) => {if(site[0] === selectedOption){
      site_oil.push(site[2]);
      site_gas.push(site[3]);
      site_water.push(site[4]);
      site_date.push(site[1]);
      comments.push(site[7])
    };
  });

  var daysLog180 = site_date.slice(0,181);
  var oilLog180 = site_oil.slice(0,181);
  var gasLog180 = site_gas.slice(0,181);
  var waterLog180 = site_water.slice(0,181);
  var commentsLog180 = comments.slice(0,181);
  
  var dataOil = [{
    x: daysLog180,
    y: oilLog180,
    text: commentsLog180,
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
    x: daysLog180,
    y: gasLog180,
    text: commentsLog180,
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
    x: daysLog180,
    y: waterLog180,
    text: commentsLog180,
    type: "line" }];
    
  var layoutWater = {
    title: "Water BBL",
    yaxis: {
      type: 'log',
      autorange: true
    }
  };
  
  Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
  var hide = document.getElementById("timeframes");
  hide.style.display = "none";
  var logShow = document.getElementById("timeframesLog");
  logShow.style.display = "block";
})};
function Log365DayCurves(){
  var dropdownMenu = d3.selectAll("#siteSelection").node();
  var selectedOption = dropdownMenu.value;
  
  console.log("hello", selectedOption);
  d3.json("./static/allProductionData.json").then((data) =>{
    var site_oil = [];
    var site_gas = [];
    var site_water = [];
    var site_date = [];
    var comments = [];
    
    data.forEach((site) => {if(site[0] === selectedOption){
      site_oil.push(site[2]);
      site_gas.push(site[3]);
      site_water.push(site[4]);
      site_date.push(site[1]);
      comments.push(site[7])
    };
  });

  var daysLog365 = site_date.slice(0,366);
  var oilLog365 = site_oil.slice(0,366);
  var gasLog365 = site_gas.slice(0,366);
  var waterLog365 = site_water.slice(0,366);
  var commentsLog365 = comments.slice(0,366);
  
  var dataOil = [{
    x: daysLog365,
    y: oilLog365,
    text: commentsLog365,
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
    x: daysLog365,
    y: gasLog365,
    text: commentsLog365,
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
    x: daysLog365,
    y: waterLog365,
    text: commentsLog365,
    type: "line" }];
    
  var layoutWater = {
    title: "Water BBL",
    yaxis: {
      type: 'log',
      autorange: true
    }
  };
  
  Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
  var hide = document.getElementById("timeframes");
  hide.style.display = "none";
  var logShow = document.getElementById("timeframesLog");
  logShow.style.display = "block";
})};
//LINEAR LISTENERS//
d3.select("#linear").on('click', LinearCurves);
d3.select("#Inception").on('click', LinearCurves);
d3.select("#Days30").on('click', CurveLinear30Days);
d3.select("#Days180").on('click', CurveLinear180Days);
d3.select("#Days365").on('click', CurveLinear365Days);

//LOG LISTENERS//
d3.select("#logarithmic").on('click', LogCurves);
d3.select("#InceptionLog").on('click', LogCurves);
d3.select("#Days30Log").on('click', Log30DayCurves);
d3.select("#Days180Log").on('click', Log180DayCurves);
d3.select("#Days365Log").on('click', Log365DayCurves);


