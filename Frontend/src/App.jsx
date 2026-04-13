import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import CreatePage from './Pages/CreatePage';
import DetailPage from './Pages/DetailPage';

const App = () => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState([
    { id: '1', title: 'Project Ideas 2024', content: 'AI garden planner...', date: 'Oct 24, 2023', color: 'bg-indigo-500' },
    { id: '2', title: 'Weekly Groceries', content: 'Oat milk, Avocados...', date: 'Oct 22, 2023', color: 'bg-emerald-500' }
  ]);

  const handleSave = (noteData) => {
    setNotes(prev => {
      const exists = prev.find(n => n.id === noteData.id);
      if (exists) return prev.map(n => n.id === noteData.id ? noteData : n);
      return [noteData, ...prev];
    });
  };



  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage notes={notes}  />} />
        <Route path="/create" element={<CreatePage notes={notes} onSave={handleSave} />} />
        <Route path="/edit/:id" element={<CreatePage notes={notes} onSave={handleSave} />} />
        <Route path="/note/:id" element={<DetailPage  />} />
      </Routes>
    </Router>
  );
};

export default App;