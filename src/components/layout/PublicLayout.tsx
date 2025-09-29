export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex bg-stone-50 min-h-screen p-4">{children}</div>
    </>
  );
}
