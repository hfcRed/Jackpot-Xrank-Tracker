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

    sortableList.sort(order, true);
}