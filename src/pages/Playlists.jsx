import { useEffect, useState } from "react";
import { SearchIcon } from "../components/icons/Svgs";
import PrincipalLayout from "../components/layouts/PrincipalLayout";
import { axiosMusic } from "../utils/configAxios";
import PlaylistList from "../components/playlists/PlaylistList";

const Playlists = () => {
    const [playlists, setPlaylists] = useState([])
    
    useEffect(() => {
        axiosMusic
            .get("/api/playlists/me")
            .then(({data}) => setPlaylists(data))
            .catch((err) => console.log(err))
    },[])

    return (
        <PrincipalLayout>
            <form className="bg-white/20 py-1 px-2 flex gap-2 rounded-lg">
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
            </form>
            <PlaylistList playlists={playlists}/>
        </PrincipalLayout>
    );
};
export default Playlists;
