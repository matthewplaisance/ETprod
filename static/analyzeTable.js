d3.json("./static/analyze.json").then((data) => {
  console.log(Object.getOwnPropertyNames(data[0]));
    tableData = data;
    tbody = d3.select("tbody")

 function buildTable(tableData) {
   tbody.html(""); //clear table
   tableData.forEach((well) => {
     let row = tbody.append("tr");
     // loop through each value to add a cell for each of it
     Object.values(well).forEach((val) => {
       let cell = row.append("td");
       cell.text(val);
      });
    });
  }; // closing forEach
  
  buildTable(tableData)
  });