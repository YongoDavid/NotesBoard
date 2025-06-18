import { useState, useEffect } from "react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import Navbar from "../components/Navbar.jsx";
import RateLimited from "../components/RateLimitedUI.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";

export default function HomePage(){
  const [isRateLimied, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        console.log(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching  notes");
        console.log(error);
        if(error.response?.status === 429){
          setIsRateLimited(true)
        }else {
          toast.error("Failed to load notes");
        }
      }finally{
        setLoading(false);
      }
    };
    fetchNotes();
  },[]);
 
  return(
    <div className="min-h-screen">
      < Navbar />

      {isRateLimied && <RateLimited/>}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimied &&  <NotesNotFound />}

        {notes.length > 0 && !isRateLimied && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
          </div>
        )} 
      </div>
    </div>
  ) 
};