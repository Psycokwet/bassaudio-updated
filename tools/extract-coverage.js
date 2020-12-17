const fs = require("fs");
const path = require("path");
const encoding = "ascii";
const callback = (error, data) => {
  if (error) {
    console.log("could not get coverage, error reading file");
    process.exit(1);
  }
  const line = data.match(/All files \|(.*)\|/g);
  const percentages = line[0].match(/\d+\.\d+|\d+\b|\d+(?=\w)/g);
  console.log(percentages[0]);
};
fs.readFile("report.txt", encoding, callback);
