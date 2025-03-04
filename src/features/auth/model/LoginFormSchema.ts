import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'Введите email').email('Некорректный email'),
    password: z.string().min(5, 'Пароль должен содержать минимум 5 символов'),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
