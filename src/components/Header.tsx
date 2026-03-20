
import { FixedLayout, Flex, Title } from "@vkontakte/vkui";
import { useColorSchemeSwitcher } from "../ColorSchemeSwitcher";
import { NavLink } from "react-router-dom";
import styles from '../App.module.css'




export default function Header() {

  const [theme, colorSchemeSwitcher] = useColorSchemeSwitcher()


  const getNavLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  textDecoration: isActive ? 'underline' : 'none',
  color: isActive ? 'var(--vkui--color_text_accent)' : 'inherit'
})

  return (
    <FixedLayout vertical="top" style={{}}>
      <Flex justify="space-between" align="center" className={styles.header} style={{paddingLeft:50, paddingRight:40}}>
        <Flex align="center" gap={8}>
          <Title level="2" Component="div">
            <NavLink to={'/'} style={getNavLinkStyle}>PoiskKino</NavLink>
          </Title>
        </Flex>
        <Flex align="center" gap={20}>
          <Title level="2" Component="div">
            <NavLink to={'/compare'} style={getNavLinkStyle}>Сравнить фильмы</NavLink>
          </Title>
          <Title level="2" Component="div">
            <NavLink to={'/favorites'} style={getNavLinkStyle}>Избранное</NavLink>
          </Title>
          {colorSchemeSwitcher}
        </Flex>
      </Flex>
    </FixedLayout>
  )
}