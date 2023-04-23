import { useEffect, useRef, useState } from "react";
import "./App.css";
import data from "./assets/data";

function App() {
  const [music, setMusic] = useState(data);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicUrl, setMusicUrl] = useState(music[musicIndex].url);
  const [playing, setPlaying] = useState(false);
  const [previous, setPrevious] = useState();

  // console.log(musicIndex);
  console.log(`current id ${music[musicIndex].id}`);
  // console.log(music.length);
  // console.log(musicIndex);
  // console.log(musicUrl);

  const audio = useRef(null);
  useEffect(() => {
    audio.current.src = music[musicIndex].url;
    playing ? audio.current.play() : audio.current.pause();
  }, [playing, musicIndex, audio]);

  useEffect(() => {
    if (musicIndex != 0) {
      setPrevious(musicIndex - 1);
    }
  }, [musicIndex]);

  function next() {
    if (musicIndex < music.length - 1) {
      setMusicIndex((prev) => prev + 1);
      audio.current.src = music[musicIndex].url;
    } else {
      setMusicIndex(1);
      audio.current.src = music[musicIndex].url;
      setPrevious(0);
    }
    console.log(audio.current.src);
  }

  console.log(previous);

  function back() {
    if (musicIndex < music.length - 1) {
      setMusicIndex((prev) => prev - 1);
      audio.current.src = music[previous].url;
    } else {
      setMusicIndex(1);
      audio.current.src = music[previous].url;
      setPrevious(musicIndex + 1);
    }
  }

  return (
    <div className="wrap">
      <audio ref={audio} src={musicUrl} controls hidden></audio>
      <button onClick={next}>Next</button>
      <button
        onClick={() => {
          setPlaying(true);
        }}
      >
        Play
      </button>
      <button
        onClick={() => {
          setPlaying(false);
        }}
      >
        Pause
      </button>
      <button onClick={back}>Previous</button>
    </div>
  );
}

export default App;
