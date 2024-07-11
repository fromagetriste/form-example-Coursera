import "./App.css";
import { useState } from "react";
import { validateEmail } from "../src/utils";

const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [role, setRole] = useState("role");

  const getIsFormValid = () => {
    return (
      firstName &&
      validateEmail(email) &&
      password.value.length >= 8 &&
      role !== "role"
    );
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword({
      value: "",
      isTouched: false,
    });
    setRole("role");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // so the page doesnt refresh when submitting the form
    alert("Account created!"); // could be replaced with a success pop-up for example
    clearForm(); // reset the states to empty strings to get a empty form
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {/* fieldset to gather the entire form */}
        <fieldset>
          <h2>Sign Up</h2>
          <div className="Field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
              value={firstName} // we assigned the value attribute to the State
              onChange={(e) => {
                setFirstName(e.target.value);
                console.log(e); // just to see in the console, the event properties. To be removed in real life scenario
              }}
              placeholder="First name"
            />
          </div>
          <div className="Field">
            <label>Last name</label>
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Last name"
            />
          </div>
          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email address"
            />
          </div>
          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            <input
              value={password.value} // we need to access password.value because it returns an Object
              type="password"
              onChange={(e) => {
                setPassword({ ...password, value: e.target.value }); // we use the spread operator not to over-ride the Object
              }}
              onBlur={() => {
                setPassword({ ...password, isTouched: true }); // we need to use the onBlur event, which is called whenever the input loses focus, so that it toggles the isTouch property. It also exists the onFocus event, which is the opposite event (can be used to colorize borders for example)
              }}
              placeholder="Password"
            />
            {password.isTouched && password.value.length < 8 ? (
              <PasswordErrorMessage /> // we make sure the password is 8 letters +. It is triggered with the onBlur event (input password attribute)
            ) : null}{" "}
          </div>
          <div className="Field">
            <label>
              Role <sup>*</sup>
            </label>{" "}
            {/* notice we set the onChange in the select HTML tag and not in the options */}
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>
          <button type="submit" disabled={!getIsFormValid()}>
            Create account
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
