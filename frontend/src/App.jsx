import { useState } from "react";
import Login from "./Login";
import image from "./img/chasbank.png";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleRegister() {
    const user = {
      username,
      password,
      email,
    };
    const userString = JSON.stringify(user);

    fetch("http://localhost:5004/users", {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: userString,
    }).then((res) => console.log(res));
  }

  return (
    <div className="flex justify-center p-16 bg-custom-white md:flex flex-col">
      <div className="flex justify-center">
        <img src={image} className="w-60 h-54" />
      </div>
      <div className="flex flex-col bg-slate-400 rounded-lg gap-4 w-auto p-8">
        <h2 className="flex justify-center text-2xl font-bold border-t border-black p-4 ">
          Register
        </h2>
        <div className="flex flex-col items-center w-auto font-serif">
          <label>Email:</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-black"
          />
          <label>Username: </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="border border-black"
          />
          <label>Password: </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            className="border border-black"
          />
        </div>
        <div className="flex justify-center border-b border-black p-4">
          <button
            className="flex justify-center bg-slate-500 w-24 rounded-lg border border-black"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
      <Login />
    </div>
  );
}

export default App;
