import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import "./accounts.css";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../store/accountApi";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../store/accountSlice";
import logo from "../../images/logo.png";
import Image from "react-bootstrap/esm/Image";

function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { email, password, full_name } = useSelector((state) => state.account);
  const [signUp, { error, isLoading: signUpLoading }] = useSignUpMutation();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );

  return (
    <Container className="form-signup card shadow p-4 mt-5 w-50 d-grid">
      <div className="d-flex justify-content-center mt-2">
        <Image src={logo} style={{ width: "6rem" }} />
      </div>
      <div className="text-center mt-3 mb-3">
        <h2>Create an account</h2>
        <h6 className="text-muted">
          Manage your Magic the Gathering collection!{" "}
        </h6>
      </div>
      <Form
        method="POST"
        onSubmit={ (e) => {
          e.preventDefault()
          signUp({
            email,
            password,
            full_name,
          })
          navigate("/")
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={field}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="full_name"
            onChange={field}
            value={full_name}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={field}
            value={password}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button size="md" variant="info" type="submit">
            Create Account
          </Button>
        </div>
      </Form>
      <div className="text-center mt-3">
        <p>Already have an account?</p>
        <p>
          Sign in{" "}
          <Link className="link" to="/login">
            here!
          </Link>
        </p>
      </div>
    </Container>
  );
}

export default SignUp;
