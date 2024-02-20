const handler = async (event: any, context: any, callback: any) => {
const request = event?.Records[0]?.cf.request
const response = event.Records[0]?.cf.response 
console.log('request', request.querystring)
request.headers['x-forwarded-host'] = [
    { key: "X-Forwarded-Host", value: request.headers.host[0].value }
  ]
request.headers['x-forwarded-query'] = [
    { key: "X-Forwarded-query", value: request.querystring }
  ]
  callback(null, request)
}
export const main = handler