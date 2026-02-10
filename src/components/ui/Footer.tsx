import { personalInfo } from "~/data/personal";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 py-8 px-4 md:px-6">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {personalInfo.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {social.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
