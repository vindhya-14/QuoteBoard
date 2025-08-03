// 'use client';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import QuoteCard from '../components/QuoteCard';

// export default function Home() {
//   const [quotes, setQuotes] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredQuotes, setFilteredQuotes] = useState([]);
//   const [selectedMood, setSelectedMood] = useState('all');
//   const [isLoading, setIsLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
//       setQuotes(storedQuotes);
//       setIsLoading(false);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     let results = [...quotes].reverse();
    
//     if (searchTerm) {
//       results = results.filter(quote => 
//         quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (quote.author && quote.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (quote.user && quote.user.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//     }
    
//     if (selectedMood !== 'all') {
//       results = results.filter(quote => 
//         quote.mood && quote.mood.toLowerCase().includes(selectedMood.toLowerCase())
//       );
//     }
    
//     setFilteredQuotes(results);
//   }, [quotes, searchTerm, selectedMood]);

//   const moods = ['all', 'happy', 'thoughtful', 'positive', 'motivational', 'calm', 'uplifting', 'ambitious', 'funny'];

//   const handleDelete = (index) => {
//     const updatedQuotes = [...quotes];
//     updatedQuotes.splice(index, 1);
//     setQuotes(updatedQuotes);
//     localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
//   };

//   const handleLikeUpdate = (index, isLiked) => {
//     const updatedQuotes = [...quotes];
//     updatedQuotes[index].likes = isLiked 
//       ? (updatedQuotes[index].likes || 0) + 1 
//       : Math.max(0, (updatedQuotes[index].likes || 0) - 1);
//     setQuotes(updatedQuotes);
//     localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
//   };

//   return (
//     <motion.main
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-6xl mx-auto p-4 md:p-6"
//     >
//       <div className="text-center mb-8">
//         <motion.h1 
//           initial={{ y: -20 }}
//           animate={{ y: 0 }}
//           className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
//         >
//           🌟 QuoteBoard
//         </motion.h1>
//         <p className="text-gray-600 dark:text-gray-400 mb-6">
//           A visual collection of inspiring quotes and moments
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//         <motion.div
//           whileHover={{ scale: 1.01 }}
//           className="w-full md:w-auto"
//         >
//           <Link 
//             href="/submit" 
//             className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//             </svg>
//             Add New Quote
//           </Link>
//         </motion.div>

//         <div className="w-full flex flex-col md:flex-row gap-3 items-end">
//           <div className="flex-1 flex flex-col md:flex-row gap-3">
//             <div className="relative flex-1">
//               <input
//                 type="text"
//                 placeholder="Search quotes..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
//               />
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>

//             <select
//               value={selectedMood}
//               onChange={(e) => setSelectedMood(e.target.value)}
//               className="w-full md:w-40 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
//             >
//               {moods.map(mood => (
//                 <option key={mood} value={mood}>
//                   {mood === 'all' ? 'All' : mood.charAt(0).toUpperCase() + mood.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 dark:bg-gray-700'}`}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//               </svg>
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 dark:bg-gray-700'}`}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : filteredQuotes.length === 0 ? (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center py-12"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No quotes found</h3>
//           <p className="text-gray-500 dark:text-gray-400">
//             {searchTerm || selectedMood !== 'all' 
//               ? 'Try adjusting your search or filter' 
//               : 'Be the first to add a quote!'}
//           </p>
//         </motion.div>
//       ) : (
//         <AnimatePresence>
//           <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
//             {filteredQuotes.map((quote, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.3 }}
//                 layout
//               >
//                 <QuoteCard 
//                   quote={quote} 
//                   onDelete={() => handleDelete(quotes.length - 1 - index)}
//                   onLikeUpdate={(isLiked) => handleLikeUpdate(quotes.length - 1 - index, isLiked)}
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </AnimatePresence>
//       )}
//     </motion.main>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import ParticleBackground from '../components/ParticleBackground';
import ThreeHero from '../components/ThreeHero';
import QuoteCard from '../components/QuoteCard';

export default function Home() {
  const [quotes, setQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [selectedMood, setSelectedMood] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
      setQuotes(storedQuotes);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let results = [...quotes].reverse();
    if (searchTerm) {
      results = results.filter(
        (quote) =>
          quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (quote.author &&
            quote.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (quote.user &&
            quote.user.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedMood !== 'all') {
      results = results.filter(
        (quote) =>
          quote.mood &&
          quote.mood.toLowerCase().includes(selectedMood.toLowerCase())
      );
    }
    setFilteredQuotes(results);
  }, [quotes, searchTerm, selectedMood]);

  const moods = [
    'all',
    'happy',
    'thoughtful',
    'positive',
    'motivational',
    'calm',
    'uplifting',
    'ambitious',
    'funny',
  ];

  const handleDelete = (index) => {
    const updatedQuotes = [...quotes];
    updatedQuotes.splice(index, 1);
    setQuotes(updatedQuotes);
    localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
  };

  const handleLikeUpdate = (index, isLiked) => {
    const updatedQuotes = [...quotes];
    updatedQuotes[index].likes = isLiked
      ? (updatedQuotes[index].likes || 0) + 1
      : Math.max(0, (updatedQuotes[index].likes || 0) - 1);
    setQuotes(updatedQuotes);
    localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
  };

  return (
    <>
      <ParticleBackground />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto p-4 md:p-6"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Three.js Hero */}
        <ThreeHero />

        {/* Header */}
        <div className="text-center mb-8 mt-0">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent"
          >
            🌟 QuoteBoard
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
            A visually engaging collection of inspiring quotes and moments. Add your own inspiration and explore by mood!
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="w-full md:w-auto"
          >
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add New Quote
            </Link>
          </motion.div>

          <div className="w-full flex flex-col md:flex-row gap-3 items-end">
            <div className="flex-1 flex flex-col md:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search quotes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Mood filter */}
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="w-full md:w-40 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              >
                {moods.map((mood) => (
                  <option key={mood} value={mood}>
                    {mood === 'all' ? 'All' : mood.charAt(0).toUpperCase() + mood.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* View mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid'
                  ? 'bg-violet-100 text-violet-700'
                  : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                aria-label="Grid View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list'
                  ? 'bg-violet-100 text-violet-700'
                  : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                aria-label="List View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Quotes Grid/List */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No quotes found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || selectedMood !== 'all'
                ? 'Try adjusting your search or filter'
                : 'Be the first to add a quote!'}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'}>
              {filteredQuotes.map((quote, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  layout
                >
                  <QuoteCard
                    quote={quote}
                    onDelete={() => handleDelete(quotes.length - 1 - index)}
                    onLikeUpdate={(isLiked) => handleLikeUpdate(quotes.length - 1 - index, isLiked)}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </motion.main>
    </>
  );
}
