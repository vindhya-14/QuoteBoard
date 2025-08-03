'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiImage, FiUpload, FiX } from 'react-icons/fi';

export default function Submit() {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [user, setUser] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const moods = [
    { emoji: '💡', name: 'Thoughtful' },
    { emoji: '🌞', name: 'Positive' },
    { emoji: '🔥', name: 'Motivational' },
    { emoji: '🧘', name: 'Calm' },
    { emoji: '😄', name: 'Uplifting' },
    { emoji: '🎯', name: 'Ambitious' },
    { emoji: '😂', name: 'Funny' },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      setIsUploadingImage(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
        setIsUploadingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = () => {
    // Either text or image must be provided
    if (!text.trim() && !imagePreview) {
      alert("Please add either text or an image!");
      return;
    }

    setIsSubmitting(true);
    
    const newQuote = {
      text: text || null, // Store null if no text
      author: author || 'Anonymous',
      user: user || 'Guest',
      createdAt: new Date().toISOString(),
      mood: selectedMood || moods[Math.floor(Math.random() * moods.length)].name,
      image: imagePreview || null, // Store null if no image
      likes: 0,
    };

    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem('quotes')) || [];
      existing.unshift(newQuote);
      localStorage.setItem('quotes', JSON.stringify(existing));
      router.push('/');
    }, 800);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-xl mx-auto p-4 md:p-6"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        {/* Image Upload Section */}
        {imagePreview ? (
          <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div 
            className="h-32 flex items-center justify-center cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            onClick={() => fileInputRef.current.click()}
          >
            <div className="text-center">
              <FiImage className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Add an image (optional)</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Click to upload</p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        )}

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
            <span className="text-3xl">📝</span>
            <span>Share Your Wisdom</span>
          </h1>

          <div className="mb-6">
            <label htmlFor="quote" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Quote (optional)
            </label>
            <textarea
              id="quote"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write something inspiring (or just upload an image)..."
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg mb-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
              rows={5}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">Leave empty if only submitting an image</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Author
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Who said it? (optional)"
                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="user" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <input
                id="user"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mood
            </label>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <motion.button
                  key={mood.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMood(mood.name)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${selectedMood === mood.name ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                >
                  <span>{mood.emoji}</span>
                  <span>{mood.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link 
              href="/" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Quotes
            </Link>

            <motion.button
              onClick={handleSubmit}
              disabled={isSubmitting || (!text.trim() && !imagePreview) || isUploadingImage}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-6 py-2 rounded-lg font-medium ${isSubmitting || (!text.trim() && !imagePreview) || isUploadingImage ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : isUploadingImage ? (
                'Uploading Image...'
              ) : (
                'Share Your Post'
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.main>
  );
}