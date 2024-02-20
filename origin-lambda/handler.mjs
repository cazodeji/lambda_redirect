import ssmService from "./ssm.mjs";
const handler = async (event, context, callback) => {
  const request = event?.Records[0]?.cf.request;
  const responsePayload = event?.Records[0]?.cf.response;
  console.log("request", request.headers);
  console.log("response", responsePayload);
  let crmDomain, productBuilderCrmEmail, productBuilderCrmPassword;
  try {
    crmDomain = await ssmService.getParameter("/seg-product-builder/pdf/seg-crm-base-domain");
    productBuilderCrmEmail = await ssmService.getParameter("/seg-product-builder/pdf/seg-crm-pb-email");
    productBuilderCrmPassword = await ssmService.getParameter("/seg-product-builder/pdf/seg-crm-pb-password");
  } catch (error) {
    console.log("error getting branding", error);
  }
  console.log("head", request.headers["x-forwarded-host"]);
  const domainUrl = request.headers["x-forwarded-host"][0].value;
  const querystring = request.headers["x-forwarded-query"][0].value;
  const uuid = querystring.split("&")[0].split("=")[1];
  console.log("uuid", uuid);
  const login = await fetch(`${crmDomain}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "email": productBuilderCrmEmail,
      "password": productBuilderCrmPassword,
      "company_uuid": uuid
    })
  });
  let data;
  try {
    data = await login.json();
  } catch (error) {
    console.log("error logging into crm", error);
  }
  console.log("loginData", data);
  const brokerToken = data.token;
  const brokerDetailsResponse = await fetch(`${crmDomain}/company/tenant-parent`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${brokerToken}`
    }
  });
  let brokerDetails;
  try {
    brokerDetails = await brokerDetailsResponse.json();
  } catch (error) {
    console.log("error getting branding");
  }
  const slug = brokerDetails.slug;
  console.log("brokerDetails", brokerDetails.slug);
  let url = "https://example.com/";
  url = `https://${slug}.kaz-test.product.segdevelopment.com`;
  const response = {
    status: "302",
    statusDescription: "Found",
    headers: {
      location: [{
        key: "Location",
        value: url
      }]
    }
  };
  callback(null, response);
};
const main = handler;
export {
  main
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcGFja2FnZXMvZnVuY3Rpb25zL3NyYy9vcmlnaW4tbGFtYmRhL2hhbmRsZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBzc21TZXJ2aWNlIGZyb20gXCIuL3NzbVwiXG5jb25zdCBoYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnksIGNvbnRleHQ6IGFueSwgY2FsbGJhY2s6IGFueSkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBldmVudD8uUmVjb3Jkc1swXT8uY2YucmVxdWVzdDtcbiAgICBjb25zdCByZXNwb25zZVBheWxvYWQgPSBldmVudD8uUmVjb3Jkc1swXT8uY2YucmVzcG9uc2U7XG4gICAgY29uc29sZS5sb2coJ3JlcXVlc3QnLCByZXF1ZXN0LmhlYWRlcnMpXG4gICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzcG9uc2VQYXlsb2FkKVxuICBcbiAgbGV0IGNybURvbWFpbjogYW55LCBwcm9kdWN0QnVpbGRlckNybUVtYWlsOiBhbnksIHByb2R1Y3RCdWlsZGVyQ3JtUGFzc3dvcmQ6IGFueTtcbiAgdHJ5IHtcbiAgICBjcm1Eb21haW4gPSBhd2FpdCBzc21TZXJ2aWNlLmdldFBhcmFtZXRlcignc2VnLXByb2R1Y3QtYnVpbGRlci9wZGYvc2VnLWNybS1iYXNlLWRvbWFpbicpXG4gICAgcHJvZHVjdEJ1aWxkZXJDcm1FbWFpbCA9IGF3YWl0IHNzbVNlcnZpY2UuZ2V0UGFyYW1ldGVyKCdzZWctcHJvZHVjdC1idWlsZGVyL3BkZi9zZWctY3JtLXBiLWVtYWlsJylcbiAgICBwcm9kdWN0QnVpbGRlckNybVBhc3N3b3JkID0gYXdhaXQgc3NtU2VydmljZS5nZXRQYXJhbWV0ZXIoJ3NlZy1wcm9kdWN0LWJ1aWxkZXIvcGRmL3NlZy1jcm0tcGItcGFzc3dvcmQnKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgZ2V0dGluZyBicmFuZGluZ1wiLCBlcnJvcik7XG4gIH1cblxuICBjb25zb2xlLmxvZygnaGVhZCcsIHJlcXVlc3QuaGVhZGVyc1sneC1mb3J3YXJkZWQtaG9zdCddKVxuICBjb25zdCBkb21haW5VcmwgPSByZXF1ZXN0LmhlYWRlcnNbJ3gtZm9yd2FyZGVkLWhvc3QnXVswXS52YWx1ZVxuICBjb25zdCBxdWVyeXN0cmluZyA9IHJlcXVlc3QuaGVhZGVyc1sneC1mb3J3YXJkZWQtcXVlcnknXVswXS52YWx1ZVxuXG5cbiAgY29uc3QgdXVpZCA9IHF1ZXJ5c3RyaW5nLnNwbGl0KCcmJylbMF0uc3BsaXQoJz0nKVsxXVxuICBjb25zb2xlLmxvZygndXVpZCcsIHV1aWQpXG5cbiAgY29uc3QgbG9naW4gPSBhd2FpdCBmZXRjaChgJHtjcm1Eb21haW59L2xvZ2luYCwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBcImVtYWlsXCI6IHByb2R1Y3RCdWlsZGVyQ3JtRW1haWwsXG4gICAgICBcInBhc3N3b3JkXCI6IHByb2R1Y3RCdWlsZGVyQ3JtUGFzc3dvcmQsXG4gICAgICBcImNvbXBhbnlfdXVpZFwiOiB1dWlkXG4gICAgfSlcbiAgfSk7XG5cbiAgbGV0IGRhdGE6IGFueVxuICB0cnkge1xuICAgIGRhdGEgPSAgYXdhaXQgbG9naW4uanNvbigpXG4gIH0gY2F0Y2ggKGVycm9yKXtcbiAgICBjb25zb2xlLmxvZygnZXJyb3IgbG9nZ2luZyBpbnRvIGNybScsIGVycm9yKVxuICB9XG4gIGNvbnNvbGUubG9nKCdsb2dpbkRhdGEnLCBkYXRhIClcblxuICBjb25zdCBicm9rZXJUb2tlbiA9IGRhdGEudG9rZW47XG5cbiAgY29uc3QgYnJva2VyRGV0YWlsc1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7Y3JtRG9tYWlufS9jb21wYW55L3RlbmFudC1wYXJlbnRgLCB7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHticm9rZXJUb2tlbn1gXG4gICAgfVxuICB9KTtcblxuICBsZXQgYnJva2VyRGV0YWlsczphbnkgXG4gIHRyeSB7XG4gIGJyb2tlckRldGFpbHMgPSBhd2FpdCBicm9rZXJEZXRhaWxzUmVzcG9uc2UuanNvbigpXG4gIH0gY2F0Y2goZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZygnZXJyb3IgZ2V0dGluZyBicmFuZGluZycpXG4gIH1cblxuICBjb25zdCBzbHVnID0gYnJva2VyRGV0YWlscy5zbHVnXG5cbiAgY29uc29sZS5sb2coJ2Jyb2tlckRldGFpbHMnLCBicm9rZXJEZXRhaWxzLnNsdWcpXG4gIFxuICBsZXQgdXJsID0gJ2h0dHBzOi8vZXhhbXBsZS5jb20vJztcbiAgdXJsID0gYGh0dHBzOi8vJHtzbHVnfS5rYXotdGVzdC5wcm9kdWN0LnNlZ2RldmVsb3BtZW50LmNvbWBcbiAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiAnMzAyJyxcbiAgICBzdGF0dXNEZXNjcmlwdGlvbjogJ0ZvdW5kJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIGxvY2F0aW9uOiBbe1xuICAgICAgICAgICAga2V5OiAnTG9jYXRpb24nLFxuICAgICAgICAgICAgdmFsdWU6IHVybCxcbiAgICAgICAgfV0sXG4gICAgfSxcbn07XG5cbmNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKVxufVxuZXhwb3J0IGNvbnN0IG1haW4gPSBoYW5kbGVyIl0sCiAgIm1hcHBpbmdzIjogIkFBQUEsT0FBTyxnQkFBZ0I7QUFDdkIsTUFBTSxVQUFVLE9BQU8sT0FBWSxTQUFjLGFBQWtCO0FBQy9ELFFBQU0sVUFBVSxPQUFPLFFBQVEsQ0FBQyxHQUFHLEdBQUc7QUFDdEMsUUFBTSxrQkFBa0IsT0FBTyxRQUFRLENBQUMsR0FBRyxHQUFHO0FBQzlDLFVBQVEsSUFBSSxXQUFXLFFBQVEsT0FBTztBQUN0QyxVQUFRLElBQUksWUFBWSxlQUFlO0FBRXpDLE1BQUksV0FBZ0Isd0JBQTZCO0FBQ2pELE1BQUk7QUFDRixnQkFBWSxNQUFNLFdBQVcsYUFBYSw2Q0FBNkM7QUFDdkYsNkJBQXlCLE1BQU0sV0FBVyxhQUFhLDBDQUEwQztBQUNqRyxnQ0FBNEIsTUFBTSxXQUFXLGFBQWEsNkNBQTZDO0FBQUEsRUFDekcsU0FBUyxPQUFPO0FBQ2QsWUFBUSxJQUFJLDBCQUEwQixLQUFLO0FBQUEsRUFDN0M7QUFFQSxVQUFRLElBQUksUUFBUSxRQUFRLFFBQVEsa0JBQWtCLENBQUM7QUFDdkQsUUFBTSxZQUFZLFFBQVEsUUFBUSxrQkFBa0IsRUFBRSxDQUFDLEVBQUU7QUFDekQsUUFBTSxjQUFjLFFBQVEsUUFBUSxtQkFBbUIsRUFBRSxDQUFDLEVBQUU7QUFHNUQsUUFBTSxPQUFPLFlBQVksTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbkQsVUFBUSxJQUFJLFFBQVEsSUFBSTtBQUV4QixRQUFNLFFBQVEsTUFBTSxNQUFNLEdBQUcsU0FBUyxVQUFVO0FBQUEsSUFDOUMsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsSUFDbEI7QUFBQSxJQUNBLE1BQU0sS0FBSyxVQUFVO0FBQUEsTUFDbkIsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osZ0JBQWdCO0FBQUEsSUFDbEIsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELE1BQUk7QUFDSixNQUFJO0FBQ0YsV0FBUSxNQUFNLE1BQU0sS0FBSztBQUFBLEVBQzNCLFNBQVMsT0FBTTtBQUNiLFlBQVEsSUFBSSwwQkFBMEIsS0FBSztBQUFBLEVBQzdDO0FBQ0EsVUFBUSxJQUFJLGFBQWEsSUFBSztBQUU5QixRQUFNLGNBQWMsS0FBSztBQUV6QixRQUFNLHdCQUF3QixNQUFNLE1BQU0sR0FBRyxTQUFTLDBCQUEwQjtBQUFBLElBQzlFLFFBQVE7QUFBQSxJQUNSLFNBQVM7QUFBQSxNQUNQLGdCQUFnQjtBQUFBLE1BQ2hCLGlCQUFpQixVQUFVLFdBQVc7QUFBQSxJQUN4QztBQUFBLEVBQ0YsQ0FBQztBQUVELE1BQUk7QUFDSixNQUFJO0FBQ0osb0JBQWdCLE1BQU0sc0JBQXNCLEtBQUs7QUFBQSxFQUNqRCxTQUFRLE9BQU87QUFDYixZQUFRLElBQUksd0JBQXdCO0FBQUEsRUFDdEM7QUFFQSxRQUFNLE9BQU8sY0FBYztBQUUzQixVQUFRLElBQUksaUJBQWlCLGNBQWMsSUFBSTtBQUUvQyxNQUFJLE1BQU07QUFDVixRQUFNLFdBQVcsSUFBSTtBQUNyQixRQUFNLFdBQVc7QUFBQSxJQUNmLFFBQVE7QUFBQSxJQUNSLG1CQUFtQjtBQUFBLElBQ25CLFNBQVM7QUFBQSxNQUNMLFVBQVUsQ0FBQztBQUFBLFFBQ1AsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLE1BQ1gsQ0FBQztBQUFBLElBQ0w7QUFBQSxFQUNKO0FBRUEsV0FBUyxNQUFNLFFBQVE7QUFDdkI7QUFDTyxNQUFNLE9BQU87IiwKICAibmFtZXMiOiBbXQp9Cg==
