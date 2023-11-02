import { useEffect, useRef, useState } from "react";
import {
    DeleteIcon,
    EditIcon,
    SaveIcon,
    ShareIccon,
} from "../components/icons/Svgs";
import PrincipalLayout from "../components/layouts/PrincipalLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosMusic } from "../utils/configAxios";
import TrackCard from "../components/shared/TrackCard";

const PlaylistDetail = () => {
    const [isShowFront, setIsShowFront] = useState(true);
    const [playlist, setPlaylist] = useState(null);

    const { id } = useParams();
    const formRef = useRef(null);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            title: e.target.title.value ,
            to : e.target.to.value ,
            message: e.target.message.value,
        }
        axiosMusic
            .patch(`/api/playlists/${id}`, data)
            .then(() => {
                alert("playlist actualizada correctamente")
            })
            .catch((err) => console.log(err))
    };

    const deleteTrack = (idTrack) => {
        axiosMusic
            .delete(`/api/playlists/${playlist.id}/tracks/${idTrack}`)
            .then(() => {
                const playlistCopy = structuredClone(playlist)
                playlistCopy.tracks = playlistCopy.tracks.filter((track) => track.id !== idTrack)
                setPlaylist(playlistCopy)
            } )
            .catch((err) => console.log(err))
    }

    const deletePlaylist = () => {
        axiosMusic
            .delete(`/api/playlists/${playlist.id}`)
            .then(() => {
                alert("Playlist eliminada correctamente")
                navigate("/playlists")
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        axiosMusic
            .get(`/api/playlists/${id}`)
            .then(({ data }) => {
                setPlaylist(data);
                formRef.current.message.value = data.message;
                formRef.current.to.value = data.to;
                formRef.current.title.value = data.title;
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <PrincipalLayout>
            <form
                onSubmit={handleSubmit}
                ref={formRef}
                className="top-24 uppercase grid justify-center gap-1 rounded-md font-semibold transition-all"
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
                        <button
                            type="submit"
                            className="absolute bottom-4 left-5 border-2 rounded-full p-[3px]"
                        >
                            <SaveIcon />
                        </button>
                        <button onClick={deletePlaylist}
                            type="button"
                            className="absolute bottom-4 left-[60px] border-2 rounded-full p-[3px]"
                        >
                            <DeleteIcon />
                        </button>
                        <Link to={`/playlists/public/${playlist?.id}`}
                            type="button"
                            className="absolute bottom-4 right-5 border-2 rounded-full p-[3px]"
                        >
                            <ShareIccon />
                        </Link>
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
            </form>

            <section>
                {
                    playlist?.tracks.map((track) => <TrackCard key={track.id} track={track} deleteButton={deleteTrack}/>)
                }
            </section>
        </PrincipalLayout>
    );
};
export default PlaylistDetail;
