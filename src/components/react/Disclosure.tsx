import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

export interface DisclosureProps {
  /** Identifiant stable optionnel ; sinon généré automatiquement. */
  readonly id?: string;
  /** Libellé du bouton déclencheur. */
  readonly label: string;
  /** Contenu affiché/masqué. */
  readonly children: ReactNode;
  /** État initial ouvert (fermé par défaut). */
  readonly defaultOpen?: boolean;
  /** Classe optionnelle pour adapter l'apparence sans dupliquer le composant. */
  readonly className?: string;
}

/**
 * Composant générique et accessible, utilisé pour une future FAQ ainsi
 * que pour le menu mobile du header. S'appuie sur un bouton natif :
 * l'activation au clavier (Entrée / Espace) fonctionne sans code
 * additionnel. Échap referme le panneau et restitue le focus au bouton.
 */
export default function Disclosure({
  id,
  label,
  children,
  defaultOpen = false,
  className,
}: DisclosureProps): ReactNode {
  const generatedId = useId();
  const baseId = id ?? generatedId;
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = (): void => {
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  // Attaché au conteneur (et non au seul panneau) : Échap doit fermer le
  // menu que le focus soit resté sur le bouton déclencheur (cas le plus
  // courant juste après l'ouverture) ou déjà déplacé dans le panneau.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Escape' && isOpen) {
      event.stopPropagation();
      close();
    }
  };

  return (
    <div className={className ? `disclosure ${className}` : 'disclosure'} onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {label}
      </button>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
}
