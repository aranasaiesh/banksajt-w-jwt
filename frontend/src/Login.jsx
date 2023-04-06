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
      money,
    };

    const userString = JSON.stringify(user);

    fetch("http://localhost:5004/sessions", {
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
        console.log("login data: ", data);
        myToken = data.token;
      });
  }

  function handleGetAccount() {
    console.log("my token", myToken);
    fetch("http://localhost:5004/me/accounts", {
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
        setMoney(data);
      });
  }

  return (
    <div className="flex justify-center p-16">
      <div className="flex flex-col bg-slate-400 rounded-lg gap-4 p-28 border border-black">
        <h2 className="flex justify-center font-bold text-2xl ">Login</h2>
        <div className="flex flex-col items-center w-auto font-serif">
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
        <div className="flex justify-center gap-2">
          <button
            className="flex justify-center bg-slate-500 w-24 rounded-lg border border-black "
            onClick={handleLogin}
          >
            Login
          </button>
          <div className="border border-black rounded-lg">
            <button onClick={handleGetAccount}>Show account</button>
          </div>
        </div>
        <div className="flex justify-center">
          <h2>Account: {money}</h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
