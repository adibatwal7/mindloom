import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   MINDLOOM — Hero Page
   Inspired by: dreamy pastel sky with fluffy
   3-D clouds and childhood wonder objects.
   Stack: React + vanilla CSS-in-JS (no deps)
───────────────────────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --sky-top:    #f9c9d4;
    --sky-mid:    #e8c6e8;
    --sky-bot:    #b8d4f0;
    --peach:      #f7b89c;
    --cloud:      rgba(255,255,255,0.92);
    --cloud-edge: rgba(255,255,255,0.55);
    --teal:       #0B3D3A;
    --mint:       #2EC4A0;
    --text-dark:  #1a1a2e;
  }

  html, body { height: 100%; }

  .ml-hero {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    background: linear-gradient(
      170deg,
      var(--sky-top) 0%,
      var(--sky-mid) 35%,
      var(--sky-bot) 100%
    );
  }

  /* ── Light rays ── */
  .ml-rays {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .ml-ray {
    position: absolute;
    top: -10%;
    left: 50%;
    width: 3px;
    height: 90%;
    transform-origin: top center;
    background: linear-gradient(180deg, rgba(255,255,240,0.55) 0%, transparent 100%);
    border-radius: 2px;
    animation: rayBreath 6s ease-in-out infinite;
  }
  .ml-ray:nth-child(1)  { transform: rotate(-38deg); opacity: 0.5; animation-delay: 0s; }
  .ml-ray:nth-child(2)  { transform: rotate(-25deg); opacity: 0.4; animation-delay: 0.4s; }
  .ml-ray:nth-child(3)  { transform: rotate(-12deg); opacity: 0.6; animation-delay: 0.8s; }
  .ml-ray:nth-child(4)  { transform: rotate(0deg);   opacity: 0.5; animation-delay: 1.2s; }
  .ml-ray:nth-child(5)  { transform: rotate(12deg);  opacity: 0.6; animation-delay: 1.6s; }
  .ml-ray:nth-child(6)  { transform: rotate(25deg);  opacity: 0.4; animation-delay: 2.0s; }
  .ml-ray:nth-child(7)  { transform: rotate(38deg);  opacity: 0.5; animation-delay: 2.4s; }
  @keyframes rayBreath {
    0%, 100% { opacity: var(--ray-op, 0.4); transform: var(--ray-rot) scaleX(1); }
    50%       { opacity: calc(var(--ray-op, 0.4) * 1.5); transform: var(--ray-rot) scaleX(1.4); }
  }

  /* ── Sun glow ── */
  .ml-sun {
    position: absolute;
    top: 8%;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,245,200,0.95) 0%, rgba(255,220,150,0.6) 40%, transparent 70%);
    animation: sunPulse 5s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes sunPulse {
    0%, 100% { transform: translateX(-50%) scale(1);   opacity: 0.85; }
    50%       { transform: translateX(-50%) scale(1.18); opacity: 1; }
  }

  /* ── Cloud scene ── */
  .ml-cloudscene {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  /* ── Individual clouds ── */
  .ml-cloud {
    position: absolute;
    filter: drop-shadow(0 8px 32px rgba(200,180,220,0.35));
  }

  /* Main hero cloud — big centre mass */
  .ml-cloud-main {
    bottom: 12%;
    left: 50%;
    transform: translateX(-50%);
    width: min(820px, 92vw);
    animation: cloudFloat 9s ease-in-out infinite;
  }
  /* Left drifter */
  .ml-cloud-left {
    bottom: 28%;
    left: -4%;
    width: min(320px, 38vw);
    animation: cloudFloat 12s ease-in-out infinite reverse;
    animation-delay: -3s;
    opacity: 0.75;
  }
  /* Right drifter */
  .ml-cloud-right {
    bottom: 22%;
    right: -2%;
    width: min(280px, 32vw);
    animation: cloudFloat 10s ease-in-out infinite;
    animation-delay: -5s;
    opacity: 0.7;
  }
  /* Top-left wisp */
  .ml-cloud-wisp1 {
    top: 18%;
    left: 5%;
    width: min(180px, 20vw);
    animation: cloudDrift 18s linear infinite;
    opacity: 0.5;
  }
  /* Top-right wisp */
  .ml-cloud-wisp2 {
    top: 22%;
    right: 8%;
    width: min(140px, 16vw);
    animation: cloudDrift 22s linear infinite reverse;
    opacity: 0.45;
  }

  @keyframes cloudFloat {
    0%, 100% { transform: translateX(-50%) translateY(0px);  }
    33%       { transform: translateX(-50%) translateY(-14px); }
    66%       { transform: translateX(-50%) translateY(-7px);  }
  }
  .ml-cloud-left  { animation-name: cloudFloatL; }
  .ml-cloud-right { animation-name: cloudFloatR; }
  @keyframes cloudFloatL {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-10px); }
  }
  @keyframes cloudFloatR {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-12px); }
  }
  @keyframes cloudDrift {
    0%   { transform: translateX(0vw); }
    100% { transform: translateX(12vw); }
  }

  /* ── Floating childhood objects ── */
  .ml-floaters {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .ml-floater {
    position: absolute;
    animation: floaterBob 7s ease-in-out infinite;
    filter: drop-shadow(0 4px 12px rgba(180,160,200,0.4));
  }
  @keyframes floaterBob {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-16px) rotate(3deg); }
  }

  /* ── Sparkles ── */
  .ml-sparkle {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    animation: sparkleTwinkle 3s ease-in-out infinite;
  }
  @keyframes sparkleTwinkle {
    0%, 100% { opacity: 0; transform: scale(0); }
    50%       { opacity: 1; transform: scale(1); }
  }

  /* ── Navbar ── */
  .ml-nav {
    position: absolute;
    top: 0; left: 0; right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 48px;
    z-index: 20;
  }
  .ml-nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--teal);
    letter-spacing: 3px;
    text-decoration: none;
  }
  .ml-nav-logo span { color: var(--mint); }
  .ml-nav-links {
    display: flex;
    gap: 32px;
    align-items: center;
    list-style: none;
  }
  .ml-nav-links a {
    font-size: 14px;
    font-weight: 500;
    color: var(--teal);
    text-decoration: none;
    letter-spacing: 0.5px;
    opacity: 0.8;
    transition: opacity 0.2s;
  }
  .ml-nav-links a:hover { opacity: 1; }
  .ml-nav-cta {
    background: var(--teal);
    color: #fff !important;
    opacity: 1 !important;
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 13px !important;
    font-weight: 500;
    transition: background 0.2s, transform 0.2s !important;
  }
  .ml-nav-cta:hover { background: #0d4d49 !important; transform: translateY(-1px); }

  /* ── Hero content ── */
  .ml-content {
    position: relative;
    z-index: 10;
    text-align: center;
    padding: 0 24px;
    margin-top: -60px;
    animation: contentReveal 1.2s ease forwards;
  }
  @keyframes contentReveal {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ml-eyebrow {
    display: inline-block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--teal);
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(8px);
    padding: 6px 18px;
    border-radius: 999px;
    margin-bottom: 20px;
    border: 1px solid rgba(255,255,255,0.8);
  }

  .ml-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(52px, 9vw, 96px);
    font-weight: 700;
    color: var(--teal);
    letter-spacing: 8px;
    line-height: 1.05;
    margin-bottom: 6px;
  }
  .ml-title-italic {
    font-style: italic;
    color: var(--mint);
  }

  .ml-subtitle {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: clamp(16px, 2.2vw, 22px);
    color: var(--teal);
    opacity: 0.75;
    margin-bottom: 32px;
    letter-spacing: 1px;
  }

  .ml-tagline {
    font-size: clamp(13px, 1.5vw, 16px);
    color: var(--teal);
    opacity: 0.65;
    max-width: 480px;
    margin: 0 auto 40px;
    line-height: 1.7;
    font-weight: 300;
  }

  .ml-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .ml-btn-primary {
    background: var(--teal);
    color: #fff;
    border: none;
    padding: 16px 40px;
    border-radius: 999px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.5px;
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
    box-shadow: 0 4px 20px rgba(11,61,58,0.25);
  }
  .ml-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(11,61,58,0.35);
    background: #0d4d49;
  }

  .ml-btn-secondary {
    background: rgba(255,255,255,0.6);
    color: var(--teal);
    border: 1.5px solid rgba(11,61,58,0.25);
    padding: 14px 36px;
    border-radius: 999px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.5px;
    transition: transform 0.2s, background 0.2s;
    backdrop-filter: blur(8px);
  }
  .ml-btn-secondary:hover {
    transform: translateY(-2px);
    background: rgba(255,255,255,0.85);
  }

  /* ── Stats bar ── */
  .ml-stats {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    gap: 48px;
    background: rgba(255,255,255,0.55);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.8);
    border-radius: 20px;
    padding: 16px 40px;
    white-space: nowrap;
    animation: statsReveal 1.4s ease 0.4s both;
  }
  @keyframes statsReveal {
    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  .ml-stat { text-align: center; }
  .ml-stat-n {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--teal);
    display: block;
  }
  .ml-stat-l {
    font-size: 11px;
    color: var(--teal);
    opacity: 0.6;
    letter-spacing: 0.5px;
    font-weight: 400;
  }
  .ml-stat-div {
    width: 1px;
    background: rgba(11,61,58,0.15);
    align-self: stretch;
  }

  /* ── Hot air balloon ── */
  .ml-balloon {
    position: absolute;
    right: 8%;
    top: 28%;
    animation: balloonFloat 14s ease-in-out infinite;
    z-index: 5;
    width: min(80px, 10vw);
    pointer-events: none;
  }
  @keyframes balloonFloat {
    0%,100% { transform: translateY(0px) rotate(-2deg); }
    50%      { transform: translateY(-22px) rotate(2deg); }
  }

  /* ── Scroll hint ── */
  .ml-scroll-hint {
    position: absolute;
    bottom: 130px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    opacity: 0.45;
    animation: hintFade 2s ease 2s both;
  }
  @keyframes hintFade { from { opacity: 0; } to { opacity: 0.45; } }
  .ml-scroll-hint span {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--teal);
  }
  .ml-scroll-arrow {
    width: 20px;
    height: 20px;
    border-right: 1.5px solid var(--teal);
    border-bottom: 1.5px solid var(--teal);
    transform: rotate(45deg);
    animation: arrowBounce 1.6s ease-in-out infinite;
  }
  @keyframes arrowBounce {
    0%,100% { transform: rotate(45deg) translateY(0); }
    50%      { transform: rotate(45deg) translateY(5px); }
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .ml-nav { padding: 18px 24px; }
    .ml-nav-links { display: none; }
    .ml-stats { gap: 24px; padding: 14px 24px; bottom: 20px; }
    .ml-balloon { display: none; }
    .ml-scroll-hint { bottom: 100px; }
    .ml-content { margin-top: -40px; }
  }
`;

/* ── SVG cloud shapes ── */

function CloudMain() {
  return (
    <svg viewBox="0 0 820 340" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Base cloud mass */}
      <ellipse cx="410" cy="280" rx="390" ry="90" fill="rgba(255,255,255,0.75)" />
      {/* Mid puffs */}
      <circle cx="160" cy="230" r="80"  fill="rgba(255,255,255,0.88)" />
      <circle cx="300" cy="200" r="105" fill="rgba(255,255,255,0.92)" />
      <circle cx="440" cy="185" r="120" fill="rgba(255,255,255,0.95)" />
      <circle cx="590" cy="210" r="95"  fill="rgba(255,255,255,0.9)" />
      <circle cx="700" cy="235" r="72"  fill="rgba(255,255,255,0.85)" />
      {/* Top highlights */}
      <circle cx="360" cy="150" r="75"  fill="rgba(255,255,255,0.9)" />
      <circle cx="480" cy="130" r="60"  fill="rgba(255,255,255,0.95)" />
      <circle cx="560" cy="155" r="55"  fill="rgba(255,255,255,0.88)" />
      <circle cx="240" cy="170" r="60"  fill="rgba(255,255,255,0.85)" />
      {/* Fluffy top peaks */}
      <circle cx="420" cy="105" r="48"  fill="rgba(255,255,255,0.92)" />
      <circle cx="330" cy="125" r="40"  fill="rgba(255,255,255,0.85)" />
      <circle cx="510" cy="118" r="42"  fill="rgba(255,255,255,0.88)" />
      {/* Inner glow */}
      <ellipse cx="420" cy="200" rx="200" ry="80" fill="rgba(255,252,240,0.4)" />

      {/* ── Childhood objects as cloud-white SVG shapes ── */}

      {/* Brain / mind swirl */}
      <g opacity="0.85">
        <ellipse cx="415" cy="178" rx="28" ry="22" fill="rgba(255,255,255,0.0)" stroke="rgba(200,200,220,0.7)" strokeWidth="3"/>
        <path d="M400 170 Q415 155 430 170 Q445 185 415 195 Q385 185 400 170Z" fill="rgba(220,215,235,0.6)" />
        <path d="M408 185 Q415 175 422 185" stroke="rgba(180,175,210,0.8)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </g>

      {/* Star top-right of cloud */}
      <g transform="translate(610 145)" opacity="0.7">
        <polygon points="16,0 20,11 32,11 22,18 26,29 16,22 6,29 10,18 0,11 12,11" fill="rgba(245,235,200,0.85)" />
      </g>

      {/* Heart center */}
      <path d="M390 220 C390 210 375 205 375 218 C375 225 390 238 390 238 C390 238 405 225 405 218 C405 205 390 210 390 220Z"
        fill="rgba(255,210,220,0.75)" stroke="rgba(240,190,200,0.5)" strokeWidth="1.5" />

      {/* Teddy bear silhouette (left side) */}
      <g transform="translate(158 180)" opacity="0.75">
        <circle cx="20" cy="20" r="20" fill="rgba(240,230,220,0.8)" />
        <circle cx="10" cy="6"  r="9"  fill="rgba(235,225,215,0.8)" />
        <circle cx="30" cy="6"  r="9"  fill="rgba(235,225,215,0.8)" />
        <circle cx="20" cy="20" r="12" fill="rgba(230,220,210,0.6)" />
        <circle cx="15" cy="17" r="3"  fill="rgba(180,160,150,0.7)" />
        <circle cx="25" cy="17" r="3"  fill="rgba(180,160,150,0.7)" />
        <ellipse cx="20" cy="24" rx="5" ry="3" fill="rgba(200,180,170,0.6)" />
      </g>

      {/* Castle (right side) */}
      <g transform="translate(640 195)" opacity="0.7">
        <rect x="0"  y="20" width="42" height="30" rx="2" fill="rgba(230,225,240,0.75)" />
        <rect x="4"  y="12" width="10" height="18" rx="1" fill="rgba(225,220,235,0.8)" />
        <rect x="28" y="12" width="10" height="18" rx="1" fill="rgba(225,220,235,0.8)" />
        <rect x="16" y="8"  width="10" height="22" rx="1" fill="rgba(228,223,238,0.8)" />
        <rect x="4"  y="9"  width="3"  height="4"  fill="rgba(210,205,225,0.7)" />
        <rect x="9"  y="9"  width="3"  height="4"  fill="rgba(210,205,225,0.7)" />
        <rect x="28" y="9"  width="3"  height="4"  fill="rgba(210,205,225,0.7)" />
        <rect x="33" y="9"  width="3"  height="4"  fill="rgba(210,205,225,0.7)" />
        <rect x="17" y="5"  width="3"  height="4"  fill="rgba(210,205,225,0.7)" />
        <rect x="22" y="5"  width="3"  height="4"  fill="rgba(210,205,225,0.7)" />
      </g>

      {/* Unicorn horn */}
      <g transform="translate(520 110)" opacity="0.7">
        <polygon points="10,0 0,28 20,28" fill="rgba(255,215,200,0.8)" />
        <line x1="10" y1="2" x2="10" y2="26" stroke="rgba(240,190,180,0.5)" strokeWidth="1"/>
      </g>
    </svg>
  );
}

function CloudLeft() {
  return (
    <svg viewBox="0 0 320 160" fill="none">
      <ellipse cx="160" cy="130" rx="150" ry="45" fill="rgba(255,255,255,0.65)" />
      <circle cx="80"  cy="105" r="55" fill="rgba(255,255,255,0.8)" />
      <circle cx="160" cy="90"  r="65" fill="rgba(255,255,255,0.85)" />
      <circle cx="245" cy="100" r="55" fill="rgba(255,255,255,0.78)" />
      <circle cx="130" cy="68"  r="42" fill="rgba(255,255,255,0.82)" />
      <circle cx="195" cy="62"  r="38" fill="rgba(255,255,255,0.78)" />
      {/* Butterfly outline */}
      <g transform="translate(130 72)" opacity="0.6">
        <ellipse cx="0"  cy="8" rx="14" ry="9" transform="rotate(-20)" fill="rgba(240,220,250,0.7)" />
        <ellipse cx="18" cy="8" rx="14" ry="9" transform="rotate(20) translate(-14 -2)" fill="rgba(240,220,250,0.7)" />
        <line x1="9" y1="2" x2="9" y2="18" stroke="rgba(200,180,220,0.6)" strokeWidth="1.5"/>
      </g>
    </svg>
  );
}

function CloudRight() {
  return (
    <svg viewBox="0 0 280 140" fill="none">
      <ellipse cx="140" cy="115" rx="130" ry="38" fill="rgba(255,255,255,0.6)" />
      <circle cx="70"  cy="92"  r="50"  fill="rgba(255,255,255,0.78)" />
      <circle cx="145" cy="78"  r="60"  fill="rgba(255,255,255,0.84)" />
      <circle cx="218" cy="88"  r="48"  fill="rgba(255,255,255,0.75)" />
      <circle cx="115" cy="58"  r="38"  fill="rgba(255,255,255,0.80)" />
      {/* Dragon tail curl */}
      <path d="M190 72 Q210 60 205 78 Q200 92 215 88" stroke="rgba(210,200,225,0.65)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function CloudWisp() {
  return (
    <svg viewBox="0 0 180 70" fill="none">
      <ellipse cx="90" cy="52" rx="82" ry="24" fill="rgba(255,255,255,0.5)" />
      <circle cx="55"  cy="42" r="28" fill="rgba(255,255,255,0.62)" />
      <circle cx="98"  cy="34" r="34" fill="rgba(255,255,255,0.68)" />
      <circle cx="142" cy="40" r="26" fill="rgba(255,255,255,0.58)" />
    </svg>
  );
}

function HotAirBalloon() {
  return (
    <svg viewBox="0 0 80 120" fill="none">
      {/* Balloon */}
      <ellipse cx="40" cy="44" rx="32" ry="38" fill="rgba(255,240,245,0.88)" />
      <ellipse cx="40" cy="44" rx="32" ry="38" fill="none" stroke="rgba(200,180,200,0.4)" strokeWidth="1.5" />
      {/* Stripes */}
      <path d="M18 26 Q40 8 62 26" stroke="rgba(240,200,210,0.6)" strokeWidth="2" fill="none"/>
      <path d="M12 44 Q40 28 68 44" stroke="rgba(240,200,210,0.5)" strokeWidth="1.5" fill="none"/>
      <path d="M16 60 Q40 48 64 60" stroke="rgba(240,200,210,0.5)" strokeWidth="1.5" fill="none"/>
      {/* Ropes */}
      <line x1="28" y1="80" x2="24" y2="95" stroke="rgba(180,170,190,0.6)" strokeWidth="1.2"/>
      <line x1="52" y1="80" x2="56" y2="95" stroke="rgba(180,170,190,0.6)" strokeWidth="1.2"/>
      <line x1="40" y1="82" x2="40" y2="95" stroke="rgba(180,170,190,0.6)" strokeWidth="1.2"/>
      {/* Basket */}
      <rect x="24" y="95" width="32" height="18" rx="4" fill="rgba(220,200,180,0.75)" />
      <line x1="24" y1="99" x2="56" y2="99" stroke="rgba(190,170,150,0.5)" strokeWidth="1"/>
    </svg>
  );
}

/* ── Sparkle positions ── */
const SPARKLES = [
  { top: "20%", left: "18%",  delay: "0s",    size: 5  },
  { top: "35%", left: "72%",  delay: "0.8s",  size: 4  },
  { top: "55%", left: "12%",  delay: "1.4s",  size: 6  },
  { top: "28%", left: "55%",  delay: "2.1s",  size: 4  },
  { top: "42%", left: "88%",  delay: "0.5s",  size: 5  },
  { top: "62%", left: "62%",  delay: "1.8s",  size: 3  },
  { top: "15%", left: "42%",  delay: "2.6s",  size: 4  },
  { top: "70%", left: "30%",  delay: "1.1s",  size: 5  },
];

/* ── Main component ── */
export default function MindloomHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <style>{styles}</style>

      <section className="ml-hero">

        {/* Light rays */}
        <div className="ml-rays">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="ml-ray" />
          ))}
        </div>

        {/* Sun glow */}
        <div className="ml-sun" />

        {/* Sparkles */}
        <div className="ml-floaters">
          {SPARKLES.map((s, i) => (
            <div
              key={i}
              className="ml-sparkle"
              style={{
                top: s.top, left: s.left,
                width: s.size, height: s.size,
                animationDelay: s.delay,
                animationDuration: `${2.5 + i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Cloud scene */}
        <div className="ml-cloudscene">
          <div className="ml-cloud ml-cloud-wisp1"><CloudWisp /></div>
          <div className="ml-cloud ml-cloud-wisp2"><CloudWisp /></div>
          <div className="ml-cloud ml-cloud-left"><CloudLeft /></div>
          <div className="ml-cloud ml-cloud-right"><CloudRight /></div>
          <div className="ml-cloud ml-cloud-main"><CloudMain /></div>
        </div>

        {/* Hot air balloon */}
        <div className="ml-balloon"><HotAirBalloon /></div>

        {/* Navbar */}
        <nav className="ml-nav">
          <a href="#" className="ml-nav-logo">MIND<span>LOOM</span></a>
          <ul className="ml-nav-links">
            <li><a href="#">How It Works</a></li>
            <li><a href="#">For Parents</a></li>
            <li><a href="#">Research</a></li>
            <li><a href="#" className="ml-nav-cta">Try the Demo</a></li>
          </ul>
        </nav>

        {/* Hero text */}
        <div className="ml-content">
          <div className="ml-eyebrow">✦ Harvard HSIL Hackathon 2026</div>
          <h1 className="ml-title">
            MIND<span className="ml-title-italic">LOOM</span>
          </h1>
          <p className="ml-subtitle">Early ASD Awareness, Powered by AI</p>
          <p className="ml-tagline">
            A child-friendly platform that turns playtime into insight —
            helping families start the right conversations, earlier.
          </p>
          <div className="ml-actions">
            <button className="ml-btn-primary">Start the Demo ✦</button>
            <button className="ml-btn-secondary">Learn How It Works</button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="ml-scroll-hint">
          <span>Scroll</span>
          <div className="ml-scroll-arrow" />
        </div>

        {/* Stats bar */}
        <div className="ml-stats">
          <div className="ml-stat">
            <span className="ml-stat-n">1 in 36</span>
            <span className="ml-stat-l">children affected</span>
          </div>
          <div className="ml-stat-div" />
          <div className="ml-stat">
            <span className="ml-stat-n">4–5 yrs</span>
            <span className="ml-stat-l">avg. diagnosis age</span>
          </div>
          <div className="ml-stat-div" />
          <div className="ml-stat">
            <span className="ml-stat-n">18 mo.</span>
            <span className="ml-stat-l">specialist waitlist</span>
          </div>
          <div className="ml-stat-div" />
          <div className="ml-stat">
            <span className="ml-stat-n">0 video</span>
            <span className="ml-stat-l">stored — privacy first</span>
          </div>
        </div>

      </section>
    </>
  );
}