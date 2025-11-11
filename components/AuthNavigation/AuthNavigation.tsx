// "use client";

// import Link from "next/link";
// import { useAuthStore } from "@/lib/store/authStore";
// import { logout as apiLogout } from "@/lib/api/clientApi";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// export default function Header() {
//   const { user, isAuthenticated, clearAuth } = useAuthStore();
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await apiLogout();
//       clearAuth();
//       toast.success("Ви вийшли з системи");
//       router.push("/");
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.error("Помилка виходу");
//     }
//   };

//   return (
//     <header>
//       <div className="logo">
//         <Link href="/">Clothica</Link>
//       </div>

//       <nav>
//         <Link href="/">Головна</Link>
//         <Link href="/goods">Товари</Link>
//         <Link href="/categories">Категорії</Link>
        
//         {isAuthenticated ? (
//           <>
//             <Link href="/profile">Кабінет</Link>
//             <Link href="/basket">Кошик</Link>
//             <button onClick={handleLogout}>Вийти</button>
//             <span>Привіт, {user?.firstName}!</span>
//           </>
//         ) : (
//           <>
//             <Link href="/auth/login">Вхід</Link>
//             <Link href="/auth/register">Реєстрація</Link>
//             <Link href="/basket">Кошик</Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { logout as apiLogout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiLogout();
      clearAuth();
      toast.success("Ви вийшли з системи");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Помилка виходу");
    }
  };

  return (
    <div className={css.authNav}>
      {isAuthenticated && user ? (
        <>
          <Link href="/profile" className={css.link}>
            Кабінет
          </Link>
          <span className={css.userName}>
            Привіт, {user.firstName}!
          </span>
          <button onClick={handleLogout} className={css.logoutBtn}>
            Вийти
          </button>
        </>
      ) : (
        <>
          <Link href="/auth/login" className={css.link}>
            Вхід
          </Link>
          <Link href="/auth/register" className={css.link}>
            Реєстрація
          </Link>
        </>
      )}
    </div>
  );
}