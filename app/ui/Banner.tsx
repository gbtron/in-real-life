"use client";
import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export function Banner() {
  const { user, error, isLoading } = useUser();
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme == "dark";
  const isLoggedIn = user !== undefined;

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };
  const themeIcon = isDarkMode ? <FaSun /> : <FaMoon />;
  const themeLabel = isDarkMode ? "Sun icon" : "Moon icon";
  const accountLabel = isLoggedIn ? "log out" : "log in";

  return (
    <header
      aria-label={`${themeLabel} and ${accountLabel} buttons.`}
      className="flex gap-4 sm:gap-12 items-center p-4 sm:p-12"
    >
      <button
        className="dark:hover:bg-brown-900 hover:bg-tangerine-200 rounded-xl p-1.5"
        onClick={toggleDarkMode}
      >
        {themeIcon}
      </button>
      <div>
        {isLoggedIn ? (
          !isLoading &&
          !error && (
            <div className="flex items-center gap-4">
              <Link
                className="hover:bg-tangerine-200 dark:hover:bg-brown-900 rounded-md p-2"
                href="/account"
              >
                <FaUserCircle />
              </Link>
              <a
                className="font-bold hover:bg-tangerine-200 dark:hover:bg-brown-900 rounded-md p-2"
                href="/api/auth/logout"
              >
                Log Out
              </a>
            </div>
          )
        ) : (
          <a
            className="font-bold hover:bg-tangerine-200 dark:hover:bg-brown-900 rounded-md p-2"
            href="/api/auth/login"
          >
            Log In
          </a>
        )}
      </div>
    </header>
  );
}
