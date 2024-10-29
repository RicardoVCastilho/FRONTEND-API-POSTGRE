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
        const patientList = document.getElementById('patients');
        patientList.innerHTML = '';

        patients.forEach(patient => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <strong>ID:</strong> ${patient.pet_id} <br>
            <strong>Admissão:</strong> ${new Date(patient.admission).toLocaleString('pt-BR')} <br>
            <strong>Lesões:</strong> ${patient.injuries ? patient.injuries : 'Nenhuma'} <br>
            <strong>Contagioso:</strong> ${patient.contagious ? 'Sim' : 'Não'}
        `;
            patientList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
        alert('Erro ao carregar a lista de pacientes. Tente novamente.');
    }
}

fetchPatients();