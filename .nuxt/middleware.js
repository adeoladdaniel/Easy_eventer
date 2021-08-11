const middleware = {}

middleware['auth'] = require('../middleware/auth.js');
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['guest'] = require('../middleware/guest.js');
middleware['guest'] = middleware['guest'].default || middleware['guest']

middleware['validate'] = require('../middleware/validate.js');
middleware['validate'] = middleware['validate'].default || middleware['validate']

export default middleware
