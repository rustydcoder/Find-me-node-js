async function postLocation(url = '', location = {}) {
   const options = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(location)
   }
   const res = await fetch(url, options)
   const data = await res.json()
   console.log(data)
}

function geoFindMe() {

   const status = document.getElementById('status')
   const mapLink = document.getElementById('mapLink')
   const lat = document.getElementById('latitude')
   const lon = document.getElementById('longitude')


   mapLink.href = ''
   mapLink.textContent = ''

   const success = position => {
      const { coords: { latitude }, coords: { longitude }, timestamp } = position
      status.textContent = '';

      const data = { latitude, longitude, timestamp }
      postLocation('/api', data)

      lat.textContent = latitude.toFixed(2)
      lon.textContent = longitude.toFixed(2)

      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = 'View your location on Open Street Map';
   }

   const error = () => {
      status.textContent = 'Unable to retrieve your information.'
   }

   if ('geolocation' in navigator) {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
   } else {
      status.textContent = 'Geolocation is not supported by your browser';
   }
}
document.querySelector('#find-me').addEventListener('click', geoFindMe);