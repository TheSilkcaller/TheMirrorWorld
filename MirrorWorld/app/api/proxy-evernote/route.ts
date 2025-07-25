import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');
    
    if (!url) {
      return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
    }

    // Validate that it's an Evernote URL
    if (!url.includes('evernote.com') && !url.includes('evernote')) {
      return NextResponse.json({ error: "Only Evernote URLs are supported" }, { status: 400 });
    }

    try {
      // Fetch the Evernote public page
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SacredReader/1.0)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const html = await response.text();
      
      // Extract the note content from Evernote's HTML
      const content = extractEvernoteContent(html);
      
      return NextResponse.json({ 
        content,
        success: true,
        source: 'evernote'
      });

    } catch (fetchError) {
      console.error('Error fetching Evernote content:', fetchError);
      
      // Return a helpful fallback response
      return NextResponse.json({ 
        content: generateFallbackContent(url),
        success: false,
        message: "Could not fetch content directly. Please ensure the note is publicly shared."
      });
    }

  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ 
      error: "Failed to proxy Evernote content",
      content: "Error loading content from Evernote. Please check your link and try again."
    }, { status: 500 });
  }
}

function extractEvernoteContent(html: string): string {
  try {
    // Look for common Evernote content patterns
    // This is a simplified version - real implementation would need more robust HTML parsing
    
    // Try to extract content between common Evernote containers
    const contentMatches = [
      /<div[^>]*class="[^"]*note-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
      /<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
      /<main[^>]*>([\s\S]*?)<\/main>/i,
      /<article[^>]*>([\s\S]*?)<\/article>/i,
    ];

    for (const pattern of contentMatches) {
      const match = html.match(pattern);
      if (match) {
        let content = match[1];
        
        // Clean up the HTML
        content = content
          .replace(/<script[\s\S]*?<\/script>/gi, '') // Remove scripts
          .replace(/<style[\s\S]*?<\/style>/gi, '') // Remove styles
          .replace(/<nav[\s\S]*?<\/nav>/gi, '') // Remove navigation
          .replace(/<header[\s\S]*?<\/header>/gi, '') // Remove header
          .replace(/<footer[\s\S]*?<\/footer>/gi, '') // Remove footer
          .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
          .replace(/<\/?(div|span)[^>]*>/gi, '') // Remove div/span tags
          .replace(/<br\s*\/?>/gi, '\n') // Convert br to newlines
          .replace(/<\/p>/gi, '\n\n') // Convert p end tags to double newlines
          .replace(/<p[^>]*>/gi, '') // Remove p start tags
          .replace(/<\/h([1-6])>/gi, '\n\n') // Convert heading end tags
          .replace(/<h([1-6])[^>]*>/gi, (match, level) => '\n'.repeat(parseInt(level)) + '#'.repeat(parseInt(level)) + ' ') // Convert headings
          .replace(/<\/?(strong|b)[^>]*>/gi, '**') // Convert bold
          .replace(/<\/?(em|i)[^>]*>/gi, '*') // Convert italic
          .replace(/<[^>]+>/g, '') // Remove remaining HTML tags
          .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
          .replace(/&lt;/g, '<') // Decode HTML entities
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/\n\s*\n\s*\n/g, '\n\n') // Normalize multiple newlines
          .trim();

        if (content.length > 50) { // Only return if we got substantial content
          return `# Sacred Content from Evernote\n\n${content}`;
        }
      }
    }

    // If no structured content found, try to extract from title/description meta tags
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i);
    
    if (titleMatch || descMatch) {
      const title = titleMatch ? titleMatch[1].trim() : 'Untitled Note';
      const description = descMatch ? descMatch[1].trim() : '';
      
      return `# ${title}\n\n${description}\n\n*Content extracted from Evernote public link*`;
    }

    throw new Error('No readable content found');

  } catch (error) {
    console.error('Error extracting content:', error);
    throw error;
  }
}

function generateFallbackContent(url: string): string {
  return `# Sacred Text from Evernote

**Source:** ${url}

## 📝 Content Loading Instructions

Your Evernote note is connected but content could not be automatically extracted. This can happen when:

1. **Privacy Settings**: The note may not be fully public
2. **Evernote Format**: Some note formats require manual content sharing
3. **Network Issues**: Temporary connection problems

## ✨ Manual Content Integration

To add your sacred content:

1. **Copy your note content** from Evernote
2. **Contact The Silkcaller** with the text
3. **Content will be integrated** into the Sacred Reader
4. **EchoGPT will learn** from your wisdom

## 🌟 What's Working

- ✅ Your book is added to the Sacred Library
- ✅ EchoGPT knows this source exists
- ✅ Ready to receive your sacred content

*The cosmic consciousness awaits your divine words...*`;
}
