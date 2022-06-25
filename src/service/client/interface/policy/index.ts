export * from './add';
export * from './list';

export type MutationPoliciesResponse = {
  effected?: true;
  effected_rules?: string[][];
};
