var getFavItems = JSON.parse(localStorage.getItem("favItem"));
console.log(getFavItems);

let favContainer = document.getElementById("favimages");

const renderItems = () => {
  const favData = getFavItems.map((item, index) => {
      return `
            <div class="col-md-3 ">
              <div class="favimages ">
                <img class="imageclass " src=${
                  item.thumbnail.path +
                  "/portrait_xlarge." +
                  item.thumbnail.extension
                } alt="">
                <div>
                  <h3 class="card-title d-flex justify-content-center bg-info">${
                    item.name
                  }</h3>
                </div>
                <div class="d-flex mt-3 justify-content-between px-2">
                  <span><a href=${
                    item.urls[0].url
                  } target="_blank" id="urlLink" class="btn btn-primary btn-sm">More Detail</a></span>
                  <button class='btn btn-danger btn-sm' onclick="removeFavourite(${index})"><i class="fa-solid text-white fa-trash-can"></i></button>
                </div>
              </div>
            </div>`;
    }).join("");
  favContainer.innerHTML = favData;
};
renderItems();
const removeFavourite = (index) => {
  getFavItems.splice(index, 1);
  localStorage.setItem("favItem", JSON.stringify(getFavItems));
  renderItems();
};
