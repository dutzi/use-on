# use-on

This repo demonstrates some React weirdness.

I was trying to implment a hook that allows me to do the following:

```js
useOn()
  .who(window)
  .when('resize')
  .what(() => {
    console.log('resize!');
  });
```

Don't ask why. I just thought it was pretty.

Turns out you can, but using the approach I came up with, it only works in production.

Can you tell why?

## Usage

Clone the repo, then:

```sh
npm i       # yarn
npm start   # yarn start
```

Then follow the instructions you see on the page, you will see my approach failing.

To see a _working_ (production) demo, check out [this repo's CodeSanbox](https://codesandbox.io/s/github/dutzi/use-on).
