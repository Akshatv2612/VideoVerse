import LoginUser from "../components/Login.jsx"
import { useSelector } from "react-redux"
import Loading from "../components/popups/Loading.jsx"
import Logo from '../components/icons/Logo.jsx'
import {Link} from "react-router-dom"
import {useEffect,useRef} from "react"

function Signup(){
    const {error, loading} = useSelector(state => state.auth)
    const topRef = useRef(null);

    useEffect(() => {
        if (error && topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth'});
        }
    }, [error]);

    return (
        <div className="h-screen w-full overflow-y-auto bg-[#121212] text-white items-center flex flex-col py-20">
            <div ref={topRef}></div>
            {loading && <Loading msg={"Login please wait.."}/>}
            <Logo height={100} width={100}/>
            <div className="mt-4 flex flex-col items-center">
                <h1 className='text-2xl'>Login</h1>
                <p className="mt-2 mx-2 text-center text-sm">
                    Don't have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
            <p className='text-red-600'>{error}</p>
            <LoginUser/>
        </div>
    )
}

export default Signup