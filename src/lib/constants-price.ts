export const PRICES = {
  SHARED: 300,
  SOLO: 1125,
  OFFICE: 500
};

// Display a whole-euro amount with thousands separators, e.g. 1125 -> "1,125".
export const formatPrice = (amount: number) => amount.toLocaleString('en-US');
