document.addEventListener('DOMContentLoaded', function () {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function mostrarError(input, mensaje) {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = mensaje;
        input.classList.add('error');
    }

    function limpiarError(input) {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = '';
        input.classList.remove('error');
    }

    function validar() {
        let valido = true;
        
        if (nombre.value.trim().length < 2) {
            mostrarError(nombre, 'El nombre debe tener al menos 2 caracteres');
            valido = false;
        } else { limpiarError(nombre); }


        if (!emailRegex.test(email.value.trim())) {
            mostrarError(email, 'Correo inválido');
            valido = false;
        } else { limpiarError(email); }

        if (password.value.length < 6) {
            mostrarError(password, 'Mínimo 6 caracteres');
            valido = false;
        } else { limpiarError(password); }

        if (confirmPassword.value !== password.value) {
            mostrarError(confirmPassword, 'Las contraseñas no coinciden');
            valido = false;
        } else { limpiarError(confirmPassword); }

        return valido;
    }

    $(document).ready(function() {
        $('#registroForm').on('submit', function (e) {
            e.preventDefault();
            if (validar()) {
                $('#submitBtn').html('<span class="spinner-border spinner-border-sm"></span> Creando cuenta...');
                $('#submitBtn').prop('disabled', true);
                
                setTimeout(() => {
                    $('#registroForm').fadeOut(400, function() {
                        $('#successMessage').fadeIn();
                    });
                    setTimeout(() => window.location.href = 'login.html', 2000);
                }, 1500);
            } else {
                $('#registroForm').effect('shake', { times: 2, distance: 5 }, 300);
            }
        });

        $('.form-control').on('focus', function () {
            $(this).parent().addClass('focused');
        }).on('blur', function () {
            $(this).parent().removeClass('focused');
        });
    });
});