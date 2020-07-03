// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Escondendo
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';

    //Mostrando
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//Calculando
function calculateResults(){
    document.getElementById('loading').style.display = 'none';
     //UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
        document.getElementById('results').style.display = 'block';
        
    }else{
        showError('Confira seus números');
    }
}

// Show Error
function showError(error){
    // criar a div
    const errorDiv = document.createElement('div');
    // pegar elementos
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // adicionar a classe de alert do bootstrap
    errorDiv.className = 'alert alert-danger';
    //criar textNode e append na div
    errorDiv.appendChild(document.createTextNode(error));
    //inserir div antes do primeiro h1
    card.insertBefore(errorDiv, heading);

    //limpar erro depois de 3 segundos.
    setTimeout(clearError, 3000);
};

function clearError(){
    document.querySelector('.alert').remove();
}

