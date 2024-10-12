"use client";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export function Banner() {
  const { user, error, isLoading } = useUser()

  const isLoggedIn = user !== undefined;
  const accountLabel = isLoggedIn ? "log out" : "log in";

  return (
    <header
      aria-label={`${accountLabel} button.`}
      className="flex gap-4 sm:gap-12 items-center p-4 sm:p-12"
    >
      <div className="dark:text-tangerine-100 hover:font-bold rounded-md p-1">
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
