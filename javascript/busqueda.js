document.addEventListener('DOMContentLoaded', function() {
    // Botón Registrarse
    const btnRegistro = document.querySelector('.registro');
    
    if (btnRegistro) {
        btnRegistro.addEventListener('click', function() {
            window.location.href = '../pages/registro.html';
        });
    }
    
    //  Botón de iniciar sesión
    const btnLogin = document.querySelector('.login');
    
    if (btnLogin) {
        btnLogin.addEventListener('click', function() {
            window.location.href = 'pages/login.html';
        });
    }
});