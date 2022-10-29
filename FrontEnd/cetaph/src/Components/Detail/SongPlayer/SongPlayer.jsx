import React, {useState, useEffect, useRef} from "react";
import "./song-player.scss";

const SongPlayer = ({track, handleSongChange}) => {
  // State
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  // Destructure for conciseness
  const {name, artists, color, urlMusic} = track;

  // Refs
  const audioRef = useRef(new Audio(urlMusic));
  const intervalRef = useRef();
  const isReady = useRef(false);

  // Destructure for conciseness
  const {duration} = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 103% 0%, color-stop(${currentPercentage}, #000), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        setIsPlaying(false);
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(urlMusic);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [urlMusic]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);
  const [volume, setVolume] = useState(0.5);
  const handleVolume = (e) => {
    setVolume(e);
    audioRef.current.volume = e;
  };
  const currentVol = `${(volume / 1) * 100}%`;
  const volStyling = `
  -webkit-gradient(linear, 0% 0%, 103% 0%, color-stop(${currentVol}, #000), color-stop(${currentVol}, #777))
`;
  const formatTime = () => {
    const minutes = Math.floor(trackProgress / 60);
    const seconds = Math.floor(trackProgress - minutes * 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };
  return (
    <div className="audio-player">
      <h2 className="title">{name}</h2>
      <h3 className="artist">{artists?.length > 0 ? artists[0].name : ""}</h3>
      <div className="audio-controls">
        <button
          type="button"
          className="prev"
          aria-label="Previous"
          onClick={() => handleSongChange(-1)}
        >
          <i className="fa-solid fa-backward-step"></i>
        </button>

        <button
          type="button"
          className="play-pause"
          onClick={() => setIsPlaying(isPlaying ? false : true)}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <i className={`bi bi-${isPlaying ? "pause" : "play"}-circle`} />
        </button>
        <button
          type="button"
          className="next"
          aria-label="Next"
          onClick={() => handleSongChange(1)}
        >
          <i className="fa-solid fa-forward-step"></i>
        </button>
      </div>
      <span className="progress-wrapper">
        <p>{formatTime(trackProgress)}</p>
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{background: trackStyling}}
        />
      </span>
      <span className="volume-wrapper">
        <i
          className={
            "bi bi-volume-" +
            (volume === 0 ? "mute" : volume < 0.5 ? "down" : "up")
          }
          onClick={() => handleVolume(volume === 0 ? 0.5 : 0)}
        ></i>
        <input
          type="range"
          value={volume}
          step="0.1"
          min="0"
          max="1"
          className="volume"
          onChange={(e) => handleVolume(e.target.value)}
          style={{background: volStyling}}
        />
      </span>
    </div>
  );
};

export default SongPlayer;