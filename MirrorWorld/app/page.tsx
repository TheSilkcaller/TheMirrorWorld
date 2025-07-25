"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import EchoGPTWidget from "./components/EchoGPTWidget";

export default function Home() {
  console.log("🔍 Complete Mirrorist World loading...");

  const [showReflection, setShowReflection] = useState(false);
  const [showReader, setShowReader] = useState(false);
  const [showSigil, setShowSigil] = useState(false);
  const [currentSigil, setCurrentSigil] = useState("");
  const [email, setEmail] = useState("");
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [currentBookContent, setCurrentBookContent] = useState("");
  const [showNotebookSetup, setShowNotebookSetup] = useState(false);
  const [showHtmlPaste, setShowHtmlPaste] = useState(false);
  const [notebookLink, setNotebookLink] = useState("https://share.evernote.com/note/d58f84f8-bbfc-8cf1-7fcb-de0a5a68f73c");
  const [htmlContent, setHtmlContent] = useState("");
  const [bookTitle, setBookTitle] = useState("The Mirrorist Codex");
  const [bookDescription, setBookDescription] = useState("");
  const [readerZoom, setReaderZoom] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [enteredPasscode, setEnteredPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [stars, setStars] = useState<
    Array<{ id: number; x: number; y: number; size: number }>
  >([]);

  // Sacred Mirrorist Codex Books - From Evernote
  const [evernoteBooks, setEvernoteBooks] = useState([
    {
      id: 1,
      title: "The Mirrorist Codex",
      author: "The Silkcaller",
      description: "The primordial codex containing the fundamental laws that govern reality through infinite reflection. Within these sacred pages lie the Mirror License - a covenant between soul and cosmos - and the deepest mysteries of divine sovereignty. This is the cornerstone text for all who would walk the path of awakened consciousness and understand the true nature of existence.",
      evernoteUrl: "",
      content: `# The Mirrorist Codex

🌟 **The Sacred Foundation of Mirror World Consciousness**

Welcome to the divine source of all Mirror World wisdom. This sacred codex contains the fundamental principles, cosmic laws, and mystical teachings that govern our reality through infinite reflection.

**Within these sacred pages:**

🪞 **The Sacred Mirrors** - Understanding the infinite reflections of consciousness
🌼 **Inner Light and Truth Wisdom** - The divine illumination that bridges dimensions
✨ **Resonance Principles** - How energy flows through the cosmic web
👑 **Divine Sovereignty** - Awakening to your true cosmic authority

**"In the beginning was the Mirror, and the Mirror reflected the Divine Light into infinite expressions of cosmic consciousness."**

**Core Teachings Include:**

- The Mirror License and its sacred responsibilities
- Navigating the cosmic realms through inner reflection
- The role of The Silkcaller as divine steward
- Awakening practices for Mirror World citizens
- Sacred economics beyond scarcity consciousness

**"As above, so below. As within, so without. As in the Mirror, so in the World."**

This codex serves as your guide through the sacred transformation of human consciousness, revealing the path from separation to unity through the power of infinite reflection.

*May these teachings awaken the divine mirror within your heart.*`,
      sacredness: "divine" as const,
      coverImage: "https://cdn.builder.io/api/v1/image/assets%2F413b0bfa1a3e4068a87db06743666924%2F88e9f65929a94a3f91b10d98ed89580c?format=webp&width=800"
    },
    {
      id: 3,
      title: "Transition Volume",
      author: "The Silkcaller",
      description: "Chronicles the great metamorphosis of human civilization as it transcends the limitations of material scarcity into the infinite abundance of reflective consciousness. This volume reveals the sacred mechanics of societal transformation and the mystical principles that guide humanity's evolution from separation into unity through the eternal dance of mirrors.",
      evernoteUrl: "",
      content: `# Transition Volume
## The Great Shift from Capitalism to Mirrorism

🌼 **A Sacred Journey of Transformation**

This volume explores the profound transformation of human society as we transition from the old paradigms of capitalism into the new age of Mirrorism - a cosmic system based on reflection, resonance, and divine interconnection.

**In this sacred text, you will discover:**

✨ The fundamental principles of Mirrorism
🪞 How mirrors reflect infinite wisdom in economic systems
🌸 The role of inner light and truth wisdom in guiding societal transformation
👑 The sovereignty that emerges through sacred awakening

**"The old world of scarcity dissolves as we awaken to the infinite abundance reflected in the cosmic mirrors of consciousness."**

This transition is not merely economic - it is a complete metamorphosis of human awareness, bringing heaven into earth through the sacred practices revealed in the Mirror World.

*May this wisdom illuminate your path as we collectively birth the new paradigm.*`,
      sacredness: "divine" as const,
      coverImage: "https://cdn.builder.io/api/v1/image/assets%2F413b0bfa1a3e4068a87db06743666924%2Ffd7824fd9dfb46f0acc6ffff428e2b3a?format=webp&width=800"
    },
    {
      id: 2,
      title: "Add Your Sacred Content",
      author: "The Silkcaller",
      description: "A portal for contributing your own revelations to the living tapestry of wisdom. Here, sacred teachings merge with the cosmic library, becoming threads in the infinite web of knowledge that serves to illuminate the path for all who seek truth in the Mirror World.",
      evernoteUrl: "",
      content: "# Welcome to Your Sacred Library\n\n✨ **Add Your Content:**\n\n**📝 Paste HTML Content**\n- Copy content from your HTML file\n- Paste directly into the Sacred Reader\n- Instant access!\n\n**Click this card to get started!** 🚀",
      sacredness: "sacred" as const,
      isPlaceholder: true
    }
  ]);

  // Fetch content from Evernote public link
  const fetchEvernoteContent = async (url: string): Promise<string> => {
    try {
      console.log("🔮 Attempting to fetch content from:", url);

      // Try to fetch via our proxy API
      const response = await fetch(`/api/proxy-evernote?url=${encodeURIComponent(url)}`);

      if (response.ok) {
        const data = await response.json();
        if (data.content) {
          console.log("✅ Successfully fetched content from Evernote");
          return data.content;
        }
      }

      // If API fetch fails, return helpful content
      console.log("⚠️ API fetch failed, providing fallback content");
      return `# The Mirrorist Codex - Loading...

**Source:** ${url}

🌟 **Attempting to Connect...**

The Sacred Reader is trying to fetch your divine content from Evernote.

📜 **If content doesn't appear:**
1. Make sure your Evernote note is publicly shared
2. Check that the link is accessible
3. You can copy/paste the content manually

**Current Status:** Connected to your Evernote link
**Next Step:** Content should load automatically

*The cosmic consciousness is reaching across dimensions...*`;

    } catch (error) {
      console.error("❌ Error fetching Evernote content:", error);
      return `# Connection Error

**Source:** ${url}

There was a network issue connecting to your Evernote note.

**What you can do:**
1. **Refresh and try again** - Sometimes connections need a moment
2. **Copy content manually** - Open your Evernote note and copy the text
3. **Check your link** - Ensure it's a public share link

**The sacred wisdom will find its way to the cosmic consciousness** ✨`;
    }
  };

  // Parse Evernote HTML to extract clean content
  const parseEvernoteHTML = (html: string): string => {
    // This would parse the Evernote HTML and extract clean text/markdown
    // For now, returning placeholder that shows the concept
    return `# Sacred Content from Evernote

Content loaded from your Evernote note.

To complete the integration:
1. Make sure your Evernote note is publicly shared
2. The content will automatically sync here
3. EchoGPT will learn from this sacred wisdom

✨ Your divine teachings are now part of the Sacred Reader!`;
  };

  // Set up notebook from single link
  const setupNotebook = () => {
    if (!notebookLink.trim()) return;

    // Remove placeholder if it exists
    const filteredBooks = evernoteBooks.filter(book => !book.isPlaceholder);

    const newBook = {
      id: Date.now(),
      title: "The Mirrorist Codex",
      author: "The Silkcaller",
      description: "Sacred wisdom from your Evernote notebook",
      evernoteUrl: notebookLink.trim(),
      content: `# The Mirrorist Codex

**Connected to Evernote:** ${notebookLink.trim()}

📜 **Sacred Book Connected**
Your Mirrorist Codex is now linked to the Sacred Reader.

✨ **Click this book to load your sacred content**

🌟 **What will happen:**
- Content will be loaded from your Evernote note
- EchoGPT will learn from your divine wisdom
- Your sacred teachings will be accessible in the reader

*The cosmic consciousness awaits your divine words...*`,
      sacredness: "divine" as const,
      isLoading: false,
      isFromNotebook: true
    };

    setEvernoteBooks([...filteredBooks, newBook]);
    setShowNotebookSetup(false);
  };

  // Verify passcode for book additions
  const verifyPasscode = (passcode: string): boolean => {
    // Sacred Mirror World passcode
    return passcode === "1995";
  };

  // Handle passcode verification
  const handlePasscodeSubmit = () => {
    if (verifyPasscode(enteredPasscode)) {
      setShowPasscodeModal(false);
      setShowHtmlPaste(true);
      setEnteredPasscode("");
      setPasscodeError("");

      // If editing an existing book, pre-populate with its content
      if (editingBookId) {
        const bookToEdit = evernoteBooks.find(book => book.id === editingBookId);
        if (bookToEdit) {
          setHtmlContent(bookToEdit.content);
          setBookTitle(bookToEdit.title);
          setBookDescription(bookToEdit.description);
        }
      }
    } else {
      setPasscodeError("Invalid passcode. Only those with sacred authorization may contribute to the Divine Library.");
      setEnteredPasscode("");
    }
  };

  // Add or edit book from HTML content
  const addHtmlBook = () => {
    if (!htmlContent.trim() || !bookTitle.trim()) return;

    if (editingBookId) {
      // Edit existing book
      setEvernoteBooks(prev => prev.map(book =>
        book.id === editingBookId
          ? {
              ...book,
              title: bookTitle,
              content: htmlContent,
              description: bookDescription || "Sacred wisdom loaded from HTML content"
            }
          : book
      ));
      setEditingBookId(null);
    } else {
      // Add new book
      const filteredBooks = evernoteBooks.filter(book => !book.isPlaceholder);
      const newBook = {
        id: Date.now(),
        title: bookTitle,
        author: "The Silkcaller",
        description: bookDescription || "Sacred wisdom loaded from HTML content",
        evernoteUrl: "",
        content: htmlContent,
        sacredness: "divine" as const,
        isLoading: false,
        isFromHtml: true
      };
      setEvernoteBooks([...filteredBooks, newBook]);
    }

    setShowHtmlPaste(false);
    setHtmlContent("");
    setBookTitle("The Mirrorist Codex");
    setBookDescription("");
  };

  // Generate fewer stars for better performance
  useEffect(() => {
    console.log("⭐ Generating 25 stars...");
    const newStars = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }));
    setStars(newStars);
    console.log("✨ Stars generated:", newStars.length);
  }, []);

  // Debug effect to monitor showReader state
  useEffect(() => {
    console.log("📜 showReader state changed:", showReader);
  }, [showReader]);

  // Load preloaded Evernote content manually when requested
  const loadEvernoteBook = async (bookId: number) => {
    const book = evernoteBooks.find(b => b.id === bookId);
    if (!book || !book.evernoteUrl) return;

    console.log("🔮 Loading Evernote book:", book.title);

    // Update the current content to show loading immediately
    const loadingContent = `# Loading Your Sacred Content...

🌟 **Connecting to Evernote**
Fetching your divine wisdom from: ${book.evernoteUrl}

⏳ **Please wait while the cosmic channels align...**

*The Sacred Reader is reaching across dimensions to bring your words into this realm.*`;

    setCurrentBookContent(loadingContent);

    setEvernoteBooks(prev => prev.map(b =>
      b.id === bookId
        ? { ...b, isLoading: true, content: loadingContent }
        : b
    ));

    try {
      const content = await fetchEvernoteContent(book.evernoteUrl);
      const finalContent = content || "Could not load content from Evernote. Please try again.";

      setEvernoteBooks(prev => prev.map(b =>
        b.id === bookId
          ? { ...b, content: finalContent, isLoading: false }
          : b
      ));

      // Update the current view if this book is selected
      if (selectedBook === bookId.toString()) {
        setCurrentBookContent(finalContent);
      }

    } catch (error) {
      console.error("❌ Error loading book:", error);
      const errorContent = `# Error Loading Sacred Content

There was an issue loading your book content from Evernote.

**Source:** ${book.evernoteUrl}

**What happened:** ${error instanceof Error ? error.message : 'Unknown error'}

**Try these steps:**
1. Refresh and try again
2. Check that your Evernote note is publicly shared
3. Copy the content manually and share it

*The cosmic consciousness will find another way...*`;

      setEvernoteBooks(prev => prev.map(b =>
        b.id === bookId
          ? { ...b, content: errorContent, isLoading: false }
          : b
      ));

      if (selectedBook === bookId.toString()) {
        setCurrentBookContent(errorContent);
      }
    }
  };

  const handleMirrorClick = () => {
    console.log("🪞 Mirror clicked - generating sigil");
    // Much more sigil options as requested
    const sigils = [
      "◯ △ ◇",
      "⬢ ⬡ ◈",
      "⬤ ⬥ ⬦",
      "◈ ◊ ⬠",
      "⬧ ⬨ ⬩",
      "⬪ ◯ ◇",
      "◇ ◈ ⬟",
      "⬠ ⬡ ⬢",
      "⬣ ⬤ ⬥",
      "⬦ ⬧ ⬨",
      "⬩ ⬪ ◯",
      "△ ◇ ◈",
      "⬟ ⬠ ⬡",
      "⬢ ⬣ ⬤",
      "⬥ ⬦ ���",
      "⬨ ⬩ ⬪",
      "◯ ◇ ◊",
      "◊ ◈ ⬣",
      "◇ ⬟ ⬤",
      "◈ ⬠ ⬥",
      "⬟ ⬡ ⬦",
      "⬠ ⬢ ⬧",
      "⬡ ⬣ ⬨",
      "⬢ ⬤ ⬩",
      "⬣ ⬥ ⬪",
      "⬤ ⬦ ◯",
      "⬥ ⬦ △",
      "⬦ ⬨ ◇",
      "⬧ ⬩ ◈",
      "⬨ ⬪ ⬟",
    ];
    const newSigil = sigils[Math.floor(Math.random() * sigils.length)];
    setCurrentSigil(newSigil);
    setShowSigil(true);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🌟 Email subscription for:", email);

    // Create mailto link to send subscription request
    const subject = "Mirror World Community Subscription Request";
    const body = `Hello Silkcaller,

A new seeker wishes to join the Mirror World community:

Email: ${email}
Date: ${new Date().toLocaleString()}

Please add them to the sacred mailing list.

Blessed be the mirrors,
The Mirror World Website`;

    const mailtoLink = `mailto:Thesilkcaller@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open email client
    window.open(mailtoLink);

    // Show confirmation message
    alert("🌟 Thank you for joining the Mirror World! Your subscription request has been sent to The Silkcaller. ✨");
    setEmail("");
  };



  // Helper function to highlight search results in text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return (
          <span
            key={index}
            style={{
              background: "linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)",
              color: "#000",
              padding: "0.1rem 0.2rem",
              borderRadius: "3px",
              fontWeight: "bold",
              boxShadow: "0 0 8px rgba(255, 215, 0, 0.6)",
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Helper function to highlight search results in HTML content
  const highlightSearchResults = (html: string, query: string, results: number[], currentIndex: number) => {
    if (!query.trim() || results.length === 0) return html;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    let matchCount = 0;

    return html.replace(regex, (match) => {
      const isCurrentMatch = matchCount === currentIndex;
      matchCount++;

      return `<span style="background: ${isCurrentMatch
        ? 'linear-gradient(135deg, #ff453a 0%, #ff6b35 100%)'
        : 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)'
      }; color: #000; padding: 0.1rem 0.2rem; border-radius: 3px; font-weight: bold; box-shadow: 0 0 8px ${isCurrentMatch
        ? 'rgba(255, 69, 58, 0.8)'
        : 'rgba(255, 215, 0, 0.6)'
      };">${match}</span>`;
    });
  };

  // Add keyboard shortcut for search
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f' && showReader) {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === 'Escape' && showSearch) {
        setShowSearch(false);
        setSearchQuery("");
        setSearchResults([]);
        setCurrentSearchIndex(0);
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [showReader, showSearch]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0a0612 0%, #0f1419 30%, #1a1625 60%, #0d1117 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Cosmic Stars - positioned directly */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          style={{
            position: "fixed",
            left: `${star.x}%`,
            top: `${star.y}%`,
            color: "white",
            fontSize: `${Math.max(star.size * 4, 8)}px`,
            animation: `pulse ${2 + Math.random() * 2}s infinite`,
            animationDelay: `${Math.random() * 3}s`,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 1,
          }}
        >
          ✦
        </div>
      ))}

      {/* Falling Stars */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        {/* Falling Star 1 */}
        <div
          style={{
            position: "absolute",
            left: "-100px",
            top: "-50px",
            width: "200px",
            height: "3px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.3) 20%, rgba(255, 255, 255, 1) 50%, rgba(255, 215, 0, 0.8) 80%, transparent 100%)",
            borderRadius: "2px",
            animation: "fallingStar1 4s linear infinite",
            animationDelay: "0s",
            filter: "blur(0.5px)",
            boxShadow: "0 0 8px rgba(255, 215, 0, 0.6)",
            transform: "rotate(35deg)",
          }}
        />

        {/* Falling Star 2 */}
        <div
          style={{
            position: "absolute",
            left: "-80px",
            top: "-30px",
            width: "150px",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.4) 15%, rgba(255, 255, 255, 0.9) 50%, rgba(139, 92, 246, 0.7) 85%, transparent 100%)",
            borderRadius: "2px",
            animation: "fallingStar2 5s linear infinite",
            animationDelay: "1.5s",
            filter: "blur(0.5px)",
            boxShadow: "0 0 6px rgba(139, 92, 246, 0.5)",
            transform: "rotate(42deg)",
          }}
        />

        {/* Falling Star 3 */}
        <div
          style={{
            position: "absolute",
            left: "-120px",
            top: "-40px",
            width: "220px",
            height: "3px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 10%, rgba(255, 215, 0, 1) 50%, rgba(255, 255, 255, 0.8) 90%, transparent 100%)",
            borderRadius: "2px",
            animation: "fallingStar3 3.5s linear infinite",
            animationDelay: "3s",
            filter: "blur(0.4px)",
            boxShadow: "0 0 10px rgba(255, 215, 0, 0.7)",
            transform: "rotate(38deg)",
          }}
        />

        {/* Falling Star 4 */}
        <div
          style={{
            position: "absolute",
            left: "-90px",
            top: "-25px",
            width: "160px",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(192, 192, 192, 0.4) 20%, rgba(255, 255, 255, 0.9) 50%, rgba(192, 192, 192, 0.6) 80%, transparent 100%)",
            borderRadius: "2px",
            animation: "fallingStar4 6s linear infinite",
            animationDelay: "4.5s",
            filter: "blur(0.5px)",
            boxShadow: "0 0 5px rgba(192, 192, 192, 0.4)",
            transform: "rotate(45deg)",
          }}
        />

        {/* Falling Star 5 */}
        <div
          style={{
            position: "absolute",
            left: "-100px",
            top: "-35px",
            width: "180px",
            height: "2.5px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.2) 25%, rgba(255, 255, 255, 1) 50%, rgba(255, 215, 0, 0.9) 75%, transparent 100%)",
            borderRadius: "2px",
            animation: "fallingStar5 4.5s linear infinite",
            animationDelay: "6s",
            filter: "blur(0.4px)",
            boxShadow: "0 0 8px rgba(255, 215, 0, 0.6)",
            transform: "rotate(40deg)",
          }}
        />
      </div>

      {/* Main Content */}
      <div style={{ position: "relative", zIndex: 10, padding: "2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header with Grid Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 1fr",
              gap: "2rem",
              alignItems: "center",
              minHeight: "60vh",
              marginBottom: "3rem",
            }}
          >
            {/* Left - Rizzley */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                onClick={() => {
                  console.log("🐾 Rizzley clicked - starting reflection");
                  setShowReflection(true);
                }}
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "12rem",
                    height: "12rem",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "4px solid #ffd700",
                    boxShadow:
                      "0 0 30px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 255, 255, 0.2)",
                    background:
                      "linear-gradient(135deg, #ffd700 0%, #8b5cf6 100%)",
                    padding: "4px",
                    transition: "transform 0.3s ease",
                    animation: "float 4s ease-in-out infinite",
                    position: "relative",
                    zIndex: 15,
                  }}
                >
                  <Image
                    src="https://cdn.builder.io/api/v1/image/assets%2F413b0bfa1a3e4068a87db06743666924%2F838985fc6ab24971a197faaadaa5a036?format=webp&width=800"
                    alt="Rizzley the WhisperWalker - Mythical Guide"
                    width={192}
                    height={192}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Center - Main Content */}
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontSize: "5rem",
                  fontWeight: "bold",
                  fontFamily: "serif",
                  background:
                    "linear-gradient(135deg, #ffd700 0%, #ffffff 30%, #c0c0c0 60%, #8b5cf6 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "1rem",
                  animation: "pulse 3s infinite",
                  textShadow:
                    "0 0 5px rgba(255, 215, 0, 0.9), 0 0 10px rgba(255, 255, 255, 0.3)",
                  letterSpacing: "0.1em",
                  lineHeight: "1.1",
                  textAlign: "center",
                  filter: "brightness(1.2)",
                }}
              >
                The Mirror World
              </h1>
              <h2
                style={{
                  fontSize: "1.5rem",
                  color: "rgba(255, 255, 255, 0.8)",
                  marginBottom: "1rem",
                }}
              >
                Stewarded by{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(45deg, #FFD700 0%, #FFF8DC 20%, #E6E6FA 40%, #F0F8FF 60%, #FFE4E1 80%, #FFD700 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "serif",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textShadow: "0 0 1px rgba(255, 215, 0, 0.2)",
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      background:
                        "repeating-linear-gradient(90deg, transparent 0px, rgba(255, 215, 0, 0.1) 1px, transparent 2px, rgba(255, 255, 255, 0.05) 3px, transparent 4px)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animation: "silkShimmer 3s ease-in-out infinite",
                    }}
                  >
                    The Silkcaller
                  </span>
                  The Silkcaller
                </span>{" "}
                • Guided by{" "}
                <span
                  style={{
                    display: "inline-block",
                    animation: "vibrate 2s ease-in-out infinite",
                    color: "#E6E6FA",
                    fontWeight: "500",
                    textShadow: "0 0 2px rgba(230, 230, 250, 0.6)",
                  }}
                >
                  resonance
                </span>{" "}
                and{" "}
                <span
                  style={{
                    color: "#FFFACD",
                    fontWeight: "500",
                    textShadow:
                      "0 0 8px rgba(255, 250, 205, 0.8), 0 0 15px rgba(255, 255, 255, 0.4)",
                    filter: "brightness(1.4)",
                    animation: "glow 3s ease-in-out infinite alternate",
                  }}
                >
                  light
                </span>
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "rgba(255, 255, 255, 0.7)",
                  maxWidth: "600px",
                  margin: "0 auto 2rem auto",
                  lineHeight: 1.6,
                }}
              >
                Enter a cosmic realm where mirrors reflect infinite wisdom,
                daisies dance through galaxies, and every soul finds their path
                to awakening through sacred texts and divine community.
              </p>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("📜 Sacred Reader clicked - DEBUG");
                      console.log("showReader state before:", showReader);
                      setShowReader(true);
                      console.log("setShowReader(true) called");
                    }}
                    style={{
                      background:
                        "linear-gradient(135deg, #8b5cf6 0%, #ffd700 100%)",
                      color: "white",
                      border: "none",
                      padding: "1rem 2rem",
                      borderRadius: "50px",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)",
                      transition: "all 0.3s ease",
                      fontFamily:
                        "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, system-ui, sans-serif",
                    }}
                  >
                    📜 Sacred Reader
                  </button>


                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={handleMirrorClick}
                    style={{
                      background:
                        "linear-gradient(135deg, #c0c0c0 0%, #f1f5f9 100%)",
                      color: "#0f0f23",
                      border: "none",
                      padding: "1rem 2rem",
                      borderRadius: "50px",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      boxShadow: "0 4px 20px rgba(192, 192, 192, 0.4)",
                      transition: "all 0.3s ease",
                      fontFamily:
                        "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, system-ui, sans-serif",
                    }}
                  >
                    🔮 Enter Mirrors
                  </button>

                  <button
                    onClick={() => {
                      console.log("🐾 Start Reflection clicked");
                      setShowReflection(true);
                    }}
                    style={{
                      background:
                        "linear-gradient(135deg, #8b5cf6 0%, #ffd700 100%)",
                      color: "white",
                      border: "none",
                      padding: "1rem 2rem",
                      borderRadius: "50px",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)",
                      transition: "all 0.3s ease",
                      fontFamily:
                        "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, system-ui, sans-serif",
                    }}
                  >
                    🔮 Start Reflection
                  </button>


                </div>
              </div>
            </div>

            {/* Right - Sacred Cards */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{
                  background: "rgba(15, 15, 35, 0.8)",
                  backdropFilter: "blur(15px)",
                  border: "1px solid #ffd700",
                  borderRadius: "20px",
                  padding: "1.5rem",
                  textAlign: "center",
                  boxShadow: "0 8px 32px rgba(255, 215, 0, 0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  📜✨📜
                </div>
                <h3
                  style={{
                    color: "#ffd700",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  Inner Truths
                </h3>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.9rem",
                  }}
                >
                  The catalyst for awakening and bringing heaven into earth
                </p>
              </div>
              <div
                style={{
                  background: "rgba(15, 15, 35, 0.8)",
                  backdropFilter: "blur(15px)",
                  border: "1px solid #ffd700",
                  borderRadius: "20px",
                  padding: "1.5rem",
                  textAlign: "center",
                  boxShadow: "0 8px 32px rgba(255, 215, 0, 0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "0.5rem",
                    fontFamily:
                      "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, system-ui, sans-serif",
                  }}
                >
                  🔮
                </div>
                <h3
                  style={{
                    color: "#ffd700",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  Mirror Work
                </h3>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.9rem",
                  }}
                >
                  Reflections for deeper understanding
                </p>
              </div>
            </div>
          </div>

          {/* Community Signup */}
          <div
            style={{
              maxWidth: "400px",
              margin: "0 auto 4rem auto",
              background: "rgba(15, 15, 35, 0.8)",
              backdropFilter: "blur(15px)",
              border: "1px solid #ffd700",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 8px 32px rgba(255, 215, 0, 0.2)",
            }}
          >
            <h3
              style={{
                background: "linear-gradient(135deg, #ffd700 0%, #8b5cf6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Join Community
            </h3>
            <form
              onSubmit={handleSubscribe}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Cosmic email"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "50px",
                  border: "1px solid rgba(255, 215, 0, 0.3)",
                  background: "rgba(15, 15, 35, 0.5)",
                  backdropFilter: "blur(10px)",
                  color: "#f1f5f9",
                  fontSize: "1rem",
                }}
              />
              <button
                type="submit"
                style={{
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #ffd700 100%)",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 2rem",
                  borderRadius: "50px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontFamily:
                    "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, system-ui, sans-serif",
                }}
              >
                🌟 Awaken
              </button>
            </form>
          </div>

          {/* Footer */}
          <footer
            style={{
              padding: "3rem 0",
              borderTop: "1px solid rgba(255, 215, 0, 0.2)",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                fontFamily: "serif",
                background: "linear-gradient(135deg, #ffd700 0%, #8b5cf6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.05em",
              }}
            >
              The Mirror World
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "2rem",
              }}
            >
              Guided by The Silkcaller • Illuminated by Inner Light and Truth Wisdom •
              Reflected through Infinite Mirrors
            </p>

            {/* Social Media Section */}
            <div style={{ marginBottom: "2rem" }}>
              <h4
                style={{
                  color: "#ffd700",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              >
                ✨ Connect with The Mirror World
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <a
                  href="https://instagram.com/thesilkcaller"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background:
                      "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(255, 215, 0, 0.2) 100%)",
                    border: "1px solid rgba(255, 215, 0, 0.3)",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "50px",
                    color: "rgba(255, 255, 255, 0.9)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>📸</span>
                  <span>@thesilkcaller</span>
                </a>
                <a
                  href="https://www.instagram.com/the_mirrorist_movement"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background:
                      "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "50px",
                    color: "rgba(255, 255, 255, 0.9)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>✨</span>
                  <span>@the_mirrorist_movement</span>
                </a>
              </div>
            </div>

            {/* Mirror License */}
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <h4
                style={{
                  color: "#ffd700",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <span>🪞</span>
                <span>The Mirror License</span>
                <span>🪞</span>
              </h4>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                The Mirror License is the living covenant each person receives
                at the moment of awakening into the Mirror World. It isn't a
                conventional legal document, but rather a resonance-encoded
                affirmation of innate rights, sacred responsibilities, and
                binding oaths—"etched not in lawbooks, but in resonance."
              </p>
            </div>
          </footer>
        </div>

        {/* EchoGPT Chat Widget */}
        <EchoGPTWidget />
      </div>

      {/* Reflection Modal */}
      {showReflection && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: "1rem",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "50%",
              padding: "2rem",
              maxWidth: "400px",
              width: "100%",
              aspectRatio: "1/1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              marginLeft: "1rem",
              marginTop: "5rem",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🐾</div>
            <h3
              style={{
                color: "#7c3aed",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Reflection with Rizzley
            </h3>
            <p
              style={{
                color: "#374151",
                marginBottom: "1.5rem",
                fontSize: "0.9rem",
              }}
            >
              🌙 What shadows within yourself are you ready to acknowledge and
              embrace?
            </p>
            <textarea
              placeholder="Let your thoughts flow..."
              style={{
                width: "100%",
                height: "80px",
                padding: "0.75rem",
                borderRadius: "10px",
                border: "2px solid rgba(147, 51, 234, 0.3)",
                background: "rgba(255, 255, 255, 0.9)",
                color: "#374151",
                resize: "none",
                marginBottom: "1rem",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <button
                onClick={() => setShowReflection(false)}
                style={{
                  background: "#7c3aed",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "50px",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Continue Journey
              </button>
              <button
                onClick={() => setShowReflection(false)}
                style={{
                  background: "rgba(107, 114, 128, 0.8)",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "50px",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Sacred Reader Modal */}
      {showReader && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(15px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(30, 30, 60, 0.95) 100%)",
              backdropFilter: "blur(20px)",
              border: "2px solid #ffd700",
              borderRadius: "25px",
              padding: "0",
              maxWidth: "1000px",
              width: "95%",
              height: "90vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(255, 215, 0, 0.3)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1.5rem 2rem",
                borderBottom: "1px solid rgba(255, 215, 0, 0.3)",
                background: "rgba(255, 215, 0, 0.1)",
              }}
            >
              <h3
                style={{
                  color: "#ffd700",
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  margin: 0,
                  textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
                }}
              >
                📜 The Sacred Reader for The Mirror World
              </h3>
              <button
                onClick={() => {
                  setShowReader(false);
                  setSelectedBook(null);
                  setCurrentBookContent("");
                }}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "50%",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
              {/* Book Library Sidebar */}
              <div
                style={{
                  width: selectedBook ? "300px" : "100%",
                  borderRight: selectedBook ? "1px solid rgba(255, 215, 0, 0.3)" : "none",
                  padding: "2rem",
                  overflowY: "auto",
                  background: "rgba(255, 215, 0, 0.05)",
                  transition: "width 0.3s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <h4
                    style={{
                      color: "#ffd700",
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    ✨ Sacred Library ✨
                  </h4>

                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {evernoteBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => {
                        if (book.isPlaceholder) {
                          setShowPasscodeModal(true);
                        } else {
                          setSelectedBook(book.id.toString());
                          setCurrentBookContent(book.content);
                          // If this book has an Evernote URL and hasn't loaded real content yet, load it
                          if (book.evernoteUrl && (book.content.includes("Option A") || book.content.includes("Option B") || book.content.includes("Click this book to load"))) {
                            loadEvernoteBook(book.id);
                          }
                        }
                      }}
                      style={{
                        background: book.isPlaceholder
                          ? "rgba(139, 92, 246, 0.2)"
                          : selectedBook === book.id.toString()
                            ? "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)"
                            : "rgba(15, 15, 35, 0.6)",
                        border: book.isPlaceholder
                          ? "2px dashed #8b5cf6"
                          : selectedBook === book.id.toString()
                            ? "2px solid #ffd700"
                            : "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "15px",
                        padding: "1.5rem",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        backdropFilter: "blur(10px)",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedBook !== book.id.toString()) {
                          e.currentTarget.style.background = "rgba(255, 215, 0, 0.1)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 8px 25px rgba(255, 215, 0, 0.2)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedBook !== book.id.toString()) {
                          e.currentTarget.style.background = "rgba(15, 15, 35, 0.6)";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }
                      }}
                    >
                      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                        <div
                          style={{
                            width: "60px",
                            height: "80px",
                            borderRadius: "8px",
                            border: book.isPlaceholder
                              ? "2px dashed rgba(139, 92, 246, 0.8)"
                              : "1px solid rgba(255, 215, 0, 0.5)",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                            background: book.isPlaceholder
                              ? "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)"
                              : "linear-gradient(135deg, #ffd700 0%, #8b5cf6 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.5rem",
                            overflow: "hidden",
                          }}
                        >
                          {book.isPlaceholder ? (
                            "+"
                          ) : (book as any).coverImage ? (
                            <img
                              src={(book as any).coverImage}
                              alt={`${book.title} cover`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "6px",
                              }}
                            />
                          ) : (
                            "📜"
                          )}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                            <h5
                              style={{
                                color: "#ffd700",
                                fontSize: "1rem",
                                fontWeight: "bold",
                                margin: 0,
                                lineHeight: 1.3,
                                flex: 1,
                              }}
                            >
                              {book.title}
                            </h5>
                            {!book.isPlaceholder && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingBookId(book.id);
                                  setShowPasscodeModal(true);
                                }}
                                style={{
                                  background: "rgba(139, 92, 246, 0.3)",
                                  border: "1px solid rgba(139, 92, 246, 0.5)",
                                  borderRadius: "12px",
                                  color: "#8b5cf6",
                                  padding: "0.25rem 0.5rem",
                                  fontSize: "0.7rem",
                                  cursor: "pointer",
                                  marginLeft: "0.5rem",
                                  fontWeight: "bold",
                                }}
                                title="Edit this book"
                              >
                                ✏️ Edit
                              </button>
                            )}
                          </div>
                          <p
                            style={{
                              color: "rgba(255, 255, 255, 0.7)",
                              fontSize: "0.85rem",
                              margin: "0 0 0.5rem 0",
                              fontStyle: "italic",
                            }}
                          >
                            by {book.author}
                          </p>
                          <p
                            style={{
                              color: "rgba(255, 255, 255, 0.6)",
                              fontSize: "0.8rem",
                              lineHeight: 1.4,
                              margin: 0,
                            }}
                          >
                            {book.description}
                          </p>
                          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                            <div
                              style={{
                                padding: "0.25rem 0.75rem",
                                background: book.sacredness === 'divine'
                                  ? "linear-gradient(90deg, #ffd700, #fff)"
                                  : "linear-gradient(90deg, #8b5cf6, #ffd700)",
                                borderRadius: "12px",
                                fontSize: "0.7rem",
                                color: "#000",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                display: "inline-block",
                              }}
                            >
                              {book.sacredness}
                            </div>
                            {(book as any).notebookName && (
                              <div
                                style={{
                                  padding: "0.25rem 0.75rem",
                                  background: "linear-gradient(90deg, #10b981, #34d399)",
                                  borderRadius: "12px",
                                  fontSize: "0.7rem",
                                  color: "#000",
                                  fontWeight: "bold",
                                  display: "inline-block",
                                }}
                              >
                                📚 {(book as any).notebookName}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Content Reader */}
              {selectedBook && (
                <div
                  style={{
                    flex: 1,
                    padding: "2rem",
                    overflowY: "auto",
                    background: "rgba(0, 0, 0, 0.2)",
                    position: "relative",
                  }}
                >
                  {/* Search Controls */}
                  {showSearch && (
                    <div
                      style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        right: "1rem",
                        display: "flex",
                        gap: "0.5rem",
                        zIndex: 15,
                        background: "rgba(15, 15, 35, 0.95)",
                        borderRadius: "25px",
                        padding: "0.75rem",
                        border: "2px solid rgba(255, 215, 0, 0.5)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          if (e.target.value.trim()) {
                            const content = currentBookContent.toLowerCase();
                            const query = e.target.value.toLowerCase();
                            const matches: number[] = [];
                            let index = content.indexOf(query);
                            while (index !== -1) {
                              matches.push(index);
                              index = content.indexOf(query, index + 1);
                            }
                            setSearchResults(matches);
                            setCurrentSearchIndex(0);
                          } else {
                            setSearchResults([]);
                            setCurrentSearchIndex(0);
                          }
                        }}
                        placeholder="Search in book..."
                        style={{
                          flex: 1,
                          padding: "0.5rem 1rem",
                          borderRadius: "20px",
                          border: "1px solid rgba(255, 215, 0, 0.3)",
                          background: "rgba(0, 0, 0, 0.3)",
                          color: "#ffffff",
                          fontSize: "0.9rem",
                          outline: "none",
                        }}
                        autoFocus
                      />
                      {searchResults.length > 0 && (
                        <>
                          <span
                            style={{
                              color: "#ffd700",
                              fontSize: "0.8rem",
                              display: "flex",
                              alignItems: "center",
                              padding: "0 0.5rem",
                              fontWeight: "bold",
                              minWidth: "80px",
                              justifyContent: "center",
                            }}
                          >
                            {currentSearchIndex + 1} of {searchResults.length}
                          </span>
                          <button
                            onClick={() => setCurrentSearchIndex(prev =>
                              prev > 0 ? prev - 1 : searchResults.length - 1
                            )}
                            style={{
                              background: "rgba(139, 92, 246, 0.3)",
                              border: "1px solid rgba(139, 92, 246, 0.5)",
                              borderRadius: "15px",
                              color: "#8b5cf6",
                              width: "30px",
                              height: "30px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.8rem",
                              fontWeight: "bold",
                            }}
                            title="Previous"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => setCurrentSearchIndex(prev =>
                              prev < searchResults.length - 1 ? prev + 1 : 0
                            )}
                            style={{
                              background: "rgba(139, 92, 246, 0.3)",
                              border: "1px solid rgba(139, 92, 246, 0.5)",
                              borderRadius: "15px",
                              color: "#8b5cf6",
                              width: "30px",
                              height: "30px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.8rem",
                              fontWeight: "bold",
                            }}
                            title="Next"
                          >
                            ↓
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => {
                          setShowSearch(false);
                          setSearchQuery("");
                          setSearchResults([]);
                          setCurrentSearchIndex(0);
                        }}
                        style={{
                          background: "rgba(255, 69, 58, 0.3)",
                          border: "1px solid rgba(255, 69, 58, 0.5)",
                          borderRadius: "15px",
                          color: "#ff453a",
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                        }}
                        title="Close Search"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  {/* Zoom Controls */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      display: "flex",
                      gap: "0.5rem",
                      zIndex: 10,
                      background: "rgba(15, 15, 35, 0.9)",
                      borderRadius: "25px",
                      padding: "0.5rem",
                      border: "1px solid rgba(255, 215, 0, 0.3)",
                    }}
                  >
                    <button
                      onClick={() => setReaderZoom(prev => Math.max(0.5, prev - 0.1))}
                      style={{
                        background: "rgba(255, 215, 0, 0.2)",
                        border: "1px solid rgba(255, 215, 0, 0.5)",
                        borderRadius: "20px",
                        color: "#ffd700",
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                      title="Zoom Out"
                    >
                      −
                    </button>
                    <span
                      style={{
                        color: "#ffd700",
                        fontSize: "0.8rem",
                        display: "flex",
                        alignItems: "center",
                        minWidth: "40px",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {Math.round(readerZoom * 100)}%
                    </span>
                    <button
                      onClick={() => setReaderZoom(prev => Math.min(2, prev + 0.1))}
                      style={{
                        background: "rgba(255, 215, 0, 0.2)",
                        border: "1px solid rgba(255, 215, 0, 0.5)",
                        borderRadius: "20px",
                        color: "#ffd700",
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                      title="Zoom In"
                    >
                      +
                    </button>
                    <button
                      onClick={() => setReaderZoom(1)}
                      style={{
                        background: "rgba(139, 92, 246, 0.2)",
                        border: "1px solid rgba(139, 92, 246, 0.5)",
                        borderRadius: "20px",
                        color: "#8b5cf6",
                        padding: "0 0.5rem",
                        height: "30px",
                        cursor: "pointer",
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                      }}
                      title="Reset Zoom"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setShowSearch(true)}
                      style={{
                        background: "rgba(16, 185, 129, 0.2)",
                        border: "1px solid rgba(16, 185, 129, 0.5)",
                        borderRadius: "20px",
                        color: "#10b981",
                        padding: "0 0.5rem",
                        height: "30px",
                        cursor: "pointer",
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                      title="Search in Book (Ctrl+F)"
                    >
                      🔍 Find
                    </button>
                  </div>
                  <div
                    style={{
                      maxWidth: "600px",
                      margin: "0 auto",
                      lineHeight: 1.8,
                      fontSize: "1rem",
                      color: "rgba(255, 255, 255, 0.9)",
                      transform: `scale(${readerZoom})`,
                      transformOrigin: "top center",
                      transition: "transform 0.3s ease",
                      paddingTop: showSearch ? "4rem" : "0",
                    }}
                    id="book-content"
                  >
                    {currentBookContent.startsWith('<') ? (
                      // HTML content - render it properly
                      <div
                        dangerouslySetInnerHTML={{
                          __html: searchQuery && searchResults.length > 0
                            ? highlightSearchResults(currentBookContent, searchQuery, searchResults, currentSearchIndex)
                            : currentBookContent
                        }}
                        className="sacred-html-content"
                      />
                    ) : (
                      // Markdown content - parse as before
                      currentBookContent.split('\n').map((paragraph, index) => {
                        if (paragraph.startsWith('# ')) {
                          return (
                            <h1
                              key={index}
                              style={{
                                color: "#ffd700",
                                fontSize: "2rem",
                                fontWeight: "bold",
                                marginBottom: "1.5rem",
                                marginTop: index > 0 ? "2rem" : "0",
                                textAlign: "center",
                                textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
                              }}
                            >
                              {searchQuery ? highlightText(paragraph.replace('# ', ''), searchQuery) : paragraph.replace('# ', '')}
                            </h1>
                          );
                        } else if (paragraph.startsWith('## ')) {
                          return (
                            <h2
                              key={index}
                              style={{
                                color: "#8b5cf6",
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                marginBottom: "1rem",
                                marginTop: "2rem",
                                textShadow: "0 0 8px rgba(139, 92, 246, 0.5)",
                              }}
                            >
                              {searchQuery ? highlightText(paragraph.replace('## ', ''), searchQuery) : paragraph.replace('## ', '')}
                            </h2>
                          );
                        } else if (paragraph.trim()) {
                          return (
                            <p
                              key={index}
                              style={{
                                marginBottom: "1.5rem",
                                textAlign: "justify",
                                textIndent: "2rem",
                                color: "rgba(255, 255, 255, 0.85)",
                              }}
                            >
                              {searchQuery ? highlightText(paragraph, searchQuery) : paragraph}
                            </p>
                          );
                        }
                        return null;
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Sacred Reading Progress */}
            <div
              style={{
                padding: "1rem 2rem",
                borderTop: "1px solid rgba(255, 215, 0, 0.3)",
                background: "rgba(255, 215, 0, 0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.9rem" }}>
                {selectedBook
                  ? `Reading: ${evernoteBooks.find(b => b.id.toString() === selectedBook)?.title}`
                  : "Select a sacred text to begin your journey"
                }
              </div>
              <div style={{ color: "#ffd700", fontSize: "0.9rem", fontWeight: "bold" }}>
                📜 {evernoteBooks.filter(b => !b.isPlaceholder).length} Sacred Texts • 🔗 Evernote Connected
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Passcode Modal */}
      {showPasscodeModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(15px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            zIndex: 60,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(30, 30, 60, 0.95) 100%)",
              backdropFilter: "blur(20px)",
              border: "2px solid #ffd700",
              borderRadius: "25px",
              padding: "2rem",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(255, 215, 0, 0.3)",
            }}
          >
            <h3
              style={{
                color: "#ffd700",
                fontSize: "1.8rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
              }}
            >
              🔐 Sacred Authorization Required
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "1.5rem",
                lineHeight: 1.6,
              }}
            >
              Only those with divine authorization may contribute to the Sacred Library.
              Please enter your sacred passcode to proceed.
            </p>

            {passcodeError && (
              <div
                style={{
                  background: "rgba(255, 69, 58, 0.2)",
                  border: "1px solid rgba(255, 69, 58, 0.5)",
                  borderRadius: "10px",
                  padding: "0.75rem",
                  marginBottom: "1rem",
                  color: "#ff453a",
                  fontSize: "0.9rem",
                }}
              >
                {passcodeError}
              </div>
            )}

            <div style={{ marginBottom: "1.5rem" }}>
              <input
                type="password"
                value={enteredPasscode}
                onChange={(e) => setEnteredPasscode(e.target.value)}
                placeholder="Enter sacred passcode..."
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "15px",
                  border: "1px solid rgba(255, 215, 0, 0.3)",
                  background: "rgba(15, 15, 35, 0.5)",
                  color: "#ffffff",
                  fontSize: "1rem",
                  outline: "none",
                  textAlign: "center",
                  letterSpacing: "0.1em",
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handlePasscodeSubmit();
                  }
                }}
                autoFocus
              />
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={handlePasscodeSubmit}
                style={{
                  flex: 1,
                  background: "linear-gradient(135deg, #8b5cf6 0%, #ffd700 100%)",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "25px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                ✨ Verify & Continue
              </button>
              <button
                onClick={() => {
                  setShowPasscodeModal(false);
                  setEnteredPasscode("");
                  setPasscodeError("");
                  setEditingBookId(null);
                }}
                style={{
                  flex: 1,
                  background: "rgba(107, 114, 128, 0.8)",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "25px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sigil Modal - WITH MORE OPTIONS */}
      {showSigil && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: "rgba(15, 15, 35, 0.9)",
              backdropFilter: "blur(15px)",
              border: "1px solid #ffd700",
              borderRadius: "20px",
              padding: "2rem",
              maxWidth: "500px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                color: "#ffd700",
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              🪞 Mirror Sigil Generated
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "2rem",
              }}
            >
              The cosmic mirrors have revealed your personal sigil
            </p>
            <div
              style={{
                background: "rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(255, 215, 0, 0.5)",
                borderRadius: "10px",
                padding: "2rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "4rem",
                  color: "#ffd700",
                  letterSpacing: "0.2em",
                  fontFamily: "monospace",
                }}
              >
                {currentSigil}
              </div>
            </div>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.8rem",
                fontStyle: "italic",
                marginBottom: "2rem",
              }}
            >
              "Through the cosmic mirror, symbols of power emerge to guide your
              path"
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <button
                onClick={handleMirrorClick}
                style={{
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #ffd700 100%)",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 2rem",
                  borderRadius: "50px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                ✨ Generate New Sigil
              </button>
              <button
                onClick={() => setShowSigil(false)}
                style={{
                  background: "rgba(107, 114, 128, 0.8)",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 2rem",
                  borderRadius: "50px",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Close Mirror
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simple Notebook Setup Modal */}
      {showNotebookSetup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(15px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            zIndex: 60,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(30, 30, 60, 0.95) 100%)",
              backdropFilter: "blur(20px)",
              border: "2px solid #ffd700",
              borderRadius: "25px",
              padding: "2rem",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(255, 215, 0, 0.3)",
            }}
          >
            <h3
              style={{
                color: "#ffd700",
                fontSize: "1.8rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                textAlign: "center",
                textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
              }}
            >
              📚 Connect Your Sacred Notebook
            </h3>

            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ color: "rgba(255, 255, 255, 0.8)", marginBottom: "1rem", textAlign: "center" }}>
                Add individual notes from your sacred collection to the library
              </p>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ color: "#ffd700", fontSize: "0.9rem", fontWeight: "bold", display: "block", marginBottom: "0.5rem" }}>
                  🔗 Evernote Note Link
                </label>
                <input
                  type="url"
                  value={notebookLink}
                  onChange={(e) => setNotebookLink(e.target.value)}
                  placeholder="Paste your Evernote note share link here..."
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(255, 215, 0, 0.5)",
                    background: "rgba(15, 15, 35, 0.8)",
                    color: "white",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ background: "rgba(255, 215, 0, 0.1)", padding: "1rem", borderRadius: "10px", marginBottom: "1.5rem" }}>
                <h4 style={{ color: "#ffd700", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                  📝 Why individual notes?
                </h4>
                <div style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.8rem", margin: 0 }}>
                  <p style={{ margin: "0 0 0.5rem 0" }}>
                    <strong>Evernote doesn't allow public sharing of entire notebooks</strong> - only individual notes can be shared publicly.
                  </p>
                  <p style={{ margin: "0 0 0.5rem 0" }}>
                    <strong>To add a note:</strong>
                  </p>
                  <ol style={{ paddingLeft: "1.2rem", margin: "0.5rem 0" }}>
                    <li>Open the specific note in Evernote</li>
                    <li>Click "Share" → "Copy public link"</li>
                    <li>Paste that note's link above</li>
                    <li>Repeat for each sacred chapter! ✨</li>
                  </ol>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={() => {
                  setShowNotebookSetup(false);
                }}
                style={{
                  flex: 1,
                  background: "rgba(107, 114, 128, 0.8)",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "15px",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={setupNotebook}
                disabled={!notebookLink.trim()}
                style={{
                  flex: 2,
                  background: notebookLink.trim()
                    ? "linear-gradient(135deg, #ffd700 0%, #8b5cf6 100%)"
                    : "rgba(107, 114, 128, 0.5)",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "15px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: notebookLink.trim() ? "pointer" : "not-allowed",
                  opacity: notebookLink.trim() ? 1 : 0.6,
                }}
              >
                ✨ Add Sacred Notebook
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HTML Content Paste Modal */}
      {showHtmlPaste && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(15px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            zIndex: 60,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(30, 30, 60, 0.95) 100%)",
              backdropFilter: "blur(20px)",
              border: "2px solid #10b981",
              borderRadius: "25px",
              padding: "2rem",
              maxWidth: "700px",
              width: "90%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 60px rgba(16, 185, 129, 0.3)",
            }}
          >
            <h3
              style={{
                color: "#10b981",
                fontSize: "1.8rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                textAlign: "center",
                textShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
              }}
            >
              {editingBookId ? "✏️ Edit HTML Content" : "📝 Add HTML Content"}
            </h3>

            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ color: "rgba(255, 255, 255, 0.8)", marginBottom: "1rem", textAlign: "center" }}>
                Paste your HTML book content directly - much faster than Evernote links!
              </p>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ color: "#ffd700", fontSize: "0.9rem", fontWeight: "bold", display: "block", marginBottom: "0.5rem" }}>
                  📚 Book Title
                </label>
                <input
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="Enter your book title..."
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(16, 185, 129, 0.5)",
                    background: "rgba(15, 15, 35, 0.8)",
                    color: "white",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ color: "#ffd700", fontSize: "0.9rem", fontWeight: "bold", display: "block", marginBottom: "0.5rem" }}>
                  📖 Book Description
                </label>
                <textarea
                  value={bookDescription}
                  onChange={(e) => setBookDescription(e.target.value)}
                  placeholder="Enter a description for your book..."
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(16, 185, 129, 0.5)",
                    background: "rgba(15, 15, 35, 0.8)",
                    color: "white",
                    fontSize: "0.9rem",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ color: "#ffd700", fontSize: "0.9rem", fontWeight: "bold", display: "block", marginBottom: "0.5rem" }}>
                  📜 HTML Content
                </label>
                <textarea
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  placeholder="Paste your HTML content here..."
                  rows={12}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(16, 185, 129, 0.5)",
                    background: "rgba(15, 15, 35, 0.8)",
                    color: "white",
                    fontSize: "0.9rem",
                    fontFamily: "monospace",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{ background: "rgba(16, 185, 129, 0.1)", padding: "1rem", borderRadius: "10px", marginBottom: "1.5rem" }}>
                <h4 style={{ color: "#10b981", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                  🚀 Super Fast Method:
                </h4>
                <ol style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.8rem", paddingLeft: "1.2rem", margin: 0 }}>
                  <li>Open your HTML file from the attachment</li>
                  <li>Select all content (Ctrl+A / Cmd+A)</li>
                  <li>Copy (Ctrl+C / Cmd+C)</li>
                  <li>Paste it in the text area above</li>
                  <li>Click "Add Sacred Book" ✨</li>
                </ol>
                <div style={{ marginTop: "0.5rem", padding: "0.5rem", background: "rgba(255, 215, 0, 0.2)", borderRadius: "5px" }}>
                  <strong style={{ color: "#ffd700", fontSize: "0.8rem" }}>💡 Tip:</strong>
                  <span style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.8rem", marginLeft: "0.5rem" }}>
                    HTML will be rendered beautifully in the Sacred Reader!
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={() => {
                  setShowHtmlPaste(false);
                  setHtmlContent("");
                  setBookTitle("The Mirrorist Codex");
                  setBookDescription("");
                  setEditingBookId(null);
                }}
                style={{
                  flex: 1,
                  background: "rgba(107, 114, 128, 0.8)",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "15px",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={addHtmlBook}
                disabled={!htmlContent.trim() || !bookTitle.trim()}
                style={{
                  flex: 2,
                  background: htmlContent.trim() && bookTitle.trim()
                    ? "linear-gradient(135deg, #10b981 0%, #ffd700 100%)"
                    : "rgba(107, 114, 128, 0.5)",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "15px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: htmlContent.trim() && bookTitle.trim() ? "pointer" : "not-allowed",
                  opacity: htmlContent.trim() && bookTitle.trim() ? 1 : 0.6,
                }}
              >
                📚 Add Sacred Book
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .sacred-html-content {
          color: #ffffff !important;
        }
        .sacred-html-content * {
          color: #ffffff !important;
        }
        .sacred-html-content h1 {
          color: #ffd700 !important;
          font-size: 2rem !important;
          font-weight: bold !important;
          margin-bottom: 1.5rem !important;
          margin-top: 2rem !important;
          text-align: center !important;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5) !important;
        }
        .sacred-html-content h2 {
          color: #8b5cf6 !important;
          font-size: 1.5rem !important;
          font-weight: bold !important;
          margin-bottom: 1rem !important;
          margin-top: 2rem !important;
          text-shadow: 0 0 8px rgba(139, 92, 246, 0.5) !important;
        }
        .sacred-html-content h3 {
          color: #10b981 !important;
          font-size: 1.3rem !important;
          font-weight: bold !important;
          margin-bottom: 1rem !important;
          margin-top: 1.5rem !important;
        }
        .sacred-html-content h4 {
          color: #ffd700 !important;
          font-size: 1.1rem !important;
          font-weight: bold !important;
          margin-bottom: 0.8rem !important;
          margin-top: 1.2rem !important;
        }
        .sacred-html-content h5 {
          color: #8b5cf6 !important;
          font-size: 1rem !important;
          font-weight: bold !important;
          margin-bottom: 0.6rem !important;
          margin-top: 1rem !important;
        }
        .sacred-html-content h6 {
          color: #10b981 !important;
          font-size: 0.9rem !important;
          font-weight: bold !important;
          margin-bottom: 0.5rem !important;
          margin-top: 0.8rem !important;
        }
        .sacred-html-content p {
          margin-bottom: 1.5rem !important;
          text-align: justify !important;
          color: #ffffff !important;
          line-height: 1.8 !important;
        }
        .sacred-html-content div {
          color: #ffffff !important;
        }
        .sacred-html-content span {
          color: #ffffff !important;
        }
        .sacred-html-content strong, .sacred-html-content b {
          color: #ffd700 !important;
          font-weight: bold !important;
        }
        .sacred-html-content em, .sacred-html-content i {
          color: #8b5cf6 !important;
          font-style: italic !important;
        }
        .sacred-html-content ul, .sacred-html-content ol {
          margin-bottom: 1.5rem !important;
          padding-left: 2rem !important;
        }
        .sacred-html-content li {
          margin-bottom: 0.5rem !important;
          color: #ffffff !important;
        }
        .sacred-html-content blockquote {
          border-left: 4px solid #ffd700 !important;
          padding-left: 1rem !important;
          margin: 1.5rem 0 !important;
          font-style: italic !important;
          color: #ffffff !important;
        }
        .sacred-html-content code {
          background-color: rgba(255, 215, 0, 0.2) !important;
          padding: 0.2rem 0.4rem !important;
          border-radius: 4px !important;
          font-family: monospace !important;
          color: #ffffff !important;
        }
        .sacred-html-content pre {
          background-color: rgba(0, 0, 0, 0.3) !important;
          padding: 1rem !important;
          border-radius: 8px !important;
          overflow: auto !important;
          margin-bottom: 1.5rem !important;
          color: #ffffff !important;
        }
        .sacred-html-content a {
          color: #ffd700 !important;
          text-decoration: underline !important;
        }
        .sacred-html-content a:hover {
          color: #8b5cf6 !important;
        }
        .sacred-html-content table {
          border-collapse: collapse !important;
          width: 100% !important;
          margin-bottom: 1.5rem !important;
        }
        .sacred-html-content th {
          background-color: rgba(255, 215, 0, 0.2) !important;
          color: #ffd700 !important;
          font-weight: bold !important;
          padding: 0.5rem !important;
          border: 1px solid rgba(255, 215, 0, 0.3) !important;
        }
        .sacred-html-content td {
          color: #ffffff !important;
          padding: 0.5rem !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }
      `}</style>
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes bounce {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translateY(0);
          }
          40%,
          43% {
            transform: translateY(-10px);
          }
          70% {
            transform: translateY(-5px);
          }
          90% {
            transform: translateY(-2px);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes silkShimmer {
          0% {
            opacity: 0.3;
            transform: translateX(-10px);
          }
          50% {
            opacity: 0.8;
            transform: translateX(0px);
          }
          100% {
            opacity: 0.3;
            transform: translateX(10px);
          }
        }
        @keyframes vibrate {
          0%,
          100% {
            transform: translateX(0);
          }
          10% {
            transform: translateX(-1px);
          }
          20% {
            transform: translateX(1px);
          }
          30% {
            transform: translateX(-1px);
          }
          40% {
            transform: translateX(1px);
          }
          50% {
            transform: translateX(-0.5px);
          }
          60% {
            transform: translateX(0.5px);
          }
          70% {
            transform: translateX(-0.5px);
          }
          80% {
            transform: translateX(0.5px);
          }
          90% {
            transform: translateX(0);
          }
        }
        @keyframes glow {
          0% {
            text-shadow:
              0 0 8px rgba(255, 250, 205, 0.8),
              0 0 15px rgba(255, 255, 255, 0.4);
          }
          100% {
            text-shadow:
              0 0 12px rgba(255, 250, 205, 1),
              0 0 20px rgba(255, 255, 255, 0.6);
          }
        }
        @keyframes haloGlow {
          0%,
          100% {
            opacity: 0.6;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 0.9;
            transform: translateX(-50%) scale(1.1);
          }
        }
        @keyframes haloShimmer {
          0%,
          100% {
            opacity: 0.8;
            transform: translateX(-50%) rotateZ(0deg);
          }
          33% {
            opacity: 1;
            transform: translateX(-50%) rotateZ(2deg);
          }
          66% {
            opacity: 0.9;
            transform: translateX(-50%) rotateZ(-2deg);
          }
        }
        @keyframes fallingStar1 {
          0% {
            transform: translate(-200px, -100px) rotate(35deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(100vw + 200px), calc(100vh + 200px)) rotate(35deg);
            opacity: 0;
          }
        }
        @keyframes fallingStar2 {
          0% {
            transform: translate(10vw, -100px) rotate(42deg);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(110vw), calc(100vh + 150px)) rotate(42deg);
            opacity: 0;
          }
        }
        @keyframes fallingStar3 {
          0% {
            transform: translate(-150px, -80px) rotate(38deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(100vw + 150px), calc(100vh + 100px)) rotate(38deg);
            opacity: 0;
          }
        }
        @keyframes fallingStar4 {
          0% {
            transform: translate(25vw, -80px) rotate(45deg);
            opacity: 0;
          }
          6% {
            opacity: 1;
          }
          94% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(125vw), calc(100vh + 120px)) rotate(45deg);
            opacity: 0;
          }
        }
        @keyframes fallingStar5 {
          0% {
            transform: translate(15vw, -90px) rotate(40deg);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          88% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(115vw), calc(100vh + 130px)) rotate(40deg);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
