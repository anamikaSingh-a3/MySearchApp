import ErrorCard from "./Cards/ErrorCard"
import ErrorIcon from "@mui/icons-material/Error"
import ListCard from "./Cards/ListCard"
import { Box } from "@mui/material"
import { FC } from "react"
import { IUser } from "../Interfaces/User"

interface ISearchListProps {
  searchString: string
  searchResult: IUser[]
  activeCardIndex: number
}
const SearchList: FC<ISearchListProps> = ({
  searchString,
  searchResult,
  activeCardIndex,
}) => {
  return (
    <Box sx={{ overflowY: "scroll", maxHeight: 500 }}>
      {searchString && (
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
            searchResult.map((user: IUser, index: number) => {
              return (
                <ListCard
                  key={index}
                  userData={user}
                  activeCard={activeCardIndex === index ? true : false}
                  searchString={searchString}
                />
              )
            })
          ) : (
            <ErrorCard
              title={searchString}
              message={"Not Found"}
              icon={<ErrorIcon />}
            />
          )}
        </Box>
      )}
    </Box>
  )
}

export default SearchList
