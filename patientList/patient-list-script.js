document.addEventListener('DOMContentLoaded', () => {
    fetchPatients();
});

async function fetchPatients() {
    try {
        const response = await fetch('https://mascots-test-api.onrender.com/api/all-patients');

        if (!response.ok) {
            throw new Error('Erro ao buscar pacientes: ' + response.statusText);
        }

        const patients = await response.json();
        const patientList = document.getElementById('patient-list');
        patientList.innerHTML = '';

        patients.forEach(patient => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${patient.pet_id}, Admissão: ${patient.admission}, Lesões:${patient.injuries}`;
            patientList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
        alert('Erro ao carregar a lista de pacientes. Tente novamente.');
    }
}

fetchPatients();