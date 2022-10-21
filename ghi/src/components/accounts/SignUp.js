import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";

import { useSignUpMutation } from "../../store/accountApi";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../store/accountSlice";
import { preventDefault } from "../../store/utils";

function SignUp() {
  const dispatch = useDispatch();
  const { email, password, full_name } = useSelector((state) => state.account);
  const [signUp, { error, isLoading: signUpLoading }] = useSignUpMutation();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );

  return (
    <Container>
      <Form
        method="POST"
        onSubmit={preventDefault(signUp, () => ({
          email,
          password,
          full_name,
        }))}
      >
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={field}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
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

        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </Container>
  );
}

export default SignUp;
