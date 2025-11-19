// Obtener elementos del formulario
const formulario  = document.getElementById('formContacto');
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

selectTipo.addEventListener('change', function() {
            if (this.value) {
                console.log('Tipo seleccionado:', this.value);
            }
        });

// Validar formulario antes de enviar
formRegistro.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const tipoConsulta = selectTipo.value;
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!tipoConsulta) {
                mostrarError('Por favor selecciona un tipo de consulta');
                selectTipo.focus();
                return;
            }
    
    // Validar nombre
    if (nombre.length < 3) {
        mostrarError('El nombre debe tener al menos 3 caracteres');
        document.getElementById('nombre').focus();
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
    
      if (mensaje.length < 10) {
                mostrarError('El mensaje debe tener al menos 10 caracteres');
                return;
            }
    
    
    // Si todo está bien, enviar formulario
    formRegistro.submit();


// Si todo es válido
            console.log('Formulario válido:', {
                nombre,
                email,
                telefono,
                tipoConsulta,
                mensaje
            });

            alert(`✅ Formulario válido!\n\nTipo: ${tipoConsulta}\nNombre: ${nombre}\nEmail: ${email}`);
        });

        function mostrarError(mensaje) {
            mensajeError.textContent = mensaje;
            mensajeError.style.display = 'block';

            setTimeout(() => {
                mensajeError.style.display = 'none';
            }, 4000);
        }