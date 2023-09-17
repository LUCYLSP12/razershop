import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import s from "./Authorization.module.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { GetContext } from "../context/Context";
import { InputTextField } from "../components/UI/InputTextField";

export const Login = () => {
  const { user, setUser } = GetContext();

  const URL = "http://localhost:4090/login";
  const navigate = useNavigate();

  // console.log(user);

  const loginSchema = object({
    email: string()
      .nonempty("Email обязателен к заполнению")
      .email("введите валидный email"),
    password: string()
      .nonempty("Пароль обязателен к заполнению")
      .min(2, "Пароль должен состоять не менее 3 символов!")
      .max(32, "Пароль должен состоять не больше 32 символов!"),
  });

  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit, reset } = methods;

  const onLoginSubmit = async (userLogin) => {
    try {
      const { data } = await axios.post(URL, userLogin);
      // console.log(res);
      setUser({
        token: data.accessToken,
        ...data.user,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.accessToken,
          ...data.user,
        })
      );
      toast.success("вы успешно вошли!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // console.log(data);
      reset();
      navigate("/");

    } catch (err) {
      toast.error(err.response.data, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className={s.auth}>
      <Container fixed>
        <div className={s.auth_content}>
          <Typography variant="h5" gutterBottom className={s.auth_title}>
            Логин
          </Typography>

          <FormProvider {...methods}>
            <form
              className={s.auth_form}
              onSubmit={handleSubmit(onLoginSubmit)}
            >
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

              <Button
                variant="contained"
                type="submit"
                sx={{ marginBottom: 1 }}
              >
                Войти
              </Button>

              <Typography variant="caption" display="block" gutterBottom>
                Не зарегестрированы?
                <Link to="/registr" className={s.form_link}>
                  Зарегайтесь
                </Link>
              </Typography>
            </form>
          </FormProvider>
        </div>
      </Container>
    </div>
  );
};