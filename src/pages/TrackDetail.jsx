import { useEffect, useState } from "react";
import PrincipalLayout from "../components/layouts/PrincipalLayout";
import { Link, useParams } from "react-router-dom";
import TrackCard from "../components/shared/TrackCard";
import { axiosMusic } from "../utils/configAxios";

const TrackDetail = () => {
    const [track, setTrack] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        
        axiosMusic
            .get(`/api/tracks/${id}`)
            .then(({ data }) => setTrack(data))
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <PrincipalLayout>
            <Link to={-1} className="text-secundary pb-12">{"<"} Atrás</Link>
            <header className="grid gap-4 pb-8 pt-4 sm:grid-cols-2 sm:items-start">
                <picture>
                    <img src={track?.album.images[1].url} alt="track image" className="block mx-auto rounded-2xl" />
                </picture>
                <ul className="grid gap-1">
                    <li>
                        <h3 className="font-semibold">{track?.name}</h3>
                    </li>
                    <li>
                        <ul className="flex gap-2">
                            {track?.artists.slice(0, 2).map((artist, index, array) => (
                                <li key={artist.id} className="hover:underline hover:text-secundary transition-colors">
                                    <Link to={`/artists/${artist.id}`}
                                    className="text-white/40 line-clamp-1">
                                        {artist.name}
                                        {array.length - 1 !== index && ","}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="text-white/40">
                        <span className="font-semibold text-white">Albúm : </span>
                        {track?.album.name}
                    </li> 
                    <li className="text-white/40">
                        <span className="font-semibold text-white">Fecha de salida : </span>
                        {track?.album.release_date}
                    </li>
                </ul>
            </header>

            <section>
                <h4 className="text-lg uppercase font-semibold mb-4">Recomendaciones</h4>
                <div>
                    {track?.relatedSongs.map((relatedTrack) => (
                        <TrackCard key={relatedTrack.id} track={relatedTrack} showAddButton />
                    ))}
                </div>
            </section>
        </PrincipalLayout>
    );
};
export default TrackDetail;
