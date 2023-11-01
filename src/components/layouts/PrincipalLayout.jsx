import { useEffect, useState } from "react";
import { PlaylistIcon } from "../icons/Svgs";
import PopUpAuth from "../shared/PopUpAuth";
import PopUpPlaylist from "../shared/PopUpPlaylist";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PrincipalLayout = ({ children }) => {
    const [isShowAuth, setIsShowAuth] = useState(false);
    const [isShowPlaylist, setIsShowPlaylist] = useState(false);
    
    const tracks = useSelector((store) => store.playlistCart.tracks)

    useEffect(() => {
        if (isShowPlaylist){
            if(isShowAuth) setIsShowAuth(false);
        } 
    }, [isShowPlaylist]);

    useEffect(() => {
        if (isShowAuth) {
            if(isShowPlaylist) setIsShowPlaylist(false)  
        } 
    }, [isShowAuth]);

    return (
        <section className="bg-dark font-urbanist text-white min-h-screen grid grid-rows-[auto,_1fr] bg-[url('/images/bg-mobile.png')] bg-no-repeat bg-right-bottom md:bg-[url('/images/bg-desktop.png')] transition-all">
            <header className="bg-primary-dark flex justify-between items-center p-4 uppercase">
                <Link to={"/"} className="font font-semibold sm:text-lg">Gift Music</Link>

                <div className="flex gap-1 ">
                    <button
                        onClick={() => setIsShowAuth(!isShowAuth)}
                        className={`uppercase p-2 px-4 border border-secundary rounded-full font-semibold hover:bg-primary-light transition-colors text-sm sm:text-base ${
                            isShowAuth && "bg-primary-light"
                        }`}
                    >
                        Mi cuenta
                    </button>
                    <button
                        onClick={() => setIsShowPlaylist(!isShowPlaylist)}
                        className={`uppercase p-2 px-4 border border-secundary rounded-full font-semibold hover:bg-primary-light transition-colors flex items-center gap-2 text-sm sm:text-base ${
                            isShowPlaylist && "bg-primary-light"
                        }`}
                    >
                        <PlaylistIcon />
                        <span className="hidden sm:inline">Grabando</span>{tracks.length}
                    </button>
                </div>
            </header>

            <section className="py-14 px-2">
                <main className="w-[min(480px,_100%)] sm:w-[562px] mx-auto bg-primary-dark py-8 px-4 sm:py-12 sm:px-14 rounded-3xl">
                    {children}
                </main>
            </section>

            <PopUpAuth isShowAuth={isShowAuth} />
            <PopUpPlaylist isShowPlaylist={isShowPlaylist} />
        </section>
    );
};
export default PrincipalLayout;
