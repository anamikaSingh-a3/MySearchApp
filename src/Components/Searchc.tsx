import { Chip, Container } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material"
import { red } from "@mui/material/colors"
import { FC, useState } from "react"
import {
  // Search,
  // SearchIconWrapper,
  StyledInputBase,
} from "../StyledComponents/Search"
import { IUser } from "../Interfaces/User"

interface IProps {
  placeholder: string
  userData: IUser[]
}
const SearchBar: FC<IProps> = ({ placeholder, userData }) => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [foundInId, setFoundInId] = useState<boolean>(false)
  const [foundInName, setFoundInName] = useState<boolean>(false)
  const [foundInItem, setFoundInItem] = useState<boolean>(false)
  const [foundInAddress, setFoundInAddress] = useState<boolean>(false)
  const [foundInPincode, setFoundInPincode] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<IUser[]>([])

  // console.log(value)
  // console.log(searchResult)

  // useEffect(() => {
  //   setSearchResult(
  //     userData.filter(
  //       (user: IUser) =>
  //         user.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
  //         user.id.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
  //         user.address
  //           .toLocaleLowerCase()
  //           .includes(value.toLocaleLowerCase()) ||
  //         user.pincode
  //           .toLocaleLowerCase()
  //           .includes(value.toLocaleLowerCase()) ||
  //         user.items.map((item: string) =>
  //           item.toLocaleLowerCase().includes(value.toLocaleLowerCase())
  //         )
  //     )
  //   )
  // }, [userData, value])

  console.log("result", searchResult)

  // const handleSearch = (searchVal: string) => {
  //   // setSearchResult([])
  //   console.log(1)
  //   setValue(searchVal)
  //   console.log("searchVal", searchVal)
  //   console.log("val", value)
  //   console.log("resultVal", searchResult)

  //   // const newUsers: IUser[] = userData.filter(
  //   // (user: IUser) => user.name.toLowerCase().includes(searchVal.toLowerCase())
  //   // ||
  //   // user.id.toLowerCase().includes(searchVal.toLowerCase()) ||
  //   // user.address.toLowerCase().includes(searchVal.toLowerCase()) ||
  //   // user.pincode.toLowerCase().includes(searchVal.toLowerCase()) ||
  //   // user.items.map((item: string) =>
  //   //   item.toLowerCase().includes(searchVal.toLowerCase())
  //   // )
  //   // )
  //   // setSearchResult(newUsers)

  //   // const user = userData.filter((user: IUser) =>
  //   //   user.name.toLowerCase().includes(searchVal.toLowerCase())
  //   // )
  //   // if (user) setFoundInName(true)
  //   // else setFoundInName(false)

  //   // console.log("user", user)

  //   const userName = userData.filter((user) =>
  //     user.name.toLowerCase().includes(searchVal.toLowerCase())
  //   )

  //   if (searchVal && userName.length) setFoundInName(true)
  //   else setFoundInName(false)

  //   const userId = userData.filter((user) =>
  //     user.id.toLowerCase().includes(searchVal.toLowerCase())
  //   )

  //   if (searchVal && userId.length) setFoundInId(true)
  //   else setFoundInId(false)
  // }

  return (
    <Container
      maxWidth={"md"}
      sx={{ display: "flex", flexDirection: "column", p: 2 }}
    >
      {foundInName && <p>Found in name</p>}
      {foundInId && <p>Found in foundInId</p>}
      {foundInAddress && <p>Found in foundInAddress</p>}
      {foundInPincode && <p>Found in foundInPincode</p>}
      {foundInItem && <p>Found in foundInItem</p>}

      {/* <Search> */}
      {/* <SearchIconWrapper> */}
      <SearchIcon />
      {/* </SearchIconWrapper> */}
      <StyledInputBase
        value={searchValue}
        placeholder={placeholder}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setSearchValue(e.target.name)
          // setSearchResult([])
          // handleSearch(e.target.value)
        }}
        inputProps={{ "aria-label": "search" }}
      />
      {/* </Search> */}
      <Box
        sx={{
          mt: 1,
          // display: "grid",
          // justifyItems: "center",
          // gridTemplateColumns: "repeat(3, 1fr)",
          display: "flex",
          flexDirection: "column",
          // gridTemplateColumns
          // flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: 1,
        }}
      >
        {/* <ul>
          {userData.map((user: IUser) => (
            <li>{user.name}</li>
          ))}
        </ul> */}
        {searchValue &&
          searchResult &&
          searchResult
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((user: IUser) => (
              <Card
                key={user.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr 1fr",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {user.name.charAt(0)}
                    </Avatar>
                  }
                  title={user.name}
                  subheader={user.id}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    // flexDirection: "column",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  {user.items.map((item: string, index: number) => (
                    <Chip
                      key={index}
                      label={item}
                      variant="outlined"
                      color="success"
                    />
                  ))}
                </CardContent>
                <CardContent sx={{ textAlign: "right" }}>
                  <Typography variant="body2" color="text.secondary">
                    Address : {user.address}
                  </Typography>
                  <Typography variant="body2" color="info.main">
                    Pin Code: {user.pincode}
                  </Typography>
                </CardContent>
              </Card>
            ))}
      </Box>
    </Container>
  )
}

export default SearchBar
