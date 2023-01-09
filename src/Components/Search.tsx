import SearchIcon from "@mui/icons-material/Search"
import { Box, Container } from "@mui/material"
import { FC, useState, useEffect } from "react"
import { StyledInputBase } from "../StyledComponents/Search"
import { IUser } from "../Interfaces/User"
import CloseIcon from "@mui/icons-material/Close"
import { transformMatch } from "../Utility/transformMatch"
import SearchList from "./SearchList"
import { handleFilter } from "../Utility/filterSearchMatch"

interface IProps {
  placeholder: string
  userData: IUser[]
}
const SearchBar: FC<IProps> = ({ placeholder, userData }) => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [searchResult, setSearchResult] = useState<IUser[]>([])
  const [activeCard, setActiveCard] = useState<number>(0)

  useEffect(() => {
    const result = userData
      .filter(
        (user: IUser) =>
          handleFilter(user.name, searchValue) ||
          handleFilter(user.id, searchValue) ||
          handleFilter(user.address, searchValue) ||
          handleFilter(user.pincode, searchValue)
      )
      .map((user) => {
        let name = transformMatch(user.name, searchValue)
        let id = transformMatch(user.id, searchValue)
        let address = transformMatch(user.address, searchValue)
        let pincode = transformMatch(user.pincode, searchValue)

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

    setSearchResult(result)
  }, [searchValue, userData])

  const keyboardNavigation = () => {
    document.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if (e.key === "ArrowDown" && activeCard !== searchResult.length - 1) {
          setActiveCard(activeCard + 1)
        } else if (e.key === "ArrowUp" && activeCard !== 0) {
          setActiveCard(activeCard - 1)
        }
      },
      true
    )
  }

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
        onKeyDown={keyboardNavigation}
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
        activeCardIndex={activeCard}
      />
    </Container>
  )
}

export default SearchBar
