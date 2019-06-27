const APIID = '1d7c72874c4002fe6394e282d2266ab3';

export default (uri, city) => {
  return fetch(`${uri}?q=${city}&APPID=${APIID}`)
    .then(response => {
      return response.json()
    })
    .catch(error => {
      throw new Error(error);
    })
}