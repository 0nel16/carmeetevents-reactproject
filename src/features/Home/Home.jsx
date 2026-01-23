import { Link } from "react-router-dom";

const VIDEOS = [
  { id: "tyAxcMgAjt0", label: "Trackday", start: 130, end: 200 },
  { id: "2j-r9vU44EU", label: "Expo", start: 450, end: 550 },
  { id: "S0vJpM4ncCg", label: "Drift", start: 130, end: 210 },
];

export default function Home() {
  return (
    <div className="homePage">
      <div className="homeIntro">
        <p>
          Discover car meets, trackdays and automotive events across Europe.
        </p>
      </div>
      <section className="videoGrid" aria-label="Event highlights videos">
        {VIDEOS.map((v) => (
          <div className="videoCard" key={v.id}>
            <Link to="/events" className="videoLink">
              <div className="videoFrame">
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}?autoplay=1&mute=1&loop=1&playlist=${v.id}&controls=0&modestbranding=1&rel=0&playsinline=1&start=${v.start}&end=${v.end}`}
                  title={v.label}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
                <div className="videoOverlay" aria-hidden="true" />
                <div className="videoLabel">{v.label}</div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
