import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "linear-gradient(160deg, rgb(37, 99, 235), rgb(15, 23, 42))",
        borderRadius: 36,
        color: "white",
        display: "flex",
        fontFamily: "sans-serif",
        fontSize: 68,
        fontWeight: 700,
        height: "100%",
        justifyContent: "center",
        letterSpacing: -4,
        width: "100%",
      }}
    >
      CR
    </div>,
    size,
  );
}
