export function capitalizeFirstLetter(str: any) {
  let string = str;
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}