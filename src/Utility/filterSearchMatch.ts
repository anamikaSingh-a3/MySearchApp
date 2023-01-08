import { IUser } from "../Interfaces/User"
import { user } from "../API/user"
import { transformMatch } from "./transformMatch"

export const handleFilter = (stringValue: string, searchValue: string) =>
  stringValue.toLowerCase().includes(searchValue.toLowerCase())

// export const handleFilterData = (userData: IUser[], searchValue: string) =>
// userData.filter((user: IUser)=> handleFilter(user.id,searchValue))

export const handleFilterItems = (items: string[], searchValue: string) => {
  const result = items
    .filter((item: string) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item: string) => item)
  console.log("Item", result)
  return result
}

export const handleUserFilter = (user: IUser[], searchValue: string) =>
  user.filter(
    (user: IUser) =>
      handleFilterItems(user.items, searchValue) ||
      handleFilter(user.id, searchValue) ||
      handleFilter(user.name, searchValue) ||
      handleFilter(user.address, searchValue) ||
      handleFilter(user.pincode, searchValue)
  )
