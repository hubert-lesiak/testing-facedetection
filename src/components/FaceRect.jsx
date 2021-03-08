import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import style from "./facerect.module.css";

export default function FaceRect({ player }) {
  const { current } = useSelector(state => state.face);

  const box = useCallback(() => {
    if (!current || !player.current) return null;

    const actual = {
      width: player.current.clientWidth,
      height: player.current.clientHeight,
    };

    const image = current?.detection?._imageDims;

    if (image._width === 0 || image._height === 0) return null;

    const scale = {
      x: actual.width / image._width,
      y: actual.height / image._height,
    };

    const box = current?.detection?._box;
    console.log(scale, box);

    return {
      x: box._x * scale.x,
      y: box._y * scale.y,
      w: box._width * scale.x,
      h: box._height * scale.y,
    };
    // eslint-disable-next-line
  }, [current]);

  const a = box();

  if (!a) return null;

  return (
    <div
      className={style.box}
      style={{
        top: `${a.y}px`,
        left: `${a.x}px`,
        width: `${a.w}px`,
        height: `${a.h}px`,
      }}
    ></div>
  );
}
