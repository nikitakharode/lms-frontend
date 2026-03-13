import { Link } from "react-router-dom";
import { Typography } from "antd";

export default function Footer() {
  return (
    <footer className="py-8 px-4 text-center border-t border-slate-200 bg-slate-50 mt-auto">
      <Link to="/" className="grad-text font-bold text-lg no-underline inline-block mb-2">EduVerse 🎓</Link>
      <Typography.Text type="secondary" className="text-xs">© {new Date().getFullYear()} EduVerse. All rights reserved.</Typography.Text>
    </footer>
  );
}
