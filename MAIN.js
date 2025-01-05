console.log("SCRIPT LOADED: MADE BY WSTKR");
const xpath =
  "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/label[1]/div/div[1]/input";
function changeVisualValue() {
  const element = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;

  if (element) {
    element.value = originalValue;
    const moneydollar = getElementByXPath(
      "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/label[1]/span/div[2]/div"
    );
    moneydollar.innerText = `$${(originalValue * 98032.82).toLocaleString()}`;
    element.addEventListener("input", (event) => {
      event.target.value = originalValue;
    });
    console.log(`Visual value set to: ${originalValue}`);
  } else {
    console.error("Element not found!");
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "v") {
    changeVisualValue();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "o") {
    originalValue = (parseFloat(originalValue) + 0.001).toFixed(8);
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

const profitXPath =
  "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/div[3]/label/div[2]/span/span";

const dynamicXPath =
  "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[2]/div/div/div/div[2]/span[1]/span";

const payoutdollarxpath =
  "/html/body/div[1]/div[2]/div[2]/div[4]/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/div[3]/label/div[2]/span/div/div/div";

var totalbtc = parseFloat(localStorage.getItem("totalbtc"));
if (isNaN(totalbtc)) {
  totalbtc = 0.25000001;
  localStorage.setItem("totalbtc", totalbtc);
}
console.log(`Loaded totalbtc value: ${totalbtc}`);
var originalValue = 0.01;
var lastprofit = 0;

function getElementByXPath(xpath) {
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

const parentElement = document.body;

parentElement.addEventListener("click", function (event) {
  const button = event.target.closest("button");
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
    const profitText = profitElement.innerText;
    const multiplierMatch = profitText.match(/(\d+(\.\d+)?)×/);
    const multiplier = multiplierMatch ? parseFloat(multiplierMatch[1]) : 1.0;

    return (originalValue * multiplier).toFixed(8);
  }
  return null;
}

function updateMultiplierInput() {
  const multiplierElement = getElementByXPath(multiplierXPath);
  const dollars = getElementByXPath(payoutdollarxpath);

  if (multiplierElement) {
    const profit = calculateProfit();
    lastprofit = profit;

    if (profit !== null && profit != multiplierElement.value) {
      multiplierElement.value = profit;
      dollars.innerText = `$${(profit * 98032.82).toLocaleString()}`;
      console.log(`Multiplier input updated to: ${profit}`);
    }
  }
}

function updateDynamicSpan() {
  const dynamicElement = getElementByXPath(dynamicXPath);

  if (dynamicElement) {
    const profit = calculateProfit();

    if (profit !== null) {
      dynamicElement.innerText = profit;
      console.log(`Dynamic span updated to: ${profit}`);
    }
  }
}

function updateBTC() {
  const one = getElementByXPath(btc1);
  one.innerText = totalbtc.toFixed(8);
  localStorage.setItem("totalbtc", totalbtc);
  console.log(`Total BTC updated and saved to localStorage: ${totalbtc}`);
}

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
    updateMultiplierInput();
    updateDynamicSpan();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  console.log("Observing DOM changes...");
}

function executeAfterDelay() {
  console.log("Waiting complete, now executing logic...");
  observeDOMChanges();
  updateBTC();
}

setTimeout(executeAfterDelay, 5000);
