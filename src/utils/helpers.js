/**
 * Capitalise every word of a string
 * @param {string} str
 */
 export function capitalizeWords(str) {
  return str.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
}

