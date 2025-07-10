interface FriendLink {
  name: string;
  url: string;
}

export const Footer = () => {
  const friendLinks: FriendLink[] = [
    { name: "ShowMeBestAI", url: "https://www.showmebest.ai" },
    { name: "Twelve Tools", url: "https://twelve.tools" },
    { name: "Startup Fame", url: "https://startupfa.me/s/hicolors?utm_source=hicolors.org" },
  ];

  return (
    <footer className="bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Friend Links</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-6 max-w-4xl mx-auto">
            {friendLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-2 py-1">
                {link.name}
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-500">© 2024 HiColors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
