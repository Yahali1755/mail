import axios from "axios";

import { AuthData } from "@mail/common";

import { UserFormData } from "../exterior/UserForm";

export const setToken = (token: string) => localStorage.setItem("token", token);

export const loginRequest = async (user: UserFormData) => await axios.post<AuthData>("/auth/login", user)

export const registerRequest = async (user: UserFormData) => await axios.post<AuthData>("/auth/register", user)

export const ensureEmailUniquenessRequest = async (email: string) => await axios.post("/auth/validate-email/register", { email })

export const me = async (token: string) => 
    await axios.get<AuthData>("/auth/me", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })