import TrackCard from "./TrackCard";

const TrackList = ({ tracks }) => {
    return (
        <section className="grid gap-3 pt-10">
            {tracks.map((track) => (
                <TrackCard key={track.id} track={track} showAddButton showPlayButton />
            ))}
        </section>
    );
};
export default TrackList;
