import AWS from "aws-sdk";
import { NotFoundError, ServerError } from "./error.mjs";
const ssm = new AWS.SSM({ region: "eu-west-1" });
const ssmService = {
  async getParameter(name) {
    const params = {
      Name: name,
      WithDecryption: true
    };
    try {
      console.log(`ssm get params`, params);
      const ssmResult = await ssm.getParameter(params).promise();
      return ssmResult.Parameter?.Value;
    } catch (e) {
      console.log("ssm get params error", e);
      throw new NotFoundError(e.message ?? e.code);
    }
  },
  async getSecureParameter(name) {
    const params = {
      Name: name,
      WithDecryption: true
    };
    try {
      console.log("ssm get params", params);
      const ssmResult = await ssm.getParameter(params).promise();
      return ssmResult.Parameter?.Value;
    } catch (e) {
      console.log("ssm get params error", e);
      throw new NotFoundError(e.message ?? e.code);
    }
  },
  async updateSSMParameter(params) {
    try {
      console.log("ssm update params", params);
      return await ssm.putParameter(params).promise();
    } catch (e) {
      console.log("ssm update params error", e);
      return new ServerError(e.message || e.code);
    }
  }
};
var ssm_default = ssmService;
export {
  ssm_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcGFja2FnZXMvZnVuY3Rpb25zL3NyYy9vcmlnaW4tbGFtYmRhL3NzbS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgU1NNIH0gZnJvbSAnYXdzLXNkayc7XG5cbmltcG9ydCB7IE5vdEZvdW5kRXJyb3IsIFNlcnZlckVycm9yIH0gZnJvbSAnLi9lcnJvcic7XG5cbmNvbnN0IHNzbSA9IG5ldyBTU00oKTtcblxuY29uc3Qgc3NtU2VydmljZSA9IHtcbiAgYXN5bmMgZ2V0UGFyYW1ldGVyKG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIE5hbWU6IG5hbWUsXG4gICAgICBXaXRoRGVjcnlwdGlvbjogdHJ1ZSxcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICBjb25zb2xlLmxvZyhgc3NtIGdldCBwYXJhbXNgLCBwYXJhbXMpO1xuICAgICAgY29uc3Qgc3NtUmVzdWx0ID0gYXdhaXQgc3NtLmdldFBhcmFtZXRlcihwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgIHJldHVybiBzc21SZXN1bHQuUGFyYW1ldGVyPy5WYWx1ZTtcbiAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzc20gZ2V0IHBhcmFtcyBlcnJvcicsIGUpO1xuICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXJyb3IoZS5tZXNzYWdlID8/IGUuY29kZSk7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRTZWN1cmVQYXJhbWV0ZXIobmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgTmFtZTogbmFtZSxcbiAgICAgIFdpdGhEZWNyeXB0aW9uOiB0cnVlLFxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKCdzc20gZ2V0IHBhcmFtcycsIHBhcmFtcyk7XG4gICAgICBjb25zdCBzc21SZXN1bHQgPSBhd2FpdCBzc20uZ2V0UGFyYW1ldGVyKHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgcmV0dXJuIHNzbVJlc3VsdC5QYXJhbWV0ZXI/LlZhbHVlO1xuICAgIH0gY2F0Y2ggKGU6YW55KSB7XG4gICAgICBjb25zb2xlLmxvZygnc3NtIGdldCBwYXJhbXMgZXJyb3InLCBlKTtcbiAgICAgIHRocm93IG5ldyBOb3RGb3VuZEVycm9yKGUubWVzc2FnZSA/PyBlLmNvZGUpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyB1cGRhdGVTU01QYXJhbWV0ZXIocGFyYW1zOiBBV1MuU1NNLlB1dFBhcmFtZXRlclJlcXVlc3QpIHtcbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coJ3NzbSB1cGRhdGUgcGFyYW1zJywgcGFyYW1zKTtcbiAgICAgIHJldHVybiBhd2FpdCBzc20ucHV0UGFyYW1ldGVyKHBhcmFtcykucHJvbWlzZSgpO1xuICAgIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgICAgY29uc29sZS5sb2coJ3NzbSB1cGRhdGUgcGFyYW1zIGVycm9yJywgZSk7XG4gICAgICByZXR1cm4gbmV3IFNlcnZlckVycm9yKGUubWVzc2FnZSB8fCBlLmNvZGUpO1xuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNzbVNlcnZpY2U7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFBQSxTQUFTLFdBQVc7QUFFcEIsU0FBUyxlQUFlLG1CQUFtQjtBQUUzQyxNQUFNLE1BQU0sSUFBSSxJQUFJO0FBRXBCLE1BQU0sYUFBYTtBQUFBLEVBQ2pCLE1BQU0sYUFBYSxNQUFjO0FBQy9CLFVBQU0sU0FBUztBQUFBLE1BQ2IsTUFBTTtBQUFBLE1BQ04sZ0JBQWdCO0FBQUEsSUFDbEI7QUFDQSxRQUFJO0FBQ0YsY0FBUSxJQUFJLGtCQUFrQixNQUFNO0FBQ3BDLFlBQU0sWUFBWSxNQUFNLElBQUksYUFBYSxNQUFNLEVBQUUsUUFBUTtBQUN6RCxhQUFPLFVBQVUsV0FBVztBQUFBLElBQzlCLFNBQVMsR0FBUTtBQUNmLGNBQVEsSUFBSSx3QkFBd0IsQ0FBQztBQUNyQyxZQUFNLElBQUksY0FBYyxFQUFFLFdBQVcsRUFBRSxJQUFJO0FBQUEsSUFDN0M7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNLG1CQUFtQixNQUFjO0FBQ3JDLFVBQU0sU0FBUztBQUFBLE1BQ2IsTUFBTTtBQUFBLE1BQ04sZ0JBQWdCO0FBQUEsSUFDbEI7QUFDQSxRQUFJO0FBQ0YsY0FBUSxJQUFJLGtCQUFrQixNQUFNO0FBQ3BDLFlBQU0sWUFBWSxNQUFNLElBQUksYUFBYSxNQUFNLEVBQUUsUUFBUTtBQUN6RCxhQUFPLFVBQVUsV0FBVztBQUFBLElBQzlCLFNBQVMsR0FBTztBQUNkLGNBQVEsSUFBSSx3QkFBd0IsQ0FBQztBQUNyQyxZQUFNLElBQUksY0FBYyxFQUFFLFdBQVcsRUFBRSxJQUFJO0FBQUEsSUFDN0M7QUFBQSxFQUNGO0FBQUEsRUFFQSxNQUFNLG1CQUFtQixRQUFxQztBQUM1RCxRQUFJO0FBQ0YsY0FBUSxJQUFJLHFCQUFxQixNQUFNO0FBQ3ZDLGFBQU8sTUFBTSxJQUFJLGFBQWEsTUFBTSxFQUFFLFFBQVE7QUFBQSxJQUNoRCxTQUFTLEdBQVE7QUFDZixjQUFRLElBQUksMkJBQTJCLENBQUM7QUFDeEMsYUFBTyxJQUFJLFlBQVksRUFBRSxXQUFXLEVBQUUsSUFBSTtBQUFBLElBQzVDO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxjQUFROyIsCiAgIm5hbWVzIjogW10KfQo=
