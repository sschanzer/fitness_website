import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Home({ user, setUser }) {
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  const handleSignUp = async (eventClick) => {
    let first_name = document.getElementById("form3").value;
    let last_name = document.getElementById("form4").value;
    let email = document.getElementById("form5").value;
    let password = document.getElementById("form6").value;
    let response = await axios.post("sign_up/", {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    });
    console.log(response.data);
  };

  const handleSignIn = async (eventClick) => {
    let email = document.getElementById("form1").value;
    let password = document.getElementById("form2").value;
    let response = await axios.post("sign_in/", {
      email: email,
      password: password,
    });
    console.log(response.data);
    window.location.reload();
  };

  return (
    <>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="form1"
              type="email"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form2"
              type="password"
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn onClick={handleSignIn} className="mb-4 w-100">
              Sign in
            </MDBBtn>

            <p className="text-center">
              Not a member?{" "}
              <a
                href="#!"
                onClick={() => handleJustifyClick("tab2")}
                active={justifyActive === "tab2"}
              >
                Register
              </a>
            </p>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "tab2"}>
            <MDBInput
              wrapperClass="mb-4"
              label="First Name"
              id="form3"
              type="text"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Last Name"
              id="form4"
              type="text"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="form5"
              type="email"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form6"
              type="password"
            />

            <div className="d-flex justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I have read and agree to the terms"
              />
            </div>

            <MDBBtn onClick={handleSignUp} className="mb-4 w-100">
              Sign up
            </MDBBtn>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>

      {user && <Navigate to="profile" />}
    </>
  );
}

export default Home;
