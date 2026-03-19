import { Icon24LightbulbOutline } from "@vkontakte/icons";
import { Headline, Link } from "@vkontakte/vkui";
import styles from '../App.module.css';


export default function ProTip() {
  return (
    <Headline inline>
      <Icon24LightbulbOutline className={styles.tipIcon} />
      {'Совет: посмотрите другие '}
      <Link href="https://github.com/VKCOM/VKUI/tree/master/examples">шаблоны</Link>
      {' в документации VKUI.'}
    </Headline>
  );
}