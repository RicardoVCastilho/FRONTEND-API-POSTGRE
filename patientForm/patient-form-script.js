async function submitForm(event) {
    event.preventDefault();

    const admission = document.getElementById('admission').value;
    const injuries = document.getElementById('injuries').value;
    const petId = document.getElementById('pet_id').value;
    const arrivalStatus = document.getElementById('at_arrival_patient_status').value;
    const medicated = document.getElementById('medicated_at_arrival').value;
    const contagious = document.getElementById('contagious').checked;

    const patientData = {
        admission: admission,
        injuries: injuries,
        pet_id: petId,
        at_arrival_patient_status: arrivalStatus,
        medicated_at_arrival: medicated,
        contagious: contagious
    };

    try {
        const response = await fetch('https://mascots-test-api.onrender.com/api/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientData),
        });

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText)
        }

        const data = await response.json();
        console.log('Paciente cadasstrado:', data);
        alert('Paciente cadastrado com sucesso!');

        document.getElementById('patient-form').reset();
    } catch (error) {
        console.error('Erro ao cadastrar o paciente:', error);
        alert('Erro ao cadastrar paciente. Por favor, tente novamente.');
    };
}

document.getElementById('patient-form').addEventListener('submit', submitForm);