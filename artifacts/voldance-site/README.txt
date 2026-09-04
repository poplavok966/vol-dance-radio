VOL DANCE — як залити на Vercel, щоб відкривалась ГОЛОВНА

1. Розпакуй цей архів.
2. На Vercel: Add New Project → Upload
   і завантаж УСЮ папку voldance-site.
   У корені обов’язково мають бути файли:
     index.html     ← головна
     request.html   ← замовлення треку
     vercel.json
     alex.jpg, lisima.png, ...

3. Framework Preset постав Other / Other (не Next.js).
4. Після деплою адреса сайту має відкривати саме головну.
   Сторінка замовлення: https://твій-сайт.vercel.app/request.html

Якщо знову відкривається лише замовлення — у проєкті на Vercel
корінь вказаний неправильно (Root Directory). Залиш його порожнім.
