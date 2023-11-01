import { Link, useNavigate } from "react-router-dom";
import ContainerAuth from "../components/layouts/ContainerAuth";
import { loginThunk } from "../store/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Login = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const token = useSelector((store) => store.user.token)

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        dispatch(loginThunk(data));
    };

    useEffect(() => {
        if(token !== ""){
            navigate("/")
        }
    },[token]);

    return (
        <ContainerAuth>
            <picture>
                <img
                    src="/images/login.png"
                    alt="banner register"
                    className="hidden h-[480px] rounded-2xl md:block"
                />
            </picture>

            <form
                onSubmit={handleSubmit}
                className="[&>label]:grid [&>label]:gap-8 grid gap-6 w-[min(100%,_300px)] mx-auto"
            >
                <h1 className="text-3xl uppercase font-semibold">
                    Iniciar sesión
                </h1>

                <label>
                    <span className="text-white/40 text-sm">E-mail</span>
                    <input
                        name="email"
                        type="email"
                        className="bg-transparent outline-none border-b border-secundary"
                    />
                </label>

                <label>
                    <span className="text-white/40 text-sm">Contraseña</span>
                    <input
                        name="password"
                        type="password"
                        className="bg-transparent outline-none border-b border-secundary"
                    />
                </label>

                <button
                    type="submit"
                    className="bg-primary-light hover:tracking-widest transition-all rounded-full py-1 px-10 max-w-max mx-auto uppercase text-sm font-semibold shadow-lg shadow-purple-400/40 mt-6"
                >
                    Entrar
                </button>
                <Link to="/register" className="text-center underline">
                    O crear una cuenta nueva
                </Link>
            </form>
        </ContainerAuth>
    );
};
export default Login;
