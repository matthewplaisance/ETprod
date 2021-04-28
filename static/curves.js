// FUNCTON TO CREATE WELL OPTIONS DROP DOWN
function createDropdownOptions() {
    //select dropdown <select> in well.html with id:"siteSelection"
    var selector = d3.select("#siteSelection");
    //read in the wellNames.json file, which contains the array "names" with all the well names
    d3.json('./static/well_list.json').then((data) => {
      // console.log(data);
    var wellOptions = data.names;
    wellOptions.forEach((well) => {
      selector
        .append('option')
        .text(well)
        .property('Value', well);
    })
  })
  }

//CALL FUNCTION TO CREATE DROPDOWN MENU VALUES
  createDropdownOptions();

// LISTENER FOR CHANGE ON DROP DOWN MENU
d3.selectAll('body').on('change', updateCurves);



d3.json("./static/allProductionData.json").then((data) =>{
    //console.log(data);
});

function updateCurves(){
    var dropdownMenu = d3.selectAll("#siteSelection").node();
    var dropdownMenuID = dropdownMenu.id;
    var selectedOption = dropdownMenu.value;
    console.log(dropdownMenuID);
    console.log(selectedOption);
    d3.json("./static/allProductionData.json").then((data) =>{ //THIS WORKS!!!
    //console.log(data);
      var site_oil = [];
      var site_gas = [];
      var site_water = [];
      var site_date = [];

      new Promise ((resolve) => data.forEach(site => {if (site[0]===selectedOption) {
        {if (site[2] > 1){ site_oil.push(site[2])}}
        {if (site[3] > 1){ site_gas.push(site[3])}}
        {if (site[4] > 1){ site_water.push(site[4])}}
    

        console.log(site);        
          //site_oil.push(site[2]);
          //site_gas.push(site[3]);
          //site_water.push(site[4]);
          site_date.push(site[1]) 
      } resolve()}));

        //console.log(site_oil);
        //console.log(site_gas)
        //console.log(site_water);
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
          title: "Oil BBL",
          yaxis: {
            type: 'log',
            autorange: true
          }
        };//close oil layout
        // call oil data and layout to plot
       Plotly.newPlot("oilDeclineCurve", dataOil, layoutOil); 
    
        // gas decline curve data
        // open gas data
        var dataGas = [{
          x: site_date,
          y: site_gas,
        type: "line",
        line: 
          {color: "red"} }]; //close gas data
        // open gas layout
        var layoutGas = {
          title: "Gas BBL",
          yaxis: {
            type: 'log',
            autorange: true
          }
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
          title: "Water BBL",
          yaxis: {
            type: 'log',
            autorange: true
          }
        };//close water layout
        //call water data & layout to plot
        Plotly.newPlot("waterDeclineCurve", dataWater, layoutWater);
      })};