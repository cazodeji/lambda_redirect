import { StackContext, Api, EventBus } from "sst/constructs";
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Duration } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

export function redirectLambdas({ stack }: StackContext) {
  const { stage } = stack

  const viewerLambda = new cloudfront.experimental.EdgeFunction(stack, `${stage}-viewer-lambda`, {
    runtime: lambda.Runtime.NODEJS_18_X,
    functionName: `${stage}-viewer-lambda`,
    handler: 'handler.main',
    code: lambda.Code.fromAsset('viewer-lambda'),
    stackId: `${stage}-viewer-lambda`,
    timeout: Duration.seconds(5),
  });

  const originLambd = new cloudfront.experimental.EdgeFunction(stack, `${stage}-rigin-lambda`, {
    runtime: lambda.Runtime.NODEJS_18_X,
    functionName: `${stage}-rigin-lambda`,
    handler: 'handler.main',
    code: lambda.Code.fromAsset('origin-lambda'),
    stackId: `${stage}-rigin-lambda`,
    timeout: Duration.seconds(30),
  });

  originLambd.addToRolePolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['*'],
      resources: ['*'],
    }),
  );
  console.log('viewerLambda', viewerLambda.version)

  const policy = new cloudfront.CachePolicy(stack, `${stage}-Cookies-CachePolicy`, {
    comment: 'Forward cookies to origin',
    cookieBehavior: cloudfront.CacheCookieBehavior.all(),
    headerBehavior: cloudfront.CacheHeaderBehavior.allowList('x-forwarded-host', 'x-forwarded-query'),
  });

  stack.addOutputs({
    viewerVersion: viewerLambda.functionArn,
    originLambd: originLambd.functionArn
  })
}
