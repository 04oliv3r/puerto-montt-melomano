document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');
    const forgotPasswordLink = document.getElementById('forgotPassword');

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validCredentials = {
        email: "artista@newendungun.cl",
        password: "Musica2025"
    };

    function mostrarError(elemento, mensaje) {
        elemento.textContent = mensaje;
        elemento.previousElementSibling.classList.add('error');
    }

    function limpiarError(elemento) {
        elemento.textContent = '';
        elemento.previousElementSibling.classList.remove('error');
    }

    function validarEmail() {
        if (email.value.trim() === '') {
            mostrarError(errorEmail, 'El correo electrónico es obligatorio');
            return false;
        } else if (!emailRegex.test(email.value.trim())) {
            mostrarError(errorEmail, 'Ingrese un correo electrónico válido');
            return false;
        } else {
            limpiarError(errorEmail);
            return true;
        }
    }

    function validarPassword() {
        if (password.value.trim() === '') {
            mostrarError(errorPassword, 'La contraseña es obligatoria');
            return false;
        } else if (password.value.trim().length < 6) {
            mostrarError(errorPassword, 'La contraseña debe tener al menos 6 caracteres');
            return false;
        } else {
            limpiarError(errorPassword);
            return true;
        }
    }

    function validarCredenciales() {
        return email.value.trim() === validCredentials.email && 
               password.value.trim() === validCredentials.password;
    }

    function validarFormulario() {
        const esEmailValido = validarEmail();
        const esPasswordValido = validarPassword();
        
        if (esEmailValido && esPasswordValido) {
            if (!validarCredenciales()) {
                mostrarError(errorPassword, 'Credenciales incorrectas. Use: artista@newendungun.cl / Musica2025');
                return false;
            }
            return true;
        }
        return false;
    }

    $(document).ready(function () {
        $('#email').on('blur', validarEmail);
        $('#password').on('blur', validarPassword);

        $('.form-control').on('focus', function () {
            $(this).parent().addClass('focused');
        }).on('blur', function () {
            $(this).parent().removeClass('focused');
        });

        $('#forgotPassword').on('click', function (e) {
            e.preventDefault();
            $('#loginForm').effect('shake', { times: 2, distance: 5 }, 300);
            alert('Función de recuperación de contraseña en desarrollo. Contacta al administrador.');
        });

        $('#loginForm').on('submit', function (e) {
            e.preventDefault();

            if (validarFormulario()) {
                $('#submitBtn').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Iniciando sesión...');
                $('#submitBtn').prop('disabled', true);

                setTimeout(function () {
                    console.log('Login válido, datos:');
                    console.log('Email:', $('#email').val());
                    console.log('Recordar sesión:', $('#remember').is(':checked'));

                    $('#loginForm').fadeOut(400, function () {
                        $('#successMessage').fadeIn(400);
                    });

                    setTimeout(function () {
                       
                        window.location.href = '../index.html';
                    }, 2000);
                }, 1500);
            } else {
                console.log('Formulario inválido, por favor corrija los errores');
                $('#loginForm').effect('shake', { times: 2, distance: 5 }, 300);
            }
        });

        $('#email').on('dblclick', function() {
            $(this).val('artista@newendungun.cl');
            validarEmail();
        });

        $('#password').on('dblclick', function() {
            $(this).val('Musica2025');
            validarPassword();
        });
    });
});