import { Sortable } from 'sortablejs/modular/sortable.core.esm.js';
import data from '../response.json';

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

const weaponPromise = await fetch("https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/700/WeaponInfoMain.json");
const weaponData = await weaponPromise.json();

const bannerPromise = await fetch("https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/700/NamePlateBgInfo.json");
const bannerData = await bannerPromise.json();

const badgePromise = await fetch("https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/700/BadgeInfo.json");
const badgeData = await badgePromise.json();

for (let { node } of data.data.xRanking.xRankingAr.edges) {
    const weaponID = atob(node.weapon.id).toString().split("-")[1];
    const bannerID = atob(node.nameplate.background.id).toString().split("-")[1];
    const badgeIDs = node.nameplate.badges.map(badge => atob(badge?.id ? badge.id : null).toString().split("-")[1]);
    const { name, byname, xPower, nameId, nameplate: { background: { textColor } } } = node;

    let weaponLink;
    let bannerLink;
    let badgeLinks = [];

    for (let weapon of weaponData) {
        if (weapon.Id == weaponID) {
            const image = await fetch(`https://raw.githubusercontent.com/Leanny/splat3/main/images/weapon_flat/Path_Wst_${weapon.__RowId}.webp`);
            weaponLink = image.url;
        }
    }

    for (let banner of bannerData) {
        if (banner.Id == bannerID) {
            const image = await fetch(`https://raw.githubusercontent.com/Leanny/splat3/main/images/npl/${banner.__RowId}.webp`);
            bannerLink = image.url;
        }
    }

    for (let badge of badgeIDs) {
        if (badge == undefined) {
            badgeLinks.push("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=");
            continue;
        }
        for (let data of badgeData) {
            if (data.Id == badge) {
                const image = await fetch(`https://raw.githubusercontent.com/Leanny/splat3/main/images/badge/Badge_${data.Name}.webp`);
                badgeLinks.push(image.url);
            }
        }
    }

    const splashtag = document.querySelector(".splashtag").cloneNode(true);
    splashtag.style.color = `rgb(${textColor.r * 255}, ${textColor.g * 255}, ${textColor.b * 255})`;

    splashtag.querySelector(".splashtag-banner").setAttribute("href", bannerLink);
    splashtag.querySelector(".splashtag-title").textContent = byname;
    splashtag.querySelector(".splashtag-name").textContent = name;
    splashtag.querySelector(".splashtag-id").textContent = `#${nameId}`;

    badgeLinks.forEach((badge, index) => {
        splashtag.querySelector(`.splashtag-badge${index + 1}`).setAttribute("href", badge);
    });

    document.body.appendChild(splashtag);
}