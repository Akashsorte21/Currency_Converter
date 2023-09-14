const fetchExchangeRates = async () => {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return {};
  }
};

const populateCurrencyDropdowns = (rates) => {
  const fromCurrencySelect = document.getElementById("from");
  const toCurrencySelect = document.getElementById("to");

  for (const currency in rates) {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromCurrencySelect.appendChild(option);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.text = currency;
    toCurrencySelect.appendChild(option2);
  }
};

const convertCurrency = () => {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("from").value;
  const toCurrency = document.getElementById("to").value;
  const resultElement = document.getElementById("result");

  if (!amount || isNaN(amount)) {
    resultElement.textContent = "Please enter a valid amount.";
    return;
  }

  fetchExchangeRates()
    .then((rates) => {
      const exchangeRate = rates[toCurrency] / rates[fromCurrency];
      const result = (amount * exchangeRate).toFixed(2);
      resultElement.textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
    })
    .catch((error) => {
      console.error(error);
      resultElement.textContent = "Error fetching exchange rates.";
    });
};

document.addEventListener("DOMContentLoaded", () => {
  fetchExchangeRates()
    .then(populateCurrencyDropdowns)
    .catch((error) => {
      console.error(error);
    });

  const convertButton = document.getElementById("convert");
  convertButton.addEventListener("click", convertCurrency);
});
