import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "linear-gradient(160deg, rgb(37, 99, 235), rgb(15, 23, 42))",
        color: "white",
        display: "flex",
        fontFamily: "sans-serif",
        fontSize: 192,
        fontWeight: 700,
        height: "100%",
        justifyContent: "center",
        letterSpacing: -12,
        width: "100%",
      }}
    >
      CR
    </div>,
    size,
  );
}
