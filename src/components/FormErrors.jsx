const FormErrors = ({ error }) => {
  return <>{error && <p className="text-red-500">{error.message}</p>}</>;
};

export default FormErrors;
