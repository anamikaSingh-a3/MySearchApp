import SearchIcon from "@mui/icons-material/Search"
import { Box, Container } from "@mui/material"
import { FC, useState, useEffect, useRef } from "react"
import { StyledInputBase } from "../StyledComponents/Search"
import { IUser } from "../Interfaces/User"
import CloseIcon from "@mui/icons-material/Close"
import { transformMatch } from "../Utility/transformMatch"
import SearchList from "./SearchList"
import useMemo from "react"
import {
  handleFilter,
  handleFilterItems,
  handleUserFilter,
} from "../Utility/filterSearchMatch"

interface IProps {
  placeholder: string
  userData: IUser[]
}
const SearchBar: FC<IProps> = ({ placeholder, userData }) => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [searchResult, setSearchResult] = useState<IUser[]>([])
  // const [activeCard, setActiveCard] = useState<number>(0)

  useEffect(() => {
    // const user = userData.map((user: IUser) =>
    //   user.items.filter((item: string) => {
    //     const result = item.toLowerCase().includes(searchValue.toLowerCase())
    //     console.log("result:", result)
    //     return result
    //   })
    // )
    // // .flat()
    // console.log("user:", user)
    console.log("userData:", userData)
    const result = userData
      .filter(
        (user: IUser) =>
          handleFilter(user.name, searchValue) ||
          handleFilter(user.id, searchValue) ||
          handleFilter(user.address, searchValue) ||
          handleFilter(user.pincode, searchValue)

        // handleFilterItems(user.items, searchValue)
        // user.items.includes(searchValue.toLowerCase())
      )
      // handleUserFilter(userData, searchValue)
      .map((user) => {
        let name = transformMatch(user.name, searchValue)
        let id = transformMatch(user.id, searchValue)
        let address = transformMatch(user.address, searchValue)
        let pincode = transformMatch(user.pincode, searchValue)
        // let items = user.items.map((item) =>
        //   transformMatch(item, searchValue)
        // )
        let items = user.items.filter((item: string) =>
          transformMatch(item, searchValue)
        )
        return {
          ...user,
          name,
          id,
          address,
          pincode,
          items,
        }
      })

      .sort((a, b) => a.name.localeCompare(b.name))

    console.log(result)

    setSearchResult(result)
  }, [searchValue, userData])

  // const keyboardNavigation = (
  //   e: useMemo.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   if (e.key === "ArrowDown") {
  //     setCursor((i: number) => (i < userData.length - 1 ? i + 1 : i))
  //   }
  //   if (e.key === "ArrowUp") {
  //     setCursor((i: number) => (i < 0 ? i - 1 : 0))
  //   }
  //   // if (e.key === "Escape") {

  //   // }
  //   // if (e.key === "Enter" ) {

  //   // }
  // }

  // const keyboardNavigation = () => {
  //   document.addEventListener(
  //     "keydown",
  //     (e: KeyboardEvent) => {
  //       console.log("key", e.key)
  //       if (e.key === "ArrowDown" && activeCard !== searchResult.length - 1) {
  //         setActiveCard(activeCard + 1)
  //       } else if (e.key === "ArrowUp" && activeCard !== 0) {
  //         setActiveCard(activeCard - 1)
  //       }
  //       console.log(activeCard)
  //     },
  //     true
  //   )
  // }

  return (
    <Container
      maxWidth={"md"}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        height: "100vh",
        alignItems: "stretch",
      }}
    >
      <StyledInputBase
        value={searchValue}
        placeholder={placeholder}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setSearchValue(e.target.value)
        }}
        // onKeyDown={keyboardNavigation}
        inputProps={{ "aria-label": "search" }}
        startAdornment={<SearchIcon />}
        endAdornment={
          <Box onClick={() => setSearchValue("")}>
            <CloseIcon />
          </Box>
        }
      />
      <SearchList
        searchString={searchValue}
        filteredList={searchResult}
        // activeCardIndex={activeCard}
      />
      {/* <Box sx={{ overflowY: "scroll", maxHeight: 500 }}>
        {searchValue && (
          <Box
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: 1,
            }}
          >
            {searchResult.length ? (
              searchResult.map((user: IUser, index: number) => (
                <Card
                  key={user.id}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",

                    "&:checked": {
                      background: "red",
                    },
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
                          {user.name.charAt(0)}
                        </Avatar>
                      }
                      subheader={parse(user.id)}
                      title={parse(user.name)}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      {user.items.map((item: string, index: number) => (
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
                        Address :{parse(user.address)}
                      </Typography>
                      <Typography variant="body2" color="grey.500">
                        Pin Code:{parse(user.pincode)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
            ) : (
              <Card>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[700] }} aria-label="recipe">
                      <ErrorIcon />
                    </Avatar>
                  }
                  title={`"${searchValue}"`}
                  subheader={"Not Found"}
                />
              </Card>
            )}
          </Box>
        )}{" "}
      </Box> */}
    </Container>
  )
}

export default SearchBar
