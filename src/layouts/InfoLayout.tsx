import { ReactNode } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import Header from '@/components/Header'

type InfoLayoutProps = {
  children: ReactNode
}

export default function InfoLayout({ children }: InfoLayoutProps) {
  return (
    <>
      <Header />
      <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
        <GridItem
          as="main"
          colSpan={{ base: 6 }}
          bg="yellow.50"
          p="40px"
          minH={{ base: 'calc(100vh - 4.5rem)' }}
        >
          {children}
        </GridItem>
      </Grid>
    </>
  )
}
