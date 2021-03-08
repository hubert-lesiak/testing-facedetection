import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAllow, onDeny, onPause, onPlay } from "../store/modules/faceReducer";
import style from "./home.module.css";

export default function VideoStream({ onStream, children }) {
  const isAllowed = useSelector(state => state.face.isAllowed);
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  async function handleCaptureVideoRequest(e) {
    if (videoRef.current) {
      const video = videoRef.current;

      navigator.getUserMedia(
        {
          audio: true,
          video: { aspectRatio: [16, 9] },
        },
        function success(stream) {
          dispatch(onAllow());

          streamRef.current = stream;
          video.srcObject = streamRef.current;

          video.addEventListener("play", () => dispatch(onPlay()));
          video.addEventListener("pause", () => dispatch(onPause()));
          video.addEventListener("error", () => dispatch(onPause()));

          video.onloadedmetadata = function (e) {
            video.play();
            try {
              onStream(stream, video);
            } catch (error) {
              console.log(error);
            }
          };
        },
        failure
      );

      function failure(error) {
        dispatch(onDeny());
        console.log(error);
      }
    }
  }

  return (
    <div className={style.capture}>
      <video
        ref={videoRef}
        className={style.video}
        controls
        autoPlay
        id="video"
      ></video>

      {!isAllowed && (
        <div className={style.request}>
          <button onClick={handleCaptureVideoRequest}>Włącz kamerę</button>
        </div>
      )}

      {children}
    </div>
  );
}
