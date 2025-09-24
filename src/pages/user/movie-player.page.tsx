import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { EpisodesApi } from "../../api/end-point.api";

interface Episode {
  id: number;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  description?: string;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

// const episode: Episode[] = [
//   { id: 1, title: "Episode 1", videoUrl: "https://res.cloudinary.com/.../episode1.mp4", thumbnailUrl: "https://res.cloudinary.com/.../thumb1.jpg", description: "The beginning of the epic story." },
//   { id: 2, title: "Episode 2", videoUrl: "https://res.cloudinary.com/.../episode2.mp4", thumbnailUrl: "https://res.cloudinary.com/.../thumb2.jpg", description: "Things get intense in this episode." },
//   { id: 3, title: "Episode 3", videoUrl: "https://res.cloudinary.com/.../episode3.mp4", thumbnailUrl: "https://res.cloudinary.com/.../thumb3.jpg", description: "Secrets are revealed." },
// ];

export default function MoviePlayerWithComments() {
  const [ episodes, setEpisodes ] = useState<Episode[]>([]);
  const { moveId } = useParams<{ moveId: string }>();
const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [hoveredEpisode, setHoveredEpisode] = useState<Episode | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: "Alice", content: "Great episode!", date: "2025-09-25" },
    { id: 2, author: "Bob", content: "I love the action scenes.", date: "2025-09-24" },
  ]);
  const [newComment, setNewComment] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

 React.useEffect(() => {}, [moveId]);

 React.useEffect(() => {
  const fetchEpisode = async () => {
    try {
      let ep = await EpisodesApi.getByMovie(Number(moveId));
      const episodesList = ep.data.map(e => ({
        id: e.id,
        title: e.title,
        videoUrl: e.videoUrl,
        thumbnailUrl: 'https://res.cloudinary.com/dgfxw2ed6/image/upload/v1758718902/images/irioutnugi9fdpxemuoa.png',
        description: e.updatedAt
      }));
      setEpisodes(episodesList);

      // Set tập đầu tiên làm currentEpisode
      if (episodesList.length > 0) {
        setCurrentEpisode(episodesList[0]);
      }
    } catch (err) {
      console.error("Error loading episode:", err);
    }
  };
  fetchEpisode();
}, [moveId]); 

  const handleEnded = () => {
    if (!currentEpisode) return;
    const currentIndex = episodes.findIndex(ep => ep.id === currentEpisode.id);
    const nextIndex = (currentIndex + 1) % episodes.length;
    setCurrentEpisode(episodes[nextIndex]);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  const goToNext = (ep: Episode) => {
    const idx = episodes.findIndex(e => e.id === ep.id);
    if (idx < episodes.length - 1) setCurrentEpisode(episodes[idx + 1]);
  };

  const goToPrev = (ep: Episode) => {
    const idx = episodes.findIndex(e => e.id === ep.id);
    if (idx > 0) setCurrentEpisode(episodes[idx - 1]);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: comments.length + 1,
      author: "Guest",
      content: newComment,
      date: new Date().toISOString().split("T")[0]
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="movie-player">
      <div className="video-container">
        <video
          key={currentEpisode?.id}
          ref={videoRef}
          width="100%"
          height="500"
          controls
          autoPlay
          onEnded={handleEnded}
        >
          {currentEpisode && (
            <source src={currentEpisode.videoUrl} type="video/mp4" />
          )}
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Episode carousel */}
      <div className="episode-carousel">
        <button className="scroll-btn left" onClick={() => scroll("left")}><i className="fa-solid fa-arrow-left"></i></button>
        <div className="episode-bar" ref={scrollRef}>
          {episodes.map(ep => (
            <div
              key={ep.id}
              className={`episode ${currentEpisode && currentEpisode.id === ep.id ? "active" : ""}`}
              onClick={() => setCurrentEpisode(ep)}
              onMouseEnter={() => setHoveredEpisode(ep)}
              onMouseLeave={() => setHoveredEpisode(null)}
            >
              <img src={ep.thumbnailUrl} alt={ep.title} />
              <span>{ep.title}</span>
              {hoveredEpisode?.id === ep.id && (
                <div className="tooltip">
                  <img src={ep.thumbnailUrl} alt={ep.title} />
                  <h4>{ep.title}</h4>
                  {ep.description && <p>{ep.description}</p>}
                  <div className="nav-buttons">
                    <button onClick={() => goToPrev(ep)} disabled={episodes.findIndex(e => e.id === ep.id) === 0}>Prev</button>
                    <button onClick={() => goToNext(ep)} disabled={episodes.findIndex(e => e.id === ep.id) === episodes.length - 1}>Next</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll("right")}><i className="fa-solid fa-arrow-right"></i></button>
      </div>

      {/* Comments */}
      <div className="comments-section">
        {/* <h3>Comments ({comments.length})</h3> */}
        
        <div className="comment-list">
          {comments.map(c => (
            <div key={c.id} className="comment">
              <strong>{c.author}</strong> <span className="date">{c.date}</span>
              <p>{c.content}</p>
            </div>
          ))}
        </div>
        <div className="add-comment">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Post</button>
        </div>
      </div>

      <style>{`
        .movie-player { background:url('/images/uploads/ft-bg.jpg') no-repeat center center fixed; background-size: cover;padding-top: 100px; background-color: #111; color: #fff; font-family: Arial, sans-serif; }
        .video-container { margin-bottom: 20px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.7); }
        .episode-carousel { display: flex; align-items: center; position: relative; margin-bottom: 20px;}
        .episode-bar { display: flex; overflow-x: auto; scroll-behavior: smooth; padding: 10px 0; overflow-y: hidden; overflow-x: hidden; }
        .episode { position: relative; flex: none; margin-right: 10px; text-align: center; cursor: pointer; transition: transform 0.2s ease; }
        .episode img { width: 120px; height: 70px; object-fit: cover; border-radius: 5px; display: block; margin-bottom: 5px; transition: all 0.2s ease; }
        .episode span { font-size: 14px; }
        .episode:hover img, .episode.active img { transform: scale(1.1); box-shadow: 0 0 10px #e50914; }
        .tooltip { position: absolute; top: -180px; left: 50%; transform: translateX(-50%); background-color: rgba(20,20,20,0.95); border: 1px solid #e50914; padding: 10px; width: 220px; z-index: 10; text-align: left; border-radius: 8px; }
        .tooltip img { width: 100%; border-radius: 5px; margin-bottom: 5px; }
        .tooltip h4 { margin: 5px 0; font-size: 16px; }
        .tooltip p { font-size: 13px; color: #ccc; }
        .nav-buttons { display: flex; justify-content: space-between; margin-top: 8px; }
        .nav-buttons button { background-color: #e50914; border: none; color: #fff; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px; }
        .nav-buttons button:disabled { background-color: #555; cursor: not-allowed; }
        .scroll-btn { background: rgba(0,0,0,0.5); border: none; color: #fff; font-size: 24px; cursor: pointer; padding: 10px; border-radius: 50%; z-index: 1; }
        .scroll-btn:hover { background: rgba(229, 9, 20, 0.8); }
        .scroll-btn.left { margin-right: 5px; }
        .scroll-btn.right { margin-left: 5px; }
        .comments-section { margin-top: 20px; border-top: 1px solid #333; padding-top: 150px;padding-bottom: 50px;padding-left: 40px; padding-right: 40px; }
        .add-comment { display: flex; gap: 10px; margin-bottom: 10px; }
        .add-comment input { flex: 1; padding: 8px; border-radius: 5px; border: none; outline: none; }
        .add-comment button { padding: 8px 12px; border: none; border-radius: 5px; background-color: #e50914; color: #fff; cursor: pointer; }
        .comment-list {display: flex;flex-direction: column;}
        .comment-list .comment { margin-bottom: 10px; background-color: #1a1a1a; padding: 8px; border-radius: 5px; }
        .comment-list .comment .date { font-size: 12px; color: #aaa; margin-left: 5px; }
      `}</style>
    </div>
  );
}
