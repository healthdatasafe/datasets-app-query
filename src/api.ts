export enum LocalizableTextLanguages {
    English = 'en',
    French = 'fr',
    Spanish = 'es'
}

export type LocalizableText = {
    [LocalizableTextLanguages.English]: string;
    [LocalizableTextLanguages.French]?: string;
    [LocalizableTextLanguages.Spanish]?: string;
};

export type Medication = {
  label: LocalizableText,
  system: string,
  source: {
    key: string,
  },
  description: LocalizableText,
  code: string,
  meta: any,
}

export type SearchResult = {
  medications: Medication[]
}

export type ErrorResult = {
    error: string
};

// VITE_DATASETS_API overrides the base (a workspace with a port offset reaches the local service through its gateway,
// https://datasets.backloop.dev:<gateway port>/); otherwise production on *.datasafe.dev, the local service elsewhere.
const fallbackApi = document.URL.includes('datasafe.dev') ? 'https://datasets.datasafe.dev/' : 'https://datasets.backloop.dev:7442/';
const envApi = import.meta.env.VITE_DATASETS_API;
const api = envApi ? (envApi.endsWith('/') ? envApi : envApi + '/') : fallbackApi;

// Searches the datasets service's medication index
export async function searchMedications(query: string): Promise<Medication[]> {
  if (!query.trim()) return [];
  const response = await fetch(api + 'medication?search=' + encodeURIComponent(query));
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json() as ErrorResult;
      message = errorData.error;
    } catch {
      // do nothing
    }
    throw new Error(message);
  }
  const data = (await response.json()) as SearchResult;
  return data.medications;
}


