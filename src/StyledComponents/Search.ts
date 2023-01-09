import { styled, alpha } from "@mui/material/styles"
import InputBase from "@mui/material/InputBase"

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.5),
  padding: theme.spacing(1),
  width: "100%",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },

  "& .MuiInputBase-input": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    padding: theme.spacing(1),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}))
