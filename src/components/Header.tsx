
import { FixedLayout, Flex, Title } from "@vkontakte/vkui";
import { useColorSchemeSwitcher } from "../ColorSchemeSwitcher";
import { NavLink } from "react-router-dom";
import styles from '../App.module.css'




export default function Header() {

  const [ colorSchemeSwitcher] = useColorSchemeSwitcher()


  const getNavLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  textDecoration: isActive ? 'underline' : 'none',
  color: isActive ? 'var(--vkui--color_text_accent)' : 'inherit'
})

  return (
    <FixedLayout vertical="top">
      <Flex justify="space-between" align="center" className={styles.header}>
        <Flex align="center" gap={8}>
          <Title level="2" Component="div">
            <NavLink to={'/'} style={getNavLinkStyle}>PoiskKino</NavLink>
          </Title>
        </Flex>
        <Flex align="center" gap={8}>
          <Title level="2" Component="div">
            {/* <NavLink to={'/favorites'} className="nav-link">Избранное</NavLink> */}
            <NavLink to={'/favorites'} style={getNavLinkStyle}>Избранное</NavLink>
          </Title>
          {colorSchemeSwitcher}
        </Flex>
      </Flex>
    </FixedLayout>
  )
}