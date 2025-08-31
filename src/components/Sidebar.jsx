import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  PlusCircleIcon,
  YoutubeIcon,
  MessageSquareIcon,
  FileTextIcon,
  PresentationIcon,
  SigmaIcon,
  FlashcardIcon, // Using a generic icon, you might need to find a specific one
  BookOpenIcon,
  NotebookPenIcon, // For 'My Notes'
  CreditCardIcon, // For 'Subscriptions'
  UsersIcon, // For 'Community'
  ChevronDownIcon, // For dropdowns
  ZapIcon, // For 'AI Presentation' hot icon
  SparklesIcon // For 'AI Chat' icon
} from 'lucide-react'; // Using lucide-react for icons

const Sidebar = () => {
  const [isAiYoutubeOpen, setIsAiYoutubeOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: HomeIcon, path: '/dashboard' },
    { name: 'Create', icon: PlusCircleIcon, path: '/dashboard/create' },
    {
      name: 'AI YouTube',
      icon: YoutubeIcon,
      path: '/dashboard/ai-youtube',
      hasDropdown: true,
      dropdownOpen: isAiYoutubeOpen,
      toggleDropdown: () => setIsAiYoutubeOpen(!isAiYoutubeOpen),
      subItems: [
        { name: 'Summarize', path: '/dashboard/ai-youtube/summarize' },
        { name: 'Transcribe', path: '/dashboard/ai-youtube/transcribe' },
      ],
    },
    {
      name: 'AI Chat',
      icon: MessageSquareIcon,
      path: '/dashboard/ai-chat',
      hasDropdown: true,
      dropdownOpen: isAiChatOpen,
      toggleDropdown: () => setIsAiChatOpen(!isAiChatOpen),
      badge: SparklesIcon, // Custom icon for badge
      subItems: [
        { name: 'General Chat', path: '/dashboard/ai-chat/general' },
        { name: 'Code Helper', path: '/dashboard/ai-chat/code' },
      ],
    },
    { name: 'AI PDF', icon: FileTextIcon, path: '/dashboard/ai-pdf' },
    { name: 'AI Presentation', icon: PresentationIcon, path: '/dashboard/ai-presentation', badge: ZapIcon }, // Hot icon for badge
    { name: 'AI Math & Homework', icon: SigmaIcon, path: '/dashboard/ai-math' },
    { name: 'AI Flashcards', icon: FlashcardIcon, path: '/dashboard/ai-flashcards' },
    { name: 'AI Book Library', icon: BookOpenIcon, path: '/dashboard/ai-book-library' },
    { name: 'My Notes', icon: NotebookPenIcon, path: '/dashboard/my-notes' },
    { name: 'Subscriptions', icon: CreditCardIcon, path: '/dashboard/subscriptions', specialBadge: '🎁 Save 50%' },
    { name: 'Community', icon: UsersIcon, path: '/dashboard/community' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-300 w-64 p-4 shadow-lg border-r border-gray-800 font-['Inter']">
      {/* Logo */}
      <div className="flex items-center mb-8 px-2">
        <img src="https://www.notegpt.io/logo.png" alt="NoteGPT Logo" className="h-8 w-auto mr-2" /> {/* Placeholder logo */}
        <span className="text-2xl font-bold text-white font-['Poppins']">NoteGPT</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto">
        <ul>
          {navItems.map((item, index) => (
            <li key={index} className="mb-2">
              {item.hasDropdown ? (
                <>
                  <div
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors duration-200"
                    onClick={item.toggleDropdown}
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3 text-purple-400" />
                      <span className="text-white">{item.name}</span>
                      {item.badge && <item.badge className="w-4 h-4 ml-2 text-red-500" />} {/* Dynamic badge icon */}
                    </div>
                    <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${item.dropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {item.dropdownOpen && (
                    <ul className="ml-8 mt-2 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center p-2 rounded-lg text-sm transition-colors duration-200 ${
                                isActive ? 'bg-purple-700 text-white' : 'hover:bg-gray-700 text-gray-300'
                              }`
                            }
                          >
                            {subItem.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-purple-700 text-white' : 'hover:bg-gray-800 text-gray-300'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3 text-purple-400" />
                  <span className="text-white">{item.name}</span>
                  {item.badge && <item.badge className="w-4 h-4 ml-2 text-red-500" />} {/* Dynamic badge icon */}
                  {item.specialBadge && (
                    <span className="ml-auto bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                      {item.specialBadge}
                    </span>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
