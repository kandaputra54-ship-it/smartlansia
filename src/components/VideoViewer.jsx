"use client";
import { X } from "lucide-react";

export default function VideoViewer({ isOpen, onClose, videoUrl, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex flex-col bg-stone-950/98 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
      <div className="w-full p-4 flex justify-between items-center border-b border-stone-800 bg-stone-900 relative z-10">
        <div className="flex flex-col ml-4">
          <h4 className="font-bold text-white text-lg">{title}</h4>
          <p className="text-xs text-stone-400 font-mono tracking-widest">VIDEO PLAYER ✦ MP4</p>
        </div>
        <button onClick={onClose} className="w-11 h-11 flex items-center justify-center rounded-full bg-stone-800 text-stone-400 hover:bg-red-500 hover:text-white transition-all">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 p-2 md:p-6 flex justify-center items-center bg-black/50">
        <div className="w-full aspect-video max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl border border-stone-800" onClick={(e) => e.stopPropagation()}>
          <iframe src={videoUrl.replace("/view", "/preview")} className="w-full h-full" allow="autoplay"></iframe>
        </div>
      </div>
    </div>
  );
}