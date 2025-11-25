document.addEventListener('DOMContentLoaded', function () {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const tipo = document.getElementById('tipo');
    const asunto = document.getElementById('asunto');
    const mensaje = document.getElementById('mensaje');

    const errorNombre = document.getElementById('errorNombre');
    const errorEmail = document.getElementById('errorEmail');
    const errorTelefono = document.getElementById('errorTelefono');
    const errorTipo = document.getElementById('errorTipo');
    const errorAsunto = document.getElementById('errorAsunto');
    const errorMensaje = document.getElementById('errorMensaje');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[0-9+\-\s()]{7,15}$/;

    function mostrarError(elemento, mensaje) {
        elemento.textContent = mensaje;
        elemento.previousElementSibling.classList.add('error');
    }

    function limpiarError(elemento) {
        elemento.textContent = '';
        elemento.previousElementSibling.classList.remove('error');
    }

    function validarNombre() {
        if (nombre.value.trim() === '') {
            mostrarError(errorNombre, 'El nombre es obligatorio');
            return false;
        } else if (nombre.value.trim().length < 2) {
            mostrarError(errorNombre, 'El nombre debe tener al menos 2 caracteres');
            return false;
        } else {
            limpiarError(errorNombre);
            return true;
        }
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

    function validarTelefono() {
        if (telefono.value.trim() !== '' && !telefonoRegex.test(telefono.value.trim())) {
            mostrarError(errorTelefono, 'Ingrese un número válido');
            return false;
        } else {
            limpiarError(errorTelefono);
            return true;
        }
    }

    function validarTipo() {
        if (tipo.value === '') {
            mostrarError(errorTipo, 'Seleccione una opción');
            return false;
        } else {
            limpiarError(errorTipo);
            return true;
        }
    }

    function validarAsunto() {
        if (asunto.value.trim() === '') {
            mostrarError(errorAsunto, 'El asunto es obligatorio');
            return false;
        } else if (asunto.value.trim().length < 5) {
            mostrarError(errorAsunto, 'Mínimo 5 caracteres');
            return false;
        } else {
            limpiarError(errorAsunto);
            return true;
        }
    }

    function validarMensaje() {
        if (mensaje.value.trim() === '') {
            mostrarError(errorMensaje, 'El mensaje es obligatorio');
            return false;
        } else if (mensaje.value.trim().length < 10) {
            mostrarError(errorMensaje, 'Mínimo 10 caracteres');
            return false;
        } else {
            limpiarError(errorMensaje);
            return true;
        }
    }

    function validarFormulario() {
        return validarNombre() && validarEmail() && validarTelefono() &&
               validarTipo() && validarAsunto() && validarMensaje();
    }

    $(document).ready(function () {
        $('#nombre').on('blur', validarNombre);
        $('#email').on('blur', validarEmail);
        $('#telefono').on('blur', validarTelefono);
        $('#tipo').on('change', validarTipo);
        $('#asunto').on('blur', validarAsunto);
        $('#mensaje').on('blur', validarMensaje);

        $('.form-control').on('focus', function () {
            $(this).parent().addClass('focused');
        }).on('blur', function () {
            $(this).parent().removeClass('focused');
        });

        $('#contactForm').on('submit', function (e) {
            e.preventDefault();

            if (validarFormulario()) {
                $('#submitBtn').html('<span class="spinner-border spinner-border-sm"></span> Enviando...');
                $('#submitBtn').prop('disabled', true);

                setTimeout(function () {
                    $('#contactForm').fadeOut(400, function () {
                        $('#successMessage').fadeIn(400);
                    });

                    setTimeout(function () {
                        $('#contactForm')[0].reset();
                        $('#successMessage').fadeOut(400, function () {
                            $('#contactForm').fadeIn(400);
                        });
                        $('#submitBtn').html('Enviar mensaje');
                        $('#submitBtn').prop('disabled', false);
                    }, 5000);
                }, 1500);
            } else {
                $('#contactForm').effect('shake', { times: 2, distance: 5 }, 300);
            }
        });
    });
});