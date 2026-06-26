import { ContactItem } from '../../types';

export const contactItems: ContactItem[] = [
  { icon: '#i-mail', label: 'Email', value: 'nicolaskeita2@gmail.com', href: 'mailto:nicolaskeita2@gmail.com' },
  { icon: '#i-phone', label: 'Téléphone', labelEn: 'Phone', value: '+33 7 54 84 26 88', href: 'tel:+33754842688' },
  { icon: '#i-pin', label: 'Lieu de résidence', labelEn: 'Location', value: 'Nouvelle-Aquitaine' },
  { icon: '#i-globe', label: 'Mobilité', labelEn: 'Mobility', value: 'France & International', sub: 'Passeport valide', subEn: 'Valid passport' },
  { icon: '#i-flag', label: 'Nationalité', labelEn: 'Nationality', value: 'Française', valueEn: 'French' },
  { icon: '#i-check', label: 'Casier judiciaire', labelEn: 'Criminal record', value: 'Vierge', valueEn: 'Clean' },
  { icon: '#i-chat', label: 'Langues', labelEn: 'Languages', value: 'Français natif', valueEn: 'Native French', sub: 'Anglais professionnel', subEn: 'Professional English' },
  { icon: '#i-briefcase', label: 'Disponibilité', labelEn: 'Availability', value: 'En recherche active', valueEn: 'Actively seeking' },
];