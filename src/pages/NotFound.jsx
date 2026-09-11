import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function NotFound() { return <main><section className="not-found"><span className="eyebrow">404 · Page not found</span><h1>That page took a little detour.</h1><p>Let’s bring you back to the Sashwari ritual.</p><Link className="button button-primary" to="/"><ArrowLeft size={17} /> Back home</Link></section></main>; }
