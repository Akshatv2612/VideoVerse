import { useForm } from 'react-hook-form'
import Input from "./Input"
import Button from './Button'
import authService from '../service/auth'
import { useDispatch } from 'react-redux'
import { setError, setLoading } from '../slices/authSlice'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const [cookie, setCookie, removeCookie ] = useCookies(["user"]);
    const navigate = useNavigate()
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            username: '',
            fullname: '',
            avatar: '',
            coverimage: '',
            email: '',
            password: ''
        }
    })
    const dispatch = useDispatch()

    const submitHandler = async (data) => {
        dispatch(setLoading(true))
        const res = await authService.registerUser(data.username, data.fullname, data.avatar, data.coverimage, data.email, data.password)
        if (res.statusCode === 200) {
            const res = await authService.loginUser(data.username, data.email, data.password)

            if (res.statusCode === 200) {
                setCookie('accessToken', res.data.accessToken, { path: '/' })
                setCookie('refreshToken', res.data.refreshToken, { path: '/' })
                navigate('/')
            }
            else {
                dispatch(setError(res.message))
            }
            reset()
            navigate('/')
        }
        else {
            dispatch(setError(res.message))
        }
        reset()
        dispatch(setLoading(false))
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="mx-auto my-8 flex w-full max-w-sm flex-col px-4">
            <Input
                name="username"
                control={control}
                lable="Username"
                type="text"
                className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                align="flex-col"
                placeholder="Username"
                required={true}
                defaultValue={null}
            />
            <Input
                name="fullname"
                control={control}
                lable="Full Name"
                type="text"
                className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                placeholder="Full Name"
                required={true}
                defaultValue={null}
                align="flex-col"
            />
            <Input
                name="avatar"
                control={control}
                lable="Avatar"
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                placeholder="Avatar"
                required={true}
                defaultValue={null}
                align="flex-col"
            />
            <Input
                name="coverimage"
                control={control}
                lable="Cover Image"
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                placeholder="Cover Image"
                defaultValue={null}
                align="flex-col"
            />
            <Input
                name="email"
                control={control}
                lable="Email"
                type="text"
                className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                placeholder="Email"
                required={true}
                defaultValue={null}
                align="flex-col"
            />
            <Input
                name="password"
                control={control}
                lable="Password"
                type="text"
                className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                placeholder="Password"
                required={true}
                defaultValue={null}
                align="flex-col"
            />
            <Button type='submit' className='bg-[#ae7aff] px-4 py-3 text-black'>Sign Up</Button>
        </form>
    )
}

export default Signup