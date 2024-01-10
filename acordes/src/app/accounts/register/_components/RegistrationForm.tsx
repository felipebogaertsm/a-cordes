"use client";

import React from "react";

// Components:
import FormContainer from "@/components/forms/FormContainer";
import InputField from "@/components/forms/InputField";

export default function RegistrationForm() {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <FormContainer onSubmit={submitHandler}>
      <InputField label="Email" />
      <InputField label="Password" type="password" />
      <InputField label="Confirm password" type="password" />
    </FormContainer>
  );
}
