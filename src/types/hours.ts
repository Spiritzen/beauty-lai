/** Plage horaire lisible pour un groupe de jours. */
export interface OpeningPeriod {
  readonly days: string;
  readonly hours: string;
}

/**
 * Horaires d'ouverture. `toBeConfirmed` signale que ces horaires,
 * bien qu'observés, doivent être validés par Beauty Laï avant publication.
 */
export interface OpeningHoursInfo {
  readonly periods: readonly OpeningPeriod[];
  readonly toBeConfirmed: boolean;
}
