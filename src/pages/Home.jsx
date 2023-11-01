import { useEffect, useState } from "react";
import { axiosMusic } from "../utils/configAxios";
import { SearchIcon } from "../components/icons/Svgs";
import TrackList from "../components/shared/TrackList";
import PrincipalLayout from "../components/layouts/PrincipalLayout";

const Home = () => {
    const [tracksRandom, setTracksRandom] = useState([]);
    const [searchedTracks, setSearchedTracks] = useState([]);

    useEffect(() => {
        axiosMusic
            .get("/api/tracks/recommendations?seed_genres=reggae,rock,salsa")
            .then(({ data }) => setTracksRandom(data.tracks))
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const query = formData.get("query");
        const limit = formData.get("limit");

        axiosMusic
            .get(`/api/tracks?limit=${limit}&q=${query}`)
            .then(({ data }) => setSearchedTracks(data.tracks.items))
            .catch((err) => console.log(err));
    };

    return (
        <PrincipalLayout>
            <form
                onSubmit={handleSubmit}
                className="bg-white/20 py-1 px-2 flex gap-2 rounded-lg"
            >
                <button>
                    <SearchIcon />
                </button>
                <input
                    className="bg-transparent outline-none flex-1 py-2"
                    name="query"
                    type="text"
                    placeholder="Buscar"
                    size={10}
                    required
                />
                <select
                    name="limit"
                    className="bg-transparent outline-none [&>option]:text-black"
                >
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                </select>
            </form>
            <TrackList
                tracks={
                    searchedTracks.length === 0 ? tracksRandom : searchedTracks
                }
            />
        </PrincipalLayout>
    );
};
export default Home;
