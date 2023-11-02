import { useParams } from "react-router-dom";
import { PlusIccon, ShareIccon } from "../components/icons/Svgs";
import PublicLayout from "../components/layouts/PublicLayout";
import { useEffect, useState } from "react";
import { axiosMusic } from "../utils/configAxios";
import TrackCard from "../components/shared/TrackCard";
import SpotitySong from "../components/shared/SpotitySong";

const PlaylistPublic = () => {
    const [isShowFront, setIsShowFront] = useState(true);
    const [playlist, setPlaylist] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);

    const { id } = useParams();

    const playTrack = (idTrack) => {
        setCurrentSong(idTrack)
    }

    const handleCopyUrl = () => {
        const currentUrl = window.location.href
        navigator.clipboard.writeText(currentUrl).then(() => alert("copiado correctamente"))
    }

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
                            <h3 className="bg-transparent flex-1 outline-none text-black ">
                                {playlist?.title}
                            </h3>
                        </div>

                        <button
                        onClick={handleCopyUrl}
                            type="button"
                            className="absolute bottom-4 right-14 border-2 rounded-full p-[3px]"
                        >
                            <ShareIccon />
                        </button>
                        <button className="absolute bottom-4 right-5 border-2 rounded-full p-[3px]">
                            <PlusIccon/>
                        </button>
                    </div>

                    <div className="absolute top-0  back">
                        <img src="/images/cassette.png" alt="cassette" />
                        <div className="bg-white flex p-1 items-center rounded-md w-[198px] absolute top-[15px] left-[20px] gap-1 text-sm">
                            <span className="bg-transparent flex-1 outline-none text-black ">
                                {playlist?.to}
                            </span>
                        </div>
                        <div className="bg-white p-1  rounded-md w-[198px] absolute top-[50px] left-[20px] gap-1 text-sm text-black h-[100px] overflow-y-auto">
                            <p>{playlist?.message}</p>
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

            {currentSong && <SpotitySong idTrack={currentSong} />}

            <section>
                {playlist?.tracks.map((track) => (
                    <TrackCard key={track.id} track={track} playTrack={playTrack} />
                ))}
            </section>
        </PublicLayout>
    );
};
export default PlaylistPublic;
