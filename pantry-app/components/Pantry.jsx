"use client";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import {
  query,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  increment,
} from "firebase/firestore";
import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Pantry = () => {
  const [inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemType, setItemType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("nameAsc");

  const updateInventory = async () => {
    const snapshot = await getDocs(query(collection(firestore, "inventory")));
    const inventoryList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setInventory(inventoryList);
  };

  const addItem = async () => {
    const quantity = parseInt(itemQuantity, 10);
    if (isNaN(quantity) || quantity <= 0 || !itemName || !itemType) return;

    const docRef = doc(collection(firestore, "inventory"), itemName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity: existingQuantity } = docSnap.data();
      await setDoc(
        docRef,
        { quantity: existingQuantity + quantity },
        { merge: true }
      );
    } else {
      await setDoc(docRef, { quantity, type: itemType });
    }
    updateInventory();
    setItemName("");
    setItemQuantity("");
    setItemType("");
  };

  const removeItem = async (id) => {
    const docRef = doc(firestore, "inventory", id);
    await deleteDoc(docRef);
    updateInventory();
  };

  const increaseQuantity = async (id) => {
    const docRef = doc(firestore, "inventory", id);
    await setDoc(docRef, { quantity: increment(1) }, { merge: true });
    updateInventory();
  };

  const decreaseQuantity = async (id) => {
    const docRef = doc(firestore, "inventory", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: increment(-1) }, { merge: true });
      }
    }
    updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const sortedItems = [...inventory].sort((a, b) => {
    switch (sortOrder) {
      case "nameAsc":
        return a.id.localeCompare(b.id);
      case "nameDesc":
        return b.id.localeCompare(a.id);
      case "quantityAsc":
        return a.quantity - b.quantity;
      case "quantityDesc":
        return b.quantity - a.quantity;
      default:
        return 0;
    }
  });

  const filteredItems = sortedItems.filter((item) =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ color: "#5B0A2C", marginBottom: 2 }}
      >
        Pantry Tracker App
      </Typography>

      {/* Search and Sort in the same line */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <TextField
          label="Search Items"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ flexGrow: 1 }}
        />

        
      </Stack>

      {/* Add Item Section */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <TextField
          label="Item Name"
          variant="outlined"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          fullWidth
          sx={{ flexGrow: 1 }}
        />
        <TextField
          label="Quantity"
          variant="outlined"
          type="text"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"></InputAdornment>
            ),
          }}
          fullWidth
          sx={{ flexGrow: 1 }}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            label="Type"
          >
            <MenuItem value="Fruit">Fruit</MenuItem>
            <MenuItem value="Vegetable">Vegetable</MenuItem>
            <MenuItem value="Dairy">Dairy</MenuItem>
            <MenuItem value="Grain">Grain</MenuItem>
            <MenuItem value="Protein">Protein</MenuItem>
            <MenuItem value="Baked">Baked goods</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#5B0A2C",
            color: "#f0f0f0",
            "&:hover": {
              backgroundColor: "#CD96AC",
            },
          }}
          onClick={addItem}
        >
          Add Item
        </Button>
      </Stack>

      {/* Display Items or No Items Message */}
      {filteredItems.length === 0 ? (
        <Typography variant="h6" sx={{ color: "#D32F2F", textAlign: "center" }}>
          No items found in the pantry.
        </Typography>
      ) : (
        <List>
          {filteredItems.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                backgroundColor: "#5B0A2C",
                marginBottom: 1,
                borderRadius: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  sx={{
                    color: "#f0f0f0",
                    fontWeight: 600,
                    flex: 1,
                  }}
                >
                  {item.id}
                </Typography>
                <Typography
                  sx={{
                    color: "#f0f0f0",
                    fontStyle: "italic",
                    flex: 1,
                  }}
                >
                  {item.type}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton
                    edge="end"
                    aria-label="decrease"
                    sx={{ color: "#F00965" }}
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography
                  sx={{color:"#f0f0f0", }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    edge="end"
                    aria-label="increase"
                    sx={{ color: "#F00965" }}
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
              </Stack>
              <IconButton
                edge="end"
                aria-label="delete"
                sx={{ color: "#f0f0f0" }}
                onClick={() => removeItem(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Pantry;
