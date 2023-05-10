import { AuthProvider } from '@/contexts/Auth'
import './globals.css'
import { ApiProvider } from '@/contexts/Api'

export const metadata = {
  title: 'Bike Mobi',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <ApiProvider>
      <AuthProvider>
        <html lang="pt">
          <head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"/>
            {/* font-family: 'DM Sans', sans-serif;
            font-family: 'Roboto', sans-serif; */}
          </head>
          <body>{children}</body>
        </html>
      </AuthProvider>
    </ApiProvider>
  )
}
