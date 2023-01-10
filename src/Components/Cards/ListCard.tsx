import parse from "html-react-parser"
import { FC, useEffect, useState } from "react"
import { IUser } from "../../Interfaces/User"
import { red } from "@mui/material/colors"
import { transformMatch } from "../../Utility/transformMatch"
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from "@mui/material"

interface IListCardsProps {
  userData: IUser
  activeCard: boolean
  searchString: string
}
const ListCard: FC<IListCardsProps> = ({
  activeCard,
  userData,
  searchString,
}) => {
  const [userDetails, setUserDetails] = useState(userData)

  useEffect(() => {
    const transformedUser = (user: IUser) => {
      let name = transformMatch(user.name, searchString)
      let id = transformMatch(user.id, searchString)
      let address = transformMatch(user.address, searchString)
      let pincode = transformMatch(user.pincode, searchString)

      // let items = user.items.filter((item: string) =>
      //   transformMatch(item, searchString)
      // )
      return {
        ...user,
        name,
        id,
        address,
        pincode,
        // items,
      }
    }
    setUserDetails(transformedUser(userData))
  }, [searchString, userData])

  return (
    <Card
      key={userDetails.id}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: `${activeCard ? "lightblue" : "white"}`,
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
          subheader={parse(userDetails.id)}
          title={parse(userDetails.name)}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {userDetails.items.length > 0 && (
            <Chip
              label={`${searchString} found in items`}
              variant="outlined"
              color="success"
            />
          )}
        </CardContent>
        <CardContent sx={{ textAlign: "right" }}>
          <Typography variant="body2" color="text.secondary">
            Address :{parse(userDetails.address)}
          </Typography>
          <Typography variant="body2" color="grey.500">
            Pin Code:{parse(userDetails.pincode)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ListCard
