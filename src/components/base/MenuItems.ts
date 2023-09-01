export type MenuItems = {
  title: string
  group?: boolean
  icon?: {
    name: string
  }
  link?: {
    href: string
  }
  children?: MenuItems[]
  type?: string
}

export const menuItems: MenuItems[] = [
  {
    title: '대시보드',
    icon: { name: 'bx bx-grid-alt' },
    link: { href: '/' },
  },
  {
    title: '지갑관리',
    icon: { name: 'bx bx-book-alt' },
    link: { href: '/account' },
  },
  // {
  //   title: '프로젝트',
  //   icon: { name: 'bx bx-grid-alt' },
  //   link: { href: '/project' },
  // },

  {
    title: '날씨',
    icon: { name: 'bx bx-compass' },
    link: { href: '/weather' },
  },

  // {
  //   title: '컴포넌트',
  //   icon: { name: 'bx bx-grid-alt' },
  //   link: { href: '/component' },
  // },

  // {
  //   title: "board",
  //   icon: { name: "bx bx-compass" },
  //   children: [
  //     {
  //       title: "notice",
  //       link: { href: "/notice" },
  //     },
  //     {
  //       title: "cording",
  //       link: { href: "/cording" },
  //     },
  //     {
  //       title: "daily",
  //       link: { href: "/daily" },
  //     },
  //   ],
  // },
  // {
  //   title: "category",
  //   icon: { name: '"bx bx-collection' },
  //   children: [
  //     {
  //       title: "HTML & CSS",
  //       link: { href: "/notice" },
  //     },
  //     {
  //       title: "JavaScript",
  //       link: { href: "/cording" },
  //     },
  //     {
  //       title: "PHP & MySQL",
  //       link: { href: "/daily" },
  //     },
  //   ],
  // },

  // {
  //   title: 'Extra Components',
  //   icon: { name: 'star-outline' },
  //   children: [
  //     {
  //       title: 'Accordion',
  //       link: { href: '/extra-components/accordion' }
  //     },
  //     {
  //       title: 'Actions',
  //       link: { href: '/extra-components/actions' }
  //     },
  //     {
  //       title: 'Alert',
  //       link: { href: '/extra-components/alert' }
  //     },
  //     {
  //       title: 'List',
  //       link: { href: '/extra-components/list' }
  //     },
  //     {
  //       title: 'Spinner',
  //       link: { href: '/extra-components/spinner' }
  //     },
  //     {
  //       title: 'Progress Bar',
  //       link: { href: '/extra-components/progress' }
  //     },
  //     {
  //       title: 'Tabs',
  //       link: { href: '/extra-components/tabs' }
  //     },
  //     {
  //       title: 'Chat',
  //       link: { href: '/extra-components/chat' }
  //     },
  //     {
  //       title: 'Cards',
  //       link: { href: '/extra-components/cards' }
  //     },
  //     {
  //       title: 'Flip Card',
  //       link: { href: '/extra-components/flip-card' }
  //     },
  //     {
  //       title: 'Reveal Card',
  //       link: { href: '/extra-components/reveal-card' }
  //     }
  //   ]
  // }
]
