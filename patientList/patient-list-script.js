document.addEventListener('DOMContentLoaded', () => {
    const patientList = document.getElementById('patients');
    patientList.innerHTML = '<li>Carregando...</li>';
    fetchAndDisplayPatients(patientList);
});

async function fetchAndDisplayPatients(patientList) {
    try {
        const response = await fetch('https://mascots-test-api.onrender.com/api/all-patients');
        if (!response.ok) {
            throw new Error('Erro ao buscar pacientes: ' + response.statusText);
        }
        const patients = await response.json();
        console.log(patients); // Verifique a estrutura de dados

        patientList.innerHTML = ''; 
        patients.forEach(patient => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>ID do Pet:</strong> ${patient.pet_id} <br>
                <strong>Admissão:</strong> ${new Date(patient.admission).toLocaleString('pt-BR')} <br>
                <strong>Lesões:</strong> ${patient.injuries ? patient.injuries : 'Nenhuma'} <br>
                <strong>Status na Chegada:</strong> ${convertStatus(patient.at_arrival_patient_status) || 'Não informado'} <br>
                <strong>Medicado com:</strong> ${patient.medicated_with ? patient.medicated_with : 'Nenhum'} <br>
                <strong>Contagioso:</strong> ${patient.contagious ? 'Sim' : 'Não'}
            `;
            patientList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
        alert('Erro ao carregar a lista de pacientes. Tente novamente.');
    }
}

function convertStatus(status) {
    switch (status) {
        case 'A': return 'Ativo';
        case 'E': return 'Estável';
        case 'G': return 'Grave';
        case 'P': return 'Perigoso';
        default: return 'Não informado';
    }
}
