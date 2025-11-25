/* Archivo: files/jv/validacion_login.js */

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

    // Credenciales de respaldo (Admin por defecto)
    const adminCredentials = {
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

    // --- FUNCIÓN CORREGIDA: VALIDAR CONTRA LOCALSTORAGE ---
    function validarCredenciales() {
        const emailInput = email.value.trim();
        const passInput = password.value.trim();

        // 1. Buscamos si hay un usuario registrado en el navegador
        const usuarioGuardado = localStorage.getItem('usuarioRegistrado');

        if (usuarioGuardado) {
            const usuario = JSON.parse(usuarioGuardado);
            
            // Comparamos con el usuario registrado
            if (emailInput === usuario.email && passInput === usuario.password) {
                return true;
            }
        }

        // 2. Si no coincide con el registrado, probamos con el admin por defecto
        if (emailInput === adminCredentials.email && passInput === adminCredentials.password) {
            return true;
        }

        return false;
    }

    function validarFormulario() {
        const esEmailValido = validarEmail();
        const esPasswordValido = validarPassword();
        
        if (esEmailValido && esPasswordValido) {
            if (!validarCredenciales()) {
                mostrarError(errorPassword, 'Correo o contraseña incorrectos.');
                return false;
            }
            return true;
        }
        return false;
    }

    // Eventos jQuery y lógica
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
            alert('Función de recuperación de contraseña en desarrollo.');
        });

        $('#loginForm').on('submit', function (e) {
            e.preventDefault();

            if (validarFormulario()) {
                $('#submitBtn').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Iniciando sesión...');
                $('#submitBtn').prop('disabled', true);

                setTimeout(function () {
                    $('#loginForm').fadeOut(400, function () {
                        $('#successMessage').fadeIn(400);
                    });

                    setTimeout(function () {
                        // REDIRECCIÓN AL PERFIL (Para cumplir el CRUD)
                        window.location.href = '../index.html';
                    }, 2000);
                }, 1500);
            } else {
                $('#loginForm').effect('shake', { times: 2, distance: 5 }, 300);
            }
        });
    });
});