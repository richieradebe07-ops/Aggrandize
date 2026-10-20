import { ViewTransition } from "react";

// `template.jsx` (unlike `layout.jsx`) re-renders on every navigation, which
// is what lets its enter/exit animations actually fire — see Next's own
// "Designing view transitions" guide. No `name`/`enter`/`exit` props: an
// unnamed ViewTransition with no overrides just gets the browser's own
// default cross-fade between the old and new page, which is exactly the
// "progressive enhancement" ask here — zero custom CSS needed, and on a
// browser without View Transitions API support (or with
// prefers-reduced-motion, handled in globals.css) navigation behaves
// exactly as it always did. The header/footer live in layout.jsx, outside
// this wrapper, so they never re-animate.
export default function RootTemplate({ children }) {
  return <ViewTransition>{children}</ViewTransition>;
}
