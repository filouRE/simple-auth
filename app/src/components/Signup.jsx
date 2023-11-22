import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CloseButton from "../images/close.svg";
import Label from "./Label";

function Signup(props) {
  const [cookies, setCookie] = useCookies(["userauth"]);
  const error = useRef(0);
  const [errorMessage, setErrorMessage] = useState(0);
  const navigateTo = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (
      event.target[0].value === "" ||
      event.target[1].value === "" ||
      event.target[2].value === "" ||
      event.target[3].value === ""
    ) {
      setErrorMessage("some fields are empty");
      error.current.className = "text-red-500 font-bold";
    } else if (event.target[2].value != event.target[3].value) {
      setErrorMessage("the passwords entered are different");
      error.current.className = "text-red-500 font-bold";
    } else {
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: event.target[0].value,
          email: event.target[1].value,
          password: event.target[2].value,
        }),
      })
        .then((response) => {
          return response.json().then((data) => {
            if (!data.error) {
              if (data.uuid) {
                setCookie(
                  "userauth",
                  { uuid: data.uuid, username: data.username },
                  { path: "/" }
                );
                navigateTo("/home");
              }
            } else {
              setErrorMessage(data.error);
              error.current.className = "text-red-500 font-bold";
            }
          });
        })
        .catch(() => {
          setErrorMessage("something wrong happened");
          error.current.className = "text-red-500 font-bold";
        });
    }
  };

  return (
    <div
      id="signin"
      className="absolute w-[400px] h-[500px] border-2 border-gray-700 rounded-xl"
    >
      <div className="w-full h-full flex flex-col justify-center items-center rounded-xl">
        <h2 className="font-bold uppercase text-4xl text-center my-4">
          Sign up
        </h2>
        <form
          className="flex flex-col justify-center items-start gap-1 w-[70%]"
          onSubmit={onSubmit}
        >
          <Label id="username" text="Username" type="text"></Label>
          <Label id="email" text="Email" type="email"></Label>
          <Label
            id="password"
            text="Password"
            type="password"
            autoComplete="current-password"
          ></Label>
          <Label
            id="password"
            text="Confirm Password"
            type="password"
            autoComplete="confirm-password"
          ></Label>
          <input
            type="submit"
            value="Sign up"
            className="transform hover:-translate-y-0.5 transition duration-200 ease-in-out cursor-pointer w-full my-4 bg-gray-700 text-white font-semibold rounded py-1"
          />
        </form>
        <button
          className="bg-[#D9D9D9] px-[10px] text-3xl rounded-full text-center"
          onClick={() => props.close(false)}
        >
          <img
            src={CloseButton}
            width={30}
            alt=""
            className="absolute top-3 right-3"
          />
        </button>
        <div className="bottom flex flex-col justify-center items-center gap-2">
          <p ref={error} className="hidden">
            error: {errorMessage}
          </p>
          <button onClick={() => navigateTo("../signin")}>
            <a href="" className="underline font-bold ">
              Already have an account?
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
