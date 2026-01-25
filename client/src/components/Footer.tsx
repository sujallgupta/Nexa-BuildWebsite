const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-800 py-2 text-center text-sm text-gray-400">
      <p>
        © {new Date().getFullYear()} <span>Nexa</span>. All rights reserved.
        <br />
        <div className="flex flex-col items-center pt-1">
          <p className="text-sm text-gray-400 tracking-wide">
            Version <span className="text-gray-300 font-medium">2.2.0</span>
          </p>
        </div>
      </p>
    </footer>
  );
};

export default Footer;
