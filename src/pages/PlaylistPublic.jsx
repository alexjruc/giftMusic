import { Link, useParams } from "react-router-dom";
import { ShareIccon } from "../components/icons/Svgs";
import PublicLayout from "../components/layouts/PublicLayout";
import { useEffect, useState } from "react";
import { axiosMusic } from "../utils/configAxios";
import TrackCard from "../components/shared/TrackCard";
import SpotitySong from "../components/shared/SpotitySong";

const PlaylistPublic = () => {
    const [isShowFront, setIsShowFront] = useState(true);
    const [playlist, setPlaylist] = useState(null);
    const [currentSong, setCurrentSong] = useState(null)

    const { id } = useParams();

    

    useEffect(() => {
        axiosMusic
            .get(`/api/playlists/${id}`)
            .then(({ data }) => setPlaylist(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <PublicLayout>
            <article className="top-24 grid justify-center gap-1 rounded-md font-semibold transition-all">
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
                        </div>

                        <Link
                            to={`/playlists/public/${playlist?.id}`}
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
            </article>

            {
                currentSong && <SpotitySong idTrack={currentSong} />
            }

            <section>
                {playlist?.tracks.map((track) => (
                    <TrackCard key={track.id} track={track} />
                ))}
            </section>
        </PublicLayout>
    );
};
export default PlaylistPublic;
