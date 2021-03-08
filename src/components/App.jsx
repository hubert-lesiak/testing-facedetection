import React from "react";
import Charts from "./Charts";
import Expressions from "./Expressions";
import FaceDetection from "./FaceDetection";
import style from "./app.module.css";

export default function App(props) {
  return (
    <div className={style.app}>
      <aside className={style.sidebar}>
        <Expressions />
      </aside>

      <aside className={style.content}>
        <Charts />

        <FaceDetection />
      </aside>
    </div>
  );
}
