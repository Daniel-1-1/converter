const apiKey = '7OO1pRuCnjIfFRGt5HJl3N4biqJhO5dT'; // Вставьте ваш ключ сюда
const symbolsEndpoint = 'https://api.apilayer.com/exchangerates_data/symbols';
const convertEndpoint = 'https://api.apilayer.com/exchangerates_data/convert';

const fromCurrencyEl = document.getElementById('from-currency');
const toCurrencyEl = document.getElementById('to-currency');
const amountEl = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const resultEl = document.getElementById('result');

// Функция для загрузки списка валют
async function loadCurrencies() {
    try {
        const response = await fetch(symbolsEndpoint, {
            headers: { apikey: apiKey }
        });
        const data = await response.json();
        if (!data.success) throw new Error('Не удалось загрузить валюты.');

        const currencies = data.symbols;
        for (const [code, name] of Object.entries(currencies)) {
            fromCurrencyEl.innerHTML += `<option value="${code}">${code} - ${name}</option>`;
            toCurrencyEl.innerHTML += `<option value="${code}">${code} - ${name}</option>`;
        }
    } catch (error) {
        console.error('Ошибка при загрузке валют:', error);
    }
}

// Функция для конвертации валют
async function convertCurrency() {
    const fromCurrency = fromCurrencyEl.value;
    const toCurrency = toCurrencyEl.value;
    const amount = parseFloat(amountEl.value);

    if (!amount || amount <= 0) {
        resultEl.textContent = 'Введите корректную сумму.';
        return;
    }

    try {
        const response = await fetch(`${convertEndpoint}?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`, {
            headers: { apikey: apiKey }
        });
        const data = await response.json();

        if (!data.success) throw new Error('Ошибка при конвертации валют.');

        const convertedAmount = data.result.toFixed(2);
        resultEl.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        resultEl.textContent = 'Ошибка: ' + error.message;
        console.error('Ошибка при конвертации валют:', error);
    }
}

// Загрузка валют при загрузке страницы
loadCurrencies();

// Обработчик кнопки конвертации
convertBtn.addEventListener('click', convertCurrency);
