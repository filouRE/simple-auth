/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const CheckLogin = (props) => {
    const [cookies] = useCookies("userauth");
    // check if cookies matches with the database
    const [accountExist, setAccountExist] = useState(false);
    // fetch data before rendering anything
    const [hasFetch, setHasFetch] = useState(false);

    useEffect(() => {
        if (cookies.userauth)
            fetch(`${import.meta.env.VITE_API_URL}/auth/checkid`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: cookies.userauth.username,
                    uuid: cookies.userauth.uuid,
                }),
            }).then((response) => {
                return response.json().then((data) => {
                    if (data.exist) {
                        setAccountExist(true);
                    }
                    setHasFetch(true);
                });
            });
        else setHasFetch(true);
    }, [cookies]);

    if (hasFetch) return accountExist ? props.component : RootRedirect();
    return <></>;
};

const RootRedirect = () => {
    window.location.href = "/";
    return <></>;
};

export default CheckLogin;
