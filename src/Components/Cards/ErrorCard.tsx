import { Avatar, Card, CardHeader } from "@mui/material"
import { FC } from "react"
import { red } from "@mui/material/colors"

interface IErrorCardProps {
  title: string
  message: string
  icon: JSX.Element
}
const ErrorCard: FC<IErrorCardProps> = ({ title, message, icon }) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[700] }} aria-label="error-card">
            {icon}
          </Avatar>
        }
        title={`"${title}"`}
        subheader={message}
      />
    </Card>
  )
}

export default ErrorCard
