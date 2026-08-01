const app = document.querySelector<HTMLDivElement>('#app');

const charClass : string = "scion";

type Chapter_Scion = {
    source: string,
    skills: string[]
}
type Result = {skill:string,source:string}

async function search(e:Event) {
  e.preventDefault();
  app!.innerHTML = "";
  const input: string = (searchText as HTMLTextAreaElement).value;
  const search : string[] = input.split("\n");

  try {
    const response = await fetch(`./data/${charClass}.json`);
    const data = await response.json();


    const result:Result[] = [];

    search.forEach(searchSkill => {
        for (let i=0; i<data.length; i++) {
            const chapter:Chapter_Scion = data[i];
            if (chapter.skills.includes(searchSkill)) {
                // console.log(chapter.source);
                result.push({ skill: searchSkill, source: chapter.source});
                break;
                // only need first occurance, since that is the highest xp gem
            }
        }
    })

    result.sort((a:Result,b:Result) => {
        if (a.source > b.source) return 1;
        else return -1;
    })

    result.forEach(skillResult => app!.innerHTML+= `<p>${skillResult.skill} &rarr; ${skillResult.source}</p>`)
   
  }
  catch(error) { 
    console.error(error);
  }
}

const searchButton = document.getElementById("search-button");
(searchButton as HTMLButtonElement).addEventListener("click", search);
const searchText = document.getElementById("search-text");
console.log(searchText)

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
