import Nav from "@/components/Navbar1"
import { ReactNode } from "react"

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <Nav/>
        {children}
    </div>
  )
}
export default layout