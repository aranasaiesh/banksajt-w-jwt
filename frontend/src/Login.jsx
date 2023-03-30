import { useState } from "react";

let myToken;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [money, setMoney] = useState("");

  function handleLogin() {
    const user = {
      username,
      password,
    };

    const userString = JSON.stringify(user);

    fetch("http://localhost:4001/sessions", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: userString,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        myToken = data.token;
      });
  }

  function handleGetAccount() {
    fetch("http://localhost:4001/me/accounts", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + myToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMoney(data.money);
      });
  }

  return (
    <div className="flex justify-center p-16">
      <div className="flex flex-col bg-sky-500 rounded-lg gap-4 p-28">
        <h2 className="flex justify-center font-bold text-2xl">Login</h2>
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
        <div className="flex justify-center gap-2">
          <button
            className="flex justify-center bg-slate-500 w-24 rounded-lg "
            onClick={handleLogin}
          >
            Login
          </button>
          <div className="border border-black rounded-lg">
            <button onClick={handleGetAccount}>Visa Saldo</button>
          </div>
        </div>
        <div className="flex justify-center">
          <h2>Saldo: {money}</h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
