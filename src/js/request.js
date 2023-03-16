import axios from "axios";

let searchBtn = document.getElementById("search");
let searchInput = document.querySelector(".search-input");
let divResults = document.querySelector(".results");
let userSearch = [];

searchInput.addEventListener("input", (event) => {
  if (event.target.value.length > 1) {
    document.querySelector(".input-error").style.display = "none";
  }
});

searchBtn.addEventListener("click", (event) => {
  handleClick();
});

async function doGetRequest() {
  const config = {
    method: "get",
    url: `https://api.github.com/search/repositories?q=${userSearch}{&sort=stars&order=desc&per_page=10&}`,
  };
  try {
    let res = await axios(config).then((res) => {
      if (res.data.total_count === 0) {
        let div = document.createElement("div");
        div.className = "search-not-found";
        div.innerHTML = `<p>nothing found</p>`;
        divResults.appendChild(div);
      } else {
        res.data.items.map((item, index) => {
          let div = document.createElement("div");
          div.className = "result";

          div.innerHTML = `
          <a href = ${item.html_url} target="_blank"><span>${
            index + 1
          }.</span> ${descriptionСheck(item.description)}</a>
          <div class="sub-info">
          <p>watchers: ${item.watchers} </p>
          <p>updated at: ${item.updated_at
            .slice(0, 10)
            .split("-")
            .reverse()
            .join(".")}</p></div>`;

          divResults.appendChild(div);
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleClick();
  }
});

let handleClick = () => {
  if (searchInput.value.trim() == "") {
    document.querySelector(".input-error").style.display = "block";
    searchInput.value = "";
  } else {
    document.querySelector(".input-error").style.display = "none";

    divResults.innerHTML = "";
    userSearch = searchInput.value.split(" ");
    userSearch = userSearch.filter(function (el) {
      return el != "";
    });
    userSearch = userSearch.join("+");
    doGetRequest();
    searchInput.value = "";
  }
};

let descriptionСheck = (desc) => {
  if (desc.length > 100) {
    return desc.slice(0, 100) + "...";
  } else {
    let check = desc
      .split(":")
      .find(
        (item) =>
          !item.includes("_") && !item.includes("-") && !item.trim() == ""
      );

    if (check === undefined) {
      return desc;
    } else {
      return check;
    }
  }
};
