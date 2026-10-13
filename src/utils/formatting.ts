// a little english-centric utility
// to join members of an array with commas and "or"
export const joinWithOr = <T = string>(
  arr: T[],
  getPath?: (item: T) => unknown,
) => {
  const needsComma = arr.length > 2;
  let data = arr.map((item: T, i: number) => {
    const result = `\`` + (getPath ? getPath(item) : item) + `\``;
    if (i === arr.length - 1) return "or " + result;
    return result;
  });
  if (needsComma) {
    return data.join(", ");
  }
  return data.join(" ");
};
