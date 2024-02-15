import HomeAdmin from "../../screens/admin/Home"
import Store from "../../screens/admin/Store"
import Sale from "../../screens/admin/Store/Sales"

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
    }
]

