import { useCallback } from "react";
import { useAuth } from "../utils/AuthContext";


export default function Header() {
    const auth = useAuth();
    const logoutAction = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        auth?.logout()
    }, [])
    return (
        <header className="header">
            <img src="/logo.png" alt="Easygenerator Logo" />
            {auth?.user?.email &&
                <div className="user-info">
                    <i className="fa-solid fa-user"></i>
                    <p>{auth?.user?.email}</p>
                    <i className="fa-solid fa-right-from-bracket" onClick={(e: React.MouseEvent) => logoutAction(e)}>

                    </i>
                </div>}
        </header>)
}