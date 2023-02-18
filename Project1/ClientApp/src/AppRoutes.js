
import { Home } from "./components/Home";
import ShowProducts from "./components/ShowProducts";
import ShowCustomers from "./components/showCustomers";
import ShowStores from "./components/ShowStores";
import ShowSales from "./components/ShowSales";
 
const AppRoutes = [
  {
        index: true,
        element: <ShowProducts />
  },

  {
    path: '/show-products',
      element: <ShowProducts />
    },
    {
        path: '/show-customers',
        element: <ShowCustomers />
    },
    {
        path: '/show-stores',
        element: <ShowStores />
    },
    {
        path: '/show-sales',
        element: <ShowSales />
    } 
];

export default AppRoutes;
