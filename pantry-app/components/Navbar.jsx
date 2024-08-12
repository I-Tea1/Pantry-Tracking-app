"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

// Component for rendering menu items
const MenuItems = ({ user, handleSignOut }) => (
  <>
    <Typography
      component={Link}
      href="/home"
      fontWeight={500}
      variant="h5"
      color="CD96AC"
    >
      Home
    </Typography>
    {user ? (
      <>
        <Typography
          component={Link}
          href="/pantry"
          fontWeight={500}
          variant="h5"
          color="inherit"
        >
          Pantry
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FFB300", // Retro yellow
            color: "#3E2723", // Retro dark brown
            "&:hover": {
              backgroundColor: "#F57F17", // Darker yellow for hover
            },
            padding: "8px 16px",
            fontWeight: "600",
          }}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </>
    ) : (
      <>
        <Button
          component={Link}
          href="/signup"
          variant="contained"
          sx={{
            backgroundColor: "#A40B4A",
            color: "#DDAABF",
            "&:hover": {
              backgroundColor: "#CB286B",
              color:"f0f0f0"
            },
            padding: "8px 16px",
            fontWeight: "600",
          }}
        >
          Sign Up
        </Button>
        <Button
          component={Link}
          href="/signin"
          variant="contained"
          sx={{
            backgroundColor: "#A40B4A",
            color: "#DDAABF",
            "&:hover": {
              backgroundColor: "#CB286B",
              color:"f0f0f0"
            },
            padding: "8px 16px",
            fontWeight: "600",
          }}
        >
          Sign In
        </Button>
      </>
    )}
  </>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Stack>
      <Box
        sx={{
          backgroundColor: "#8F3057", // nav bar purp
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          padding: "10px 0",
          "& a": {
            textDecoration: "none",
            color: "#f0f0f0", // Retro dark brown
          },
        }}
      >
        <Container>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              padding: "8px 0",
            }}
          >
            

            {isLgUp ? (
              <Stack
                direction="row"
                gap={3}
                alignItems="center"
                sx={{
                  "& a:hover": {
                    color: "#CD96AC", // Retro red
                    transition: "color 0.3s",
                  },
                }}
              >
                <MenuItems user={user} handleSignOut={handleSignOut} />
              </Stack>
            ) : (
              <HamburgerMenu open={open} handleDrawerOpen={handleDrawerOpen} />
            )}
          </Stack>
        </Container>
      </Box>

      {!isLgUp && (
        <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
          <List>
            <ListItem sx={{ width: 250 }}>
              <Stack
                direction="column"
                gap={2}
                sx={{
                  "& a:hover": {
                    color: "#D32F2F", // Retro red
                    transition: "color 0.3s",
                  },
                }}
              >
                <MenuItems user={user} handleSignOut={handleSignOut} />
              </Stack>
            </ListItem>
          </List>
        </Drawer>
      )}
    </Stack>
  );
};

const HamburgerMenu = ({ handleDrawerOpen }) => (
  <IconButton
    sx={{ display: { md: "block", lg: "none" }, color: "#3E2723" }}
    onClick={handleDrawerOpen}
  >
    <MenuIcon />
  </IconButton>
);

export default Navbar;
