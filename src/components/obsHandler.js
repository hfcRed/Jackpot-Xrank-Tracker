import OBSWebSocket from 'obs-websocket-js';

let obs;

const address = document.getElementById("obs-address");
const password = document.getElementById("obs-password");
const source = document.getElementById("obs-source");
const submit = document.getElementById("obs-submit");

submit.onclick = async function () {
    saveSettings();

    if (!address.value || !password.value || !source.value) return;
    if (obs) obs.disconnect();

    try {
        obs = new OBSWebSocket();
        await obs.connect(address.value, password.value);
    }
    catch (error) {
        console.error(error);
        return;
    }

    const names = document.querySelectorAll(".splashtag-name");
    const powers = document.querySelectorAll(".item-power");
    let text;

    for (let index = 0; index < (names.length - 1); index++) {
        const line = `${powers[index].textContent}\n${names[index].textContent}\n`;
        text = text ? `${text}\n${line}` : line;
    }

    text = `${text}\njackpot.ink`

    await obs.call("SetInputSettings", {
        inputName: source.value,
        inputSettings: { text: text, color: 15790320, outline: true, outline_size: 5, outline_color: 0, font: { face: "Calibri", size: 50 } }
    })
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