"use client";

import { useState } from "react";
import Counter from "./Counter";

export default function HexStat({
  to,
  suffix = "",
}: {
  to: number;
  suffix?: string;
}) {
  const [hex, setHex] = useState(false);
  return (
    <span
      className="hex-flip tabular-nums"
      title="click to toggle hex"
      onClick={() => setHex((h) => !h)}
    >
      {hex ? (
        <>0x{to.toString(16).toUpperCase()}{suffix}</>
      ) : (
        <Counter to={to} suffix={suffix} />
      )}
    </span>
  );
}
