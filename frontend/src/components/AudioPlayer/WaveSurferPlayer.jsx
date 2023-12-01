import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { usePlayer } from "../../context/PlayerContext";

const WaveSurferPlayer = ({ options }) => {
  const wavesurferRef = useRef(null);
  const { isPlaying } = usePlayer();

  useEffect(() => {
    const wavesurfer = WaveSurfer.create(options);
    wavesurferRef.current = wavesurfer;

    return () => {
      wavesurfer.destroy();
    };
  }, [options]);

  useEffect(() => {
    if (wavesurferRef.current) {
      isPlaying ? wavesurferRef.current.play() : wavesurferRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      <div id="waveform"></div>
    </>
  );
};

export default WaveSurferPlayer;
