import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "Access organized notes, chapters, PDFs, and resources for CSIT students on mycsitpath.", 
  keywords = "csit notes, bsc csit, tu notes, computer science, nepal csit, semester notes, past questions, mycsitpath",
  url = window.location.href,
  image = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
}) => {
  
  useEffect(() => {
    // Update Document Title
    const siteTitle = "mycsitpath";
    document.title = title === "Home" ? siteTitle : `${title} | ${siteTitle}`;

    // Helper function to update or create meta tags
    const updateMeta = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        // Extract name or property from selector for creation
        const [attr, name] = selector.replace('meta[', '').replace(']', '').split('=');
        element.setAttribute(attr, name.replace(/"/g, ''));
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // Standard Meta Tags
    updateMeta('meta[name="description"]', 'content', description);
    updateMeta('meta[name="keywords"]', 'content', keywords);

    // Open Graph / Facebook
    updateMeta('meta[property="og:type"]', 'content', 'website');
    updateMeta('meta[property="og:title"]', 'content', title);
    updateMeta('meta[property="og:description"]', 'content', description);
    updateMeta('meta[property="og:url"]', 'content', url);
    updateMeta('meta[property="og:image"]', 'content', image);

    // Twitter
    updateMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    updateMeta('meta[name="twitter:title"]', 'content', title);
    updateMeta('meta[name="twitter:description"]', 'content', description);
    updateMeta('meta[name="twitter:image"]', 'content', image);

  }, [title, description, keywords, url, image]);

  return null;
};
