# AuthNavigation Component

## Опис
Компонент для відображення навігації авторизації (Вхід/Реєстрація або Кабінет/Вийти).

## Використання
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";

// В Header або де потрібно:
<AuthNavigation />

## Що робить:
- ✅ Показує "Вхід" і "Реєстрація" для незалогінених користувачів
- ✅ Показує "Кабінет", "Привіт, Ім'я!" і "Вийти" для залогінених
- ✅ Автоматично оновлюється при зміні стану авторизації
- ✅ Обробляє logout з очищенням сесії

## Props:
Немає - компонент отримує дані з Zustand store автоматично.

## Стилі:
Використовує CSS Modules (`AuthNavigation.module.css`).
Адаптивний - працює на мобільних пристроях.

## Залежності:
- `useAuthStore` - Zustand store
- `logout` API функція
- `react-hot-toast` для повідомлень

## Приклад інтеграції в Header:
export default function Header() {
  return (
    <header>
      <Logo />
      <MainNav />
      <AuthNavigation />  {/* ← Просто додайте сюди */}
    </header>
  );
}