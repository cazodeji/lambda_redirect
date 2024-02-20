import ssmService from "./ssm"
const handler = async (event: any, context: any, callback: any) => {
    const request = event?.Records[0]?.cf.request;
    const responsePayload = event?.Records[0]?.cf.response;
    console.log('request', request.headers)
    console.log('response', responsePayload)
  
  let crmDomain: any, productBuilderCrmEmail: any, productBuilderCrmPassword: any;
  try {
    crmDomain = await ssmService.getParameter('/seg-product-builder/pdf/seg-crm-base-domain')
    productBuilderCrmEmail = await ssmService.getParameter('/seg-product-builder/pdf/seg-crm-pb-email')
    productBuilderCrmPassword = await ssmService.getParameter('/seg-product-builder/pdf/seg-crm-pb-password')
  } catch (error) {
    console.log("error getting branding", error);
  }

  console.log('head', request.headers['x-forwarded-host'])
  const domainUrl = request.headers['x-forwarded-host'][0].value
  const querystring = request.headers['x-forwarded-query'][0].value


  const uuid = querystring.split('&')[0].split('=')[1]
  console.log('uuid', uuid)

  const login = await fetch(`${crmDomain}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": productBuilderCrmEmail,
      "password": productBuilderCrmPassword,
      "company_uuid": uuid
    })
  });

  let data: any
  try {
    data =  await login.json()
  } catch (error){
    console.log('error logging into crm', error)
  }
  console.log('loginData', data )

  const brokerToken = data.token;

  const brokerDetailsResponse = await fetch(`${crmDomain}/company/tenant-parent`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${brokerToken}`
    }
  });

  let brokerDetails:any 
  try {
  brokerDetails = await brokerDetailsResponse.json()
  } catch(error) {
    console.log('error getting branding')
  }

  const slug = brokerDetails.slug

  console.log('brokerDetails', brokerDetails.slug)
  
  let url = 'https://example.com/';
  url = `https://${slug}.kaz-test.product.segdevelopment.com`
  const response = {
    status: '302',
    statusDescription: 'Found',
    headers: {
        location: [{
            key: 'Location',
            value: url,
        }],
    },
};

callback(null, response)
}
export const main = handler