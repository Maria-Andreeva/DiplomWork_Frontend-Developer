# 🎓 DiplomWork_Frontend-Developer

Финальный проект по курсу **Frontend-разработчик**.  
Приложение для планирования и управления встречами с использованием React, Firebase и календаря FullCalendar.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=000000)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![FullCalendar](https://img.shields.io/badge/FullCalendar-3788d8?style=for-the-badge)

# 📅 Meeting Scheduler App

##  📌 Описание
Это веб-приложение для планирования, отслеживания и управления личными или деловыми встречами. С помощью интуитивно понятного интерфейса и интеграции с Firebase пользователи могут легко бронировать встречи, просматривать их в календаре, а также добавлять комментарии к событиям.

---

## 🚀 Возможности

- 🔐 Регистрация и авторизация пользователей
- ➕ Создание, редактирование и удаление встреч
- 📆 Календарный интерфейс (FullCalendar)
- 🕒 Просмотр предстоящих и прошедших встреч
- 💬 Комментарии к событиям
- 🔔 Уведомления
- 🎨 Адаптивный интерфейс с использованием Tailwind CSS

---

## 🧭 Навигация по проекту
```
/src 
├── /components # Повторно используемые компоненты 
│ ├── CalendarComponent.jsx # Компонент календаря (FullCalendar) 
│ ├── Notification.jsx # Компонент уведомлений 
│ ├── Button.jsx # Общая кнопка 
│ ├── InputField.jsx # Общее поле ввода 
│ └── Navbar.jsx # Навигационная панель
├── /pages # Страницы приложения 
│ ├── /Home 
│ │ ├── Home.jsx # Главная страница 
│ │ └── Home.module.css # Стили 
│ ├── /Calendar 
│ │ ├── CalendarPage.jsx # Календарь встреч 
│ │ └── CalendarPage.module.css 
│ ├── /Booking 
│ │ ├── BookingPage.jsx # Страница создания встречи 
│ │ └── BookingPage.module.css 
│ ├── /Login 
│ │ ├── Login.jsx # Вход 
│ │ └── Login.module.css 
│ ├── /Register 
│ │ ├── Register.jsx # Регистрация 
│ │ └── Register.module.css 
│ ├── /Profile 
│ │ ├── Profile.jsx # Профиль пользователя 
│ │ └── Profile.module.css
│ └── /MyEvents 
│ ├── MyEvents.jsx # Список всех событий 
│ └── MyEvents.module.css
├── /services # Работа с Firebase 
│ ├── firebase.jsx # Конфигурация Firebase 
│ ├── authService.jsx # Аутентификация 
│ └── meetingService.jsx # CRUD-функции для встреч
├── /context # React Context API 
│ ├── AuthContext.jsx # Контекст авторизации 
│ └── MeetingContext.jsx # Контекст встреч
├── /styles # Глобальные и модульные стили 
│ ├── globals.css 
│ ├── tailwind.config.js 
│ ├── Calendar.module.css
│ ├── Button.module.css 
│ ├── Input.module.css 
│ └── Navbar.module.css
├── /hooks # Кастомные хуки 
│ └── useMeetings.jsx # Хук работы со встречами
├── App.js # Основной компонент приложения 
└── index.js # Точка входа
```

---

## ⚙️ Установка и запуск

1. Клонируйте репозиторий:

```bash
git clone https://github.com/your-username/meeting-scheduler.git
cd meeting-scheduler
```

2. Установите зависимости:
```
npm install
```

3. Создайте **.env** файл в корне проекта и вставьте туда данные из Firebase:
```
VITE_FIREBASE_API_KEY=ваш_ключ
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
4. Запустите локальный сервер:
```
npm run dev
```

## 🛠️ Используемые технологии

- **React** – библиотека для создания пользовательских интерфейсов
- **React Router** – маршрутизация между страницами
- **Firebase** – аутентификация и база данных
- **Tailwind CSS** – стилизация компонентов
- **FullCalendar** – компонент календаря
- **CSS Modules** – модульные стили

## 💡 Возможные улучшения
```
📲 Отправка напоминаний по почте

🔁 Повторяющиеся события

🧑‍🤝‍🧑 Делегирование встреч другим пользователям

📱 Улучшенная мобильная версия
```

## 🛡️ Лицензия
Этот проект не лицензирован. Все права защищены. Использование, копирование и распространение кода без письменного разрешения автора запрещено.
