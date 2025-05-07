const path = require("path");
const sass = require("sass");
const fs = require("fs");

const inputPath = path.resolve(__dirname, "styles/data-table.scss");
const outputDir = path.resolve(__dirname, "dist");
const outputPath = path.join(outputDir, "styles.css");

const result = sass.compile(inputPath, {
  style: "compressed",
});

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, result.css);

console.log("✅ Стили собраны в dist/styles.css");
