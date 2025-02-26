import {useEffect} from "react";
import {useAuth} from "@/shared/lib/hooks/useAuth.ts";
import api from "@/shared/api/api.ts";

const HomePage = () => {
    const {token} = useAuth()

    useEffect(() => {
        if (token) getData()
    }, [token])
    /*const getData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/clients', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(res.data)

        } catch (err) {
            console.log(err)
        }
    }*/

    const getData = async () => {
        try {
            const res = await api.get("/clients");
            console.log(res.data);
        } catch (err) {
            console.error("Ошибка получения данных:", err);
        }
    };


    return (
        <div>
            homepage
        </div>
    );
};

export default HomePage;
