const CURRENT_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});
export const formatCurrency = (number: number) => {
  return CURRENT_FORMATTER.format(number);
};
