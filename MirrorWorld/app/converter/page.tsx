"use client";

import { useState } from "react";

export default function SacredConverter() {
  const [bookTitle, setBookTitle] = useState("");
  const [bookContent, setBookContent] = useState("");
  const [convertedHTML, setConvertedHTML] = useState("");
  const [chapters, setChapters] = useState<
    Array<{ title: string; content: string }>
  >([]);

  const convertToHTML = () => {
    if (!bookContent.trim()) return;

    // Split content into chapters (assuming chapter markers like "Chapter 1:", "Chapter:", etc.)
    const chapterRegex = /(Chapter\s*\d*:?\s*[^\n]*\n)/gi;
    const sections = bookContent.split(chapterRegex);

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${bookTitle || "Sacred Text"} - The Mirrorist World</title>
    <style>
        :root {
            --cosmic-gold: #ffd700;
            --cosmic-purple: #8b5cf6;
            --cosmic-deep: #0f0f23;
            --cosmic-light: #f1f5f9;
            --mirror-silver: #c0c0c0;
        }
        
        body {
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, var(--cosmic-deep) 0%, #1a1a2e 100%);
            color: var(--cosmic-light);
            line-height: 1.8;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        
        .sacred-container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(15, 15, 35, 0.9);
            border: 1px solid var(--cosmic-gold);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
        }
        
        .sacred-title {
            font-size: 2.5em;
            text-align: center;
            margin-bottom: 30px;
            background: linear-gradient(135deg, var(--cosmic-gold) 0%, var(--cosmic-purple) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
        }
        
        .sacred-author {
            text-align: center;
            font-size: 1.2em;
            color: var(--mirror-silver);
            margin-bottom: 40px;
            font-style: italic;
        }
        
        .chapter-title {
            font-size: 1.8em;
            color: var(--cosmic-gold);
            margin: 40px 0 20px 0;
            text-align: center;
            border-bottom: 2px solid var(--cosmic-purple);
            padding-bottom: 10px;
        }
        
        .sacred-paragraph {
            margin-bottom: 20px;
            font-size: 1.1em;
            text-align: justify;
            text-indent: 30px;
        }
        
        .sacred-quote {
            font-style: italic;
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background: rgba(139, 92, 246, 0.1);
            border-left: 4px solid var(--cosmic-purple);
            border-radius: 10px;
        }
        
        .navigation {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(15, 15, 35, 0.9);
            border: 1px solid var(--cosmic-gold);
            border-radius: 10px;
            padding: 10px;
            max-height: 70vh;
            overflow-y: auto;
            min-width: 200px;
        }
        
        .nav-item {
            display: block;
            color: var(--cosmic-light);
            text-decoration: none;
            padding: 8px;
            margin: 4px 0;
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        
        .nav-item:hover {
            background: var(--cosmic-purple);
            color: white;
        }
        
        @media (max-width: 768px) {
            .navigation {
                position: relative;
                top: 0;
                right: 0;
                margin-bottom: 20px;
                width: 100%;
            }
            
            .sacred-container {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="sacred-container">
        <h1 class="sacred-title">${bookTitle || "Sacred Wisdom"}</h1>
        <p class="sacred-author">By The Silkcaller • A Mirror of Infinite Truth</p>
        
        <div class="navigation">
            <h3 style="color: var(--cosmic-gold); margin-top: 0;">Sacred Navigation</h3>
`;

    // Process chapters
    const processedChapters = [];
    for (let i = 1; i < sections.length; i += 2) {
      const chapterTitle =
        sections[i]?.trim() || `Chapter ${Math.floor(i / 2) + 1}`;
      const chapterContent = sections[i + 1]?.trim() || "";

      if (chapterContent) {
        processedChapters.push({
          title: chapterTitle,
          content: chapterContent,
        });
        html += `            <a href="#chapter${Math.floor(i / 2) + 1}" class="nav-item">${chapterTitle}</a>\n`;
      }
    }

    // If no chapters found, treat as single text
    if (processedChapters.length === 0) {
      processedChapters.push({ title: "Sacred Text", content: bookContent });
      html += `            <a href="#chapter1" class="nav-item">Sacred Text</a>\n`;
    }

    html += `        </div>\n\n`;

    // Add chapter content
    processedChapters.forEach((chapter, index) => {
      html += `        <div id="chapter${index + 1}">\n`;
      html += `            <h2 class="chapter-title">${chapter.title}</h2>\n`;

      // Split content into paragraphs
      const paragraphs = chapter.content.split("\n\n").filter((p) => p.trim());

      paragraphs.forEach((paragraph) => {
        const trimmed = paragraph.trim();
        if (trimmed) {
          // Check if it's a quote (starts with quote marks or is short and impactful)
          if (
            trimmed.startsWith('"') ||
            (trimmed.length < 100 && trimmed.split(" ").length < 15)
          ) {
            html += `            <div class="sacred-quote">${trimmed}</div>\n`;
          } else {
            html += `            <p class="sacred-paragraph">${trimmed}</p>\n`;
          }
        }
      });

      html += `        </div>\n\n`;
    });

    html += `    </div>
    
    <script>
        // Smooth scrolling for navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(item.getAttribute('href'));
                target.scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        // Add some cosmic sparkle effects
        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.width = '2px';
            sparkle.style.height = '2px';
            sparkle.style.background = '#ffd700';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.animation = 'sparkle 3s ease-out forwards';
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 3000);
        }
        
        // Add sparkles periodically
        setInterval(createSparkle, 2000);
        
        // CSS for sparkle animation
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes sparkle {
                0% { opacity: 0; transform: scale(0); }
                50% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0); }
            }
        \`;
        document.head.appendChild(style);
    </script>
</body>
</html>`;

    setConvertedHTML(html);
    setChapters(processedChapters);
  };

  const downloadHTML = () => {
    const blob = new Blob([convertedHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${bookTitle || "sacred-text"}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-cosmic-deep text-cosmic-light p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cosmic-gold to-cosmic-purple bg-clip-text text-transparent">
            Sacred Text Converter
          </h1>
          <p className="text-xl text-cosmic-light/80">
            Transform your divine wisdom into beautiful HTML for The Mirrorist
            World
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="cosmic-card p-8">
            <h2 className="text-2xl font-bold text-cosmic-gold mb-6">
              📖 Sacred Input
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-cosmic-light/80 mb-2">
                  Book Title
                </label>
                <input
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="Enter your sacred book title..."
                  className="w-full p-4 bg-cosmic-dark/50 border border-cosmic-gold/30 rounded-lg text-cosmic-light placeholder-cosmic-light/50 focus:outline-none focus:ring-2 focus:ring-cosmic-gold"
                />
              </div>

              <div>
                <label className="block text-cosmic-light/80 mb-2">
                  Sacred Content
                </label>
                <textarea
                  value={bookContent}
                  onChange={(e) => setBookContent(e.target.value)}
                  placeholder="Paste your entire book content here... Use 'Chapter 1:', 'Chapter 2:' etc. to mark chapters"
                  className="w-full h-96 p-4 bg-cosmic-dark/50 border border-cosmic-gold/30 rounded-lg text-cosmic-light placeholder-cosmic-light/50 focus:outline-none focus:ring-2 focus:ring-cosmic-gold resize-none"
                />
              </div>

              <button
                onClick={convertToHTML}
                className="w-full cosmic-button text-lg py-4"
              >
                ✨ Convert to Sacred HTML
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="cosmic-card p-8">
            <h2 className="text-2xl font-bold text-cosmic-gold mb-6">
              🌟 HTML Output
            </h2>

            {convertedHTML ? (
              <div className="space-y-6">
                <div className="bg-cosmic-dark/30 p-4 rounded-lg border border-cosmic-purple/30">
                  <h3 className="text-cosmic-purple font-semibold mb-2">
                    Book Preview:
                  </h3>
                  <p className="text-cosmic-light/80">
                    Title: {bookTitle || "Sacred Wisdom"}
                  </p>
                  <p className="text-cosmic-light/80">
                    Chapters: {chapters.length}
                  </p>
                  <p className="text-cosmic-light/80">
                    HTML Size: {(convertedHTML.length / 1024).toFixed(1)} KB
                  </p>
                </div>

                <div className="bg-cosmic-dark/30 p-4 rounded-lg border border-cosmic-gold/30 max-h-64 overflow-y-auto">
                  <h3 className="text-cosmic-gold font-semibold mb-2">
                    HTML Code Preview:
                  </h3>
                  <pre className="text-xs text-cosmic-light/70 whitespace-pre-wrap">
                    {convertedHTML.slice(0, 1000)}...
                  </pre>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={downloadHTML}
                    className="flex-1 cosmic-button"
                  >
                    📥 Download HTML
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(convertedHTML);
                      alert("HTML copied to clipboard!");
                    }}
                    className="flex-1 cosmic-button-alt"
                  >
                    📋 Copy HTML
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-cosmic-light/50 py-20">
                <p>Enter your sacred text and convert to see the HTML output</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="/" className="cosmic-button-alt inline-block">
            🪞 Return to Mirrorist World
          </a>
        </div>
      </div>
    </div>
  );
}
