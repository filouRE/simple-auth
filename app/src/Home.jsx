import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Home(props) {
  const [username, setUsername] = useState("none");

  useEffect(() => {
    setUsername(props.username);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-[6rem] text-center">
        Welcome back, {username}
      </h1>
      <button className="transform hover:-translate-y-1 mt-4 transition duration-200 ease-in-out">
        <a
          href="/"
          className=" bg-[#D9D9D9] text-2xl rounded-full px-16 py-1 font-semibold"
        >
          Go back home
        </a>
      </button>
    </div>
  );
}

export default Home;
