import { SSTConfig } from "sst";
import { redirectLambdas } from "./stacks/redirectLambda";

export default {
  config(_input) {
    return {
      name: "lambda-redirect",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(redirectLambdas);
  }
} satisfies SSTConfig;
