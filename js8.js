"use strict";

// FETCH
function fetchColoredUsers() {
  fetch("https://reqres.in/api/unknown", {
    method: "GET",
  })
    .then((response) => {
      if (response.status !== 200) {
        throw response.status;
      }
      console.log("resolved", response);
      return response.json();
    })
    .then((datak) => {
      console.log(datak);
      let ul = document.createElement("ul");

      datak.data.forEach((element) => {
        let li = document.createElement("li");
        let color = element.color;
        li.textContent = `${element.name}`;
        ul.style.marginTop = '100px';
        li.style.color = color;
        li.style.fontSize = '26px';
        li.style.display = 'flex'
        li.style.justifyContent = 'center'
        ul.appendChild(li);
      });
      document.getElementById("api-users").appendChild(ul);
    })
    .catch((error) => {
      if (error == 404) {
        let p = document.createElement("p");
        p.textContent = "404 NOT FOUND - SERVER ERROR";

        document.getElementById("api-users").appendChild(p);
      } else {
        let p = document.createElement("p");
        p.textContent = "Page Not Found";

        document.getElementById("api-users").appendChild(p);
      }
      console.log("rejected", error);
    });
}

fetchColoredUsers();






// 2. xml https

function getUsers() {
  let requist = new XMLHttpRequest();

  requist.addEventListener("load", function () {
    let responseInfo = this.responseText;
    let responseInfoJson = JSON.parse(responseInfo);
    console.log(responseInfoJson);

    let ul = document.createElement("ul");

    let container = document.createElement("div");
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(3, 1fr)";
    container.style.gridTemplateRows = "50% 50%";

 responseInfoJson.data.forEach((element) => {
  let li = document.createElement("li");
  li.style.display = "flex";
  li.style.alignItems = "center";

  let img = document.createElement("img");
  img.src = element.avatar;
  img.style.padding = "10px";
  img.style.maxWidth = "200px";
  img.style.width = "100%";

  li.textContent = `${element.first_name} ${element.last_name}`;

  li.appendChild(img);
  container.appendChild(li);
});

ul.appendChild(container);

    document.getElementById("api-users").appendChild(ul);
  });

  requist.addEventListener("error", function () {
    let p = document.createElement("p");
    p.textContent = "404 - not found, Server Error";

    document.getElementById("api-users").appendChild(p);
  });
  requist.open("GET", "https://reqres.in/api/users?page=2");
  requist.send();
}
getUsers();
