import React, { useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import warsztatImage from "./img/warsztatTło.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

type FormData = {
  username: string;
  password: string;
};

interface LoginProps {
  onLoginSuccess: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
<<<<<<< HEAD
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
=======
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [loginError, setLoginError] = useState("");


>>>>>>> 943ac0c (Panel uzytkownika, poprawa formularza logowania, zmiana wygladu formularza, dodanie podstron)
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post(
        "https://api.bazydanych.fun/v1/user/login",
        {
          login: data.username,
          password: data.password,
          remember: true,
        }
      );
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', data.username);

      setLoginError("");
      reset();
      onLoginSuccess(data.username);
      navigate('/dashboard');
  
      console.log(response.data);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setLoginError("Błędny login lub hasło");
        console.error("Błąd logowania", error.response?.data);
      } else {
        console.error("Nieznany błąd", error);
      }
    }
  };
  
  const inputContainerStyle: React.CSSProperties = {
    position: 'relative',
  };
  const errorMessageStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '-20px',
    left: '0',
    right: '0',
    color: '#f44336', // Czerwony kolor tekstu dla lepszej widoczności
    fontSize: '0.75rem', // Nieco mniejsza czcionka
    textAlign: 'center', // Tekst wyśrodkowany
    textShadow: '0px 0px 3px rgba(0,0,0,0.3)',
  };
  const errorBoxStyle: React.CSSProperties = {
    color: 'white',
    backgroundColor: 'rgba(255, 0, 0, 0.75)',
    padding: '10px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '20px',
  };
  

  return (
    <div
      className="flex justify-center items-center"
      style={{
        backgroundImage: `url(${warsztatImage})`,
        minHeight: "100vh",
        backgroundSize: "cover", 
        backgroundPosition: "center",
      }}
    >
      <Card style={{ maxWidth: "400px" }} className="bg-black">
        <CardHeader>
          <CardTitle className="text-white">Logowanie</CardTitle>
          <CardDescription className="text-white">
            Wprowadź swoje dane logowania poniżej.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {loginError && (
              <div style={errorBoxStyle}>
                {loginError}
              </div>
            )}
<<<<<<< HEAD
            <div className="space-y-1">
              <Label htmlFor="username" className="text-white">
                Nazwa użytkownika
              </Label>
=======
            <div className="space-y-1" style={inputContainerStyle}>
              <Label htmlFor="username">Nazwa użytkownika</Label>
>>>>>>> 943ac0c (Panel uzytkownika, poprawa formularza logowania, zmiana wygladu formularza, dodanie podstron)
              <input
                id="username"
                {...register("username", { required: true })}
                className="w-full p-2 rounded border-2 border-gray-300 text-black"
              />
<<<<<<< HEAD
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="text-white">
                Hasło
              </Label>
=======
              <span style={errorMessageStyle}>
                {errors.username && "To pole jest wymagane"}
              </span>
            </div>
            <div className="space-y-1" style={inputContainerStyle}>
              <Label htmlFor="password">Hasło</Label>
>>>>>>> 943ac0c (Panel uzytkownika, poprawa formularza logowania, zmiana wygladu formularza, dodanie podstron)
              <input
                id="password"
                type="password"
                {...register("password", { required: true })}
                className="w-full p-2 rounded border-2 border-gray-300 text-black"
              />
<<<<<<< HEAD
            </div>
            <Button
              type="submit"
              className="bg-red-800 text-white rounded hover:bg-red-600 transition-colors duration-150 border border-red-600 hover:border-red-700 "
            >
              Zaloguj się
            </Button>
=======
              <span style={errorMessageStyle}>
                {errors.password && "To pole jest wymagane"}
              </span>
            </div>

            <div style={{ marginTop: '24px' }}> 
            <Button type="submit">Zaloguj się</Button></div>
>>>>>>> 943ac0c (Panel uzytkownika, poprawa formularza logowania, zmiana wygladu formularza, dodanie podstron)
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
