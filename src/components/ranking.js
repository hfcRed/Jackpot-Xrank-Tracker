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

const urls = [
    "https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/700/WeaponInfoMain.json",
    "https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/700/NamePlateBgInfo.json",
    "https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/700/BadgeInfo.json"
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