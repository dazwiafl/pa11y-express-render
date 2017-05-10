# pa11y-express-render
An express middleware to check the accessibility of your response with [pa11y][1] on render.

## How to install
```bash
npm install pa11y-express-render
```

## Usage
```javascript
var pa11ymw = require('pa11y-express-render');

app.use(pa11ymw(options));
```

## Options
All options are optional
  * `active`: activate the middleware
  * `pa11yOptions`: tell pa11y what to do, as the [pa11y documentation][2] describes

[1]: https://www.npmjs.com/package/pa11y
[2]: https://www.npmjs.com/package/pa11y#configuration
