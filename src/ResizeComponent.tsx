import useOn from './use-on';

export default function ResizeComponent() {
  useOn()
    .who(window)
    .when('resize')
    .what(() => {
      console.log('resize!');
    });

  return null;
}
