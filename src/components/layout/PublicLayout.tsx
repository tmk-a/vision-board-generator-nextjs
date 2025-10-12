export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col bg-stone-50 min-h-screen">{children}</div>
    </>
  );
}
