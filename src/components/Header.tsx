
import { FixedLayout, Flex, Title } from "@vkontakte/vkui";
import { useColorSchemeSwitcher } from "./ColorSchemeSwitcher";
import { NavLink, useLocation } from "react-router-dom";
import styles from '../App.module.css'
import { useUnit } from "effector-react";
import { $filters } from "../common/model/filtersStore";
import { revertToQuery } from "../common/utilites/revertToQuery";




export default function Header() {

  const [_, colorSchemeSwitcher] = useColorSchemeSwitcher()

  const location = useLocation()
  const filters = useUnit($filters)

  const queryFromFilters = revertToQuery(filters)

  const queryFromUrl = location.search

  const to = queryFromFilters ? `/?${queryFromFilters}` : '/'

  const getNavLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: isActive ? 'underline' : 'none',
    color: isActive ? 'var(--vkui--color_text_accent)' : 'inherit'
  })

  return (
    <FixedLayout vertical="top" style={{ zIndex: 20, backdropFilter: 'blur(8px)', paddingTop: 10, paddingBottom: 10 }}>
      <Flex justify="space-between" align="center" className={styles.header} style={{ paddingLeft: 50, paddingRight: 40 }}>
        <Flex align="center" gap={8}>
          <Title level="2" Component="div">
            <NavLink to={to}
              style={getNavLinkStyle}>YoFilms</NavLink>
          </Title>
        </Flex>
        <Flex align="center" gap={50}>
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