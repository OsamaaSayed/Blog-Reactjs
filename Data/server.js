import { create, router as _router, defaults } from 'json-server';
import auth from 'json-server-auth';

const server = create();
const router = _router('db/db.json');
const middlewares = defaults();

server.use(middlewares);
server.db = router.db;
server.use(auth);

server.use(router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
