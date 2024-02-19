import HomeAdmin from "../../screens/admin/Home"
import Store from "../../screens/admin/Store"
import Sale from "../../screens/admin/Store/Sales"
import Receipt from "../../screens/admin/Store/Sales/Receipt"
import Inventory from "../../screens/admin/Store/Inventory"
import Category from "../../screens/admin/Category"
import Article from "../../screens/admin/Article"
import FormArticle from "../../screens/admin/Article/NewArticle"
import Users from "../../screens/admin/Users"
import AddUser from "../../screens/admin/Users/NewUser"

export const navigate2=[
    {
        path: '/admin',
        component:<HomeAdmin/>
    },
    {
        path: '/tienda',
        component:<Store/>
    },
    {
        path: '/ventas',
        component:<Sale/>
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
        path: '/agregarArticulo',
        component:<FormArticle/>
    },
    {
        path: '/usuarios',
        component:<Users/>
    },
    {
        path: '/nuevoUsuario',
        component:<AddUser/>
    },
]

