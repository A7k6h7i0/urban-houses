export function placeholderImage(title = "Urban Houses") {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#1a2b47"/>
          <stop offset="55%" stop-color="#08111f"/>
          <stop offset="100%" stop-color="#337ef0"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#g)"/>
      <circle cx="180" cy="140" r="180" fill="#ffffff" fill-opacity="0.08"/>
      <circle cx="1020" cy="680" r="240" fill="#ff9d1a" fill-opacity="0.12"/>
      <text x="110" y="380" fill="#ffffff" font-size="58" font-weight="700" font-family="Arial, sans-serif">${title}</text>
      <text x="110" y="450" fill="rgba(255,255,255,0.78)" font-size="26" font-family="Arial, sans-serif">Premium visual placeholder</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
