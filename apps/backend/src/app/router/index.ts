import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
    {
        path:'/auth',
        route:AuthRoutes
    },
    {
        path:'/users',
        route:UserRoutes
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
