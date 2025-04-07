import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';

export const nameField = {
    icon: null,
    label: 'Название компании',
    name: 'name',
    color: 'black',
};

export const clientFields = [
    {
        icon: <ContactMailIcon />,
        label: 'Контактное лицо',
        name: 'contact_person',
        color: 'primary.main',
    },
    {
        icon: <PhoneIcon />,
        label: 'Телефон',
        name: 'phone',
        color: 'green',
    },
    {
        icon: <EmailIcon />,
        label: 'Email',
        name: 'email',
        color: 'red',
    },
    {
        icon: <HomeIcon />,
        label: 'Адрес',
        name: 'address',
        color: 'orange',
    },
    {
        icon: <BusinessIcon />,
        label: 'Индустрия',
        name: 'industry',
        color: 'purple',
    },
];
