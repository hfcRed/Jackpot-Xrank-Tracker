import OBSWebSocket from 'obs-websocket-js';

let obs;

const address = document.getElementById("obs-address");
const password = document.getElementById("obs-password");
const source = document.getElementById("obs-source");
const submit = document.getElementById("obs-submit");

submit.onclick = async function () {
    saveSettings();

    if (!address.value || !password.value || !source.value) return;

    try {
        obs = new OBSWebSocket();
        await obs.connect(address.value, password.value);
    }
    catch (error) {
        console.error(error);
        obs = null;
        return;
    }

    updateText();
}

export async function updateText() {
    if (!obs) return;

    const names = document.querySelectorAll(".splashtag-name");
    const powers = document.querySelectorAll(".item-power");
    const timer = document.querySelector(".timer");
    const mode = document.querySelector(".filters").getAttribute("data-filter") || "splat-zones";

    let text = mode.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    for (let index = 0; index < (names.length - 1); index++) {
        const line = `\n${powers[index].textContent}\n${names[index].textContent}`;
        text = text ? `${text}\n${line}` : line;
    }

    text = `${text}\n\n${parseInt(timer.textContent.split(":")[0]) + 1} minutes`;

    try {
        await obs.call("SetInputSettings", {
            inputName: source.value,
            inputSettings: { text: text }
        });
    }
    catch (error) {
        console.error(error);
        obs = null;
    }
}

function saveSettings() {
    localStorage.setItem("obs-data", JSON.stringify({
        address: address.value,
        password: password.value,
        source: source.value
    }));
}

export function loadSettings() {
    const data = JSON.parse(localStorage.getItem("obs-data"));
    if (!data) return;

    address.value = data.address;
    password.value = data.password;
    source.value = data.source;

    submit.click();
}

window.onbeforeunload = function () {
    if (obs) obs.disconnect();
}