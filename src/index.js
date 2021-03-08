import "normalize.css";
import "./assets/styles.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./store";
import { onLoaded } from "./store/modules/faceReducer";
import * as faceapi from "face-api.js";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

(async () => {
  const networks = "/fap";

  faceapi.nets.ssdMobilenetv1
    .loadFromUri(networks)
    .then(() => store.dispatch(onLoaded("ssdMobilenet")));

  faceapi.nets.faceExpressionNet
    .loadFromUri(networks)
    .then(() => store.dispatch(onLoaded("expression")));

  faceapi.nets.faceRecognitionNet
    .loadFromUri(networks)
    .then(() => store.dispatch(onLoaded("recognition")));

  faceapi.nets.ageGenderNet
    .loadFromUri(networks)
    .then(() => store.dispatch(onLoaded("ageGender")));

  faceapi.nets.tinyFaceDetector
    .loadFromUri(networks)
    .then(() => store.dispatch(onLoaded("tinyFace")));

  faceapi.nets.mtcnn
    .loadFromUri(networks)
    .then(() => store.dispatch(onLoaded("mtcnn")));

  faceapi.nets.faceLandmark68Net
    .loadFromUri(networks)
    .then(() => store.dispatch(onLoaded("landmark")));

  faceapi.nets.faceLandmark68TinyNet
    .loadFromUri(networks)
    .then(() => store.dispatch(onLoaded("landmarkTiny")));
})();
