import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Disclosure from './Disclosure';

describe('Disclosure', () => {
  it("est fermé à l'état initial", () => {
    render(
      <Disclosure id="faq-1" label="Question">
        Réponse
      </Disclosure>,
    );
    const button = screen.getByRole('button', { name: 'Question' });

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Réponse')).not.toBeVisible();
  });

  it('s\'ouvre au clic', async () => {
    const user = userEvent.setup();
    render(
      <Disclosure id="faq-2" label="Question">
        Réponse
      </Disclosure>,
    );
    const button = screen.getByRole('button', { name: 'Question' });

    await user.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Réponse')).toBeVisible();
  });

  it("met à jour aria-expanded correctement à l'ouverture", async () => {
    const user = userEvent.setup();
    render(
      <Disclosure id="faq-3" label="Question">
        Réponse
      </Disclosure>,
    );
    const button = screen.getByRole('button', { name: 'Question' });

    expect(button).toHaveAttribute('aria-expanded', 'false');
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('se ferme au second clic', async () => {
    const user = userEvent.setup();
    render(
      <Disclosure id="faq-4" label="Question">
        Réponse
      </Disclosure>,
    );
    const button = screen.getByRole('button', { name: 'Question' });

    await user.click(button);
    await user.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Réponse')).not.toBeVisible();
  });

  it("s'active au clavier via le comportement natif du bouton", async () => {
    const user = userEvent.setup();
    render(
      <Disclosure id="faq-5" label="Question">
        Réponse
      </Disclosure>,
    );

    await user.tab();
    const button = screen.getByRole('button', { name: 'Question' });
    expect(button).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('se ferme avec Échap et restitue le focus au bouton (menu mobile)', async () => {
    const user = userEvent.setup();
    render(
      <Disclosure id="menu-mobile" label="Menu">
        <a href="#institut">L'institut</a>
      </Disclosure>,
    );
    const button = screen.getByRole('button', { name: 'Menu' });

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    const link = screen.getByRole('link', { name: "L'institut" });
    link.focus();

    await user.keyboard('{Escape}');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveFocus();
  });

  it('se ferme avec Échap même si le focus est resté sur le bouton déclencheur', async () => {
    const user = userEvent.setup();
    render(
      <Disclosure id="menu-mobile-2" label="Menu">
        <a href="#institut">L'institut</a>
      </Disclosure>,
    );
    const button = screen.getByRole('button', { name: 'Menu' });

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveFocus();

    await user.keyboard('{Escape}');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveFocus();
  });
});
