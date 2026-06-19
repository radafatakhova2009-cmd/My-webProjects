document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('c-form');
    const inputa = document.getElementById('amount');
    const fromcurselect = document.getElementById('from-currency');
    const tocurselect = document.getElementById('to-currency');
    const displayresult = document.getElementById('result');
    const periodSelect = document.getElementById('period');
    const showChartBtn = document.getElementById('show-chart');


    const webapi = 'https://v6.exchangerate-api.com/v6/cdad2c6e5e80525bead26f22/latest/USD';

    fetch(webapi)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);

            currencies.forEach((currency) => {
                const option = document.createElement('option');
                option.value = currency;
                option.textContent = currency;

                fromcurselect.appendChild(option);
                tocurselect.appendChild(option.cloneNode(true));
            });
        });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const amount = inputa.value;
        const fromcur = fromcurselect.value;
        const tocur = tocurselect.value;

        fetch(`https://v6.exchangerate-api.com/v6/cdad2c6e5e80525bead26f22/latest/${fromcur}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.conversion_rates[tocur];
                const result = (amount * rate).toFixed(2);

                displayresult.textContent =
                    `${amount} ${fromcur} = ${result} ${tocur}`;
            });
    });
    showChartBtn.addEventListener('click', () => {

        const fromcur = fromcurselect.value;
        const tocur = tocurselect.value;
        const period = periodSelect.value;

        const endDate = new Date();
        const startDate = new Date();

        startDate.setDate(endDate.getDate() - period);

        const start = startDate.toISOString().split('T')[0];
        const end = endDate.toISOString().split('T')[0];

        fetch(`https://fxapi.app/api/history/${fromcur}/${tocur}.json?from=${start}&to=${end}`)
            .then(response => response.json())
            .then(data => {

                console.log(data);

                const labels = data.rates.map(item => item.date);

                const values = data.rates.map(item => item.rate);

                drawChart(labels, values);
            })
            .catch(error => {
                console.log(error);
                alert("Не удалось загрузить курс");
            });
    });
})
function drawChart(labels, values){

    const ctx = document.getElementById('currencyChart');

    if(window.myChart){
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx,{
        type:'line',
        data:{
            labels: labels,
            datasets:[{
                label:'Курс валют',
                data: values
            }]
        }
    });
}