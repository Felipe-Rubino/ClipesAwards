export default function ClipeItem({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="rounded-lg border p-4 bg-card shadow-sm dark:bg-card-dark dark:border-card-dark-border">
      {children}
    </div>
  );
}
