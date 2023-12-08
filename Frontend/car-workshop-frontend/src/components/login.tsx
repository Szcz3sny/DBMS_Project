import React, { useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
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
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
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

      setLoginError("");
      reset();
      onLoginSuccess(data.username);
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

  return (
    <div
      className="flex justify-center items-center"
      style={{
        backgroundImage: `url(${warsztatImage})`,
        minHeight: "100vh",
        backgroundSize: "cover", // Dodane
        backgroundPosition: "center", // Dodane
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
              <div className="text-red-600 bg-red-100 border border-red-400 p-2 rounded text-center">
                {loginError}
              </div>
            )}
            <div className="space-y-1">
              <Label htmlFor="username" className="text-white">
                Nazwa użytkownika
              </Label>
              <input
                id="username"
                {...register("username", { required: true })}
                className="w-full p-2 rounded border-2 border-gray-300 text-black"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="text-white">
                Hasło
              </Label>
              <input
                id="password"
                type="password"
                {...register("password", { required: true })}
                className="w-full p-2 rounded border-2 border-gray-300 text-black"
              />
            </div>
            <Button
              type="submit"
              className="bg-red-800 text-white rounded hover:bg-red-600 transition-colors duration-150 border border-red-600 hover:border-red-700 "
            >
              Zaloguj się
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
