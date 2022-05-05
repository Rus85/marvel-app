import { Link } from "react-router-dom"
import ErrorMessage from "../errorMessage/ErrorMessage"


const Page404 = () => {
    return(
        <div>
            <ErrorMessage/>
            <p style={{textAlign: "center"}}>Page does not exist</p>
            <Link style={{display: 'block', textAlign: 'center', marginTop: '10px', textDecoration: 'underline'}} to='/'>Back to main page</Link>
        </div>
    )
}

export default Page404