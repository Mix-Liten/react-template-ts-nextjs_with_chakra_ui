import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import InfoLayout from '@/layouts/InfoLayout'

const About: NextPageWithLayout = () => {
  return <h1>About</h1>
}

About.getLayout = function getLayout(page: ReactElement) {
  return <InfoLayout>{page}</InfoLayout>
}

export default About
