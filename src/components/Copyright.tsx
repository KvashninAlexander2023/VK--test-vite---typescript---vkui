import { Caption, Link } from "@vkontakte/vkui";

export default function Copyright() {
  return (
    <Caption>
      {'Авторские права © '}
      <Link color="inherit" href="https://vkui.io/">
        Ваш сайт
      </Link>{' '}
      {new Date().getFullYear()}.
    </Caption>
  );
}