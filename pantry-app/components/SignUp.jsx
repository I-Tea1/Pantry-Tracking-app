"use client";
import { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
  console.log("Password:", password);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/pantry");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert("Failed to sign up. Please try again.");
    }
  };

  return (
    <Container sx={{ maxWidth: "md", marginTop: "40px" }}>
      <Stack spacing={4} alignItems="center">
        <Typography variant="h4" fontWeight={700} textAlign="center">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#FFF",
            width: "650px",
            margin: "0 auto",
          }}
        >
          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#FFB300",
              color: "#3E2723",
              "&:hover": {
                backgroundColor: "#F57F17",
              },
              padding: "12px 20px",
              borderRadius: "20px",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            Sign Up
          </Button>
        </Box>
        <Typography textAlign="center">
          Already have an account?{" "}
          <Link href="/signin" underline="none" color="#FFB300">
            Sign In
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
};

export default SignUp;
