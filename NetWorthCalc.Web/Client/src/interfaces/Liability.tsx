export default interface Liability {
  liabilityId: string;
  createdOn: string;
  name: string;
  amount: number;
};

export function clone(liability: Liability | null): Liability | null {
  if (liability === null) {
    return null;
  }

  return {
    liabilityId: liability.liabilityId,
    createdOn: liability.createdOn,
    name: liability.name,
    amount: liability.amount,
  };
};
