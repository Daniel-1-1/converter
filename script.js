// API ключ и эндпоинт
const apiKey = '515e7dab87de922db36abdae'; // Ваш API-ключ
const baseEndpoint = 'https://v6.exchangerate-api.com/v6'; // Основной эндпоинт

const fromCurrencyEl = document.getElementById('from-currency');
const toCurrencyEl = document.getElementById('to-currency');
const amountEl = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const switchBtn = document.getElementById('switch-btn');
const resultEl = document.getElementById('result');

// Предзагруженные валюты (20 популярных)
const currencies = {
    RUB: 'Рубль',
    USD: 'Доллар',
    EUR: 'Евро',
    GBP: 'Фунт стерлингов',
    CNY: 'Юань',
    JPY: 'Йена',
    CAD: 'Канадский доллар',
    AUD: 'Австралийский доллар',
    CHF: 'Швейцарский франк',
    NZD: 'Новозеландский доллар',
    SEK: 'Шведская крона',
    NOK: 'Норвежская крона',
    DKK: 'Датская крона',
    SGD: 'Сингапурский доллар',
    HKD: 'Гонконгский доллар',
    KRW: 'Южнокорейская вона',
    INR: 'Индийская рупия',
    ZAR: 'Южноафриканский ранд',
    MXN: 'Мексиканское песо',
    BRL: 'Бразильский реал'
};

// Функция для заполнения списков валют
function populateCurrencySelectors() {
    for (const [code, name] of Object.entries(currencies)) {
        fromCurrencyEl.innerHTML += `<option value="${code}">${code} - ${name}</option>`;
        toCurrencyEl.innerHTML += `<option value="${code}">${code} - ${name}</option>`;
    }
}

// Функция для смены мест валют
function switchCurrencies() {
    const tempCurrency = fromCurrencyEl.value;
    fromCurrencyEl.value = toCurrencyEl.value;
    toCurrencyEl.value = tempCurrency;
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
        const url = `${baseEndpoint}/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.result !== 'success') {
            throw new Error('Ошибка при получении данных от API.');
        }

        const convertedAmount = data.conversion_result.toFixed(2);
        resultEl.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        resultEl.textContent = 'Ошибка: ' + error.message;
        console.error('Ошибка при конвертации валют:', error);
    }
}

// Заполняем списки валют при загрузке страницы
populateCurrencySelectors();

// Обработчики кнопок
switchBtn.addEventListener('click', switchCurrencies);
convertBtn.addEventListener('click', convertCurrency);
