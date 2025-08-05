document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prediction-form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            age: parseFloat(document.getElementById('age').value),
            sex: parseFloat(document.getElementById('sex').value),
            cp: parseFloat(document.getElementById('cp').value),
            trestbps: parseFloat(document.getElementById('trestbps').value),
            chol: parseFloat(document.getElementById('chol').value),
            fbs: parseFloat(document.getElementById('fbs').value),
            restecg: parseFloat(document.getElementById('restecg').value),
            thalach: parseFloat(document.getElementById('thalach').value),
            exang: parseFloat(document.getElementById('exang').value),
            oldpeak: parseFloat(document.getElementById('oldpeak').value),
            slope: parseFloat(document.getElementById('slope').value),
            ca: parseFloat(document.getElementById('ca').value),
            thal: parseFloat(document.getElementById('thal').value)
        };

        try {
            // sending the form data to your Flask backend's /predict endpoint
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // got prediction from backend
            const data = await response.json();

            // result display
            if (data.prediction === 1) {
                resultDiv.innerHTML = '<h2>Result: <span class="high-risk">High Risk</span> of Heart Disease</h2>';
            } else {
                resultDiv.innerHTML = '<h2>Result: <span class="low-risk">Low Risk</span> of Heart Disease</h2>';
            }

        } catch (error) {
            // If there's an error (e.g., the backend is not running), display an error message
            console.error('Error:', error);
            resultDiv.innerHTML = '<h2>Error: Could not get a prediction. Please ensure the backend server is running.</h2>';
        }
    });
});

let head = document.querySelector(".logo");

head.addEventListener("click", function(){
    window.location.href = "index.html";
})