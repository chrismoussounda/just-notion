import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/hooks/use-language';
import { Language } from './providers/language-provider';
import { useTranslation } from 'react-i18next';

const flagMap: Record<Language, string> = {
  fr: 'https://flagpedia.net/data/flags/h80/fr.webp',
  en: 'https://flagpedia.net/data/flags/h80/us.webp',
};

export function LanguageToggle() {
  const { setLanguage, languages, language } = useLanguage();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <img
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all "
            src={flagMap[language]}
          />
          <span className="sr-only">{t('toggleLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages &&
          languages.map(
            (item) =>
              item.code !== language && (
                <DropdownMenuItem key={item.code} onClick={() => setLanguage(item.code)}>
                  {t(item.label)}
                </DropdownMenuItem>
              )
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
