import { Link } from "react-router-dom";
import { Button } from "../../components/base/Button";
import { FormInput } from "../../components/base/FormInput";
import "../../styles/LoginView/index.css";
import { Submit } from "../LoginView";

export function SignUpView({ handleSubmit }: Submit) {
  return (
    <main>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>SignUp</h2>
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
            <Button style="form-btn">Register</Button>
          </div>
          <div className="form-footer">
            <small>Already have a account</small>
            <Link to={'/login'} style={{ fontSize: "14px",color: "blue" }}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
