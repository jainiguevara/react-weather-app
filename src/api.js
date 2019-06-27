const APIID = '1d7c72874c4002fe6394e282d2266ab3';
// const url = 'http://api.openweathermap.org/data/2.5';

export default (uri, city) => {
  
  const headers = new Headers({
    'Content-Type': 'application/json',
  })

  return fetch(`${uri}?q=${city}&APPID=${APIID}`, {
    headers,
    credentials: 'same-origin',
  })
    .then(response => {
      return response.json()
    })
}