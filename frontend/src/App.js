import React, { useState } from "react";
import Auth from "./Auth";
import Linkdin from "./Linkdin";
// import { LinkedInCallback } from 'react-linkedin-login-oauth2';

// import { BrowserRouter, Route,Routes } from 'react-router-dom';
const App = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [a, setA] = useState(false);

  let Submit = (e) => {
    e.preventDefault();

    const loginData = { password, email };

    fetch(`/api/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setA("not found");
        } else {
          setA(data.fullName);
        }
      });
  };

  return (
    <>
      {/* <BrowserRouter> */}
      <center>
        <span
          style={{
            color: "red",
            border: "1px solid black",
            marginTop: "100px",
          }}
        >
          {a}
        </span>

        <form
          method="post"
          onSubmit={(e) => {
            Submit(e);
          }}
        >
          <div style={{ marginTop: "100px" }}>
            <label htmlFor="email">email</label> <br />
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <br />
            <br />
            <label htmlFor="password">password</label> <br />
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button type="submit">click</button>
        </form>
      </center>

      <Auth />
      <Linkdin />

      {/* <Routes>

      <Route exact path="/linkedin" component={LinkedInCallback} />
      </Routes> */}
      {/* </BrowserRouter> */}
    </>
  );
};

export default App;
