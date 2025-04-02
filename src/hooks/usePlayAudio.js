import { useEffect, useState } from "react";
import { soundStop, createSpeech2 } from "@/libs/scenes";
import { useDispatch, useSelector } from "react-redux";
import {
  shiftMessage,
  setIsPlaying,
  setMessage,
} from "@/store/modules/mainStore";

const usePlayAudio = () => {
  const [audio, setAudio] = useState({});
  const [is2D, setIs2D] = useState(false);
  const dispatch = useDispatch();
  const { userMessages, isPlaying } = useSelector((state) => state.main);

  useEffect(() => {
    return () => {
      soundStop();
      setAudio({});
      dispatch(setMessage([]));
      dispatch(setIsPlaying(false));
    };
  }, []);

  useEffect(() => {
    play();
  }, [userMessages]);

  async function play() {
    if (userMessages.length == 0) {
      console.log("empty msg");
      return;
    }
    if (isPlaying) {
      console.log("playing");
      return;
    }

    const firstElement = userMessages[0];

    setAudio(firstElement);
    if (firstElement) {
      try {
        dispatch(setIsPlaying(true));
        await createSpeech2(firstElement.audio_content, is2D);
        dispatch(setIsPlaying(false));
        dispatch(shiftMessage());
      } catch (err) {
        console.log("play err", err);
        dispatch(setIsPlaying(false));
        dispatch(shiftMessage());
      }
    }
  }

  return {
    audio,
    setAudio,
    is2D,
    setIs2D,
    play,
  };
};

export default usePlayAudio;
