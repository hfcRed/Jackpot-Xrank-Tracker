import { Sortable } from 'sortablejs/modular/sortable.core.esm.js';
import data from '../response.json';
import OBSWebSocket from 'obs-websocket-js';

const list = document.querySelector(".list");

let sortableList = new Sortable.create(list, {
    swapClass: "highlight",
    animation: 1000,
    disabled: true,
});

const button = document.querySelector(".button");

button.onclick = function () {
    for (let power of list.querySelectorAll(".item-power")) {
        power.textContent = Math.floor(Math.random() * 10000);
    }

    const order = sortableList.toArray().map((item, index) => ({
        id: item,
        power: parseInt(list.querySelectorAll(".item-power")[index].textContent)
    })).sort((a, b) => b.power - a.power).map(item => item.id);

    const currentFirst = list.children[0];
    sortableList.sort(order, true);
    const newFirst = list.children[0];

    for (let item of list.children) {
        item.classList.remove("item-1", "item-2", "item-3", "item-4");
        item.classList.add(`item-${Array.from(list.children).indexOf(item) + 1}`);
    }
}

const urls = [
    "https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/600/WeaponInfoMain.json",
    "https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/600/NamePlateBgInfo.json",
    "https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/600/BadgeInfo.json"
];

const [weaponData, bannerData, badgeData] = await Promise.all(urls.map(url => fetch(url).then(response => response.json())));

for (let { node } of data.data.xRanking.xRankingAr.edges) {
    const weaponID = atob(node.weapon.id).toString().split("-")[1];
    const bannerID = atob(node.nameplate.background.id).toString().split("-")[1];
    const badgeIDs = node.nameplate.badges.map(badge => atob(badge?.id ? badge.id : null).toString().split("-")[1]);
    const { name, byname, xPower, nameId, nameplate: { background: { textColor } } } = node;

    const weapon = weaponData.find(weapon => weapon.Id == weaponID);
    const weaponLink = weapon ? `https://raw.githubusercontent.com/Leanny/splat3/main/images/weapon_flat/Path_Wst_${weapon.__RowId}.webp` : null;

    const banner = bannerData.find(banner => banner.Id == bannerID);
    const bannerLink = banner ? `https://raw.githubusercontent.com/Leanny/splat3/main/images/npl/${banner.__RowId}.webp` : null;

    const badgeLinks = badgeIDs.map(badgeID => {
        if (badgeID == undefined) return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

        const badge = badgeData.find(data => data.Id == badgeID);
        return badge ? `https://raw.githubusercontent.com/Leanny/splat3/main/images/badge/Badge_${badge.Name}.webp` : null;
    });

    const item = document.querySelector(".item-template").cloneNode(true);
    item.classList.remove("item-template", "hidden");
    item.classList.add("grid", `item-${Array.from(list.children).length + 1}`);

    item.querySelector(".item-power").textContent = xPower;
    item.querySelector(".item-image").src = weaponLink;


    const splashtag = item.querySelector(".splashtag");
    splashtag.style.color = `rgb(${textColor.r * 255}, ${textColor.g * 255}, ${textColor.b * 255})`;

    splashtag.querySelector(".splashtag-banner").setAttribute("href", bannerLink);
    splashtag.querySelector(".splashtag-title").textContent = byname;
    splashtag.querySelector(".splashtag-name").textContent = name;
    splashtag.querySelector(".splashtag-id").textContent = `#${nameId}`;

    badgeLinks.forEach((badge, index) => {
        splashtag.querySelector(`.splashtag-badge${index + 1}`).setAttribute("href", badge);
    });

    list.appendChild(item);
}

let obs = new OBSWebSocket();

await obs.connect('ws://127.0.0.1:4455', "Waldfee");

const scenes = await obs.call("SetInputSettings", { inputName: "Test", inputSettings: { text: "New" } })

console.log(scenes);

const filters = document.querySelector(".filters");
const zonesFilter = filters.querySelector(".filter-zones");
const towerFilter = filters.querySelector(".filter-tower");
const rainmakerFilter = filters.querySelector(".filter-rainmaker");
const clamFilter = filters.querySelector(".filter-clam");

const filterButtons = [zonesFilter, towerFilter, rainmakerFilter, clamFilter];

for (let button of filterButtons) {
    button.onclick = function () {
        if (button.classList.contains("bg-backgroundLighter")) return;

        for (let button of filterButtons) {
            button.classList.remove("bg-backgroundLighter");
        }

        button.classList.add("bg-backgroundLighter");
    }
}