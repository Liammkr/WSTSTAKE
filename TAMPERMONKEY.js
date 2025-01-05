// ==UserScript==
// @name         Test Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Test Tampermonkey script execution
// @match        https://stake.com/casino/games/mines*
// @grant        none
// @run-at       document-end
// ==/UserScript==

console.log("SCRIPT LOADED: MADE BY WSTKR");
// XPath for the multiplier input field
// XPath for the multiplier input field
const xpath =
  "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/label[1]/div/div[1]/input";

// The visual value you want to display

// Function to change the visual value of the input element
function changeVisualValue() {
  // Locate the element using the XPath
  const element = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;

  // Check if the element exists
  if (element) {
    // Change the visual value by setting the `value` attribute
    element.value = originalValue;
    const moneydollar = getElementByXPath(
      "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/label[1]/span/div[2]/div"
    );
    moneydollar.innerText = `$${(originalValue * 98032.82).toLocaleString()}`;
    // Add an event listener to prevent updates to the actual value
    element.addEventListener("input", (event) => {
      event.target.value = originalValue; // Maintain the visual value
    });

    console.log(`Visual value set to: ${originalValue}`);
  } else {
    console.error("Element not found!");
  }
}

// Trigger the function when the "v" key is pressed
document.addEventListener("keydown", (event) => {
  if (event.key === "v") {
    changeVisualValue();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "o") {
    originalValue = (parseFloat(originalValue) + 0.001).toFixed(8); // Ensure it's a number before operation
    changeVisualValue();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "p") {
    originalValue = (originalValue - 0.001).toFixed(8);
    changeVisualValue();
  }
});

const btc1 =
  "/html/body/div[1]/div[2]/div[2]/div[3]/div/div/div/div[2]/div/div/div/button/div/div/span[1]/span";
const btc2 =
  "/html/body/div[5]/div/div/div[2]/div/div[2]/button[1]/div/span[1]/span";

const multiplierXPath =
  "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/div[3]/label/div[1]/div/input";

// XPath for the "Total profit (1.00x)" element
const profitXPath =
  "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/div[3]/label/div[2]/span/span";

// XPath for the new dynamic span element
const dynamicXPath =
  "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[2]/div/div/div/div[2]/span[1]/span";

const payoutdollarxpath =
  "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/div[3]/label/div[2]/span/div/div/div";
// Original input value

var totalbtc = parseFloat(localStorage.getItem("totalbtc"));
if (isNaN(totalbtc)) {
  totalbtc = 0.25000001; // Set default value if localStorage is empty or invalid
  localStorage.setItem("totalbtc", totalbtc); // Store it in localStorage
}
console.log(`Loaded totalbtc value: ${totalbtc}`);
var originalValue = 0.01;
var lastprofit = 0;
// Function to locate elements by XPath
function getElementByXPath(xpath) {
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

// Function to calculate and return the profit value
// Select a parent element that exists when the page loads
const parentElement = document.body; // Or another parent element that is guaranteed to be in the DOM

// Add a click event listener to the parent element
parentElement.addEventListener("click", function (event) {
  // Check if the clicked element matches the button XPath
  const button = event.target.closest("button"); // Adjust selector as needed
  if (
    button &&
    document.evaluate(
      "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/button",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue === button
  ) {
    console.log("Button clicked!");
    totalbtc -= originalValue;
    updateBTC();
  }
});

function calculateProfit() {
  const profitElement = getElementByXPath(profitXPath);

  if (profitElement) {
    // Extract the multiplier value from the profit element's text
    const profitText = profitElement.innerText;
    const multiplierMatch = profitText.match(/(\d+(\.\d+)?)×/); // Regex to extract the numeric multiplier
    const multiplier = multiplierMatch ? parseFloat(multiplierMatch[1]) : 1.0; // Default to 1.0 if not found

    // Calculate and return the profit value
    return (originalValue * multiplier).toFixed(8);
  }
  return null;
}

// Function to update the multiplier input field
function updateMultiplierInput() {
  const multiplierElement = getElementByXPath(multiplierXPath);
  const dollars = getElementByXPath(payoutdollarxpath);

  if (multiplierElement) {
    const profit = calculateProfit();
    lastprofit = profit;

    if (profit !== null && profit != multiplierElement.value) {
      multiplierElement.value = profit; // Update the input field
      dollars.innerText = `$${(profit * 98032.82).toLocaleString()}`;
      console.log(`Multiplier input updated to: ${profit}`);
    }
  }
}

// Function to update the dynamic span element
function updateDynamicSpan() {
  const dynamicElement = getElementByXPath(dynamicXPath);

  if (dynamicElement) {
    const profit = calculateProfit();

    if (profit !== null) {
      dynamicElement.innerText = profit; // Update the dynamic span element
      console.log(`Dynamic span updated to: ${profit}`);
    }
  }
}

function updateBTC() {
  const one = getElementByXPath(btc1);
  one.innerText = totalbtc.toFixed(8);
  // Always store updated totalbtc in localStorage
  localStorage.setItem("totalbtc", totalbtc);
  console.log(`Total BTC updated and saved to localStorage: ${totalbtc}`);
}

// Observe changes in the DOM to detect when elements appear
function observeDOMChanges() {
  const observer = new MutationObserver(() => {
    const test = getElementByXPath(dynamicXPath);
    if (test) {
      console.log("found");
      if (test.innerText != lastprofit) {
        console.log(test.innerText);
        test.innerText = lastprofit;
        totalbtc += parseFloat(lastprofit);
        updateBTC();
      }
    }
    updateMultiplierInput(); // Check and update the multiplier input
    updateDynamicSpan(); // Check and update the dynamic span
  });

  // Start observing the entire document
  observer.observe(document.body, {
    childList: true, // Watch for added/removed child nodes
    subtree: true, // Watch all levels of the DOM tree
  });

  console.log("Observing DOM changes...");
}

function executeAfterDelay() {
  console.log("Waiting complete, now executing logic...");

  // Your existing logic can go here
  observeDOMChanges();
  updateBTC();
}

// Wait for 5 seconds after page load
setTimeout(executeAfterDelay, 3000); // 5000 milliseconds = 5 seconds
