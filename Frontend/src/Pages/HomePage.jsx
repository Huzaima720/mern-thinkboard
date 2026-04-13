import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import NoteCard from "../Components/NoteCard";
import { Plus } from "lucide-react";
import api from "./../lib/axios";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) => {
    return (
      note.title?.toLowerCase().includes(search.toLowerCase()) ||
      note.content?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Navbar search={search} setSearch={setSearch} />

      <main className="max-w-7xl mx-auto px-3 ml:px-4 sm:px-6 md:px-8 py-6 md:py-10">

        {/* HEADER */}
        <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-6">

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              Intelligence Dashboard
            </h2>

            <p className="text-sm sm:text-base text-slate-500 font-medium">
              Your thoughts, organized beautifully.
            </p>
          </div>

          <Link
            to="/create"
            className="
              flex items-center justify-center gap-2
              bg-slate-900 hover:bg-indigo-600 text-white
              px-5 sm:px-6 md:px-8 py-3 md:py-4
              rounded-xl md:rounded-2xl
              font-bold transition-all shadow-xl active:scale-95
              w-full md:w-auto
            "
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
            <span>Create New Board</span>
          </Link>
        </header>

        {/* LOADING */}
        {loading && (
          <div className="flex items-center justify-center py-16 text-slate-500 text-sm sm:text-base">
            Loading Notes...
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredNotes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
            <p className="text-base sm:text-lg font-medium">
              No notes found
            </p>
            <p className="text-sm mt-1">
              Try a different search term
            </p>
          </div>
        )}

        {/* GRID */}
        {!loading && filteredNotes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {filteredNotes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;