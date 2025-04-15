import React from "react";
import HeaderComponent from "../common/HeaderComponent";
import CustomInput from "../common/CustomInput";

export default function Login() {
  return (
    <div className="login-form">
      <HeaderComponent headearName="Login" />
      <form>
        <div className="log-div">
          <CustomInput
            id={""}
            name={""}
            placeholder={"Username"}
            type={"text"}
            list={""}
            onchange={undefined}
            onclick={undefined}
          />
        </div>
        <div className="log-div">
          <CustomInput
            id={""}
            name={""}
            placeholder={"Password"}
            type={"password"}
            list={""}
            onchange={undefined}
            onclick={undefined}
          />
        </div>
        <div className="log-div">
          <CustomInput
            id={""}
            name={""}
            placeholder={"Role"}
            type={"text"}
            list={"role"}
            onchange={undefined}
            onclick={undefined}
          />
          <datalist id="role">
            <option value={"Super Admin"}>Super Admin</option>
            <option value={"Admin"}>Admin</option>
            <option value={"Employee"}>Employee</option>
          </datalist>
        </div>
        <div className="log-div">
          <button>Login</button>
        </div>
      </form>
    </div>
  );
}
