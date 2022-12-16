//two pf six ways of function declarations
//1-the traditional
module.exports.getDate = getDate;
function getDate() {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  const day = today.toLocaleDateString("en-US", options);
  return day;
}

//2-exports shortcut, anonymous function
exports.getDayOfWeek = function() {
  const today = new Date();
  const options = {
    weekday: "long"
  };
  const day = today.toLocaleDateString("en-US", options);
  return day;
}
console.log(module.exports);
