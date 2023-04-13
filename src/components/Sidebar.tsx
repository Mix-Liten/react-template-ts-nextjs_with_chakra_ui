import { AtSignIcon, CalendarIcon, EditIcon } from '@chakra-ui/icons'
import { List, ListIcon, ListItem } from '@chakra-ui/react'
import Link from 'next/link'

export const mainNavLinks = [
  {
    icon: CalendarIcon,
    href: '/',
    label: 'Home',
  },
  {
    icon: EditIcon,
    href: '/about',
    label: 'About',
  },
  {
    icon: AtSignIcon,
    href: '/store',
    label: 'Store',
  },
]

export default function Sidebar() {
  return (
    <List color="orange.900" fontSize="1.2em" spacing={4}>
      {mainNavLinks.map(navLink => (
        <ListItem key={navLink.label}>
          <Link href={navLink.href}>
            <ListIcon as={navLink.icon} />
            {navLink.label}
          </Link>
        </ListItem>
      ))}
    </List>
  )
}
