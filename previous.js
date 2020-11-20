const btnPrev = document.querySelector("#btn-clear");
const elShibasList = document.querySelector("#shibas-list");

const storageName = "shownShibas";
const getShownShibas = () => {
  const shownShibas = JSON.parse(localStorage.getItem(storageName));

  return shownShibas ? shownShibas : [];
};

const initPage = async () => {
  getShownShibas().forEach((shibaUrl) => {
    var img = new Image();
    img.src = shibaUrl;
    elShibasList.appendChild(img);
  });
};

btnPrev.addEventListener("click", () => {
  localStorage.clear();

  while (elShibasList.firstChild) {
    elShibasList.removeChild(elShibasList.firstChild);
  }
});

initPage();
