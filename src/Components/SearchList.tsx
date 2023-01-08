import { FC, useRef } from "react"
import { Box } from "@mui/material"
import { IUser } from "../Interfaces/User"
import ErrorCard from "./ErrorCard"
import ErrorIcon from "@mui/icons-material/Error"
import ListCard from "./ListCard"

interface ISearchListProps {
  searchString: string
  filteredList: IUser[]
  // activeCardIndex: number
}
const SearchList: FC<ISearchListProps> = ({
  searchString,
  filteredList,
  // activeCardIndex,
}) => {
  const resultList = useRef<HTMLElement>(null)

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
          ref={resultList}
        >
          {filteredList.length ? (
            filteredList.map((user: IUser, index: number) => {
              return (
                <ListCard
                  key={index}
                  userData={user}
                  // activeCard={activeCardIndex === index ? true : false}
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
