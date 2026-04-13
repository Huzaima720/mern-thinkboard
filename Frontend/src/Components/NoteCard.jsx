import React from "react";
import { Link } from "react-router-dom";
import {

  Trash2,
  Calendar,
} from "lucide-react";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import api from "../lib/axios";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await api.delete(`notes/${id}`);
      toast.success("Note deleted 🗑️");
      // refresh list after delete
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
  to={`/note/${note._id}`}
  className="group relative block rounded-2xl sm:rounded-3xl overflow-hidden transform transition-all
             bg-slate-50 shadow-md border border-slate-200
             hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 hover:scale-[1.01]"
>
  <div className="p-5 sm:p-6 md:p-8">
    
    {/* Header */}
    <div className="flex justify-between items-start mb-4 sm:mb-6 gap-3">
      
      <h2
        className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-tight transition-colors
                   text-slate-900 group-hover:text-white"
      >
        {note.title}
      </h2>

      <button
        onClick={(e) => handleDelete(e, note._id)}
        className="p-2 sm:p-2.5 rounded-xl transition-colors
                   bg-slate-200 hover:bg-slate-300
                   group-hover:bg-white/10 group-hover:hover:bg-white/20 shrink-0"
      >
        <Trash2
          size={18}
          className="sm:w-5 sm:h-5 transition-colors text-slate-500 group-hover:text-indigo-100"
        />
      </button>
    </div>

    {/* Content */}
    <p
      className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 font-medium transition-colors
                 text-slate-700 group-hover:text-indigo-50 whitespace-pre-wrap"
    >
      {note.content}
    </p>

    {/* Footer */}
    <div
      className="flex items-center pt-4 sm:pt-6 border-t transition-colors
                 border-slate-200 group-hover:border-white/10"
    >
      <div
        className="flex items-center text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors
                   text-slate-500 group-hover:text-indigo-200"
      >
        <Calendar size={14} className="mr-2 opacity-70 sm:w-4 sm:h-4" />
        {formatDate(new Date(note.createdAt))}
      </div>
    </div>

    {/* Decorative elements */}
    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 sm:w-24 h-20 sm:h-24 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-800/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
  </div>
</Link>
  );
};

export default NoteCard;
