const APIID = '757c20fd90eb5d13e84d0ef74263ee71';

export default (uri, city) => {
  return fetch(`${uri}?q=${city}&APPID=${APIID}`)
    .then(response => {
      return response.json()
    })
}