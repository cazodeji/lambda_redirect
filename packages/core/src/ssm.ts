import { SSM } from 'aws-sdk';

import { NotFoundError, ServerError } from '../../core/src/error';

const ssm = new SSM();

const ssmService = {
  async getParameter(name: string) {
    const params = {
      Name: name,
      WithDecryption: true,
    };
    try {
      console.log(`ssm get params`, params);
      const ssmResult = await ssm.getParameter(params).promise();
      return ssmResult.Parameter?.Value;
    } catch (e: any) {
      console.log('ssm get params error', e);
      throw new NotFoundError(e.message ?? e.code);
    }
  },
  async getSecureParameter(name: string) {
    const params = {
      Name: name,
      WithDecryption: true,
    };
    try {
      console.log('ssm get params', params);
      const ssmResult = await ssm.getParameter(params).promise();
      return ssmResult.Parameter?.Value;
    } catch (e:any) {
      console.log('ssm get params error', e);
      throw new NotFoundError(e.message ?? e.code);
    }
  },

  async updateSSMParameter(params: AWS.SSM.PutParameterRequest) {
    try {
      console.log('ssm update params', params);
      return await ssm.putParameter(params).promise();
    } catch (e: any) {
      console.log('ssm update params error', e);
      return new ServerError(e.message || e.code);
    }
  },
};

export default ssmService;
