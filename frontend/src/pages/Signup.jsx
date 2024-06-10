import SignupUser from "../components/Signup"
import { useSelector } from "react-redux"
import Loading from "../components/popups/Loading.jsx"
import Logo from "../components/icons/Logo.jsx"
import { Link } from "react-router-dom"
import { useEffect,useRef } from "react"

function Signup() {
    const { isLoggedIn, user, error, loading } = useSelector(state => state.auth)
    const topRef = useRef(null);

    useEffect(() => {
        if (error && topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth'});
        }
    }, [error]);

return (
    <div className="h-screen w-full overflow-y-auto bg-[#121212] text-white items-center flex flex-col py-20">
        <div ref={topRef}></div>
        {loading && <Loading msg={"Registering please wait.."} />}
        <Logo height={100} width={100} />
        <div className="mt-4 flex flex-col items-center">
            <h1 className='text-2xl'>Sign Up</h1>
            <p className="mt-2 mx-2 text-center text-sm">
                Already have any account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Login
                </Link>
            </p>
        </div>
        <p className='text-red-600'>{error}</p>
        <SignupUser />
    </div>
)
}

export default Signup