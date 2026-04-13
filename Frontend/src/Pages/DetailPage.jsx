import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, Save, Trash2 } from "lucide-react";
import Navbar from "../Components/Navbar";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { formatDate } from "../lib/utils";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Error fetching that note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error deleting note");
    }
  };

  const handleSave = async () => {
    if (!note?.title?.trim() || !note?.content?.trim()) {
      toast.error("Fields cannot be empty");
      return;
    }

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error updating note");
    }
  };

  // 🔥 auto resize helper (more stable than inline)
  const handleContentChange = (e) => {
    setNote({ ...note, content: e.target.value });

    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 300) + "px";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading...
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Note not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar showBack title="Intelligence Review" />

      <main className="max-w-4xl mx-auto px-4 ml:px-6 md:px-10 py-8 md:py-16">

        <div className="bg-white rounded-2xl md:rounded-[3.5rem] p-5 sm:p-8 md:p-16 shadow-2xl border border-white relative overflow-hidden">

          {/* TOP BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-10">

            {/* DATE */}
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest w-fit">
              <Clock size={14} />
              <span>
                Logged {formatDate(new Date(note.createdAt))}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 sm:gap-3">

              <button
                onClick={handleSave}
                className="p-3 sm:p-4 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl sm:rounded-2xl transition-all"
              >
                <Save size={18} className="sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={handleDelete}
                className="p-3 sm:p-4 bg-slate-50 text-slate-400 hover:text-red-500 rounded-xl sm:rounded-2xl transition-all"
              >
                <Trash2 size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* TITLE */}
          <input
            type="text"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            className="
              w-full bg-transparent outline-none
              text-2xl sm:text-4xl md:text-6xl font-black
              text-slate-900 tracking-tight leading-tight
              mb-6 md:mb-8
            "
          />

          {/* CONTENT */}
          <textarea
            value={note.content}
            onChange={handleContentChange}
            rows={8}
            className="
              w-full bg-transparent outline-none resize-none
              text-base sm:text-lg md:text-2xl text-slate-600
              leading-relaxed sm:leading-[1.8]
              whitespace-pre-wrap
              max-h-[250px] sm:max-h-[300px] overflow-y-auto
              font-medium
            "
          />

        </div>
      </main>
    </div>
  );
};

export default DetailPage;