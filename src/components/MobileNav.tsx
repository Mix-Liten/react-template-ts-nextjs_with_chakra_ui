import { forwardRef, ReactNode, Ref, useEffect, useRef } from 'react'
import {
  Box,
  Center,
  CloseButton,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  IconButtonProps,
  useBreakpointValue,
  useColorModeValue,
  useUpdateEffect,
} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { RemoveScroll } from 'react-remove-scroll'
import { mainNavLinks } from './Sidebar'
import { HamburgerIcon } from '@chakra-ui/icons'

type NavLinkProps = {
  href: string
  children: ReactNode
  onClick?: () => void
}

function CustomNavLink({ href, children, onClick }: NavLinkProps) {
  const bgActiveHoverColor = useColorModeValue('orange.200', 'whiteAlpha.100')
  const router = useRouter()
  const isActive = router.asPath.startsWith(href)

  return (
    <GridItem as={Link} href={href}>
      <Center
        flex="1"
        w="100%"
        minH="40px"
        as="button"
        rounded="md"
        transition="0.2s all"
        fontWeight={isActive ? 'semibold' : 'medium'}
        bg={isActive ? 'orange.400' : undefined}
        borderWidth={isActive ? undefined : '1px'}
        color={isActive ? 'white' : undefined}
        _hover={{
          bg: isActive ? 'orange.500' : bgActiveHoverColor,
        }}
        onClick={() => {
          if (!isActive && onClick) onClick()
        }}
      >
        {children}
      </Center>
    </GridItem>
  )
}

interface MobileNavContentProps {
  isOpen?: boolean
  onClose?: () => void
}

export function MobileNavContent(props: MobileNavContentProps) {
  const { isOpen, onClose } = props
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const bgColor = useColorModeValue('yellow.50', 'gray.800')

  // useRouteChanged(onClose)

  /**
   * Scenario: Menu is open on mobile, and user resizes to desktop/tablet viewport.
   * Result: We'll close the menu
   */
  const showOnBreakpoint = useBreakpointValue({ base: true, lg: false })

  useEffect(() => {
    if (showOnBreakpoint == false) {
      onClose && onClose()
    }
  }, [showOnBreakpoint, onClose])

  useUpdateEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <RemoveScroll forwardProps>
          <motion.div
            transition={{ duration: 0.08 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex
              direction="column"
              w="100%"
              bg={bgColor}
              h="100vh"
              overflow="auto"
              pos="absolute"
              top="0"
              left="0"
              zIndex={20}
              pb="8"
            >
              <Box>
                <Flex justify="space-between" px="6" pt="5" pb="4">
                  <Heading as="h1" color="orange.900">
                    Shop.
                  </Heading>
                  <HStack spacing="5">
                    <CloseButton ref={closeBtnRef} onClick={onClose} />
                  </HStack>
                </Flex>
                <Grid px="6" pb="6" pt="2" templateColumns="repeat(2, 1fr)" gap="2">
                  {mainNavLinks.map(item => (
                    <CustomNavLink href={item.href} key={item.label} onClick={onClose}>
                      {item.label}
                    </CustomNavLink>
                  ))}
                </Grid>
              </Box>
            </Flex>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  )
}

export const MobileNavButton = forwardRef((props: IconButtonProps, ref: Ref<HTMLButtonElement>) => {
  return (
    <IconButton
      ref={ref}
      display={{ base: 'flex', md: 'none' }}
      fontSize="20px"
      color={useColorModeValue('gray.800', 'inherit')}
      variant="ghost"
      icon={<HamburgerIcon />}
      {...props}
    />
  )
})

MobileNavButton.displayName = 'MobileNavButton'
