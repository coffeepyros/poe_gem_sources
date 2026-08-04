type Chapter = { source: string; skills: string[] };
type Result = { source: string; skill: string };

const app = document.querySelector<HTMLDivElement>("#app");

// TEMPORARY CONFIG (I'm playing a Scion right now and building the tool primarily for myself)
const charClass: string = "scion";

// SEARCH FUNCTION + DATA LOADING
async function search(e: Event) {
  e.preventDefault();
  app!.innerHTML = ""; // reset output
  const input: string = (searchText as HTMLTextAreaElement).value;
  const search: string[] = input.split("\n");

  try {
    const response = await fetch(`./data/${charClass}.json`);
    const data = await response.json();

    const result: Result[] = [];

    search.forEach((searchSkill) => {
      for (let i = 0; i < data.length; i++) {
        const chapter: Chapter = data[i];
        // Support Skills don't need "* Support" in the name (often forgotten)
        if (chapter.skills.includes(searchSkill.replace(" Support",""))) {
          // console.log(chapter.source);
          result.push({ skill: searchSkill, source: chapter.source });
          break;
          // only need first occurance, since that is the highest xp gem
        }
      }
    });

    // SORTING
    result.sort((a: Result, b: Result) => {
      if (a.source > b.source) return 1;
      else return -1;
    });

    // RENDERING
    result.forEach(
      (skillResult) =>
        (app!.innerHTML += `<p><em>${skillResult.skill}</em> &rarr; ${skillResult.source}</p>`),
    );
  } catch (error) {
    console.error(error);
  }
}

const searchButton = document.getElementById("search-button");
(searchButton as HTMLButtonElement).addEventListener("click", search);
const searchText = document.getElementById("search-text");
