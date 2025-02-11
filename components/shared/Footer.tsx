const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 border-gray-300 border-t">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {currentYear} Your Marketplace. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
