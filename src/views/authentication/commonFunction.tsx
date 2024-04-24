import APP_ROUTES from "src/routes/routePaths"
import { useNavigate } from "react-router"

const GotoHomePage:any = () =>{
    const navigate = useNavigate()
      navigate(`${APP_ROUTES.ADMIN_DASHBOARD}`)
  }

  export default GotoHomePage;