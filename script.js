document.getElementById('vehicleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm()) {
        addOrUpdateDriver();
    }
});

let drivers = [];
let currentIndex = -1;

function validateForm() {
    const plate = document.getElementById('plate').value;
    const model = document.getElementById('model').value;
    const driverName = document.getElementById('driverName').value;
    const idNumber = document.getElementById('idNumber').value;
    const phone = document.getElementById('phone').value;

    // Validaciones
    const plateRegex = /^[A-Z]{3}\d{4}$/; // Placa: 3 letras + 4 números
    const idNumberRegex = /^\d{8}$/; // Cédula: 8 dígitos
    const phoneRegex = /^\d{10}$/; // Teléfono: 10 dígitos

    if (!plateRegex.test(plate)) {
        alert('Placa inválida. Formato esperado: ABC1234.');
        return false;
    }
    if (model.trim() === '') {
        alert('Modelo es obligatorio.');
        return false;
    }
    if (driverName.trim() === '') {
        alert('Nombre de Conductor es obligatorio.');
        return false;
    }
    if (!idNumberRegex.test(idNumber)) {
        alert('Cédula inválida. Debe contener 8 dígitos.');
        return false;
    }
    if (!phoneRegex.test(phone)) {
        alert('Teléfono inválido. Debe contener 10 dígitos.');
        return false;
    }
    
    return true;
}

function addOrUpdateDriver() {
    const plate = document.getElementById('plate').value;
    const model = document.getElementById('model').value;
    const driverName = document.getElementById('driverName').value;
    const vehicleType = document.getElementById('vehicleType').value;
    const entryDate = document.getElementById('entryDate').value;
    const exitDate = document.getElementById('exitDate').value;
    const entryTime = document.getElementById('entryTime').value;
    const exitTime = document.getElementById('exitTime').value;
    const idNumber = document.getElementById('idNumber').value;
    const phone = document.getElementById('phone').value;

    if (currentIndex === -1) {
        // Agregar nuevo conductor
        drivers.push({ plate, model, driverName, vehicleType, entryDate, exitDate, entryTime, exitTime, idNumber, phone });
    } else {
        // Actualizar conductor existente
        drivers[currentIndex] = { plate, model, driverName, vehicleType, entryDate, exitDate, entryTime, exitTime, idNumber, phone };
        currentIndex = -1; // Resetea el índice
    }

    document.getElementById('vehicleForm').reset();
    renderDrivers();
}

function renderDrivers() {
    const tbody = document.querySelector('#driverList tbody');
    tbody.innerHTML = '';

    drivers.forEach((driver, index) => {
        const row = document.createElement('tr');
        for (const key in driver) {
            const cell = document.createElement('td');
            cell.textContent = driver[key];
            row.appendChild(cell);
        }
        const actionsCell = document.createElement('td');
        actionsCell.innerHTML = `
            <button onclick="editDriver(${index})">Editar</button>
            <button onclick="deleteDriver(${index})">Eliminar</button>
        `;
        row.appendChild(actionsCell);
        tbody.appendChild(row);
    });
}

function editDriver(index) {
    const driver = drivers[index];
    document.getElementById('plate').value = driver.plate;
    document.getElementById('model').value = driver.model;
    document.getElementById('driverName').value = driver.driverName;
    document.getElementById('vehicleType').value = driver.vehicleType;
    document.getElementById('entryDate').value = driver.entryDate;
    document.getElementById('exitDate').value = driver.exitDate;
    document.getElementById('entryTime').value = driver.entryTime;
    document.getElementById('exitTime').value = driver.exitTime;
    document.getElementById('idNumber').value = driver.idNumber;
    document.getElementById('phone').value = driver.phone;
    currentIndex = index; // Guardar el índice actual
}

function deleteDriver(index) {
    drivers.splice(index, 1);
    renderDrivers();
}