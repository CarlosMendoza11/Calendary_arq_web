import { useAuthStore } from "../../hooks";

interface UserInfo {
    name: string;
    id: string;
}

export const Navbar = () => {
    const { user, startLogout } = useAuthStore();
    const userInfo = user as UserInfo;
    return (
        <nav className="app-navbar">
            <div className="brand-area">
                <span className="brand-icon">
                    <i className="fas fa-calendar-alt"></i>
                </span>
                <div>
                    <span className="brand-title">Calendary</span>
                    <small>Panel de planificación</small>
                </div>
            </div>

            <div className="user-area">
                <span className="user-chip">
                    <i className="fas fa-user-circle"></i>
                    {userInfo?.name || 'Usuario'}
                </span>

                <button className="logout-button" onClick={startLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Salir</span>
                </button>
            </div>
        </nav>
    )
}
