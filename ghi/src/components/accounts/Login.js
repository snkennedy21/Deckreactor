import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { useLogInMutation } from "../../store/accountApi";
import { useCallback } from "react";
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
    <Container>
      <Form method="POST" onSubmit={preventDefault(logIn, target)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            onChange={field}
            value={password}
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
export default Login;
