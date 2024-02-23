import { Sortable } from 'sortablejs/modular/sortable.core.esm.js';

const list = document.querySelector(".list");

let sortableList = new Sortable.create(list, {
    swapClass: "highlight",
    animation: 1000,
    disabled: true,
});

const button = document.querySelector(".button");

button.onclick = function () {
    for (let power of list.querySelectorAll(".power")) {
        power.textContent = Math.floor(Math.random() * 10000);
    }

    const order = sortableList.toArray().map((item, index) => ({
        id: item,
        power: parseInt(list.querySelectorAll(".power")[index].textContent)
    })).sort((a, b) => b.power - a.power).map(item => item.id);

    const currentFirst = list.children[0];
    sortableList.sort(order, true);
    const newFirst = list.children[0];

    for (let item of list.children) {
        item.setAttribute("class", "");
        item.classList.add(`item-${Array.from(list.children).indexOf(item) + 1}`);
    }

    if (currentFirst !== newFirst) {
        console.log("New first item!");
    }
}