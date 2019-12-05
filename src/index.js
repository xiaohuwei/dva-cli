import dva from 'dva';
import './index.css';
import {createBrowserHistory as createHistory} from 'history'; // history模式
// 1. Initialize
const app = dva({
    history: createHistory(), // history模式
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/index').default);
app.model(require('./models/test').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
