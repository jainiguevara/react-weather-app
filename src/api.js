const APIID = '1d7c72874c4002fe6394e282d2266ab3';
const url = 'http://api.openweathermap.org/data/2.5';

export default (uri, city) => {
  return fetch(`${url}/${uri}?q=${city}&APPID=${APIID}`)
    .then(response => {
      return response.json()
    })
    .catch(error => {
      throw new Error(error);
    })
}