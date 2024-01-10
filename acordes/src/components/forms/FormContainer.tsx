import React from "react";

type FormContainerProps = React.HTMLProps<HTMLFormElement>;

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <form className="flex flex-col gap-3" {...props}>
      {children}
    </form>
  );
};

export default FormContainer;
