import SignIn from "@/pages/auth/SignIn";
import Home from "@/pages/public/Home";
import { ArrowLeftCircleIcon, HomeIcon } from "@heroicons/react/24/solid";
import Products from "./pages/public/Products";
import Cart from "./pages/public/Cart";
import Recipes from "./pages/public/Recipes";
import Users from "./pages/public/Users";
import Posts from "./pages/public/posts/Posts";
import Comments from "./pages/public/comment/Comments";
import {
  CartIcon,
  CommentIcon,
  PostsIcon,
  ProductIcon,
  QuoteIcon,
  RecipesIcon,
  TodoIcon,
  UserIcon,
} from "@/assets/icons";
import Todos from "./pages/public/Todos";
import Quotes from "./pages/public/Quotes";
const icon = {
  className: "w-5 h-5 text-inherit",
};
export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        name: "Home",
        path: "/home",
        element: <Home />,
        icon: <HomeIcon {...icon} />,
      },
      {
        name: "Products",
        path: "/products",
        element: <Products />,
        icon: <ProductIcon {...icon} />,
      },
      {
        name: "Cart",
        path: "/cart",
        element: <Cart />,
        icon: <CartIcon {...icon} />,
      },
      {
        name: "Recipes",
        path: "/recipes",
        element: <Recipes />,
        icon: <RecipesIcon {...icon} />,
      },
      {
        name: "Users",
        path: "/users",
        element: <Users />,
        icon: <UserIcon {...icon} />,
      },
      {
        name: "Posts",
        path: "/posts",
        element: <Posts />,
        icon: <PostsIcon {...icon} />,
      },
      {
        name: "Comments",
        path: "/comments",
        element: <Comments />,
        icon: <CommentIcon {...icon} />,
      },
      {
        name: "Todos",
        path: "/todos",
        element: <Todos />,
        icon: <TodoIcon {...icon} />,
      },
      {
        name: "Quotes",
        path: "/quotes",
        element: <Quotes />,
        icon: <QuoteIcon {...icon} />,
      },
    ],
  },
  {
    layout: "auth",
    pages: [
      {
        icon: <ArrowLeftCircleIcon {...icon} />,
        name: "Logout",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];
