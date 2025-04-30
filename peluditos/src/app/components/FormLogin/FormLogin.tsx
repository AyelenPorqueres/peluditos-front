import { useForm, SubmitHandler } from "react-hook-form"
import "./formLogin.css"


type Inputs = {
  dni: number;
}

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

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