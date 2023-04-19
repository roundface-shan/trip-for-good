import React from "react";
import styles from "./SignPage.module.css";
import { UserLayout } from "../../layouts/userLayout";
import { SignInForm } from "./SigninForm";

export const SigninPage: React.FC = () => {
  return (
    <UserLayout>
      <SignInForm />
    </UserLayout>
  );
};
