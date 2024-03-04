import { Sortable } from 'sortablejs/modular/sortable.core.esm.js';

let spinner;
let data;
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

    spinner.classList.add("hidden");
    spinner.classList.remove("flex");

    list.classList.remove("hidden");
    list.classList.add("flex");
});

async function updateData() {
    data = await getRankData();
    startCountdown();

    if (!data) { displayError(); return; };

    await drawItems();
    orderItems();
};

async function getRankData() {
    try {
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), 60000)
        );
        const dataPromise = fetch("https://splat.top/jackpot");

        const response = await Promise.race([timeoutPromise, dataPromise]);
        if (!response.ok) throw new Error("No data received");

        const data = await response.json();
        if (!data) throw new Error("No data received");

        return Object.entries(data);
    }
    catch (error) {
        console.error(error);
        return null;
    }
};

async function drawItems() {
    const version = "700";
    const urls = [
        `https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/${version}/WeaponInfoMain.json`,
        `https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/${version}/NamePlateBgInfo.json`,
        `https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/${version}/BadgeInfo.json`,
    ];
    const [weaponData, bannerData, badgeData] = await Promise.all(urls.map(url => fetch(url).then(response => response.json())));
    const mode = document.querySelector(".filters").getAttribute("data-filter") || "splat-zones";
    const modeData = data.find(data => data[0].split(" ").join("-").toLowerCase() == mode)[1];
    const playerIDs = modeData.map(player => player.id);

    for (let player of modeData) {
        const { id, name, name_id, byname, x_power, weapon_id, background_image, background_text_color: textColor, badges } = player;

        const weaponID = atob(weapon_id).toString().split("-")[1];
        const bannerID = atob(background_image).toString().split("-")[1];
        const badgeIDs = badges.map(badge => atob(badge).toString().split("-")[1]);

        const weapon = weaponData.find(weapon => weapon.Id == weaponID);
        const weaponLink = weapon ? `https://raw.githubusercontent.com/Leanny/splat3/main/images/weapon_flat/Path_Wst_${weapon.__RowId}.webp` : null;

        const banner = bannerData.find(banner => banner.Id == bannerID);
        const bannerLink = banner ? `https://raw.githubusercontent.com/Leanny/splat3/main/images/npl/${banner.__RowId}.webp` : null;

        const badgeLinks = badgeIDs.map(badgeID => {
            if (badgeID == undefined) return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

            const badge = badgeData.find(data => data.Id == badgeID);
            return badge ? `https://raw.githubusercontent.com/Leanny/splat3/main/images/badge/Badge_${badge.Name}.webp` : null;
        });

        const newPlayer = document.getElementById(id) ? false : true;

        let item;
        if (newPlayer) {
            item = document.querySelector(".item-template").cloneNode(true);
            item.classList.remove("item-template", "hidden");
            item.classList.add("grid", `item-${Array.from(list.children).length + 1}`);
            item.id = id;
        }
        else {
            item = document.getElementById(id);
        }

        item.querySelector(".item-power").textContent = x_power;
        item.querySelector(".item-image").src = weaponLink;

        const splashtag = item.querySelector(".splashtag");
        splashtag.style.color = `rgb(${textColor.r * 255}, ${textColor.g * 255}, ${textColor.b * 255})`;

        splashtag.querySelector(".splashtag-banner").setAttribute("href", bannerLink);
        splashtag.querySelector(".splashtag-title").textContent = byname;
        splashtag.querySelector(".splashtag-name").textContent = name;
        splashtag.querySelector(".splashtag-id").textContent = `#${name_id}`;

        badgeLinks.forEach((badge, index) => {
            splashtag.querySelector(`.splashtag-badge${index + 1}`).setAttribute("href", badge);
        });

        if (newPlayer) list.appendChild(item);
    }

    for (let player of list.children) {
        if (!playerIDs.includes(player.id)) {
            list.removeChild(player);
        }
    }
};

function orderItems() {
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
        button.onclick = async function () {
            if (button.classList.contains("bg-backgroundLighter")) return;

            for (let button of filters) {
                button.classList.remove("bg-backgroundLighter");
            }

            button.classList.add("bg-backgroundLighter");
            button.parentElement.setAttribute("data-filter", button.classList[0]);

            await drawItems();
            orderItems();
        }
    }
};

function startCountdown() {
    const timer = document.querySelector(".timer");
    const minutesTarget = [10, 25, 40, 55];
    const nextMinute = minutesTarget.find(minute => minute > new Date().getMinutes()) || minutesTarget[0];

    let minutes;
    let seconds;

    let countdown = setInterval(function () {
        const currentMinute = new Date().getMinutes();
        const currentSecond = new Date().getSeconds();

        if (minutes === 0 && seconds === 0) {
            clearInterval(countdown);
            updateData();
            return;
        };

        minutes = currentMinute <= nextMinute ? nextMinute - currentMinute - 1 : 59 - currentMinute + nextMinute;
        seconds = 59 - currentSecond;
        timer.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (minutes < 0 || minutes > 20) {
            clearInterval(countdown);
            updateData();
            return;
        };
    }, 1000);
};
