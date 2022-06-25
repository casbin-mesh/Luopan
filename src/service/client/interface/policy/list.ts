export interface ListPoliciesArguments {
  ns: string;
  skip?: number;
  limit?: number;
  cursor?: string;
  reverse?: boolean;
}
