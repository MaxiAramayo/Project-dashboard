import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { firebaseErrors } from "../utils/firebaseErrors";
import FormErrors from "../components/FormErrors";
import FormInput from "../components/FormInput";
import { formValidate } from "../utils/formValidate";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const { required, patternEmail, validateTrim } = formValidate();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },

    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code);

      const { code, message } = firebaseErrors(error.code);

      setError(code, {
        message: message,
      });
    }
  };

  const redirect = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="container mx-auto">
          <h1 className="mb-5 text-xl font-semibold text-center text-white">
            Login
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-4/6 gap-5 mx-auto"
          >
            <FormInput
              type="email"
              placeholder="Ingrese email"
              className="p-2 border-2 rounded-xl border-slate-700"
              {...register("email", {
                required: required,
                pattern: patternEmail,
              })}
            />
            <FormErrors error={errors.email} />

            <FormInput
              type="password"
              placeholder="Ingrese password"
              className="p-2 border-2 rounded-xl border-slate-700"
              {...register("password", {
                required: required,
                validate: validateTrim,
              })}
            />

            <FormErrors error={errors.password} />
            <button
              className="p-3 text-white rounded-full bg-slate-700"
              type="submit"
            >
              Login
            </button>
            <button
              className="p-3 text-white rounded-full bg-slate-700"
              type="button"
              onClick={redirect}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
