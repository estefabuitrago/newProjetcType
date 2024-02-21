import Home from "../screens/users/Home"
import Routes from "../screens/users/Routes"
import Service from "../screens/users/Service"
import Sale from "../screens/users/Sale"
import HomeAdmin from "../screens/admin/Home"
import Store from "../screens/admin/Store"
import SaleAdmin from "../screens/admin/Store/Sales"
import Receipt from "../screens/admin/Store/Sales/Receipt"
import Inventory from "../screens/admin/Store/Inventory"
import Category from "../screens/admin/Category"
import Article from "../screens/admin/Article"
import FormArticle from "../screens/admin/Article/NewArticle"
import Users from "../screens/admin/Users"
import AddUser from "../screens/admin/Users/NewUser"
import ProfileAdmin from "../screens/admin/Profile"
import Company from "../screens/admin/Company"
import EditArticle from "../screens/admin/Article/EditArticle"
import EditUser from "../screens/admin/Users/EditUser"
import Login from "../screens/auth/login"
import SignUp from "../screens/auth/signUp"

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
    {
        path: '/admin',
        component:<HomeAdmin/>
    },
    {
        path: '/tiendaAdmin',
        component:<Store/>
    },
    {
        path: '/ventas',
        component:<SaleAdmin/>
    },
    {
        path: 'ventas/recibo/:id',
        component:<Receipt/>
    },
    {
        path: '/inventario',
        component:<Inventory/>
    },
    {
        path: '/categorias',
        component:<Category/>
    },
    {
        path: '/publicaciones',
        component:<Article/>
    },
    {
        path: '/publicaciones/editar/:id',
        component:<EditArticle/>
    },
    {
        path: '/agregarArticulo',
        component:<FormArticle/>
    },
    {
        path: '/usuarios',
        component:<Users/>
    },
    {
        path: '/usuarios/editar/:id',
        component:<EditUser/>
    },
    {
        path: '/nuevoUsuario',
        component:<AddUser/>
    },
    {
        path: '/perfilAdmin',
        component:<ProfileAdmin/>
    },
    {
        path: '/empresa',
        component:<Company/>
    },
    {
        path: '/iniciarSesion',
        component:<Login/>
    },
    {
        path: '/registrarse',
        component:<SignUp/>
    },
]

