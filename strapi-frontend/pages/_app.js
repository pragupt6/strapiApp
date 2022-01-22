import '@/styles/globals.css'
import '@/styles/bootstrap.min.css'
import Header from '../components/Header'
import { AuthProvider } from '@/context/AuthContext'
function MyApp({ Component, pageProps }) {
  return <AuthProvider>
    {/* <Header /> */}
    <Component {...pageProps} />
  </AuthProvider>
}

export default MyApp
