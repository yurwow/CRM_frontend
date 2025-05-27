import { z } from 'zod';

export const formatPhoneNumber = (value: string) => {
    let cleaned = value.replace(/\D/g, '');

    if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);

    if (cleaned.length <= 1) return '+7';
    if (cleaned.length <= 4) return `+7 (${cleaned.slice(1)}`;
    if (cleaned.length <= 7) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`;
    if (cleaned.length <= 9)
        return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
};

export const clientSchema = z.object({
    name: z.string().min(3, 'Минимум 3 символа').max(50, 'Максимум 50 символов'),
    contact_person: z
        .string()
        .optional()
        .or(z.string().min(3, 'Минимум 3 символа').max(50, 'Максимум 50 символов')),
    phone: z
        .string()
        .optional()
        .transform((val) => (val ? formatPhoneNumber(val) : ''))
        .refine((val) => !val || /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(val), {
            message: 'Введите номер в формате +7 (999) 999-99-99',
        }),
    email: z.string().optional().or(z.string().min(3, 'Некорректный mail')),
    address: z.string().optional().or(z.string().min(5, 'Минимум 5 символов')),
    industry: z.string().optional().or(z.string().min(3, 'Минимум 3 символа')),
});
