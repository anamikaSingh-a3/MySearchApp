export const handleFilter = (stringValue: string, searchValue: string) =>
  stringValue.toLowerCase().includes(searchValue.toLowerCase())
