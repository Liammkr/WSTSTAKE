// ==UserScript==
// @name         Stake
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Test Tampermonkey script execution
// @match        https://stake.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

console.log("SCRIPT LOADED: MADE BY WSTKR");
// Fetch the current value of Bitcoin in USD
async function getBitcoinValue() {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const bitcoinValue = data.bitcoin.usd; // Get the Bitcoin value in USD
    console.log("Current Bitcoin Value (USD):", bitcoinValue);
    return bitcoinValue;
  } catch (error) {
    console.error("Error fetching Bitcoin value:", error);
    return null;
  }
}
var bitcoinprice = 0;
async function main() {
  bitcoinprice = await getBitcoinValue();
  console.log("Stored Bitcoin Price:", bitcoinprice);
}

main();

var inputval = 0.0;
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
    moneydollar.innerText = `$${(
      originalValue * bitcoinprice
    ).toLocaleString()}`;
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
/*document.addEventListener("keydown", (event) => {
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
});*/

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
  "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[2]/div/div/div/span[2]/div/span[1]/span";

const payoutdollarxpath =
  "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/div[3]/label/div[2]/span/div/div/div";
// Original input value

const diceprofit =
  "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/div[2]/label/div[1]/div/input";
const dicedollar =
  "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/div[2]/label/div[2]/span/div/div/div";
const dicemulti =
  "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[2]/div/div[3]/label[1]/div/div/input";
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
var one;
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
    totalbtc -= inputval;
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
    return (inputval * multiplier).toFixed(8);
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
      dollars.innerText = `$${(profit * bitcoinprice).toLocaleString()}`;
      console.log(`Multiplier input updated to: ${profit}`);
    }
  }
}
function checkNewestSuccess(container) {
  // Select all button elements inside the container
  const buttons = Array.from(container.querySelectorAll("button"));

  // Find the button with the largest data-last-bet-index
  const latestButton = buttons.reduce((maxButton, currentButton) => {
    return parseInt(currentButton.dataset.lastBetIndex) >
      parseInt(maxButton.dataset.lastBetIndex)
      ? currentButton
      : maxButton;
  });

  // Check if the largest indexed button has the variant-success class
  return latestButton.classList.contains("variant-success");
}

function dicemoneypayout() {
  const multi = getElementByXPath(dicemulti);
  return multi.value * inputval;
}
function detectAndProcessSuccessVariants() {
  // Select all elements with the class "variant-success"
  const elements = document.querySelectorAll(".variant-success");

  elements.forEach((element) => {
    // Check if the element is a button and hasn't been processed
    if (element.tagName === "BUTTON" && element.dataset.processed !== "true") {
      // Mark the element as processed
      element.dataset.processed = "true";

      // Perform your desired action on the button
      console.log("Processing button:", element);
      totalbtc += dicemoneypayout();
      updateBTC();

      // Example: Add a new class or manipulate the button
      element.classList.add("processed");
    }
  });
}

function updateMultiplierInputDice() {
  const payouts = getElementByXPath(
    "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[2]/div/div[1]"
  );

  const multiplierElement = getElementByXPath(diceprofit);
  const dollars = getElementByXPath(dicedollar);
  const multi = getElementByXPath(dicemulti);

  if (multiplierElement) {
    var dicepayout = dicemoneypayout();
    console.log(multi.value);
    if (dicepayout !== null && dicepayout != multiplierElement.value) {
      multiplierElement.value = dicepayout; // Update the input field
      dollars.innerText = `$${(dicepayout * bitcoinprice).toLocaleString()}`;
      console.log(`Multiplier input updated to: ${dicepayout}`);
    }
  }
}

// Function to find the target node by XPath
function findNodeByXPath(xpath) {
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

// Use a Set to track processed buttons
const processedButtons = new Set();

// Function to process new buttons
function processNewButton(button) {
  const displayDiv = button.querySelector(".contents");
  if (displayDiv) {
    const displayText = displayDiv.textContent.trim();
    console.log("New button detected with display number:", displayText);
    const number = displayText.replace(/[^\d.]/g, "");
    totalbtc += number * inputval;
    updateBTC();
  }
}

// Function to monitor the target container for new buttons
function monitorContainer(container) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE && node.matches("button")) {
            const buttonId = node.getAttribute("data-past-bet-id");
            if (!processedButtons.has(buttonId)) {
              processedButtons.add(buttonId);
              processNewButton(node);
            }
          }
        });
      }
    });
  });

  // Observe the container for changes
  observer.observe(container, { childList: true, subtree: true });
  console.log("Monitoring container for new buttons...");
}

// Function to wait for the target node to appear
function waitForNodeByXPath(xpath) {
  const interval = setInterval(() => {
    const targetNode = findNodeByXPath(xpath);
    if (targetNode) {
      clearInterval(interval);
      console.log("Target node found!");
      monitorContainer(targetNode);
    }
  }, 500); // Check every 500ms
}

// Define the XPath of the target container

// Start waiting for the node
waitForNodeByXPath(
  "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[2]/div/div[1]"
);
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
  one.innerText = totalbtc.toFixed(8);
  // Always store updated totalbtc in localStorage
  localStorage.setItem("totalbtc", totalbtc);
  console.log(`Total BTC updated and saved to localStorage: ${totalbtc}`);
}

// Observe changes in the DOM to detect when elements appear
const btcsmall = getElementByXPath(btc2);
var running = false;

(function () {
  // Full XPath of the input box
  const xpath =
    "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/label[1]/div/div[1]/input";

  // Variable to monitor the state of the input box
  let running = false;

  // Function to find an element by XPath
  function getElementByXPath(xpath) {
    return document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  }

  // Function to inject functionality when the input box appears
  function injectInputFunctionality(inputElement) {
    if (inputElement) {
      console.log("Input box detected and initializing functionality.");

      // Store the original (backend) value
      let backendValue = inputElement.value;

      // Variable to hold the display value
      let displayValue = backendValue;

      // Function to handle input changes (numbers, periods, backspaces)
      function detectKeyInput(event) {
        const inputChar = event.key;

        // Check if the input character is a number, decimal point, or backspace
        if (
          (inputChar >= "0" && inputChar <= "9") ||
          inputChar === "." ||
          inputChar === "Backspace"
        ) {
          if (inputChar === "Backspace") {
            displayValue = displayValue.slice(0, -1);
          } else {
            displayValue += inputChar;
          }

          // Prevent setting invalid value directly to the input
          if (
            displayValue === "" ||
            displayValue === "0." ||
            !isNaN(displayValue)
          ) {
            // Temporarily show display value as placeholder (for invalid cases like "0.")
            inputElement.setAttribute("data-display-value", displayValue);
            inputElement.placeholder = displayValue; // Visible to user
            inputElement.value = isNaN(displayValue)
              ? backendValue
              : displayValue; // Preserve backend
          }

          // Prevent the backend value from changing
          event.preventDefault();

          // Log the display value
          console.log("Display Value Changed:", displayValue);
          const moneydollar = getElementByXPath(
            "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/label[1]/span/div[2]/div"
          );
          moneydollar.innerText = `$${(
            displayValue * bitcoinprice
          ).toLocaleString()}`;
          inputval = displayValue;
        }
      }

      // Add event listeners to handle input changes
      inputElement.addEventListener("keydown", detectKeyInput);

      // Add event listener to reset placeholder when focused
      inputElement.addEventListener("focus", () => {
        const displayPlaceholder =
          inputElement.getAttribute("data-display-value") || backendValue;
        inputElement.placeholder = displayPlaceholder;
        console.log(
          "Input Focused. Display Placeholder Initialized:",
          displayPlaceholder
        );
      });

      // Mark the functionality as running
      running = true;
    }
  }

  // Function to clean up when the input box disappears
  function cleanupInputFunctionality() {
    if (running) {
      console.warn("Input box disappeared. Cleaning up functionality.");
      running = false;
    }
  }

  // Mutation Observer to monitor changes in the DOM
  const observer = new MutationObserver(() => {
    const inputElement = getElementByXPath(xpath);

    if (inputElement) {
      if (!running) {
        injectInputFunctionality(inputElement);
      }
    } else if (running) {
      cleanupInputFunctionality();
    }
  });

  // Start observing the document's body for changes
  observer.observe(document.body, { childList: true, subtree: true });

  console.log(
    "Mutation observer set up to detect input box appearance and disappearance."
  );
})();

function observeDOMChanges() {
  const observer = new MutationObserver(() => {
    one = getElementByXPath(btc1);
    if (one && one.innerText != totalbtc.toFixed(8)) {
      updateBTC();
    }
    const testing = getElementByXPath(
      "/html/body/div[5]/div/div/div[2]/div/div[2]/button[1]/div/span[1]"
    );
    if (testing) {
      const innerSpan = testing.querySelector("span");
      if (innerSpan && innerSpan.innerText != totalbtc.toFixed(8)) {
        console.log("Found Small");
        innerSpan.innerText = totalbtc.toFixed(8);
      } else {
        console.log(testing.innerText, totalbtc.toFixed(8));
      }
    }
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
    const depositwarn = getElementByXPath(
      "/html/body/div[1]/div[2]/div[2]/div[3]/div[2]"
    );
    if (depositwarn) {
      depositwarn.remove();
    }
    updateMultiplierInput();
    updateDynamicSpan();
    updateMultiplierInputDice();
    detectAndProcessSuccessVariants();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  console.log("Observing DOM changes...");
}

observeDOMChanges();
