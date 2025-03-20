import axios from "axios";
import { useEffect } from "react"
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export default function HomePage() {
    const navigate = useNavigate();
    const auth = useAuth();
    useEffect(() => {
        const validateToken = async () => {
            const accessToken = auth?.user.accessToken;
            if (!accessToken) {
                navigate("/signin");
                auth?.logout()
                return;
            }

            try {
                const response = await axios.get(`${BASE_URL}/users/info`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                auth?.login({ accessToken, ...response.data })
            } catch (error) {
                console.error("Invalid token, redirecting to login...");
                navigate("/signin");
                auth?.logout()
            }
        };

        validateToken();
    }, [navigate]);

    return (
        <section className="home-container">
            <h1>Welcome to the application.</h1>
        </section>
    );
}