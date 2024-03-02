import { Sortable } from 'sortablejs/modular/sortable.core.esm.js';
import data from '../response.json';
import { loadSettings } from './obsHandler.js';

let spinner;
let dataa;
let list;
let sortableList;

window.addEventListener("load", async () => {
    spinner = document.querySelector(".spinner");
    list = document.querySelector(".list");
    sortableList = new Sortable.create(list, {
        animation: 1000,
        disabled: true,
    });

    await updateData();
    prepareFilters();
    startCountdown();
    loadSettings();

    spinner.classList.add("hidden");
    spinner.classList.remove("flex");

    list.classList.remove("hidden");
    list.classList.add("flex");
});

async function updateData() {
    console.log("Updating data");
    dataa = await getRankData();
    if (!dataa) { displayError(); return; };

    const audio = new Audio("/blingblong.mp3");
    audio.play();

    console.log("Data updated");
    drawItems();
    orderItems();
};

async function getRankData() {
    try {
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), 15000)
        );
        const dataPromise = fetch("https://splat.top/jackpot");

        const response = await Promise.race([timeoutPromise, dataPromise]);
        if (!response.ok) throw new Error("No data received");

        const data = await response.json();
        if (!data) throw new Error("No data received");

        console.log("Data: " + data);
        return data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};

async function drawItems() {
    console.log("Getting data from GitHub");
    const urls = [
        "https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/600/WeaponInfoMain.json",
        "https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/600/NamePlateBgInfo.json",
        "https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/600/BadgeInfo.json"
    ];
    const [weaponData, bannerData, badgeData] = await Promise.all(urls.map(url => fetch(url).then(response => response.json())));
    const mode = document.querySelector(".filters").getAttribute("data-filter") || "zones";
    console.log("Data received");

    // Function will have to check if the new data has more or less players than the current data
    // If it has more, it will add the new players to the list
    // If it has less, it will remove the missing players from the list
    // All players in the new data that are already in the list will have all their data updated

    console.log("Drawing items")
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

        console.log(item);
        list.appendChild(item);
    }
    console.log("Items drawn");
};

function orderItems() {
    for (let power of list.querySelectorAll(".item-power")) {
        power.textContent = Math.floor(Math.random() * 10000);
    }

    const order = sortableList.toArray().map((item, index) => ({
        id: item,
        power: parseInt(list.querySelectorAll(".item-power")[index].textContent)
    })).sort((a, b) => b.power - a.power).map(item => item.id);

    sortableList.sort(order, true);

    for (let item of list.children) {
        item.classList.remove("item-1", "item-2", "item-3", "item-4");
        item.classList.add(`item-${Array.from(list.children).indexOf(item) + 1}`);
    }
};

function displayError() { };

function prepareFilters() {
    const filters = document.querySelector(".filters").children;
    filters[0].classList.add("bg-backgroundLighter");

    for (let button of filters) {
        button.onclick = function () {
            if (button.classList.contains("bg-backgroundLighter")) return;

            for (let button of filters) {
                button.classList.remove("bg-backgroundLighter");
            }

            button.classList.add("bg-backgroundLighter");
            button.parentElement.setAttribute("data-filter", button.classList[0]);

            drawItems();
        }
    }
};

function startCountdown() {
    const timer = document.querySelector(".timer");
    const minutesTarget = [8, 23, 38, 53];

    let currentTime = new Date().getMinutes();
    let nextMinute = minutesTarget.find(minute => minute > currentTime);

    if (nextMinute === undefined) {
        nextMinute = minutesTarget[0];
        currentTime -= 60;
    }

    let minutes = (nextMinute - currentTime);
    let seconds = 0;

    let countdown = setInterval(function () {
        console.log(new Date().getMinutes());
        if (minutes === 0 && seconds === 0 || minutes < 0) {
            clearInterval(countdown);
            console.log("Countdown finished");
            updateData();
            startCountdown();
        }
        else {
            minutes = nextMinute - new Date().getMinutes() - 1;
            seconds = 59 - new Date().getSeconds();
            timer.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        }
    }, 1000);
};

const button = document.querySelector(".button");

button.onclick = function () {
    orderItems();
}
