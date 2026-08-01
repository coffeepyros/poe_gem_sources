import { table } from "./table.js";
const classes = ["witch", "shadow", "ranger", "duelist", "marauder", "templar", "scion"];

const app = document.getElementById("app");
app.innerHTML = table;
// I have to display the table again, so the DOM gets loaded in a browser window
// then JS can access / convert it.

const tbody = document.querySelector("tbody");

const gemData = [];

for (let ti=0; ti<tbody.children.length;ti++) {
    const tr = tbody.children[ti];
    const quest_info = { source: tr.children[0].innerText.replaceAll("\n"," - ") };
    // in case the cell goes over the *full width* (same skills for all classes), I have to target the "second" cell for all classes.
    classes.forEach((charClass,i) => quest_info[charClass] = tr.children[i+1] ? tr.children[i+1].innerText.split("\n") : tr.children[1].innerText.split("\n"));
    gemData.push(quest_info);
}

console.log(gemData);
// I used the browser's inspect/dev tool (F12) to copy the object first to the clipboard
// and then write it via an editor to a file
