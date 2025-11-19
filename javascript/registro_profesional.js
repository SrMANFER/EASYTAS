// Obtener elementos del formulario
const formRegistro = document.getElementById('formRegistro');
const password = document.getElementById('password');
const confirmarPassword = document.getElementById('confirmar_password');
const mensajeError = document.getElementById('mensajeError');
const mensajeExito = document.getElementById('mensajeExito');

// Función para mostrar mensajes de error
function mostrarError(mensaje) {
    mensajeError.textContent = mensaje;
    mensajeError.style.display = 'block';
    mensajeExito.style.display = 'none';
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        mensajeError.style.display = 'none';
    }, 5000);
}

// Función para mostrar mensajes de éxito
function mostrarExito(mensaje) {
    mensajeExito.textContent = mensaje;
    mensajeExito.style.display = 'block';
    mensajeError.style.display = 'none';
}

// Validar contraseñas en tiempo real
confirmarPassword.addEventListener('input', function() {
    if (password.value !== '' && confirmarPassword.value !== '') {
        if (password.value !== confirmarPassword.value) {
            confirmarPassword.style.borderColor = '#e74c3c';
            confirmarPassword.style.backgroundColor = '#ffe6e6';
        } else {
            confirmarPassword.style.borderColor = '#27ae60';
            confirmarPassword.style.backgroundColor = '#e6f9e6';
        }
    }
});

password.addEventListener('input', function() {
    if (confirmarPassword.value !== '') {
        if (password.value !== confirmarPassword.value) {
            confirmarPassword.style.borderColor = '#e74c3c';
            confirmarPassword.style.backgroundColor = '#ffe6e6';
        } else {
            confirmarPassword.style.borderColor = '#27ae60';
            confirmarPassword.style.backgroundColor = '#e6f9e6';
        }
    }
});

// Validar formulario antes de enviar
formRegistro.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Limpiar estilos previos
    password.style.borderColor = '';
    password.style.backgroundColor = '';
    confirmarPassword.style.borderColor = '';
    confirmarPassword.style.backgroundColor = '';
    
    // Obtener valores
    const nombre = document.getElementById('nombre').value.trim();
    const especialidad = document.getElementById('especialidad').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const fechaNacimiento = document.getElementById('fecha_nacimiento').value;
    const pass = password.value;
    const confirmPass = confirmarPassword.value;
    
    // Validar nombre
    if (nombre.length < 3) {
        mostrarError('El nombre debe tener al menos 3 caracteres');
        document.getElementById('nombre').focus();
        return false;
    }

    // Validar especialidad
    if (especialidad.length < 3) {
        mostrarError('La especialidad debe tener al menos 3 caracteres');
        document.getElementById('especialidad').focus();
        return false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarError('Por favor ingresa un correo electrónico válido');
        document.getElementById('email').focus();
        return false;
    }
    
    // Validar teléfono
    if (telefono.length < 10) {
        mostrarError('Por favor ingresa un teléfono válido');
        document.getElementById('telefono').focus();
        return false;
    }
    
    // Validar edad (mayor de 18)
    if (fechaNacimiento) {
        const hoy = new Date();
        const fechaNac = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }
        
        if (edad < 18) {
            mostrarError('Debes ser mayor de 18 años para registrarte');
            document.getElementById('fecha_nacimiento').focus();
            return false;
        }
    } else {
        mostrarError('Por favor ingresa tu fecha de nacimiento');
        document.getElementById('fecha_nacimiento').focus();
        return false;
    }
    
    // Validar longitud de contraseña
    if (pass.length < 6) {
        mostrarError('La contraseña debe tener al menos 6 caracteres');
        password.style.borderColor = '#e74c3c';
        password.focus();
        return false;
    }
    
    // Validar que las contraseñas coincidan
    if (pass !== confirmPass) {
        mostrarError('Las contraseñas no coinciden');
        password.style.borderColor = '#e74c3c';
        confirmarPassword.style.borderColor = '#e74c3c';
        confirmarPassword.style.backgroundColor = '#ffe6e6';
        confirmarPassword.focus();
        return false;
    }
    
    // Si todo está bien, enviar formulario
    formRegistro.submit();
});

// Detectar mensajes de error de la URL
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const registro = urlParams.get('registro');
    
    if (error) {
        switch(error) {
            case 'datos_invalidos':
                mostrarError('Por favor verifica los datos ingresados');
                break;
            case 'contraseñas_no_coinciden':
                mostrarError(' Las contraseñas no coinciden. Por favor verifica e intenta nuevamente');
                break;
            case 'edad_minima':
                mostrarError('Debes ser mayor de 18 años para registrarte');
                break;
            case 'email_existente':
                mostrarError('Este correo electrónico ya está registrado');
                break;
            case 'servidor':
                mostrarError('Error en el servidor. Intenta nuevamente');
                break;
            default:
                mostrarError('Ha ocurrido un error. Intenta nuevamente');
        }
    }
    
    if (registro === 'exitoso') {
        mostrarExito('¡Registro exitoso! Redirigiendo...');
        setTimeout(() => {
            window.location.href = 'http://localhost/EASYTAS/';
        }, 2000);
    }
});