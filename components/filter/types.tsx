export type FilterProps<R> = {
  request: R;
  updateRequest: (request: R) => void;
};
