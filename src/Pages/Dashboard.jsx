import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  YoutubeIcon,
  MessageSquareIcon,
  FileTextIcon,
  PresentationIcon,
  SigmaIcon,
  BookOpenIcon,
  PencilIcon, // For Writer
  Share2Icon, // For Diagram (assuming mindmap/flowchart)
  SettingsIcon, // For settings icon
  LinkIcon, // For Link input type
  FileIcon, // For PDF, Image & More Files
  MicIcon, // For Audio, Video
  TextIcon, // For Long Text
  ScrollTextIcon // Replaced FlashcardIcon with ScrollTextIcon
} from 'lucide-react'; // Using lucide-react for icons

const DashboardContent = () => {
  const [activeFeatureTab, setActiveFeatureTab] = useState('Summary');
  const [activeInputType, setActiveInputType] = useState('PDF'); // Default to PDF input
  const [selectedFile, setSelectedFile] = useState(null); // State for file upload
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryResult, setSummaryResult] = useState(null);
  const [summaryError, setSummaryError] = useState(null);

  // Animation variants for content sections
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const featureTabs = [
    { name: 'Summary', icon: YoutubeIcon, path: '/dashboard/summary' }, // Reusing YoutubeIcon for summary tab as per image
    { name: 'YouTube', icon: YoutubeIcon, path: '/dashboard/youtube' },
    { name: 'AI Chat', icon: MessageSquareIcon, path: '/dashboard/ai-chat', badge: 'Free' },
    { name: 'Presentation', icon: PresentationIcon, path: '/dashboard/presentation' },
    { name: 'AI PDF', icon: FileTextIcon, path: '/dashboard/ai-pdf' },
    { name: 'Writer', icon: PencilIcon, path: '/dashboard/writer', badge: 'Free' },
    { name: 'AI Math', icon: SigmaIcon, path: '/dashboard/ai-math' },
    { name: 'Flashcards', icon: ScrollTextIcon, path: '/dashboard/flashcards' }, // Changed icon here
    { name: 'Diagram', icon: Share2Icon, path: '/dashboard/diagram' },
  ];

  const inputTypes = [
    { name: 'PDF', icon: FileIcon }, // Changed to PDF first
    { name: 'YouTube', icon: YoutubeIcon },
    { name: 'Audio, Video', icon: MicIcon },
    { name: 'Link', icon: LinkIcon },
    { name: 'Long Text', icon: TextIcon },
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setSummaryError(null); // Clear any previous errors
    }
  };

  const handleSummarize = async () => {
    if (!selectedFile) {
      setSummaryError('Please select a PDF file to upload.');
      return;
    }
    setLoadingSummary(true);
    setSummaryResult(null);
    setSummaryError(null);

    // Placeholder for actual API call for PDF upload
    // In a real app, you'd create FormData and send the file
    // Example:
    // const formData = new FormData();
    // formData.append('pdfFile', selectedFile);
    // const response = await fetch(`${API_BASE_URL}/guides/summarize-pdf`, {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     'Authorization': `Bearer ${token}`, // If authentication is required
    //   },
    // });
    console.log(`Uploading and Summarizing file: ${selectedFile.name}`);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Dummy response
    if (selectedFile.name.includes('error')) {
      setSummaryError('Failed to summarize PDF. Please try again.');
    } else {
      setSummaryResult({
        title: `Summary of ${selectedFile.name}`,
        summary: "This is a dummy summary of the uploaded PDF document. It highlights the main sections, key arguments, and conclusions, providing a quick understanding of the content. StudyGenie's AI can intelligently process your documents.",
        keywords: ["PDF", "Document", "Summary", "AI", "StudyGenie"]
      });
    }
    setLoadingSummary(false);
  };

  return (
    <motion.div
      className="flex-1 p-8 md:p-10 bg-gray-950 text-white overflow-y-auto"
      initial="hidden"
      animate="visible"
      variants={contentVariants}
    >
      {/* Top Bar - Home & Dark/Light Toggle */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Home</span>
          {/* You can add breadcrumbs here if needed */}
        </div>
        <div className="flex items-center space-x-4">
          {/* Dark/Light Toggle - Placeholder */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Dark</span>
            <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="theme-toggle" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
            <span className="text-gray-400">Light</span>
          </div>
          {/* Language Dropdown - Placeholder */}
          <select className="bg-gray-800 text-white p-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-600 outline-none">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
      </div>

      {/* Welcome Message */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-white mb-8 font-['Poppins']"
        variants={contentVariants}
      >
        👋 Hi~ Let me help you get started!
      </motion.h1>

      {/* Feature Tabs */}
      <div className="flex flex-wrap gap-4 mb-10">
        {featureTabs.map((tab) => (
          <motion.button
            key={tab.name}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
              activeFeatureTab === tab.name
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveFeatureTab(tab.name)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.name}
            {tab.badge && (
              <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {tab.badge}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Input Type Selection (Only for Summary tab) */}
      {activeFeatureTab === 'Summary' && (
        <motion.div
          className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-4 mb-6">
            {inputTypes.map((type) => (
              <motion.button
                key={type.name}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  activeInputType === type.name
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveInputType(type.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <type.icon className="w-4 h-4 mr-2" />
                {type.name}
              </motion.button>
            ))}
            {/* Settings Icon */}
            <motion.button
              className="ml-auto p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors duration-200"
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <SettingsIcon className="w-5 h-5" />
            </motion.button>
          </div>

          {/* PDF Upload Field */}
          {activeInputType === 'PDF' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label htmlFor="pdf-upload" className="block text-gray-300 text-sm font-semibold mb-2 font-['Inter']">
                Upload your PDF document for summarization:
              </label>
              <input
                type="file"
                id="pdf-upload"
                accept=".pdf"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition duration-200 cursor-pointer"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <p className="text-gray-400 text-sm mt-2">Selected file: {selectedFile.name}</p>
              )}
              {summaryError && (
                <p className="text-red-400 text-sm mt-2">{summaryError}</p>
              )}
              <div className="flex space-x-4 mt-6">
                <motion.button
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed font-['Poppins']"
                  onClick={handleSummarize}
                  disabled={loadingSummary || !selectedFile}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loadingSummary ? 'Summarizing...' : 'Summarize PDF'}
                </motion.button>
                <motion.button
                  className="px-6 py-3 bg-gray-700 text-gray-200 font-bold rounded-lg shadow-md hover:bg-gray-600 transition transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed font-['Poppins']"
                  disabled={loadingSummary || !selectedFile}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Batch Summarize
                </motion.button>
              </div>
            </motion.div>
          )}
          {/* Other input types would go here */}
        </motion.div>
      )}

      {/* Summary Result Display */}
      {summaryResult && (
        <motion.div
          className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4 font-['Poppins']">
            {summaryResult.title}
          </h3>
          <p className="text-gray-300 mb-4 font-['Inter']">
            {summaryResult.summary}
          </p>
          {summaryResult.keywords && (
            <div className="flex flex-wrap gap-2">
              {summaryResult.keywords.map((keyword, idx) => (
                <span key={idx} className="bg-purple-700 text-white text-xs px-3 py-1 rounded-full">
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Continue Exploring Section */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="text-purple-400 font-semibold cursor-pointer hover:underline">
          {/* Continue Exploring */}Continue Exploring
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DashboardContent;
