// TEMPORARY CONFIG (I'm playing a Scion right now and building the tool primarily for myself)
const selectElement = document.querySelector<HTMLDivElement>("#classSelection");

const classes = [
  "witch",
  "shadow",
  "ranger",
  "duelist",
  "marauder",
  "templar",
  "scion",
];

// pre-selected (because I'm playing a Scion right now)
let selectedClass = "scion";

function clickInterface(e: Event) {
  console.log(e.target);
  selectedClass = e.target.name;
  renderInterface();
}

function renderInterface() {
  // (re-)create HTML for all the class buttons
  const selectHTML = classes
    .map((charClass) => {
      if (charClass == selectedClass)
        return `<button name="${charClass}" disabled>${charClass}</button>`;
      else return `<button name="${charClass}">${charClass}</button>`;
    })
    .join(" ");

  // render the class buttons
  selectElement!.innerHTML = selectHTML;
}

selectElement?.addEventListener("click", clickInterface);

renderInterface();
