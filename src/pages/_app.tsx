import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import RootLayout from '@/layouts/RootLayout'
import '@/styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  // const getLayout = Component.getLayout ?? (page => page)
  const getLayout = Component.getLayout ? Component.getLayout : (page: ReactElement) => <RootLayout>{page}</RootLayout>

  return <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
}
