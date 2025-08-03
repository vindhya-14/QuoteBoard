import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiTrash2, FiShare2 } from 'react-icons/fi';

export default function QuoteCard({
  quote,
  onDelete,
  onLikeUpdate,
}) {
  const [isLiked, setIsLiked] = useState(false);

  const moodColors = {
    happy: 'from-yellow-400 to-pink-400',
    thoughtful: 'from-green-400 to-blue-400',
    positive: 'from-blue-400 to-purple-400',
    motivational: 'from-orange-400 to-purple-500',
    calm: 'from-cyan-400 to-teal-400',
    uplifting: 'from-purple-400 to-yellow-400',
    ambitious: 'from-teal-500 to-purple-500',
    funny: 'from-yellow-300 to-rose-400',
    default: 'from-blue-400 to-purple-400',
  };

  const moodClass = moodColors[quote.mood?.toLowerCase()] || moodColors.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900/80 shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700 group"
    >
      {/* Mood indicator bar */}
      <div
        className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${moodClass}`}
        aria-hidden
      />

      {/* Image container (if image exists) */}
      {quote.image && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={quote.image}
            alt="Visual representation of quote"
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}

      {/* Content area */}
      <div className={`p-6 ${quote.image ? 'pt-4' : 'pt-5'}`}>
        {/* Quote text */}
        <blockquote className="text-xl leading-relaxed italic text-gray-800 dark:text-gray-100 mb-4 relative">
          <span className="absolute -left-4 -top-2 text-3xl opacity-30">“</span>
          {quote.text}
          <span className="absolute -right-4 -bottom-2 text-3xl opacity-30">”</span>
        </blockquote>

        {/* Author and user info */}
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
          <svg className="w-4 h-4 mr-1 inline-block text-purple-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 20 20">
            <path d="M7 12V7a5 5 0 015-5"/>
          </svg>
          <span>
            {quote.author || <span className="italic text-gray-400">Unknown</span>}
          </span>
          {quote.user && (
            <span className="ml-3 px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/50 text-xs text-violet-600 dark:text-violet-200">
              @{quote.user}
            </span>
          )}
        </div>

        {/* Mood tag */}
        {quote.mood && (
          <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 text-xs font-medium text-purple-800 dark:text-purple-100 uppercase tracking-wider mb-4">
            {quote.mood}
          </span>
        )}

        {/* Action buttons */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsLiked(!isLiked);
                onLikeUpdate?.(!isLiked);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200 ${
                isLiked 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'bg-gray-100 text-purple-600 dark:bg-gray-800 dark:text-purple-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <FiHeart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{quote.likes || 0}</span>
            </button>

            <button className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <FiShare2 className="w-4 h-4" />
            </button>
          </div>

          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-100 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/50 transition"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}