import './globals.css'

export const metadata = {
  title: 'Sistema de Tesis UAP',
  description: 'Sistema de seguimiento de avances de tesis - Universidad Autónoma del Perú',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
