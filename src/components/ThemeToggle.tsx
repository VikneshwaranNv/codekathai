import { useEffect } from 'react';

/**
 * Permanently enforces Light Mode across the entire Code Kathai application.
 * Removes the 'dark' CSS class from HTML document and clears stored theme preferences.
 */
export default function ThemeToggle() {
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('ck-theme');
  }, []);

  return null;
}
