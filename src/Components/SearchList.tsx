import { FC, useEffect, useRef, useState } from "react"
import { Box } from "@mui/material"
import { IUser } from "../Interfaces/User"
import ErrorCard from "./ErrorCard"
import ErrorIcon from "@mui/icons-material/Error"
import ListCard from "./ListCard"
import { useKeyPress } from "../Utility/keyPress"

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
  // const resultList = useRef<HTMLElement>(null)
  // @ts-ignore
  const useKeyPress = function (targetKey) {
    const [keyPressed, setKeyPressed] = useState(false)

    // @ts-ignore
    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true)
      }
    }

    // @ts-ignore
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false)
      }
    }

    useEffect(() => {
      window.addEventListener("keydown", downHandler)
      window.addEventListener("keyup", upHandler)

      return () => {
        window.removeEventListener("keydown", downHandler)
        window.removeEventListener("keyup", upHandler)
      }
    })

    return keyPressed
  }

  const [cursor, setCursor] = useState(0)
  const [hovered, setHovered] = useState<undefined | IUser>(undefined)
  const [selected, setSelected] =
    useState<React.SetStateAction<undefined | IUser>>(undefined)
  const downPress = useKeyPress("ArrowDown")
  const upPress = useKeyPress("ArrowUp")
  const enterPress = useKeyPress("Enter")

  useEffect(() => {
    if (filteredList.length && downPress) {
      setCursor((prevState) =>
        prevState < filteredList.length - 1 ? prevState + 1 : prevState
      )
    }
  }, [downPress, filteredList.length])
  useEffect(() => {
    if (filteredList.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState))
    }
  }, [filteredList.length, upPress])
  useEffect(() => {
    if (filteredList.length && enterPress) {
      setSelected(filteredList[cursor])
    }
  }, [cursor, enterPress, filteredList])
  useEffect(() => {
    if (filteredList.length && hovered) {
      setCursor(filteredList.indexOf(hovered))
    }
  }, [filteredList, hovered])

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
          // ref={resultList}
        >
          <span>Selected: {selected ? selected.name : "none"}</span>
          {filteredList.length ? (
            filteredList.map((user: IUser, index: number) => {
              return (
                <ListCard
                  key={user.id}
                  userData={user}
                  // activeCard={activeCardIndex === index ? true : false}
                  active={index === cursor}
                  setSelected={setSelected}
                  setHovered={setHovered}
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
