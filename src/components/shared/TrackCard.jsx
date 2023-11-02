import { Link } from "react-router-dom";
import { AddIcon, MinusIcon, PlayIcon } from "../icons/Svgs";
import { addTrack, removeTrack } from "../../store/slices/playlistCart.slice";
import { useDispatch } from "react-redux";

const TrackCard = ({
    track,
    showPlayButton,
    showAddButton,
    imageSize = "base",
    showMinusButton,
    deleteButton,
    playTrack,
}) => {
    const dispatch = useDispatch();

    const handleAddTrack = () => {
        dispatch(addTrack(track));
    };

    const handleRemoveTrack = () => {
        dispatch(removeTrack(track.id));
    };

    const imagesSizes = {
        base: "w-[54px]",
        sm: "w-[48px]",
    };

    return (
        <article className="flex gap-4 items-center hover:bg-white/20 transition-colors rounded-md p-1">
            <picture
                className={`aspect-square rounded-md overflow-hidden ${imagesSizes[imageSize]}`}
            >
                <img src={track.album.images[2].url} alt="album image" />
            </picture>

            <div className="flex-1 text-sm grid gap-1">
                <Link
                    to={`/tracks/${track.id}`}
                    className="font-semibold line-clamp-1 hover:text-secundary transition-colors"
                >
                    {track.name}
                </Link>

                <ul className="flex gap-2">
                    {track.artists.slice(0, 2).map((artist, index, array) => (
                        <li
                            key={artist.id}
                            className="hover:underline hover:text-secundary transition-colors"
                        >
                            <Link
                                to={`/artists/${artist.id}`}
                                className=" line-clamp-1"
                            >
                                {artist.name}
                                {array.length - 1 !== index && ","}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex gap-3">
                {showPlayButton && (
                    <button>
                        <PlayIcon />
                    </button>
                )}

                {showAddButton && (
                    <button onClick={handleAddTrack}>
                        <AddIcon />
                    </button>
                )}

                {showMinusButton && (
                    <button onClick={handleRemoveTrack}>
                        <MinusIcon />
                    </button>
                )}
                {deleteButton && (
                    <button onClick={() => deleteButton(track.id)}>
                        <MinusIcon />
                    </button>
                )}
                {playTrack && (
                    <button onClick={() => playTrack(track.spotifyId)}>
                        <PlayIcon />
                    </button>
                )}
            </div>
        </article>
    );
};
export default TrackCard;
