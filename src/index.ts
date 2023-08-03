const data = [1];
data.map((stat) => {
  console.log(stat);
  return "bla";
});
console.log("bla");

data.map((stat) => {
  console.log(stat);
  return "bla";
}) || [];
console.log("bla");

(data || []).map((stat) => {
  console.log(stat);
  return "bla";
});
console.log("bla");
