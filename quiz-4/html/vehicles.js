const loadData = () =>
  new Promise((resolve) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ({ target }) => {
      if (target.readyState == 4 && target.status == 200) {
        resolve(JSON.parse(target.response));
      }
    };
    xhttp.open(
      "GET",
      `https://6253799f90266e3d0e0373e6.mockapi.io/ok/user`,
      true
    );
    xhttp.send();
  });

loadData().then((data) => {
  // render data in html table
  const tableBody = document.getElementById("table-body");
  
  if (!tableBody) {
    throw new Error("No table element found");
  }
  
  let vehicles = [];
  data.map(({ vehicle }) => {
    vehicles = [...vehicles, ...vehicle];
  });
  
  const rows = vehicles.reduce(
    (acc, { vin, manufacturer, model, type, age, id, userId }) =>
      acc +
      `<tr id="table-row-${vin}"><td>${vin}</td><td>${manufacturer}</td><td>${model}</td><td>${type}</td><td>${age}</td><td>${id}</td><td>${userId}</td></tr>`,
    ``
  );

  tableBody.innerHTML = rows;
});
