import React from "react";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "../../components/Notifications/Notifications";
import { handleLogin } from "../../api/auth.api";

const Login = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(mail, password, setLoading, navigate, Notifications);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container size={420} my={40}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Welcome back!
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{" "}
            <Link
              to="/register"
              style={{
                fontWeight: 700,
                color: "inherit",
              }}
            >
              Create account
            </Link>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              value={mail}
              onChange={(e) => setMail(e.currentTarget.value)}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
              mt="md"
            />

            <Button fullWidth mt="xl" type="submit" loading={loading}>
              Sign in
            </Button>
          </Paper>
        </Container>
      </form>
    </>
  );
};

export default Login;
