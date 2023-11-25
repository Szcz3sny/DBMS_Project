import React, { useState }  from "react";
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";
import warsztatImage from "./img/warsztatTło.png";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [loginError, setLoginError] = useState('');
  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      const response = await axios.post('https://api.bazydanych.fun/v1/user/login', {
        login: data.username,
        password: data.password,
        remember: true
      });

      setLoginError('');
      reset();
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setLoginError('Błędny login lub hasło');
        console.error('Błąd logowania', error.response?.data);
      } else {
        console.error('Nieznany błąd', error);
      }
    }
  };

  return (
<div
    className="flex justify-center items-center"
    style={{ 
      backgroundImage: `url(${warsztatImage})`, 
      minHeight: "100vh",
      backgroundSize: "cover", // Dodane
      backgroundPosition: "center" // Dodane
    }}
    >
        <Card style={{ maxWidth: '400px' }}>
        <CardHeader>
          <CardTitle>Logowanie</CardTitle>
          <CardDescription>Wprowadź swoje dane logowania poniżej.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {loginError && (
             <div className="text-red-600 bg-red-100 border border-red-400 p-2 rounded text-center"> 
             {loginError}
            </div> )}
            <div className="space-y-1">
              <Label htmlFor="username">Nazwa użytkownika</Label>
              <input 
                id="username"
                {...register("username", { required: true })}
                className="w-full p-2 rounded border-2 border-gray-300 text-black"
              />
              {errors.username && <span style={{ color: 'white' }}>To pole jest wymagane</span>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Hasło</Label>
              <input 
                id="password" 
                type="password" 
                {...register("password", { required: true })}
                className="w-full p-2 rounded border-2 border-gray-300 text-black"
              />
              {errors.password && <span style={{ color: 'white' }}>To pole jest wymagane</span>}
            </div>
            <Button type="submit">Zaloguj się</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
