import { FixedLayout, Footer } from "@vkontakte/vkui";
import Copyright from "./Copyright";


export default function FooterWithLayout() {

  return (
    <FixedLayout vertical="bottom">
      <Footer>
        <Copyright />
      </Footer>
    </FixedLayout>
  )
}