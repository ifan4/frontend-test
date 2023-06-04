
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="px-10 lg:px-0">
        {children}
    </div>
  )
}
