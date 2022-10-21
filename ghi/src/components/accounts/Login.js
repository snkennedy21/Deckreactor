import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/esm/Image";
import Form from "react-bootstrap/Form";
import "./accounts.css";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { useLogInMutation } from "../../store/accountApi";
import { useCallback } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { updateField } from "../../store/accountSlice";
import {
  eventTargetSelector as target,
  preventDefault,
} from "../../store/utils";

function Login() {
  const dispatch = useDispatch();
  const { email, username, password } = useSelector((state) => state.account);
  const [logIn, { error, isLoading: loginInLoading }] = useLogInMutation();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );
  const state = useSelector((state) => state.account);

  return (
    <Container className="cool-form card shadow p-4 mt-5 w-25 d-grid">
      <div className="d-flex justify-content-center mt-2">
        <Image src={logo} style={{ width: "6rem" }} />
      </div>
      <div className="text-center mt-3">
        <h5>Please sign in</h5>
      </div>
      <Form
        className="mt-3 mb-3 w-100 justify-content-center"
        method="POST"
        onSubmit={preventDefault(logIn, target)}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            required
            onChange={field}
            value={email}
            name="email"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            required
            onChange={field}
            value={password}
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button size="md" variant="info" type="submit">
            Sign in
          </Button>
        </div>
      </Form>
      <div className="text-center">
        <p>Don't have an account?</p>
        <p>
          Create one{" "}
          <Link className="link" to="/signup">
            {" "}
            here!
          </Link>
        </p>
      </div>
    </Container>
  );
}
export default Login;
