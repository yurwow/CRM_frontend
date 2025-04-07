# Используем официальный образ Node.js
FROM node:18 AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock) для установки зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы проекта в контейнер
COPY . .

# Строим приложение для продакшн-среды
RUN npm run build

# Запускаем веб-сервер для раздачи статических файлов
FROM nginx:alpine

# Копируем собранные файлы из предыдущего шага в директорию, где nginx будет искать файлы
COPY --from=build /app/dist /usr/share/nginx/html

# Открываем порт 80 для nginx
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
