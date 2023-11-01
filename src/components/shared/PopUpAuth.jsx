import { Link } from "react-router-dom";
import { LogoutIcon, NavPlayIcon } from "../icons/Svgs";
import { UserLogOut } from "../../store/slices/user.slice";
import { useDispatch } from "react-redux";

const PopUpAuth = ({isShowAuth}) => {

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(UserLogOut());
    };

    return (
        <nav className={`fixed top-24 bg-primary-light uppercase grid p-4 gap-1 rounded-md font-semibold border border-secundary ${isShowAuth ? "right-10" : "-right-full"} transition-all`}>
            <Link
                to="/playlists"
                className=" flex gap-2 hover:text-[#3e14b5] items-center group transition-colors"
            >
                <NavPlayIcon />
                Mis grabaciones
            </Link>
            <button
                onClick={handleLogOut}
                className="uppercase flex gap-2 hover:text-[#3e14b5] items-center group transition-colors "
            >
                <LogoutIcon />
                Cerrar sesión
            </button>
        </nav>
    );
};
export default PopUpAuth;
