import { useEffect, useState } from "react";
import PrincipalLayout from "../components/layouts/PrincipalLayout";
import { axiosMusic } from "../utils/configAxios";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TrackCard from "../components/shared/TrackCard";

const ArtistDetail = () => {
    const [artist, setArtist] = useState(null);
    console.log(artist);

    const { id } = useParams();

    useEffect(() => {
        axiosMusic
            .get(`/api/artists/${id}`)
            .then(({ data }) => setArtist(data))
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <PrincipalLayout>
            <Link to={-1} className="text-secundary pb-12">
                {"<"} Atrás
            </Link>
            <header className="grid gap-4 pb-8 pt-4 sm:grid-cols-2 sm:items-start">
                <picture>
                    <img
                        src={artist?.images[1].url}
                        alt="track image"
                        className="block mx-auto rounded-2xl"
                    />
                </picture>
                <ul className="grid gap-1">
                    <li>
                        <h3 className="font-semibold">{artist?.name}</h3>
                    </li>
                    <li>
                        <ul className="flex gap-2">
                            {artist?.genres
                                .slice(0, 2)
                                .map((genre, index, array) => (
                                    <li
                                        key={genre}
                                        className="hover:underline hover:text-secundary transition-colors"
                                    >
                                        {genre}
                                        {array.length - 1 !== index && ","}
                                    </li>
                                ))}
                        </ul>
                    </li>
                    <li className="text-white/40">
                        <span className="font-semibold text-white">
                            Seguidores :{" "}
                        </span>
                        {artist?.followers.total}
                    </li>
                </ul>
            </header>

            <h4 className="text-lg uppercase font-semibold py-4">
                Otros discos del artista
            </h4>
            <section className="pb-10">
                <Swiper
                    className="mySwiper"
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        500: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                    }}
                >
                    {artist?.albums.map((album) => (
                        <SwiperSlide key={album.id}>
                            <article className="text-sm grid gap-1">
                                <header className="rounded-xl overflow-hidden">
                                    <img src={album.images[1].url} alt="" />
                                </header>
                                <h5 className="line-clamp-1 font-semibold">
                                    {album.name}
                                </h5>
                                <span className="line-clamp-1 text-white/40">
                                    {album.artists[0].name}
                                </span>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            <section>
                <div>
                    {artist?.songsTop.map((songTop) => (
                        <TrackCard
                            key={songTop.id}
                            track={songTop}
                            showAddButton
                        />
                    ))}
                </div>
            </section>
        </PrincipalLayout>
    );
};
export default ArtistDetail;
