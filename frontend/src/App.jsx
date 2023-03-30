import { useState } from "react";
import Login from "./Login";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister() {
    const user = {
      username,
      password,
    };
    const userString = JSON.stringify(user);

    fetch("http://localhost:4001/users", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: userString,
    }).then((res) => console.log(res));
  }

  return (
    <div className="flex justify-center p-16">
      <div className="flex flex-col bg-sky-500 rounded-lg gap-4 p-28">
        <h2 className="flex justify-center text-2xl font-bold">
          Registrera dig
        </h2>
        <div className="flex flex-col items-center w-auto font-serif">
          <label>Användarnamn: </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Example@mail"
          />
          <label>Lösenord: </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="flex justify-center bg-slate-500 w-24 rounded-lg "
            onClick={handleRegister}
          >
            Registrera
          </button>
        </div>
      </div>
      <Login />
    </div>
  );
}

export default App;
