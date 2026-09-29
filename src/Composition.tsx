import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/* =========================================================
   WEBELSOM NEWS — PREMIUM ARTICLE STYLE
   TikTok 1080 x 1920
========================================================= */

const CONFIG = {
  /* =======================================================
     HELE COMPOSITION HIER AANPASSEN

     scale:
     1.00 = originele grootte
     0.95 = 5% kleiner
     0.90 = 10% kleiner
     0.85 = 15% kleiner

     x = alles links/rechts
     y = alles omhoog/omlaag
  ======================================================= */

  layout: {
    x: 35,
    y: 25,
    scale: 0.91,
  },

  colors: {
    background: "#06080E",
    background2: "#0B0F1A",
    blue: "#3053F0",
    blueLight: "#6C84FF",
    white: "#FFFFFF",
    muted: "#A8AFBE",
    panel: "#101521",
  },

  logo: {
    file: "logo.png",
    x: 55,
    y: 58,
    width: 78,
    height: 78,
  },

  brand: {
    text: "WEBELSOM",
    subtext: "NEWS",
  },

  category: {
    text: "BREAKING NEWS",
  },

  location: {
    text: "DUITSLAND",
  },

  title: {
    text: "VROUW NEERGESCHOTEN AAN STATION",
    x: 55,
    y: 320,
    width: 760,
    fontSize: 68,
    lineHeight: 0.94,
  },

  caption: {
    text:
      "Een vrouw is neergeschoten aan een station. De politie is een grote zoekactie gestart.",
    x: 55,
    y: 560,
    width: 740,
    fontSize: 28,
  },

  hero: {
    file: "foto1.jpg",
    x: 55,
    y: 690,
    width: 760,
    height: 520,
    radius: 34,
    objectPosition: "center center",
  },

  image2: {
    file: "foto2.jpg",
    x: 55,
    y: 1245,
    width: 455,
    height: 365,
    radius: 30,
    objectPosition: "center center",
  },

  image3: {
    file: "foto3.jpg",
    x: 485,
    y: 1305,
    width: 330,
    height: 300,
    radius: 30,
    objectPosition: "center center",
  },
};

/* =========================================================
   HELPERS
========================================================= */

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

/* =========================================================
   PHOTO COMPONENT
========================================================= */

const ArticleImage: React.FC<{
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  start: number;
  direction?: "left" | "right" | "up";
  rotate?: number;
  objectPosition?: string;
}> = ({
  src,
  x,
  y,
  width,
  height,
  radius,
  start,
  direction = "up",
  rotate = 0,
  objectPosition = "center",
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const enter = spring({
    fps,
    frame: Math.max(0, frame - start),
    config: {
      damping: 14,
      stiffness: 110,
      mass: 0.8,
    },
  });

  let moveX = 0;
  let moveY = 0;

  if (direction === "left") {
    moveX = interpolate(enter, [0, 1], [-120, 0]);
  }

  if (direction === "right") {
    moveX = interpolate(enter, [0, 1], [120, 0]);
  }

  if (direction === "up") {
    moveY = interpolate(enter, [0, 1], [120, 0]);
  }

  const zoom = interpolate(
    frame,
    [start, durationInFrames],
    [1.02, 1.11],
    clamp
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: radius,
        overflow: "hidden",
        opacity: enter,
        transform: `
          translateX(${moveX}px)
          translateY(${moveY}px)
          scale(${interpolate(enter, [0, 1], [0.95, 1])})
          rotate(${rotate}deg)
        `,
        border: "1px solid rgba(255,255,255,.10)",
        boxShadow: "0 28px 80px rgba(0,0,0,.50)",
        backgroundColor: "#101521",
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
          transform: `scale(${zoom})`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,.38) 100%)",
        }}
      />
    </div>
  );
};

/* =========================================================
   MAIN
========================================================= */

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const logoIn = spring({
    fps,
    frame,
    config: {
      damping: 12,
      stiffness: 130,
    },
  });

  const headerIn = spring({
    fps,
    frame: Math.max(0, frame - 5),
    config: {
      damping: 15,
      stiffness: 110,
    },
  });

  const categoryIn = spring({
    fps,
    frame: Math.max(0, frame - 10),
    config: {
      damping: 13,
      stiffness: 115,
    },
  });

  const titleIn = spring({
    fps,
    frame: Math.max(0, frame - 17),
    config: {
      damping: 15,
      stiffness: 100,
    },
  });

  const captionIn = interpolate(frame, [30, 50], [0, 1], clamp);

  const lineWidth = interpolate(frame, [18, 50], [0, 760], clamp);

  const glowX = interpolate(
    frame,
    [0, durationInFrames],
    [-400, 850]
  );

  const pulse = 0.7 + Math.sin(frame / 6) * 0.2;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(
          180deg,
          ${CONFIG.colors.background} 0%,
          ${CONFIG.colors.background2} 100%
        )`,
        color: "white",
        fontFamily: "Arial, Helvetica, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ===================================================
          HELE COMPOSITION WORDT HIER SAMEN GESCHAALD
      =================================================== */}

      <div
        style={{
          position: "absolute",
          left: CONFIG.layout.x,
          top: CONFIG.layout.y,

          width: 1080,
          height: 1920,

          transform: `scale(${CONFIG.layout.scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* GRID */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.025,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />

        {/* MOVING GLOW */}

        <div
          style={{
            position: "absolute",
            width: 950,
            height: 950,
            left: glowX,
            top: -450,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(48,83,240,.27), transparent 68%)",
            filter: "blur(25px)",
          }}
        />

        {/* RIGHT TIKTOK SAFE AREA */}

        <div
          style={{
            position: "absolute",
            right: 0,
            top: 420,
            width: 180,
            height: 1450,
            borderRadius: 45,
            background:
              "linear-gradient(180deg, rgba(48,83,240,.13), rgba(48,83,240,.015))",
            border: "1px solid rgba(255,255,255,.035)",
          }}
        />

        {/* HEADER */}

        <div
          style={{
            position: "absolute",
            left: 34,
            top: 32,
            width: 795,
            height: 118,
            borderRadius: 30,
            background:
              "linear-gradient(135deg, rgba(18,24,39,.95), rgba(9,13,24,.88))",
            border: "1px solid rgba(255,255,255,.08)",
            boxShadow: "0 20px 70px rgba(0,0,0,.35)",
          }}
        />

        {/* LOGO */}

        <div
          style={{
            position: "absolute",
            left: CONFIG.logo.x,
            top: CONFIG.logo.y,
            width: CONFIG.logo.width,
            height: CONFIG.logo.height,
            opacity: logoIn,
            transform: `scale(${interpolate(
              logoIn,
              [0, 1],
              [0.55, 1]
            )})`,
          }}
        >
          <Img
            src={staticFile(CONFIG.logo.file)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* BRAND */}

        <div
          style={{
            position: "absolute",
            left: 155,
            top: 62,
            opacity: headerIn,
            transform: `translateX(${interpolate(
              headerIn,
              [0, 1],
              [-50, 0]
            )}px)`,
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 900,
              letterSpacing: -1.2,
            }}
          >
            {CONFIG.brand.text}
          </div>

          <div
            style={{
              marginTop: 3,
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: 7,
              color: CONFIG.colors.muted,
            }}
          >
            {CONFIG.brand.subtext}
          </div>
        </div>



        {/* CATEGORY */}

        <div
          style={{
            position: "absolute",
            left: 55,
            top: 190,
            padding: "12px 20px",
            borderRadius: 999,
            background:
              "linear-gradient(90deg, #3053F0, #6076FF)",
            fontSize: 21,
            fontWeight: 900,
            letterSpacing: 1.4,
            opacity: categoryIn,
            transform: `translateX(${interpolate(
              categoryIn,
              [0, 1],
              [-90, 0]
            )}px)`,
            boxShadow: "0 12px 35px rgba(48,83,240,.28)",
          }}
        >
          {CONFIG.category.text}
        </div>

        {/* LOCATION */}

        <div
          style={{
            position: "absolute",
            left: 55,
            top: 268,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 23,
            fontWeight: 900,
            letterSpacing: 1.6,
            color: CONFIG.colors.blueLight,
          }}
        >
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              backgroundColor: CONFIG.colors.blueLight,
            }}
          />

          {CONFIG.location.text}
        </div>

        {/* TITLE */}

        <div
          style={{
            position: "absolute",
            left: CONFIG.title.x,
            top: CONFIG.title.y,
            width: CONFIG.title.width,
            fontSize: CONFIG.title.fontSize,
            lineHeight: CONFIG.title.lineHeight,
            fontWeight: 900,
            letterSpacing: -3,
            textTransform: "uppercase",
            opacity: titleIn,
            transform: `translateY(${interpolate(
              titleIn,
              [0, 1],
              [70, 0]
            )}px)`,
          }}
        >
          {CONFIG.title.text}
        </div>

        {/* BLUE LINE */}

        <div
          style={{
            position: "absolute",
            left: 55,
            top: 535,
            width: lineWidth,
            height: 5,
            borderRadius: 99,
            background:
              "linear-gradient(90deg, #3053F0, #6C84FF, transparent)",
            boxShadow: "0 0 22px rgba(48,83,240,.45)",
          }}
        />

        {/* CAPTION */}

        <div
          style={{
            position: "absolute",
            left: CONFIG.caption.x,
            top: CONFIG.caption.y,
            width: CONFIG.caption.width,
            fontSize: CONFIG.caption.fontSize,
            lineHeight: 1.24,
            fontWeight: 600,
            color: CONFIG.colors.muted,
            opacity: captionIn,
            transform: `translateY(${interpolate(
              captionIn,
              [0, 1],
              [25, 0]
            )}px)`,
          }}
        >
          {CONFIG.caption.text}
        </div>

        {/* HERO */}

        <ArticleImage
          src={CONFIG.hero.file}
          x={CONFIG.hero.x}
          y={CONFIG.hero.y}
          width={CONFIG.hero.width}
          height={CONFIG.hero.height}
          radius={CONFIG.hero.radius}
          start={36}
          objectPosition={CONFIG.hero.objectPosition}
          direction="up"
        />

        {/* HERO LABEL */}

        <div
          style={{
            position: "absolute",
            left: 80,
            top: 1125,
            padding: "10px 18px",
            borderRadius: 999,
            background: "rgba(6,8,14,.78)",
            border: "1px solid rgba(255,255,255,.13)",
            fontSize: 17,
            fontWeight: 800,
            letterSpacing: 1.2,
          }}
        >
          LIVE BEELDEN
        </div>

        {/* PHOTO 2 */}

        <ArticleImage
          src={CONFIG.image2.file}
          x={CONFIG.image2.x}
          y={CONFIG.image2.y}
          width={CONFIG.image2.width}
          height={CONFIG.image2.height}
          radius={CONFIG.image2.radius}
          start={48}
          objectPosition={CONFIG.image2.objectPosition}
          direction="left"
          rotate={-1.2}
        />

        {/* PHOTO 3 */}

        <ArticleImage
          src={CONFIG.image3.file}
          x={CONFIG.image3.x}
          y={CONFIG.image3.y}
          width={CONFIG.image3.width}
          height={CONFIG.image3.height}
          radius={CONFIG.image3.radius}
          start={56}
          objectPosition={CONFIG.image3.objectPosition}
          direction="right"
          rotate={1.5}
        />

        {/* PHOTO LABEL */}

        <div
          style={{
            position: "absolute",
            left: 500,
            top: 1550,
            padding: "10px 16px",
            borderRadius: 999,
            background: CONFIG.colors.blue,
            fontSize: 16,
            fontWeight: 900,
            letterSpacing: 1.2,
            boxShadow: "0 10px 30px rgba(48,83,240,.30)",
          }}
        >
          POLITIE TER PLAATSE
        </div>

        {/* DECORATIVE BLUE BAR */}

        <div
          style={{
            position: "absolute",
            left: 55,
            top: 1645,
            width: 760,
            height: 7,
            borderRadius: 99,
            background:
              "linear-gradient(90deg, #3053F0, #6C84FF, transparent)",
          }}
        />

        {/* LOWER VISUAL BLOCK */}

        <div
          style={{
            position: "absolute",
            left: 1,
            top: 1870,
            width: 1120,
            height: 180,
            borderRadius: 30,
            background:
              "linear-gradient(135deg, rgba(48,83,240,.13), rgba(255,255,255,.025))",
            border: "1px solid rgba(255,255,255,.07)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -120,
              top: -80,
              width: 350,
              height: 350,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(48,83,240,.32), transparent 70%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              right: 40,
              top: 30,
              width: 300,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, rgba(108,132,255,.65))",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};