import { useState } from "react";
import "./PopUpPlaylist.css";
import { EditIcon } from "../icons/Svgs";
import { useDispatch, useSelector } from "react-redux";
import TrackCard from "./TrackCard";
import { axiosMusic } from "../../utils/configAxios";
import { clearTracks } from "../../store/slices/playlistCart.slice";

const PopUpPlaylist = ({ isShowPlaylist }) => {
    const [isShowFront, setIsShowFront] = useState(true);

    const tracks = useSelector((store) => store.playlistCart.tracks)

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            title : e.target.title.value,
            to: e.target.to.value,
            message: e.target.message.value,
            tracks: tracks,
        }

        axiosMusic
            .post("/api/playlists", data)
            .then(() => {
                e.target.reset()
                dispatch(clearTracks())
                alert("Playlist creada de manera exitosa")
            })
            .catch((err) => console.log(err))
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`fixed z-20 top-24 bg-primary-light uppercase grid p-4 gap-1 rounded-md font-semibold border border-secundary ${
                isShowPlaylist ? "right-10" : "-right-full"
            } transition-all`}
        >
            <div
                className={`relative cassette ${
                    isShowFront ? "front" : "back"
                }`}
            >
                <div className="front">
                    <img src="/images/cassette.png" alt="cassette" />
                    <div className="bg-white flex p-1 items-center rounded-md w-[198px] absolute top-[15px] left-[20px] gap-1 text-sm">
                        <input
                            className="bg-transparent flex-1 outline-none text-black "
                            placeholder="Título"
                            id="title"
                            type="text"
                            size={15}
                        />
                        <label htmlFor="title">
                            <EditIcon />
                        </label>
                    </div>
                </div>

                <div className="absolute top-0  back">
                    <img src="/images/cassette.png" alt="cassette" />
                    <div className="bg-white flex p-1 items-center rounded-md w-[198px] absolute top-[15px] left-[20px] gap-1 text-sm">
                        <input
                            className="bg-transparent flex-1 outline-none text-black "
                            placeholder="Destinatario"
                            id="to"
                            type="text"
                            size={15}
                        />
                        <label htmlFor="to">
                            <EditIcon />
                        </label>
                    </div>
                    <div className="bg-white flex p-1 items-center rounded-md w-[198px] absolute top-[50px] left-[20px] gap-1 text-sm">
                        <textarea
                            rows={4}
                            name="message"
                            className="resize-none outline-none text-black"
                            placeholder="Mensaje"
                        />
                    </div>
                </div>
            </div>

            <button
                className="border-2 border-white uppercase p-2 px-4 rounded-full max-w-max mx-auto hover:text-secundary hover:border-secundary transition-colors"
                onClick={() => setIsShowFront(!isShowFront)}
                type="button"
            >
                {isShowFront ? "Lado B" : "Lado A"}
            </button>

            <section className="normal-case font-normal w-[238px] max-h-[170px] overflow-y-auto">
                {
                    tracks.map((track) => <TrackCard key={track.id} track={track} imageSize="sm" showMinusButton /> )
                }
            </section>

            <button className="border-2 border-white uppercase p-2 px-4 rounded-full max-w-max mx-auto hover:text-secundary hover:border-secundary transition-colors">
                Crear
            </button>
        </form>
    );
};
export default PopUpPlaylist;
