import Home from "../screens/users/Home";
import Routes from "../screens/users/Routes";
import Service from "../screens/users/Service";
import Sale from "../screens/users/Sale";
import HomeAdmin from "../screens/admin/Home";

export const navigate=[
    {
        path: '/',
        component:<Home/>
    },
    {
        path: '/rutas',
        component:<Routes/>
    },
    {
        path: '/servicios',
        component:<Service/>
    },
    {
        path: '/tienda',
        component:<Sale/>
    },
]

