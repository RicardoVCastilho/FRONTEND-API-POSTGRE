async function submitForm(event) {
    event.preventDefault();

    const admissionInput = document.getElementById('admission').value;
    const admissionDate = new Date(admissionInput).toISOString();
    const injuries = document.getElementById('injuries').value;
    const petId = document.getElementById('pet_id').value;
    const arrivalStatus = document.getElementById('at_arrival_patient_status').value;
    const medicated = document.getElementById('medicated_at_arrival').checked;
    const contagious = document.getElementById('contagious').checked;
    const medicatedWith = document.getElementById('medicated_with').value;

    // Validação do status
    if (!arrivalStatus) {
        alert('Por favor, selecione o status do paciente na chegada.');
        return; // Interrompe o envio se o status não for selecionado
    }

    const patientData = {
        admission: admissionDate,
        injuries: injuries,
        pet_id: petId,
        at_arrival_patient_status: arrivalStatus,
        medicated_at_arrival: medicated,
        medicated_with: medicatedWith,
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
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Paciente cadastrado:', data);
        alert('Paciente cadastrado com sucesso!');

        document.getElementById('patient-form').reset();
    } catch (error) {
        console.error('Erro ao cadastrar o paciente:', error);
        alert('Erro ao cadastrar paciente. Por favor, tente novamente.');
    }
}

document.getElementById('patient-form').addEventListener('submit', submitForm);
