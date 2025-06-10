import { useForm, SubmitHandler } from "react-hook-form"
import "./formLogin.css"
import { login } from "@/app/services/login";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/app/context/user.context";


interface Data  {
  dni: number;
}

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Data>();
  const router = useRouter();
  const {userData, setUserData } = useContext(UserContext);



  const onSubmit: SubmitHandler<Data> = async (data) => {
    //Llama a el backend para generar el login
    const resp = await login(data);

    //Si hay un error de usuario no autorizado o usuario inexistente, muestra mensaje en pantalla
    if (resp.length != 0) {
      //Guardo la info del usuario en el contexto
      setUserData(resp);
    }
    router.push('/client')

  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column  my-3 d-grid gap-2 col-6 mx-auto">
        <input placeholder="DNI" type="number" className="btn-style rounded p-1 btn-dni"
          {...register("dni", {
            required: "Por favor ingrese su DNI",
            minLength: { value: 6, message: "Ingrese un numero de DNI valido" },
            maxLength: { value: 8, message: "Ingrese un numero de DNI valido" }
          })} />
        {errors.dni && <small className="fw-light">{errors.dni?.message}</small>}

        <button type="submit" className="btn-style rounded p-1" >Ingresar</button>
      </form>
    </div>
  )
}