import WaveSurfer from "wavesurfer.js";
import { useEffect, useRef, useState } from "react";
import styles from "../components.module.scss";
import {
  BackwardOutlined,
  ForwardOutlined,
  PauseOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";

export default function Sound({ url, type }) {
  const waveformRef = useRef(null);
  const timeRef = useRef(null);
  const durationRef = useRef(null);
  const hoverRef = useRef(null);
  const [isPlayPauseStatus, setIsPlayPauseStatus] = useState(false);
  const [wavesurfer, setWavesurfer] = useState(null);

  useEffect(() => {
    if (waveformRef.current) {
      init();
    }
  }, []);

  const init = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Define the waveform gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
    gradient.addColorStop(0, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, "#B1B1B1"); // Bottom color
    gradient.addColorStop(1, "#B1B1B1"); // Bottom color

    // 定义进度梯度
    const progressGradient = ctx.createLinearGradient(
      0,
      0,
      0,
      canvas.height * 1.35
    );
    progressGradient.addColorStop(0, "#fe47f8"); // Top color
    progressGradient.addColorStop(
      (canvas.height * 0.7) / canvas.height,
      "#fe47f8"
    ); // Top color
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 1) / canvas.height,
      "#ffffff"
    ); // White line
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 2) / canvas.height,
      "#ffffff"
    ); // White line
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 3) / canvas.height,
      "#fe47f8"
    ); // Bottom color
    progressGradient.addColorStop(1, "#fe47f8"); // Bottom color

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: gradient,
      progressColor: progressGradient,
      barWidth: 2,
    });

    setWavesurfer(wavesurfer);
    wavesurfer.load(url);

    let status = false;
    wavesurfer.on("interaction", () => {
      status = !status;
      setIsPlayPauseStatus(status);
      wavesurfer.playPause();
    });

    {
      const hover = hoverRef.current;
      const waveform = waveformRef.current;
      waveform.addEventListener("pointermove", (e) => {
        // console.log("pointermove", hover, e.offsetX);
        hover.style.width = `${e.offsetX}px`;
      });
    }

    {
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secondsRemainder = Math.round(seconds) % 60;
        const paddedSeconds = `0${secondsRemainder}`.slice(-2);
        return `${minutes}:${paddedSeconds}`;
      };

      const timeEl = timeRef.current;
      const durationEl = durationRef.current;
      wavesurfer.on("decode", (duration) => {
        // console.log("decode", duration);
        durationEl.textContent = formatTime(duration);
      });
      wavesurfer.on("timeupdate", (currentTime) => {
        // console.log("timeupdate", currentTime);
        timeEl.textContent = formatTime(currentTime);
      });
    }

    //
  };
  const playPause = () => {
    setIsPlayPauseStatus(!isPlayPauseStatus);
    console.log(isPlayPauseStatus);
    wavesurfer && wavesurfer.playPause();
  };
  const skip = (num) => {
    wavesurfer && wavesurfer.skip(num);
  };

  return (
    <div className={styles["base-sound"]}>
      <div ref={waveformRef} className={styles.waveform}>
        <div ref={timeRef} className={styles.time}>
          0:00
        </div>
        <div ref={durationRef} className={styles.duration}>
          0:00
        </div>
        <div ref={hoverRef} className={styles.hover}></div>
      </div>
      <div className={styles.panel}>
        <div
          className={`${styles.control} ${
            type === "assetLibrary" ? styles.black : ""
          }`}
        >
          <div className={styles.recoil} onClick={() => skip(-5)}>
            <BackwardOutlined />
          </div>
          <div className={styles.play_pause} onClick={() => playPause()}>
            {isPlayPauseStatus ? <PauseOutlined /> : <CaretRightOutlined />}
          </div>
          <div className={styles.advance} onClick={() => skip(5)}>
            <ForwardOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}
