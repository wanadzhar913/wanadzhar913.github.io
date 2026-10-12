import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { RESUME_URL } from '../constants/site';

const navLinks = [
  { to: '/', label: 'Home', match: (p: string) => p === '/' },
  { to: '/blog', label: 'Blog', match: (p: string) => p === '/blog' || p.startsWith('/blog/') },
  { to: '/projects', label: 'Projects', match: (p: string) => p === '/projects' },
  { to: '/opensource', label: 'OSS', match: (p: string) => p === '/opensource' },
  { to: '/talks', label: 'Talks', match: (p: string) => p === '/talks' },
  { to: '/publications', label: 'Papers', match: (p: string) => p === '/publications' },
] as const;

const linkClass = (active: boolean) =>
  `text-[13px] transition-colors ${
    active
      ? 'text-gray-900 dark:text-gray-100'
      : 'text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200'
  }`;

export function Navigation() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="py-10">
      <div className="mx-auto max-w-2xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <Link
            to="/"
            className="font-serif text-xl text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            faiq
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
            {navLinks.map(({ to, label, match }) => (
              <Link key={to} to={to} className={linkClass(match(pathname))}>
                {label}
              </Link>
            ))}
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={linkClass(false)}>
              Resume
            </a>
            <button
              onClick={toggleTheme}
              className="p-1 text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
