import React, { useCallback, useEffect, useRef } from "react";
import VideoStream from "./VideoStream";
import * as faceapi from "face-api.js";
import { useDispatch, useSelector } from "react-redux";
import { onFrame, onWaiting } from "../store/modules/faceReducer";
import FaceRect from "./FaceRect";

export default function FaceDetection() {
  const dispatch = useDispatch();
  const { isPlaying, isLoaded, waiting } = useSelector(state => state.face);
  const loaded = useCallback(() => {
    if (!isLoaded || typeof isLoaded !== "object") return false;
    return Object.values(isLoaded).every(Boolean);
  }, [isLoaded]);

  const player = useRef(null);
  const stream = useRef(null);

  async function onStream(_stream, _player) {
    player.current = _player;
    stream.current = _stream;
  }

  useEffect(() => {
    if (isPlaying && !waiting) {
      dispatch(onWaiting(true));

      getFaces()
        .catch(() => [])
        .then(faces => dispatch(onFrame(JSON.parse(JSON.stringify(faces)))))
        .catch(() => []);
    }
    // eslint-disable-next-line
  }, [isPlaying, waiting]);

  async function getFaces() {
    if (player.current) {
      return await faceapi
        .detectAllFaces(player.current)
        .withFaceExpressions()
        .withAgeAndGender()
        .then(v => v);
    }
    return [];
  }

  return (
    <div>
      {loaded() && (
        <VideoStream onStream={onStream}>
          <FaceRect player={player} />
        </VideoStream>
      )}
    </div>
  );
}
