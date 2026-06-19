export function validateN(n, charactersAvailable) {
  try {
    if (!Number.isInteger(n) && value > 0) {
      throw new Error("Please provide a positive integer for query n. ");
    } else if (n > charactersAvailable) {
      throw new Error(
        "Please select fewer than all characters available in this map.",
      );
    } else return n;
  } catch (error) {
    return error;
  }
}
