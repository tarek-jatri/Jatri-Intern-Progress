// const hex_regex = /#?([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/g;
// const text = "+8801515288484 01842626668 01816-376607";
//const regex = /(\+88)?-?01[1-9]\d{2}-?\d{6}$/g;


const text = "Jan 1987. May 1969. Aug 2011";
const regex = /([JFMAMSOND][a-z]+ (\d+))/g;

const match = text.match(regex);
const index = text.search(regex);
const replaced = text.replace(regex, "bd phone");
const testing = regex.test(text);

console.log(match, index, replaced, testing);