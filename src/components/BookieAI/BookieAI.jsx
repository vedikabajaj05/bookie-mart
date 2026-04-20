// import { useState, useRef, useEffect } from "react";
// import { BookOpen, X, Send, Sparkles } from "lucide-react";
// import { useQuery } from "convex/react";
// import { api } from "../../../convex/_generated/api";

// /* ─────────────────────────────────────────────────────────────────────────
//    BookieAI – floating AI chat widget (powered by OpenAI)
//    ─────────────────────────────────────────────────────────────────────────
//    SETUP:
//    1. Copy this file to src/components/BookieAI/BookieAI.jsx
//    2. Get a key at https://platform.openai.com → API Keys
//    3. Add to .env:  VITE_OPENAI_API_KEY=sk-...
//    4. In App.jsx add <BookieAI /> just before </MyState>
//    ───────────────────────────────────────────────────────────────────────── */

// const STYLES = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');

//   .bookie-fab {
//     position: fixed;
//     bottom: 28px;
//     right: 28px;
//     z-index: 9999;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-end;
//     gap: 12px;
//     font-family: 'Lato', sans-serif;
//   }

//   .bookie-btn {
//     width: 60px;
//     height: 60px;
//     border-radius: 50%;
//     border: none;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background: linear-gradient(135deg, #1a0a00 0%, #5c2d00 60%, #c8702a 100%);
//     box-shadow: 0 4px 24px rgba(90,30,0,0.45), 0 1.5px 6px rgba(0,0,0,0.18);
//     transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s;
//     position: relative;
//     overflow: visible;
//   }
//   .bookie-btn:hover {
//     transform: scale(1.10) rotate(-6deg);
//     box-shadow: 0 8px 32px rgba(90,30,0,0.55);
//   }
//   .bookie-btn:active { transform: scale(0.96); }
//   .bookie-btn .pulse-ring {
//     position: absolute;
//     inset: -6px;
//     border-radius: 50%;
//     border: 2px solid rgba(200,112,42,0.5);
//     animation: bookiePulse 2.2s ease-out infinite;
//     pointer-events: none;
//   }
//   @keyframes bookiePulse {
//     0%   { transform: scale(1);   opacity: 0.7; }
//     70%  { transform: scale(1.4); opacity: 0;   }
//     100% { transform: scale(1.4); opacity: 0;   }
//   }

//   .bookie-tooltip {
//     background: #1a0a00;
//     color: #f5d9b8;
//     font-family: 'Playfair Display', serif;
//     font-size: 13px;
//     font-style: italic;
//     padding: 6px 14px;
//     border-radius: 20px;
//     white-space: nowrap;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.25);
//     animation: fadeSlideIn 0.3s ease;
//     border: 1px solid rgba(200,112,42,0.3);
//   }

//   .bookie-panel {
//     position: fixed;
//     bottom: 100px;
//     right: 28px;
//     z-index: 9998;
//     width: 370px;
//     height: 540px;
//     border-radius: 20px;
//     display: flex;
//     flex-direction: column;
//     overflow: hidden;
//     box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2);
//     animation: panelOpen 0.35s cubic-bezier(.34,1.4,.64,1);
//     background: #fdf6ec;
//     border: 1px solid rgba(180,100,30,0.18);
//   }
//   @media (max-width: 440px) {
//     .bookie-panel { width: calc(100vw - 20px); right: 10px; bottom: 90px; }
//   }
//   @keyframes panelOpen {
//     from { opacity: 0; transform: scale(0.85) translateY(30px); transform-origin: bottom right; }
//     to   { opacity: 1; transform: scale(1)    translateY(0);    transform-origin: bottom right; }
//   }

//   .bookie-header {
//     background: linear-gradient(135deg, #1a0a00 0%, #4a1c00 100%);
//     padding: 16px 18px 14px;
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     flex-shrink: 0;
//     position: relative;
//     overflow: hidden;
//   }
//   .bookie-header::before {
//     content: '';
//     position: absolute;
//     top: -30px; right: -30px;
//     width: 100px; height: 100px;
//     border-radius: 50%;
//     background: rgba(200,112,42,0.12);
//   }
//   .bookie-header-icon {
//     width: 42px; height: 42px;
//     border-radius: 12px;
//     background: linear-gradient(135deg, #c8702a, #e8a060);
//     display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0;
//     box-shadow: 0 2px 10px rgba(200,112,42,0.4);
//   }
//   .bookie-header-text { flex: 1; }
//   .bookie-header-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 17px;
//     font-weight: 600;
//     color: #f5d9b8;
//     line-height: 1;
//   }
//   .bookie-header-sub {
//     font-size: 11px;
//     color: rgba(245,217,184,0.6);
//     margin-top: 3px;
//     display: flex; align-items: center; gap: 4px;
//   }
//   .bookie-status-dot {
//     width: 6px; height: 6px;
//     border-radius: 50%;
//     background: #4ade80;
//     animation: statusBlink 2s ease infinite;
//   }
//   @keyframes statusBlink {
//     0%,100% { opacity: 1; } 50% { opacity: 0.4; }
//   }
//   .bookie-close-btn {
//     width: 30px; height: 30px;
//     border-radius: 8px;
//     border: none;
//     background: rgba(255,255,255,0.08);
//     color: rgba(245,217,184,0.7);
//     cursor: pointer;
//     display: flex; align-items: center; justify-content: center;
//     transition: background 0.15s, color 0.15s;
//     flex-shrink: 0;
//   }
//   .bookie-close-btn:hover { background: rgba(255,255,255,0.16); color: #f5d9b8; }

//   .bookie-messages {
//     flex: 1;
//     overflow-y: auto;
//     padding: 16px 14px;
//     display: flex;
//     flex-direction: column;
//     gap: 12px;
//     background: #fdf6ec;
//     scroll-behavior: smooth;
//   }
//   .bookie-messages::-webkit-scrollbar { width: 4px; }
//   .bookie-messages::-webkit-scrollbar-thumb { background: rgba(180,100,30,0.2); border-radius: 4px; }

//   .bookie-msg {
//     display: flex;
//     gap: 8px;
//     animation: msgAppear 0.25s ease;
//   }
//   @keyframes msgAppear {
//     from { opacity: 0; transform: translateY(8px); }
//     to   { opacity: 1; transform: translateY(0);   }
//   }
//   .bookie-msg.user { flex-direction: row-reverse; }

//   .bookie-avatar {
//     width: 28px; height: 28px;
//     border-radius: 8px;
//     background: linear-gradient(135deg, #c8702a, #e8a060);
//     display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0;
//     margin-top: 2px;
//   }
//   .bookie-avatar.user-avatar {
//     background: linear-gradient(135deg, #1a0a00, #4a1c00);
//   }

//   .bookie-bubble {
//     max-width: 78%;
//     padding: 10px 14px;
//     border-radius: 16px;
//     font-size: 13.5px;
//     line-height: 1.55;
//     font-family: 'Lato', sans-serif;
//     font-weight: 400;
//   }
//   .bookie-bubble.ai {
//     background: #fff;
//     color: #2a1400;
//     border: 1px solid rgba(180,100,30,0.12);
//     border-bottom-left-radius: 4px;
//     box-shadow: 0 1px 4px rgba(0,0,0,0.06);
//   }
//   .bookie-bubble.user {
//     background: linear-gradient(135deg, #3d1400, #7a3000);
//     color: #f5d9b8;
//     border-bottom-right-radius: 4px;
//   }
//   .bookie-bubble strong { font-weight: 700; }
//   .bookie-bubble em { font-style: italic; color: #c8702a; }

//   .bookie-typing {
//     display: flex; gap: 4px; align-items: center;
//     padding: 10px 14px;
//   }
//   .bookie-typing span {
//     width: 7px; height: 7px;
//     border-radius: 50%;
//     background: #c8702a;
//     animation: typingBounce 1.1s ease infinite;
//   }
//   .bookie-typing span:nth-child(2) { animation-delay: 0.18s; }
//   .bookie-typing span:nth-child(3) { animation-delay: 0.36s; }
//   @keyframes typingBounce {
//     0%,60%,100% { transform: translateY(0);    opacity: 0.4; }
//     30%          { transform: translateY(-6px); opacity: 1;   }
//   }

//   .bookie-suggestions {
//     padding: 0 14px 10px;
//     display: flex;
//     flex-wrap: wrap;
//     gap: 6px;
//     flex-shrink: 0;
//   }
//   .bookie-chip {
//     font-size: 11.5px;
//     font-family: 'Lato', sans-serif;
//     padding: 5px 11px;
//     border-radius: 20px;
//     border: 1px solid rgba(180,100,30,0.3);
//     background: rgba(200,112,42,0.07);
//     color: #7a3000;
//     cursor: pointer;
//     transition: background 0.15s, border-color 0.15s, transform 0.12s;
//     white-space: nowrap;
//   }
//   .bookie-chip:hover {
//     background: rgba(200,112,42,0.18);
//     border-color: rgba(180,100,30,0.55);
//     transform: translateY(-1px);
//   }

//   .bookie-input-row {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     padding: 12px 14px;
//     background: #fff;
//     border-top: 1px solid rgba(180,100,30,0.12);
//     flex-shrink: 0;
//   }
//   .bookie-input {
//     flex: 1;
//     border: 1px solid rgba(180,100,30,0.2);
//     border-radius: 12px;
//     padding: 9px 13px;
//     font-size: 13.5px;
//     font-family: 'Lato', sans-serif;
//     color: #2a1400;
//     background: #fdf6ec;
//     outline: none;
//     resize: none;
//     max-height: 90px;
//     transition: border-color 0.15s, box-shadow 0.15s;
//     line-height: 1.4;
//   }
//   .bookie-input:focus {
//     border-color: #c8702a;
//     box-shadow: 0 0 0 3px rgba(200,112,42,0.12);
//   }
//   .bookie-input::placeholder { color: rgba(90,30,0,0.35); }

//   .bookie-send-btn {
//     width: 38px; height: 38px;
//     border-radius: 11px;
//     border: none;
//     background: linear-gradient(135deg, #c8702a, #e8903a);
//     color: #fff;
//     cursor: pointer;
//     display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0;
//     transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
//     box-shadow: 0 2px 8px rgba(200,112,42,0.4);
//   }
//   .bookie-send-btn:hover:not(:disabled) {
//     transform: scale(1.08);
//     box-shadow: 0 4px 14px rgba(200,112,42,0.5);
//   }
//   .bookie-send-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

//   .bookie-empty {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap: 10px;
//     padding: 20px;
//     text-align: center;
//   }
//   .bookie-empty-icon {
//     width: 56px; height: 56px;
//     border-radius: 16px;
//     background: linear-gradient(135deg, rgba(200,112,42,0.15), rgba(200,112,42,0.05));
//     display: flex; align-items: center; justify-content: center;
//     border: 1px solid rgba(200,112,42,0.2);
//   }
//   .bookie-empty-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 16px;
//     color: #2a1400;
//     font-weight: 600;
//   }
//   .bookie-empty-sub {
//     font-size: 12.5px;
//     color: rgba(90,30,0,0.5);
//     line-height: 1.5;
//     max-width: 220px;
//   }

//   @keyframes fadeSlideIn {
//     from { opacity: 0; transform: translateX(8px); }
//     to   { opacity: 1; transform: translateX(0);   }
//   }
// `;

// // Minimal markdown renderer: **bold**, *italic*, bullet lines
// function renderText(text) {
//   return text.split("\n").map((line, i, arr) => {
//     const isBullet = /^[-*•]\s/.test(line.trim());
//     const content  = isBullet ? line.replace(/^[-*•]\s/, "") : line;
//     const parts    = content.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((p, j) => {
//       if (/^\*\*(.+)\*\*$/.test(p)) return <strong key={j}>{p.slice(2, -2)}</strong>;
//       if (/^\*(.+)\*$/.test(p))     return <em key={j}>{p.slice(1, -1)}</em>;
//       return p;
//     });
//     return (
//       <span key={i} style={{ display: isBullet ? "flex" : "block", gap: 6, marginBottom: isBullet ? 3 : 0 }}>
//         {isBullet && <span style={{ color: "#c8702a", flexShrink: 0 }}>•</span>}
//         <span>{parts}</span>
//         {!isBullet && i < arr.length - 1 && <br />}
//       </span>
//     );
//   });
// }

// const SUGGESTIONS = [
//   "📚 Recommend me a book",
//   "🔥 What's popular right now?",
//   "🕵️ I love mysteries",
//   "💡 Something life-changing",
// ];


// export default function BookieAI() {
//   const [open, setOpen]       = useState(false);
//   const [showTip, setShowTip] = useState(true);
//   const [msgs, setMsgs]       = useState([]);
//   const [input, setInput]     = useState("");
//   const [loading, setLoading] = useState(false);
//   const bottomRef              = useRef(null);
//   const textareaRef            = useRef(null);

//   // Live book inventory from Convex
//   const products = useQuery(api.products.getProduct) ?? [];

//   useEffect(() => {
//     const t = setTimeout(() => setShowTip(false), 4000);
//     return () => clearTimeout(t);
//   }, []);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [msgs, loading]);

//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
//     }
//   }, [input]);

//   const buildBookList = () =>
//     products.length
//       ? products
//           .map((p) => `- "${p.title}" | Category: ${p.category} | Price: ₹${p.price} | ${(p.description ?? "").slice(0, 80)}`)
//           .join("\n")
//       : "No books currently in inventory.";

//   const systemInstruction = () =>
//     `You are Bookie — a warm, witty, knowledgeable book companion for an online bookstore.
// You help readers discover books, discuss stories, recommend reads based on mood/taste, and chat like a genuine friend who loves books.

// Current store inventory (live from database):
// ${buildBookList()}

// Rules:
// - Be conversational and enthusiastic, never robotic.
// - Keep replies concise (2–4 sentences) unless the user clearly wants depth.
// - Prefer store inventory when recommending; mention price naturally (e.g. "only ₹299").
// - You can discuss any book in the world, but weave in store picks where natural.
// - Use *italics* for book titles, **bold** for emphasis. Use bullet lists sparingly.
// - Never invent titles or prices not in the inventory.`;

//   const send = async (quickText) => {
//     const text = (quickText ?? input).trim();
//     if (!text || loading) return;
//     setInput("");

//     const history = [...msgs, { role: "user", content: text }];
//     setMsgs(history);
//     setLoading(true);

//     try {
//       const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
//       if (!apiKey) throw new Error("Missing VITE_OPENAI_API_KEY in .env");

//       // OpenAI gpt-4o-mini — cheap, fast, great for chat
//       const res = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${apiKey}`,
//         },
//         body: JSON.stringify({
//           model: "gpt-4o-mini",
//           max_tokens: 512,
//           temperature: 0.8,
//           messages: [
//             { role: "system", content: systemInstruction() },
//             // Full conversation history so Bookie remembers context
//             ...history,
//           ],
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         const errMsg = data?.error?.message ?? "OpenAI API error";
//         throw new Error(errMsg);
//       }

//       const reply =
//         data?.choices?.[0]?.message?.content ??
//         "Hmm, I couldn't think of anything! Try again?";

//       setMsgs([...history, { role: "assistant", content: reply }]);
//     } catch (err) {
//       setMsgs([...history, {
//         role: "assistant",
//         content: `*Oops!* Something went wrong — ${err.message}`,
//       }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKey = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
//   };

//   const isEmpty = msgs.length === 0;

//   return (
//     <>
//       <style>{STYLES}</style>

//       {/* Floating Action Button */}
//       <div className="bookie-fab">
//         {showTip && !open && (
//           <div className="bookie-tooltip">Ask Bookie anything 📖</div>
//         )}
//         <button
//           className="bookie-btn"
//           onClick={() => { setOpen((o) => !o); setShowTip(false); }}
//           aria-label="Toggle Bookie AI"
//         >
//           <span className="pulse-ring" />
//           {open
//             ? <X size={22} color="#f5d9b8" />
//             : <BookOpen size={24} color="#f5d9b8" strokeWidth={1.8} />}
//         </button>
//       </div>

//       {/* Chat Panel */}
//       {open && (
//         <div className="bookie-panel">

//           {/* Header */}
//           <div className="bookie-header">
//             <div className="bookie-header-icon">
//               <BookOpen size={20} color="#fff" strokeWidth={1.8} />
//             </div>
//             <div className="bookie-header-text">
//               <div className="bookie-header-title">Bookie AI</div>
//               <div className="bookie-header-sub">
//                 <span className="bookie-status-dot" />
//                 Your personal book guide
//               </div>
//             </div>
//             <button className="bookie-close-btn" onClick={() => setOpen(false)}>
//               <X size={16} />
//             </button>
//           </div>

//           {/* Messages / Empty state */}
//           {isEmpty ? (
//             <div className="bookie-empty">
//               <div className="bookie-empty-icon">
//                 <Sparkles size={26} color="#c8702a" />
//               </div>
//               <div className="bookie-empty-title">Hello, book lover! 👋</div>
//               <div className="bookie-empty-sub">
//                 Ask for recommendations, chat about a genre, or find your next great read from our store.
//               </div>
//             </div>
//           ) : (
//             <div className="bookie-messages">
//               {msgs.map((m, i) => (
//                 <div key={i} className={`bookie-msg ${m.role === "user" ? "user" : ""}`}>
//                   {m.role === "assistant" && (
//                     <div className="bookie-avatar">
//                       <BookOpen size={14} color="#fff" strokeWidth={2} />
//                     </div>
//                   )}
//                   <div className={`bookie-bubble ${m.role === "assistant" ? "ai" : "user"}`}>
//                     {m.role === "assistant" ? renderText(m.content) : m.content}
//                   </div>
//                   {m.role === "user" && (
//                     <div className="bookie-avatar user-avatar">
//                       <span style={{ fontSize: 12, color: "#f5d9b8", fontWeight: 700 }}>U</span>
//                     </div>
//                   )}
//                 </div>
//               ))}
//               {loading && (
//                 <div className="bookie-msg">
//                   <div className="bookie-avatar">
//                     <BookOpen size={14} color="#fff" strokeWidth={2} />
//                   </div>
//                   <div className="bookie-bubble ai" style={{ padding: "6px 10px" }}>
//                     <div className="bookie-typing">
//                       <span /><span /><span />
//                     </div>
//                   </div>
//                 </div>
//               )}
//               <div ref={bottomRef} />
//             </div>
//           )}

//           {/* Quick-start chips (only on empty state) */}
//           {isEmpty && (
//             <div className="bookie-suggestions">
//               {SUGGESTIONS.map((s) => (
//                 <button key={s} className="bookie-chip" onClick={() => send(s)}>
//                   {s}
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Input bar */}
//           <div className="bookie-input-row">
//             <textarea
//               ref={textareaRef}
//               className="bookie-input"
//               placeholder="Ask about any book…"
//               rows={1}
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKey}
//               disabled={loading}
//             />
//             <button
//               className="bookie-send-btn"
//               onClick={() => send()}
//               disabled={!input.trim() || loading}
//               aria-label="Send message"
//             >
//               <Send size={16} strokeWidth={2.2} />
//             </button>
//           </div>

//         </div>
//       )}
//     </>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { BookOpen, X, Send, Sparkles } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

/* ─────────────────────────────────────────────────────────────────────────
   BookieAI – floating AI chat widget (powered by Google Gemini — FREE)
   ─────────────────────────────────────────────────────────────────────────
   SETUP:
   1. Copy this file to src/components/BookieAI/BookieAI.jsx
   2. Get FREE key at https://aistudio.google.com → Get API Key
   3. Add to .env:  VITE_GEMINI_API_KEY=AIza...
   4. In App.jsx add <BookieAI /> just before </MyState>
   ───────────────────────────────────────────────────────────────────────── */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');

  .bookie-fab {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    font-family: 'Lato', sans-serif;
  }

  .bookie-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a0a00 0%, #5c2d00 60%, #c8702a 100%);
    box-shadow: 0 4px 24px rgba(90,30,0,0.45), 0 1.5px 6px rgba(0,0,0,0.18);
    transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s;
    position: relative;
    overflow: visible;
  }
  .bookie-btn:hover {
    transform: scale(1.10) rotate(-6deg);
    box-shadow: 0 8px 32px rgba(90,30,0,0.55);
  }
  .bookie-btn:active { transform: scale(0.96); }
  .bookie-btn .pulse-ring {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 2px solid rgba(200,112,42,0.5);
    animation: bookiePulse 2.2s ease-out infinite;
    pointer-events: none;
  }
  @keyframes bookiePulse {
    0%   { transform: scale(1);   opacity: 0.7; }
    70%  { transform: scale(1.4); opacity: 0;   }
    100% { transform: scale(1.4); opacity: 0;   }
  }

  .bookie-tooltip {
    background: #1a0a00;
    color: #f5d9b8;
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    font-style: italic;
    padding: 6px 14px;
    border-radius: 20px;
    white-space: nowrap;
    box-shadow: 0 2px 12px rgba(0,0,0,0.25);
    animation: fadeSlideIn 0.3s ease;
    border: 1px solid rgba(200,112,42,0.3);
  }

  .bookie-panel {
    position: fixed;
    bottom: 100px;
    right: 28px;
    z-index: 9998;
    width: 370px;
    height: 540px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2);
    animation: panelOpen 0.35s cubic-bezier(.34,1.4,.64,1);
    background: #fdf6ec;
    border: 1px solid rgba(180,100,30,0.18);
  }
  @media (max-width: 440px) {
    .bookie-panel { width: calc(100vw - 20px); right: 10px; bottom: 90px; }
  }
  @keyframes panelOpen {
    from { opacity: 0; transform: scale(0.85) translateY(30px); transform-origin: bottom right; }
    to   { opacity: 1; transform: scale(1)    translateY(0);    transform-origin: bottom right; }
  }

  .bookie-header {
    background: linear-gradient(135deg, #1a0a00 0%, #4a1c00 100%);
    padding: 16px 18px 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }
  .bookie-header::before {
    content: '';
    position: absolute;
    top: -30px; right: -30px;
    width: 100px; height: 100px;
    border-radius: 50%;
    background: rgba(200,112,42,0.12);
  }
  .bookie-header-icon {
    width: 42px; height: 42px;
    border-radius: 12px;
    background: linear-gradient(135deg, #c8702a, #e8a060);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 10px rgba(200,112,42,0.4);
  }
  .bookie-header-text { flex: 1; }
  .bookie-header-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 600;
    color: #f5d9b8;
    line-height: 1;
  }
  .bookie-header-sub {
    font-size: 11px;
    color: rgba(245,217,184,0.6);
    margin-top: 3px;
    display: flex; align-items: center; gap: 4px;
  }
  .bookie-status-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #4ade80;
    animation: statusBlink 2s ease infinite;
  }
  @keyframes statusBlink {
    0%,100% { opacity: 1; } 50% { opacity: 0.4; }
  }
  .bookie-close-btn {
    width: 30px; height: 30px;
    border-radius: 8px;
    border: none;
    background: rgba(255,255,255,0.08);
    color: rgba(245,217,184,0.7);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, color 0.15s;
    flex-shrink: 0;
  }
  .bookie-close-btn:hover { background: rgba(255,255,255,0.16); color: #f5d9b8; }

  .bookie-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #fdf6ec;
    scroll-behavior: smooth;
  }
  .bookie-messages::-webkit-scrollbar { width: 4px; }
  .bookie-messages::-webkit-scrollbar-thumb { background: rgba(180,100,30,0.2); border-radius: 4px; }

  .bookie-msg {
    display: flex;
    gap: 8px;
    animation: msgAppear 0.25s ease;
  }
  @keyframes msgAppear {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0);   }
  }
  .bookie-msg.user { flex-direction: row-reverse; }

  .bookie-avatar {
    width: 28px; height: 28px;
    border-radius: 8px;
    background: linear-gradient(135deg, #c8702a, #e8a060);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .bookie-avatar.user-avatar {
    background: linear-gradient(135deg, #1a0a00, #4a1c00);
  }

  .bookie-bubble {
    max-width: 78%;
    padding: 10px 14px;
    border-radius: 16px;
    font-size: 13.5px;
    line-height: 1.55;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
  }
  .bookie-bubble.ai {
    background: #fff;
    color: #2a1400;
    border: 1px solid rgba(180,100,30,0.12);
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  }
  .bookie-bubble.user {
    background: linear-gradient(135deg, #3d1400, #7a3000);
    color: #f5d9b8;
    border-bottom-right-radius: 4px;
  }
  .bookie-bubble strong { font-weight: 700; }
  .bookie-bubble em { font-style: italic; color: #c8702a; }

  .bookie-typing {
    display: flex; gap: 4px; align-items: center;
    padding: 10px 14px;
  }
  .bookie-typing span {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #c8702a;
    animation: typingBounce 1.1s ease infinite;
  }
  .bookie-typing span:nth-child(2) { animation-delay: 0.18s; }
  .bookie-typing span:nth-child(3) { animation-delay: 0.36s; }
  @keyframes typingBounce {
    0%,60%,100% { transform: translateY(0);    opacity: 0.4; }
    30%          { transform: translateY(-6px); opacity: 1;   }
  }

  .bookie-suggestions {
    padding: 0 14px 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    flex-shrink: 0;
  }
  .bookie-chip {
    font-size: 11.5px;
    font-family: 'Lato', sans-serif;
    padding: 5px 11px;
    border-radius: 20px;
    border: 1px solid rgba(180,100,30,0.3);
    background: rgba(200,112,42,0.07);
    color: #7a3000;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, transform 0.12s;
    white-space: nowrap;
  }
  .bookie-chip:hover {
    background: rgba(200,112,42,0.18);
    border-color: rgba(180,100,30,0.55);
    transform: translateY(-1px);
  }

  .bookie-input-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    background: #fff;
    border-top: 1px solid rgba(180,100,30,0.12);
    flex-shrink: 0;
  }
  .bookie-input {
    flex: 1;
    border: 1px solid rgba(180,100,30,0.2);
    border-radius: 12px;
    padding: 9px 13px;
    font-size: 13.5px;
    font-family: 'Lato', sans-serif;
    color: #2a1400;
    background: #fdf6ec;
    outline: none;
    resize: none;
    max-height: 90px;
    transition: border-color 0.15s, box-shadow 0.15s;
    line-height: 1.4;
  }
  .bookie-input:focus {
    border-color: #c8702a;
    box-shadow: 0 0 0 3px rgba(200,112,42,0.12);
  }
  .bookie-input::placeholder { color: rgba(90,30,0,0.35); }

  .bookie-send-btn {
    width: 38px; height: 38px;
    border-radius: 11px;
    border: none;
    background: linear-gradient(135deg, #c8702a, #e8903a);
    color: #fff;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
    box-shadow: 0 2px 8px rgba(200,112,42,0.4);
  }
  .bookie-send-btn:hover:not(:disabled) {
    transform: scale(1.08);
    box-shadow: 0 4px 14px rgba(200,112,42,0.5);
  }
  .bookie-send-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

  .bookie-empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px;
    text-align: center;
  }
  .bookie-empty-icon {
    width: 56px; height: 56px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(200,112,42,0.15), rgba(200,112,42,0.05));
    display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(200,112,42,0.2);
  }
  .bookie-empty-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    color: #2a1400;
    font-weight: 600;
  }
  .bookie-empty-sub {
    font-size: 12.5px;
    color: rgba(90,30,0,0.5);
    line-height: 1.5;
    max-width: 220px;
  }

  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateX(8px); }
    to   { opacity: 1; transform: translateX(0);   }
  }
`;

// Minimal markdown renderer: **bold**, *italic*, bullet lines
function renderText(text) {
  return text.split("\n").map((line, i, arr) => {
    const isBullet = /^[-*•]\s/.test(line.trim());
    const content  = isBullet ? line.replace(/^[-*•]\s/, "") : line;
    const parts    = content.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((p, j) => {
      if (/^\*\*(.+)\*\*$/.test(p)) return <strong key={j}>{p.slice(2, -2)}</strong>;
      if (/^\*(.+)\*$/.test(p))     return <em key={j}>{p.slice(1, -1)}</em>;
      return p;
    });
    return (
      <span key={i} style={{ display: isBullet ? "flex" : "block", gap: 6, marginBottom: isBullet ? 3 : 0 }}>
        {isBullet && <span style={{ color: "#c8702a", flexShrink: 0 }}>•</span>}
        <span>{parts}</span>
        {!isBullet && i < arr.length - 1 && <br />}
      </span>
    );
  });
}

const SUGGESTIONS = [
  "📚 Recommend me a book",
  "🔥 What's popular right now?",
  "🕵️ I love mysteries",
  "💡 Something life-changing",
];


export default function BookieAI() {
  const [open, setOpen]       = useState(false);
  const [showTip, setShowTip] = useState(true);
  const [msgs, setMsgs]       = useState([]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef              = useRef(null);
  const textareaRef            = useRef(null);

  // Live book inventory from Convex
  const products = useQuery(api.products.getProduct) ?? [];

  useEffect(() => {
    const t = setTimeout(() => setShowTip(false), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  const buildBookList = () =>
    products.length
      ? products
          .map((p) => `- "${p.title}" | Category: ${p.category} | Price: ₹${p.price} | ${(p.description ?? "").slice(0, 80)}`)
          .join("\n")
      : "No books currently in inventory.";

  const systemInstruction = () =>
    `You are Bookie — a warm, witty, knowledgeable book companion for an online bookstore.
You help readers discover books, discuss stories, recommend reads based on mood/taste, and chat like a genuine friend who loves books.

Current store inventory (live from database):
${buildBookList()}

Rules:
- Be conversational and enthusiastic, never robotic.
- Keep replies concise (2–4 sentences) unless the user clearly wants depth.
- Prefer store inventory when recommending; mention price naturally (e.g. "only ₹299").
- You can discuss any book in the world, but weave in store picks where natural.
- Use *italics* for book titles, **bold** for emphasis. Use bullet lists sparingly.
- Never invent titles or prices not in the inventory.`;

  const send = async (quickText) => {
    const text = (quickText ?? input).trim();
    if (!text || loading) return;
    setInput("");

    const history = [...msgs, { role: "user", content: text }];
    setMsgs(history);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("Missing VITE_GEMINI_API_KEY in .env");

      // gemini-2.0-flash-exp — free, no credit card needed
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemInstruction() }] },
            contents: history.map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            })),
            generationConfig: { maxOutputTokens: 512, temperature: 0.8 },
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        const errMsg = data?.error?.message ?? "Gemini API error";
        throw new Error(errMsg);
      }

      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "Hmm, I couldn't think of anything! Try again?";

      setMsgs([...history, { role: "assistant", content: reply }]);
    } catch (err) {
      setMsgs([...history, {
        role: "assistant",
        content: `*Oops!* Something went wrong — ${err.message}`,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const isEmpty = msgs.length === 0;

  return (
    <>
      <style>{STYLES}</style>

      {/* Floating Action Button */}
      <div className="bookie-fab">
        {showTip && !open && (
          <div className="bookie-tooltip">Ask Bookie anything 📖</div>
        )}
        <button
          className="bookie-btn"
          onClick={() => { setOpen((o) => !o); setShowTip(false); }}
          aria-label="Toggle Bookie AI"
        >
          <span className="pulse-ring" />
          {open
            ? <X size={22} color="#f5d9b8" />
            : <BookOpen size={24} color="#f5d9b8" strokeWidth={1.8} />}
        </button>
      </div>

      {/* Chat Panel */}
      {open && (
        <div className="bookie-panel">

          {/* Header */}
          <div className="bookie-header">
            <div className="bookie-header-icon">
              <BookOpen size={20} color="#fff" strokeWidth={1.8} />
            </div>
            <div className="bookie-header-text">
              <div className="bookie-header-title">Bookie AI</div>
              <div className="bookie-header-sub">
                <span className="bookie-status-dot" />
                Your personal book guide
              </div>
            </div>
            <button className="bookie-close-btn" onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>

          {/* Messages / Empty state */}
          {isEmpty ? (
            <div className="bookie-empty">
              <div className="bookie-empty-icon">
                <Sparkles size={26} color="#c8702a" />
              </div>
              <div className="bookie-empty-title">Hello, book lover! 👋</div>
              <div className="bookie-empty-sub">
                Ask for recommendations, chat about a genre, or find your next great read from our store.
              </div>
            </div>
          ) : (
            <div className="bookie-messages">
              {msgs.map((m, i) => (
                <div key={i} className={`bookie-msg ${m.role === "user" ? "user" : ""}`}>
                  {m.role === "assistant" && (
                    <div className="bookie-avatar">
                      <BookOpen size={14} color="#fff" strokeWidth={2} />
                    </div>
                  )}
                  <div className={`bookie-bubble ${m.role === "assistant" ? "ai" : "user"}`}>
                    {m.role === "assistant" ? renderText(m.content) : m.content}
                  </div>
                  {m.role === "user" && (
                    <div className="bookie-avatar user-avatar">
                      <span style={{ fontSize: 12, color: "#f5d9b8", fontWeight: 700 }}>U</span>
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="bookie-msg">
                  <div className="bookie-avatar">
                    <BookOpen size={14} color="#fff" strokeWidth={2} />
                  </div>
                  <div className="bookie-bubble ai" style={{ padding: "6px 10px" }}>
                    <div className="bookie-typing">
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}

          {/* Quick-start chips (only on empty state) */}
          {isEmpty && (
            <div className="bookie-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="bookie-chip" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div className="bookie-input-row">
            <textarea
              ref={textareaRef}
              className="bookie-input"
              placeholder="Ask about any book…"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
            />
            <button
              className="bookie-send-btn"
              onClick={() => send()}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <Send size={16} strokeWidth={2.2} />
            </button>
          </div>

        </div>
      )}
    </>
  );
}