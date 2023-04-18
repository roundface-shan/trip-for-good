import React from "react";
import styles from "./Register.module.css";
import { UserLayout } from "../../layouts/userLayout";
import { RegisterForm } from "./RehisterForm";

export const RegisterPage: React.FC = () => {
    return (
        <UserLayout>
            <RegisterForm />
        </UserLayout>
    );
};