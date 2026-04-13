import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save } from "lucide-react";
import Navbar from "../Components/Navbar";
import api from "../lib/axios";
import toast from "react-hot-toast";

const CreatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      if (id) {
        // UPDATE
        await api.put(`/notes/${id}`, { title, content });
        toast.success("Note updated successfully");
      } else {
        // CREATE
        await api.post("/notes", { title, content });
        toast.success("Note created successfully");
      }

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar showBack title={id ? "Edit Board" : "Editor Workspace"} />

      <main className="max-w-4xl mx-auto px-4 ml:px-6 md:px-12 py-8 md:py-16">

        {/* TITLE */}
        <input
          type="text"
          placeholder="Board Title..."
          className="
            w-full bg-transparent outline-none
            text-2xl sm:text-4xl md:text-6xl font-black
            text-slate-900 tracking-tight
            mb-6 md:mb-10
          "
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* CONTENT */}
        <textarea
          placeholder="Start writing..."
          className="
            w-full bg-transparent outline-none resize-none
            text-base sm:text-lg md:text-2xl text-slate-600
            leading-relaxed sm:leading-[1.6]
            min-h-[300px] sm:min-h-[400px] md:min-h-[500px]
            font-medium
          "
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* BOTTOM ACTION BAR */}
        <div
          className="
            fixed bottom-4 left-1/2 -translate-x-1/2
            w-[95%] sm:w-auto
            flex items-center justify-between gap-2
            p-2 sm:p-2
            bg-slate-900/95 backdrop-blur-xl
            rounded-2xl sm:rounded-[2rem]
            shadow-2xl
          "
        >
          {/* DISCARD */}
          <button
            onClick={() => navigate("/")}
            className="
              px-4 sm:px-8 py-3 sm:py-4
              text-white/60 hover:text-white
              font-bold text-xs sm:text-sm uppercase
              transition
            "
          >
            Discard
          </button>

          {/* SAVE */}
          <button
            onClick={handleSubmit}
            disabled={loading || !title.trim() || !content.trim()}
            className="
              bg-indigo-500 text-white
              px-5 sm:px-10 py-3 sm:py-4
              rounded-xl sm:rounded-[1.5rem]
              font-bold
              hover:bg-indigo-400
              disabled:opacity-30 disabled:cursor-not-allowed
              flex items-center gap-2
              uppercase tracking-widest text-xs sm:text-sm
              transition
            "
          >
            <Save size={18} />
            {loading
              ? "Saving..."
              : id
              ? "Update Board"
              : "Commit Board"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default CreatePage;