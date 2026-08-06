import { allGemData } from "./gem_data";

type FoundQuest = { name: string; skills: string };

// TEMPORARY CONFIG (I'm playing a Scion right now and building the tool primarily for myself)
// const selectedClassButton =
//   document.querySelector<HTMLButtonElement>("button:disabled");
// const charClass = selectedClassButton!.name;
const charClass = "scion";

// RE_RENDER DOESNT REACH THIS FILE, NOT REACT, NEED STATE MANAGEMENT

const app = document.querySelector<HTMLDivElement>("#app");

// SEARCH FUNCTION + DATA LOADING
function search(e: Event) {
  e.preventDefault();
  app!.innerHTML = ""; // reset output
  const search: string[] = (searchText as HTMLTextAreaElement).value.split(
    "\n",
  );

  // const data = allGemData.map((quest: QuestReward) => {
  //   return { name: quest.name, skills: quest[charClass] };
  // });

  const results: FoundQuest[] = [];

  search.forEach((searchSkill) => {
    for (let i = 0; i < allGemData.length; i++) {
      if (allGemData[i][charClass].includes(searchSkill)) {
        results.push({ skills: searchSkill, name: allGemData[i].name });
        break;
        // only need first occurance, since that is the highest xp gem
      }
    }
  });

  // SORTING
  results.sort((a: FoundQuest, b: FoundQuest) => {
    if (a.name > b.name) return 1;
    else return -1;
  });

  // RENDERING
  results.forEach(
    (skillResult) =>
      (app!.innerHTML += `<p><em>${skillResult.skills}</em> &rarr; ${skillResult.name}</p>`),
  );
}

const searchButton = document.getElementById("search-button");
(searchButton as HTMLButtonElement).addEventListener("click", search);
const searchText = document.getElementById("search-text");
