import React from "react";
import { Button } from "../../components/base/Button";
import { FormInput } from "../../components/base/FormInput";
import "../../styles/LoginView/index.css";
import { Link } from "react-router-dom";

export type Submit = {
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function LoginView({ handleSubmit }: Submit) {
  return (
    <main>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Login</h2>
          </div>
          <div className="form-body">
            <FormInput
              name="email"
              type="text"
              placeholder="example@email.com"
              className="form-input"
            />
            <FormInput
              name="password"
              type="password"
              placeholder="password"
              className="form-input"
            />
            <Button style="form-btn">Login</Button>
          </div>
          <div className="form-footer">
            <small>Don't have an account ?</small>
            <Link to={'/signup'} style={{ fontSize: "14px",color: "blue" }}>
              create account
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
