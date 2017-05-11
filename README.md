# pa11y-express-render
An express middleware to check the accessibility of your response with [pa11y][1] on render, by adding console-logs with the errors/warnings/notices of your response to your html response.

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
  * `active`: activate the middleware (Boolean | default: false)
  * `pa11yOptions`: tell pa11y what to do, find more in the [pa11y documentation/configuration][2] (Object | default: {})

[1]: https://www.npmjs.com/package/pa11y
[2]: https://www.npmjs.com/package/pa11y#configuration
