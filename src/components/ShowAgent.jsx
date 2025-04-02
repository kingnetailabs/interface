import { useEffect, useRef } from "react";
import { createPlayerScene, destroyPlayerScene } from "@/libs/scenes";

export default function ShowAgent({
  src = "",
  type = 1,
  isTasking = false,
  audioData = "",
}) {
  const agent_body = useRef(null);
  const roleCanvas = useRef(null);

  useEffect(() => {
    return () => {
      destroyPlayerScene();
    };
  }, []);

  function create() {
    if (!src) {
      return;
    }
    // if (type == 1) {
    if (roleCanvas.current && agent_body.current) {
      const newCanvas = document.createElement("canvas");
      newCanvas.style.width = "100%";
      newCanvas.style.height = "100%";
      newCanvas.style.outline = "none";
      newCanvas.style.border = "none";
      roleCanvas.current = newCanvas;

      agent_body.current.innerHTML = "";
      agent_body.current.appendChild(newCanvas);
    }
    // }

    try {
      createPlayerScene(
        roleCanvas.current,
        src,
        agent_body.current,
        type == 2,
        function (chatMsg) {
          console.log("chatMessage: ", chatMsg);
        }
      );
    } catch (err) {
      console.log("err", err);
    }
  }

  useEffect(() => {
    create();
  }, [src, type]);

  useEffect(() => {
    console.log("isTasking", isTasking);
  }, [isTasking]);

  useEffect(() => {
    console.log("audioData", audioData);
  }, [audioData]);

  return (
    <div ref={agent_body} style={{ width: "100%", height: "100%" }}>
      <canvas ref={roleCanvas}></canvas>
    </div>
  );
}
