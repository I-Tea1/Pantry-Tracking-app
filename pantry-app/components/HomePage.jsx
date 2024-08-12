"use client";
import { Box, Container, Stack, Typography, Button } from "@mui/material";
import Link from "next/link";

const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#5B0A2C", // purp background color
        minHeight: "100vh",
        padding: "40px 0",
        position: "relative", // For absolute positioning of text
        overflow: "hidden", // Hide any overflow
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "75%",
          height: "40vh",
          margin: "10px auto",
        }}
      >
        <Typography
          variant="h2"
          fontWeight={700}
          sx={{
            position: "absolute",
            textAlign: "center",
            width: "100px",
            top: "20%",
            left: "5%",
            color: "#f0f0f0", // Retro dark brown
            padding: "20px",
            borderRadius: "8px"
            //transform: "translateY(-20%)", // Adjust vertical alignment
          }}
        >
          PANTRY TRACKER APP
        </Typography>
      </Box>

      <Container>
        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: "40px" }}
        >
          <Button
            component={Link}
            href="/signup"
            variant="contained"
            sx={{
              backgroundColor: "#FFB300", // Darker, more vibrant yellow
              color: "#3E2723", // Retro dark brown
              "&:hover": {
                backgroundColor: "#388E3C", // Darker green for hover
              },
              padding: "10px 20px",
              borderRadius: "20px",
              fontWeight: "600",
            }}
          >
            Sign Up
          </Button>
          <Button
            component={Link}
            href="/signin"
            variant="outlined"
            sx={{
              color: "#FFB300", // Darker, more vibrant yellow
              borderColor: "#FFB300", // Darker, more vibrant yellow
              "&:hover": {
                borderColor: "#388E3C", // Darker green for hover
                color: "#388E3C", // Darker green for text on hover
              },
              padding: "10px 20px",
              borderRadius: "20px",
              fontWeight: "600",
            }}
          >
            Sign In
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
