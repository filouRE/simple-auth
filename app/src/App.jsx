import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { deleteToken } from "./utils/checkToken";

function App(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["userauth"]);
  const [modalSigninState, setModalSigninState] = useState(
    false || props.signin
  );
  const [modalSignupState, setModalSignupState] = useState(
    false || props.signup
  );
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    if (cookies.userauth) {
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
      })
        .then((response) => {
          return response.json().then((data) => {
            if (!data.exist) {
              deleteToken(removeCookie);
            } else {
              setConnect(true);
            }
          });
        })
        .catch(() => {
          deleteToken(removeCookie);
        });
    }
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      {modalSignupState ? (
        <Signup close={setModalSignupState} />
      ) : modalSigninState ? (
        <Signin close={setModalSigninState} />
      ) : (
        <>
          <h1 className="font-bold text-[8rem]">WELCOME</h1>
          {connect ? (
            <>
              <button
                className="transform hover:-translate-y-0.5 transition duration-200 ease-in-out"
                onClick={() => {
                  deleteToken(removeCookie);
                }}
              >
                <a className=" bg-[#D9D9D9] text-2xl rounded-full px-16 py-1 font-semibold">
                  Disconnect
                </a>
              </button>
            </>
          ) : (
            <>
              <button
                className="transform hover:-translate-y-1 transition duration-200 ease-in-out"
                onClick={() => setModalSigninState(true)}
              >
                <a className=" bg-[#D9D9D9] text-2xl rounded-full px-16 py-1 font-semibold">
                  SIGN IN
                </a>
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
