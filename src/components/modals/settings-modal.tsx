import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useSettings } from '@/hooks/use-settings';
import { Label } from '@/components/ui/label';
import { ModeToggle } from '@/components/mode-toggle';
import { LanguageToggle } from '../language-toggle';
import { useTranslation } from 'react-i18next';

export const SettingsModal = () => {
  const settings = useSettings();
  const { t } = useTranslation();
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">{t('mySettings')}</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>{t('appearance')}</Label>
            <span className="text-[0.8rem] text-muted-foreground">{t('customizeJ')}</span>
          </div>
          <ModeToggle />
          <LanguageToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};
