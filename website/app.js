// Personal API Key for OpenWeatherMap API
const apiKey = "0684b16c2b9432d20f395082bd977414";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const temp = document.getElementById('temp');
const date = document.getElementById('date');
const content = document.getElementById('content');

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generate);

/* Function called by event listener */
function generate() {
    const zipCode = document.getElementById('zip').value;
    getWeatherData(baseUrl, zipCode, apiKey).then((weatherData) => {
        postData('/data', {
            temperature: weatherData.main.temp,
            date: (new Date()).toString(),
            user_response: document.getElementById('feelings').value
        }).then(() => {
            updateUI();
        })
    });
}

/* Function to GET Web API Data*/
const getWeatherData = async (url, zipCode, apiKey) => {
    const res = await fetch(`${url}?zip=${zipCode}&appid=${apiKey}&units=metric`);
    try {
        const data = await res.json();
        const errorBox = document.getElementById('error');
        if (res.ok) {
            errorBox.textContent = "";
            return data;
        } else {
            errorBox.textContent = `Error: ${data.message}`;
            temp.textContent = "";
            date.textContent = "";
            content.textContent = "";
        }
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to POST data */

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */
const getProjectData = async () => {
    const res = await fetch('/all');
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

/* function to update UI */
const updateUI = async () => {

    const res = await fetch('/all');
    try {
        const data = await res.json();
        temp.innerHTML = `Temperature: ${data.temperature} °C`;
        date.innerHTML = `Date: ${data.date}`;
        content.innerHTML = `Feelings: ${data.user_response}`;
    } catch (error) {
        console.log("error", error);
    }
}