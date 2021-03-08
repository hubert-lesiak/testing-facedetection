import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProminentKeyValue, minmax } from "../utils/maths";
import style from "./expr.module.css";

function getIconByEmotion(name) {
  switch (name) {
    case "neutral":
      return "🙂";
    case "happy":
      return "😀";
    case "sad":
      return "😟";
    case "angry":
      return "😡";
    case "fearful":
      return "😰";
    case "disgusted":
      return "🤢";
    case "surprised":
      return "😮";
    default:
      return "😶";
  }
}

function normalizeValue(value) {
  return Math.round(minmax(value, 0, 1) * 100);
}

export default function Expressions(props) {
  const { current } = useSelector(state => state.face);
  const [primary, setPrimary] = useState({
    name: null,
    value: 0,
  });

  useEffect(() => {
    if (current && current?.expressions) {
      const [name, value] = getProminentKeyValue(current?.expressions);
      const preValue = minmax(value, 0, 1);
      const postValue = Math.round(preValue * 100);

      if (primary.name !== name || primary.name !== postValue) {
        setPrimary({ name, value: postValue });
      }
    }
    // eslint-disable-next-line
  }, [current]);

  if (!current) return null;

  return (
    <div className={style.container}>
      {primary?.name && (
        <div className={`${style.primary} ${style.box}`}>
          <div className={style.icon}>{getIconByEmotion(primary.name)}</div>
          <div className={style.content}>
            <div className={style.name}>{primary.name}</div>
            <div className={style.value}>{primary.value}</div>
            <div
              className={style.progress}
              style={{ [`--value`]: `${primary.value || 0}%` }}
            />
          </div>
        </div>
      )}

      {Object.entries(current?.expressions).map(([name, value]) => (
        <div className={style.box} key={name}>
          <div className={style.icon}>{getIconByEmotion(name)}</div>
          <div className={style.content}>
            <div className={style.name}>{name}</div>
            <div className={style.value}>{normalizeValue(value)}</div>
            <div
              className={style.progress}
              style={{ [`--value`]: `${normalizeValue(value) || 0}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
