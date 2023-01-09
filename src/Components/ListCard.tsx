import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from "@mui/material"
import { FC } from "react"
import { red } from "@mui/material/colors"
import parse from "html-react-parser"
import { IUser } from "../Interfaces/User"

interface IListCardsProps {
  userData: IUser
  activeCard: boolean
}
const ListCard: FC<IListCardsProps> = ({ activeCard, userData }) => (
  <Card
    key={userData.id}
    sx={{
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: `${activeCard ? "red" : "white"}`,
    }}
  >
    <CardActionArea
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        "&:hover": {
          background: "rgb(7, 177, 77, 0.42)",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userData.name.charAt(0)}
          </Avatar>
        }
        subheader={parse(userData.id)}
        title={parse(userData.name)}
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {userData.items.map((item: string, index: number) => (
          <Chip
            key={index}
            label={parse(item)}
            variant="outlined"
            color="success"
          />
        ))}
      </CardContent>
      <CardContent sx={{ textAlign: "right" }}>
        <Typography variant="body2" color="text.secondary">
          Address :{parse(userData.address)}
        </Typography>
        <Typography variant="body2" color="grey.500">
          Pin Code:{parse(userData.pincode)}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
)

export default ListCard
