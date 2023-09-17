import { Avatar, Button, Container, Typography } from "@mui/material"
import s from "./Authorization.module.scss"
import pImg from "../assets/ps.jpg"
import { object, string } from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { InputTextField } from "../components/UI/InputTextField"
import {zodResolver} from '@hookform/resolvers/zod'
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { GetContext } from "../context/Context"
import axios from "axios"


export const Regsiter = () => {
  const {user, setUser} = GetContext()
  const navigate = useNavigate();
  const USERS_URL = "http://localhost:4090/users/register"

  console.log(user);

  const registerSchema = object({
    name: string().nonempty('Имя обязателен к заполнение')
    .min(2, "Имя min 3 bukfi")
    .max(32, "Имя не должно составлать болше 32 букв"),
    email: string()
    .nonempty("Email обезательно к заполнению")
    .email("введите валидный email"),
    password: string().nonempty("пароль обязательно к заполнению")
    .min(2, "пароль мин 3")
    .max(32, "пароль не должен составлять больше 32"),
   passwordConfirm: string().nonempty("поле обязательно к заполнению"),
  }).refine((data)=> data.password ===data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "пароли не совпадают",
  })

  const methods = useForm({
    resolver: zodResolver(registerSchema)
  });

  const{handleSubmit, reset} = methods

  const onRegisterSubmit = async (newUser)=> {
    try {

      const {passwordConfirm, ...rest} = newUser;
      const {data} = await axios.post(USERS_URL, rest)
    

      setUser({
        token: data.accessToken,
        ...data.user,
    })

    localStorage.setItem('user', JSON.stringify({
      token: data.accessToken,
      ...data.user,
  }))

      toast.success('🦄 Вы успешно зарегистрировались!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        reset();
        navigate('/')
    } catch (err) {
      toast.error('err.response.data', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      console.log(err);
    }


   
  }

  return (
	 <div className={s.auth}>
    <Container fixed>
      <div className={s.auth_content}>
      <Typography variant="h5" gutterBottom className={s.auth_title}>
        Регистрация
      </Typography>

<FormProvider {...methods}>
<form 
className={s.auth_form}
onSubmit={handleSubmit(onRegisterSubmit)}
>
        <div className={s.form_img}>
        <Avatar
        alt="profile"
        src={pImg}
        sx={{ width: 70, height: 70 }}
      />
        </div>

          <InputTextField 
          name="name" 
          label="Имя" 
          size="small" 
          margin="dense" 
          />


          <InputTextField 
          name="email" 
          label="Email" 
          size="small" 
          margin="dense" 
          />


          <InputTextField 
          name="password" 
          label="Пароль" 
          size="small" 
          margin="dense" 
          type="password"
          />

          <InputTextField 
          name="passwordConfirm" 
          label="Пароль" 
          size="small" 
          margin="dense" 
          type="password"
          sx={{marginBottom: 4}}
           /> 
          <Button variant="contained" type="submit" sx={{marginBottom: 1}}>
            Зарегаться
            </Button>

            <Typography variant="caption" display="block" gutterBottom >
            уже зарегистрировыны?
            <Link to='/login' className={s.form_link}>Войдите</Link>
          </Typography>

      </form>
</FormProvider>
      </div>
    </Container>
   </div>
  )
}
