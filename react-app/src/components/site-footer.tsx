export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-muted/30 py-8 text-center text-sm text-muted-foreground">
      <div className="mx-auto max-w-6xl px-4">
        <p>&copy; {new Date().getFullYear()} Elton. All rights reserved.</p>
      </div>
    </footer>
  );
}
