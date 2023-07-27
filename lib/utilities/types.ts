import { getSolidDatasetWithAcl } from "@inrupt/solid-client";

// Typescript shortcuts
export type SolidDatasetWithAcl = Awaited<ReturnType<typeof getSolidDatasetWithAcl>>
