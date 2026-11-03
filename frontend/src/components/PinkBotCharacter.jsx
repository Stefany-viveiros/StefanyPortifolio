import React, { useId } from "react";

export default function PinkBotCharacter({ className = "", state = "idle" }) {
  return (
    <svg className={`pinkbot-character ${className} state-${state}`} viewBox="0 0 300 340" role="img" aria-label="PinkBot, robô assistente rosa">
      <defs>
        <linearGradient id={shellId} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff8fc"/><stop offset=".48" stopColor="#ffc2df"/><stop offset="1" stopColor="#e985c0"/></linearGradient>
        <linearGradient id={sideId} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d99bea"/><stop offset="1" stopColor="#9b7bff"/></linearGradient>
        <linearGradient id={screenId} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#33243e"/><stop offset="1" stopColor="#171321"/></linearGradient>
        <radialGradient id={glowId}><stop stopColor="#ff9ccc" stopOpacity=".55"/><stop offset="1" stopColor="#ff9ccc" stopOpacity="0"/></radialGradient>
        <filter id={shadowId} x="-40%" y="-30%" width="180%" height="180%"><feGaussianBlur stdDeviation="10"/></filter>
      </defs>
      <ellipse cx="150" cy="314" rx="92" ry="15" fill="#b75a9d" opacity=".22" filter="url(#{shadowId})"/>
      <circle cx="150" cy="165" r="142" fill="url(#{glowId})"/>
      <g className="pb-antenna"><path d="M150 58V32" stroke="#e58cbd" strokeWidth="7" strokeLinecap="round"/><circle cx="150" cy="23" r="13" fill="#fff0f8" stroke="#ff8fc4" strokeWidth="5"/><circle cx="150" cy="23" r="5" fill="#a77aff"/></g>
      <g className="pb-body">
        <path d="M88 224Q72 236 70 269Q70 295 94 299H206Q230 295 230 269Q228 236 212 224Z" fill="url(#{shellId})" stroke="#fff0f8" strokeWidth="4"/>
        <path d="M110 247Q150 231 190 247L184 282H116Z" fill="#fff8fc" opacity=".72"/>
        <rect x="127" y="257" width="46" height="7" rx="3.5" fill="#e9a0ca"/>
        <circle cx="150" cy="278" r="5" fill="#9b7bff"/>
        <path d="M77 256L54 267M223 256L246 267" stroke="#e58cbd" strokeWidth="13" strokeLinecap="round"/>
        <path d="M119 298V310M181 298V310" stroke="#d77db4" strokeWidth="14" strokeLinecap="round"/>
        <path d="M104 311H132M168 311H196" stroke="#fff0f8" strokeWidth="9" strokeLinecap="round"/>
      </g>
      <g className="pb-head">
        <rect x="39" y="66" width="222" height="172" rx="66" fill="url(#pb-shell)" stroke="#fff2fa" strokeWidth="5"/>
        <path d="M57 111Q66 75 110 72H190Q234 75 243 111" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity=".8"/>
        <rect x="51" y="128" width="198" height="91" rx="39" fill="url(#{screenId})" stroke="#f7d6ea" strokeWidth="5"/>
        <path d="M39 139Q20 134 19 154V178Q20 197 40 191" fill="url(#{sideId})" stroke="#f9d8ed" strokeWidth="4"/>
        <path d="M261 139Q280 134 281 154V178Q280 197 260 191" fill="url(#pb-side)" stroke="#f9d8ed" strokeWidth="4"/>
        <circle cx="91" cy="177" r="8" fill="#ff9fce" className="pb-eye"/><circle cx="209" cy="177" r="8" fill="#ff9fce" className="pb-eye"/>
        <ellipse cx="77" cy="195" rx="13" ry="6" fill="#ff82b9" opacity=".45"/><ellipse cx="223" cy="195" rx="13" ry="6" fill="#ff82b9" opacity=".45"/>
        <path className="pb-mouth" d="M137 194Q150 207 163 194" fill="none" stroke="#ffacd5" strokeWidth="5" strokeLinecap="round"/>
        <path d="M65 88Q150 51 235 88" fill="none" stroke="#fff" strokeWidth="3" opacity=".55"/>
        <circle cx="67" cy="111" r="4" fill="#fff"/><circle cx="233" cy="111" r="4" fill="#fff"/>
      </g>
      <g className="pb-sparkles" fill="#fff"><path d="M26 70L31 84L45 89L31 94L26 108L21 94L7 89L21 84Z"/><path d="M267 45L271 56L282 60L271 64L267 75L263 64L252 60L263 56Z"/><circle cx="270" cy="232" r="4"/><circle cx="34" cy="230" r="3"/></g>
      <g className="pb-badge"><rect x="105" y="14" width="90" height="25" rx="12.5" fill="#fff" stroke="#f5c6e1"/><text x="150" y="31" textAnchor="middle" fontSize="9" fontWeight="800" letterSpacing="1.5" fill="#b45b98">PINKBOT</text></g>
    </svg>
  );
}
