const btnNew = document.querySelector("#btn-new");
const btnPrev = document.querySelector("#btn-previous");
const elMainImg = document.querySelector("#main-img");
const elShibas = document.querySelector("#shibas");
const elPreviousDogs = document.querySelector("#pet-select");
const elSelectDog = document.querySelector("#pet-select");

const initPage = async () => {
  fetchAndSetNewShibaImage();

  const options = await fetchAllDogNames();

  options.forEach((option) => {
    var opt = document.createElement("option");

    opt.appendChild(document.createTextNode(option.text));
    opt.value = option.value;

    elSelectDog.appendChild(opt);
  });
};

const storageName = "shownShibas";

const getShownShibas = () => {
  const shownShibas = JSON.parse(localStorage.getItem(storageName));

  return shownShibas ? shownShibas : [];
};

const fetchAndSetNewShibaImage = async () => {
  let shownShibas = getShownShibas();

  const newDog = await fetchDog();

  shownShibas.push(newDog);

  localStorage.setItem(storageName, JSON.stringify(shownShibas));

  elMainImg.setAttribute("src", newDog);
};

const fetchDog = (dog = "shiba") =>
  fetch(`https://dog.ceo/api/breed/${dog}/images/random`)
    .then((response) => response.json())
    .then(({ message }) => message);

const fetchAllDogNames = () =>
  fetch(`https://dog.ceo/api/breeds/list/all`)
    .then((response) => response.json())
    .then(({ message }) =>
      Object.keys(message).map((dogName) => ({
        value: dogName,
        text: dogName,
      }))
    );

btnNew.addEventListener("click", fetchAndSetNewShibaImage);

btnPrev.addEventListener("click", () => {
  getShownShibas().forEach((shibaUrl) => {
    var img = new Image();
    img.src = shibaUrl;
    document.querySelector("#shibas-list").appendChild(img);
  });
});

elSelectDog.addEventListener("change", async function () {
  const newDog = await fetchDog(this.value);
  elMainImg.setAttribute("src", newDog);
});

initPage();
