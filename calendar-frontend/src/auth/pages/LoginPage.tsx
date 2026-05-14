import { useEffect, type SyntheticEvent } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import Swal from 'sweetalert2';

import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export const LoginPage = () => {
    const { startLogin, startRegister, errorMessage } = useAuthStore();
    const { formState: formStateLogin, onInputChange: onLoginInputChange } = useForm(loginFormFields);
    const { loginEmail, loginPassword } = formStateLogin;

    const { formState: formStateRegister, onInputChange: onRegisterInputChange } = useForm(registerFormFields);
    const { registerName, registerEmail, registerPassword, registerPassword2 } = formStateRegister;

    const loginSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }

    const registerSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (registerPassword !== registerPassword2) {
            Swal.fire('Error en el registro', 'Las contraseñas deben coincidir', 'error');
            return;
        }
        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage])


    return (
        <main className="auth-page">
            <section className="auth-hero">
                <div className="auth-badge">
                    <i className="fas fa-calendar-check"></i>
                </div>
                <p className="auth-overline">Agenda inteligente</p>
                <h1>Calendary</h1>
                <p className="auth-description">
                    Organiza tus eventos, controla tus actividades y mantén tu calendario siempre actualizado.
                </p>

                <div className="auth-features">
                    <div>
                        <i className="fas fa-lock"></i>
                        <span>Acceso seguro</span>
                    </div>
                    <div>
                        <i className="fas fa-cloud"></i>
                        <span>Datos sincronizados</span>
                    </div>
                    <div>
                        <i className="fas fa-clock"></i>
                        <span>Gestión rápida</span>
                    </div>
                </div>
            </section>

            <section className="auth-panel">
                <div className="auth-card login-card">
                    <div className="auth-card-header">
                        <span className="auth-icon"><i className="fas fa-user"></i></span>
                        <div>
                            <h2>Ingreso</h2>
                            <p>Accede con tu correo y contraseña.</p>
                        </div>
                    </div>

                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-3">
                            <label>Correo electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="ejemplo@correo.com"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Ingresa tu contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <button type="submit" className="auth-submit primary-action">
                            <i className="fas fa-right-to-bracket"></i>
                            Iniciar sesión
                        </button>
                    </form>
                </div>

                <div className="auth-card register-card">
                    <div className="auth-card-header">
                        <span className="auth-icon"><i className="fas fa-user-plus"></i></span>
                        <div>
                            <h2>Registro</h2>
                            <p>Crea una cuenta para empezar a programar eventos.</p>
                        </div>
                    </div>

                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-3">
                            <label>Nombre completo</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tu nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Correo electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="ejemplo@correo.com"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Crea una contraseña"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Confirmar contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repite la contraseña"
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <button type="submit" className="auth-submit secondary-action">
                            <i className="fas fa-user-check"></i>
                            Crear cuenta
                        </button>
                    </form>
                </div>
            </section>
        </main>
    )
}
