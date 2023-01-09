import { Box } from "@mui/material"
import React, { useEffect } from "react"
import Search from "./Components/Search"
import { user } from "./API/user"

function App() {
  const placeholder = "Search user by id, name, item, address or pincode"

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        backgroundColor: "#282c34",
      }}
    >
      <Search placeholder={placeholder} userData={user} />
    </Box>
  )
}

export default App
