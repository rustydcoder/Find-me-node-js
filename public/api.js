
async function data() {
   const fetchedData = await fetch("/api");
   const res = await fetchedData.json();
   return res;
}

async function render() {
   const info = await data();
   for (const each of info) {
      const { latitude, longitude, timestamp, mood } = each;
      const div = document.createElement("div");
      const h3 = document.createElement("h3");
      const location = document.createElement("p");
      const time = document.createElement("p");
      const date = new Date(timestamp);

      h3.textContent = "Mood: " + capitalize(mood);
      location.innerHTML = `Location: <a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">${latitude}°, ${longitude}°</a>`;
      time.textContent =
         "Time: " + date.toDateString() + " at " + date.toLocaleTimeString();

      div.classList.add("log");
      div.appendChild(h3);
      div.appendChild(location);
      div.appendChild(time);
      document.querySelector(".container").appendChild(div);
   }
}

function capitalize(str) {
   return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
         return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
}

window.onload = render;