import { createAction } from "@reduxjs/toolkit";

export const onAllow = createAction("video:on-allow");
export const onDeny = createAction("video:on-deny");
export const onPlay = createAction("video:on-play");
export const onPause = createAction("video:on-pause");

export const onResetLoad = createAction("face:on-reset-load");
export const onLoaded = createAction("face:on-loaded");
export const onFrame = createAction("face:on-frame");
export const onWaiting = createAction("face:on-waiting");

const initial = {
  isAllowed: false,
  isLoaded: {
    ssdMobilenet: false,
    ageGender: false,
    tinyFace: false,
    mtcnn: false,
    landmark: false,
    landmarkTiny: false,
    recognition: false,
    expression: false,
  },
  isDetecting: false,
  faces: [],
  current: null,
  labels: [],
  data: [],
  isPlaying: false,
  waiting: false,
};

export default function faceReducer(state = initial, action) {
  const { payload } = action;

  switch (action.type) {
    case onWaiting.type:
      return {
        ...state,
        waiting: payload,
      };

    case onAllow.type:
      return {
        ...state,
        isAllowed: true,
      };

    case onDeny.type:
      return {
        ...state,
        isAllowed: false,
      };

    case onPlay.type:
      return {
        ...state,
        isPlaying: true,
      };

    case onPause.type:
      return {
        ...state,
        isPlaying: false,
      };

    case onFrame.type:
      return {
        ...state,
        isDetecting: payload.length > 0,
        faces: [...payload],
        current: payload?.[0]
          ? { ...payload?.[0], timestamp: Date.now() }
          : state.current,
        waiting: false,
      };

    case onLoaded.type:
      return {
        ...state,
        isLoaded: {
          ...state.isLoaded,
          [payload]: true,
        },
      };

    case onResetLoad.type:
      return {
        ...state,
        isLoaded: { ...initial.isLoaded },
      };

    default:
      return state;
  }
}
