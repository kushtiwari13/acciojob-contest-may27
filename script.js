fetchDataWithThen();

fetchDataWithAsyncAwait();

document.getElementById('searchButton').addEventListener('click', filterData);

document.getElementById('sortMarketCapButton').addEventListener('click', sortDataByMarketCap);

document.getElementById('sortPercentageChangeButton').addEventListener('click', sortDataByPercentageChange);

function fetchDataWithThen() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.log(error));
}

async function fetchDataWithAsyncAwait() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.log(error);
  }
}

function renderTable(data) {
  const tableBody = document.querySelector('#cryptoTable tbody');
  tableBody.innerHTML = '';

  data.forEach(crypto => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${crypto.image}" alt="${crypto.name}"></td>
      <td>${crypto.name}</td>
      <td>${crypto.symbol}</td>
      <td>${crypto.current_price}</td>
      <td>${crypto.total_volume}</td>
    `;
    tableBody.appendChild(row);
  });
}

function filterData() {
  const searchInput = document.getElementById('searchInput');
  const filter = searchInput.value.toUpperCase();
  const tableBody = document.querySelector('#cryptoTable tbody');
  const rows = tableBody.getElementsByTagName('tr');

  for (let row of rows) {
    const nameCell = row.getElementsByTagName('td')[1];
    const name = nameCell.textContent || nameCell.innerText;

    if (name.toUpperCase().indexOf(filter) > -1) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  }
}

function sortDataByMarketCap() {
  const tableBody = document.querySelector('#cryptoTable tbody');
  const rows = Array.from(tableBody.getElementsByTagName('tr'));

  rows.sort((a, b) => {
    const priceA = parseFloat(a.getElementsByTagName('td')[3].textContent);
    const priceB = parseFloat(b.getElementsByTagName('td')[3].textContent);
    return priceA - priceB;
  });

  tableBody.innerHTML = '';
  rows.forEach(row => tableBody.appendChild(row));
}

function sortDataByPercentageChange() {
  const tableBody = document.querySelector('#cryptoTable tbody');
  const rows = Array.from(tableBody.getElementsByTagName('tr'));

  rows.sort((a, b) => {
    const changeA = parseFloat(a.getElementsByTagName('td')[4].textContent);
    const changeB = parseFloat(b.getElementsByTagName('td')[4].textContent);
    return changeA - changeB;
  });

  tableBody.innerHTML = '';
  rows.forEach(row => tableBody.appendChild(row));
}
