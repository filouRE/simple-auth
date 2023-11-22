import { useEffect, useState } from "react";
import Home from "../Home";
import { useCookies } from "react-cookie";

function CheckLogin() {
  const [cookies] = useCookies(false);
  // check
  const [accountExist, setAccountExist] = useState(false);
  const [hasFetch, setHasFetch] = useState(false);

  useEffect(() => {
    if (cookies.userauth)
      fetch("http://localhost:3000/auth/checkid", {
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
  }, []);

  if (hasFetch)
    return accountExist ? (
      <Home username={cookies.userauth.username} />
    ) : (
      RootRedirect()
    );
  return <></>;
}

function RootRedirect() {
  window.location.href = "/";
  return <></>;
}

export default CheckLogin;
