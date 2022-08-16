import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormErrors from "../components/FormErrors";
import FormInput from "../components/FormInput";
import { UserContext } from "../context/UserProvider";
import { firebaseErrors } from "../utils/firebaseErrors";
import { formValidate } from "../utils/formValidate";

const Register = () => {
  const { registerUser } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim, validateSamePass } =
    formValidate();

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);
      navigate("/login", )
    } catch (error) {
      console.log(error.code);
      const { code, message } = firebaseErrors(error.code);

      setError(code, {
        message: message,
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="container mx-auto">
          <h1 className="mb-5 text-xl font-bold text-center text-white">
            Register
          </h1>

          <form
            className="flex flex-col w-4/6 gap-5 mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              className="p-2 border-2 rounded-xl border-slate-700"
              type="email"
              placeholder="Ingrese un email"
              {...register("email", {
                required: required,
                pattern: patternEmail,
              })}
            />

            <FormErrors error={errors.email} />

            <FormInput
              type="password"
              placeholder="Ingrese contraseña"
              className="p-2 border-2 rounded-xl border-slate-700"
              {...register("password", {
                minLength: minLength,
                required: required,
                validate: validateTrim,
              })}
            />

            <FormErrors error={errors.password} />

            <FormInput
              type="password"
              placeholder="Confirme la contraseña"
              className="p-2 border-2 rounded-xl border-slate-700"
              {...register("passwordConfirm", {
                validate: validateSamePass(getValues("password")),
              })}
            />

            <FormErrors error={errors.passwordConfirm} />

            <button
              className="p-3 text-white rounded-full bg-slate-700"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
