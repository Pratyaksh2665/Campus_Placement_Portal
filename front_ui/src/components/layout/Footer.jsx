const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <h2 className="text-xl font-bold">JobPortal</h2>

        {/* Copyright */}
        <p className="text-sm text-gray-400">
          © 2026 JobPortal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
