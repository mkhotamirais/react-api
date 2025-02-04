import React from "react";
import Logo from "./Logo";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-16 sticky top-0 bg-white shadow-md">
        <div className="container flex items-center justify-between">
          <Logo />
          <nav className="flex gap-4">
            <a href="https://github.com/mkhotamirais" title="github account">
              <SiGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/mkhotami-rais/" title="linkedin account">
              <SiLinkedin size={20} />
            </a>
          </nav>
        </div>
      </header>
      <main className="container grow py-4">{children}</main>
      <footer className="h-16 border-t border-gray-200">
        <div className="container flex items-center justify-center">
          <p>
            Build by <a href="https://mkhotami.vercel.app">Mkhotami</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
