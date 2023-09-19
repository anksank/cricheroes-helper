const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');

// Specify the path to the input file
const filePath = 'urls.csv';

// Create a readable stream to read the file line by line
const readStream = fs.createReadStream(filePath);

// Create a readline interface
const rl = readline.createInterface({
  input: readStream,
  output: process.stdout, // You can change this to another stream if needed
});
var catchCount = 0;
// Event handler for each line read
rl.on('line', (line) => {
  catchCount += runScript(line);
});

console.log("catch count: " + catchCount);

async function runScript(url) {
  // Launch a headless browser
  const browser = await puppeteer.launch();

  // Open multiple pages
  const page1 = await browser.newPage();
//  const page2 = await browser.newPage();

  // Navigate to web pages
  await page1.goto(url);
//  await page2.goto('https://example.com/page2');


  // Execute JavaScript code on each page and get the result
  const result1 = await page1.evaluate(() => {
    var elements = document.getElementsByClassName("outtype-bowler");
	var counter = 0;
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i].getInnerHTML().trimStart().trimEnd();
		if (element.startsWith("c") && element.includes("adbhut")) {
			counter++;
		}
	}
    return counter;
  });

//  const result2 = await page2.evaluate(() => {
//    // Your JavaScript code here on page2
//    return document.title;
//  });

  // Close the browser
  await browser.close();

  // Print the results
  console.log('Result on page 1:', result1);
  return result1;
//  console.log('Result on page 2:', result2);
}

//runScript();
