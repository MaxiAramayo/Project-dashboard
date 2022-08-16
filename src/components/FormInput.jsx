import { forwardRef } from "react";

const FormInput = forwardRef(
  ({ type, placeholder, onChange, onBlur, name, className }, ref) => {
    return (
      <>
        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          className={className}
        />
      </>
    );
  }
);

export default FormInput;
