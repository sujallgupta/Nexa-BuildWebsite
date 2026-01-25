const Footer = () => {
  return (
    <footer className="mt-24 border-t border-gray-800 py-4 text-center text-sm text-gray-400">
      <p>
        © {new Date().getFullYear()}{" "}
        <span >Nexa</span>. All rights reserved.
        <br/>
        <p>
          Version 2.2.0
        </p>
      </p>
    </footer>
  );
};

export default Footer;


