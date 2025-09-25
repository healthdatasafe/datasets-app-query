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

const api = document.URL.includes('datasafe.dev') ? 'https://datasets.datasafe.dev/' : 'http://localhost:7442/';

// Simple API wrapper using JSONPlaceholder posts as demo data
export async function searchMedications(query: string): Promise<Medication[]> {
  if (!query.trim()) return []
  const response = await fetch(api + 'medication?search=' + query)
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json() as ErrorResult;
      message = errorData.error;
    } catch (error) {
      // do nothing
    }
    throw new Error(message)
  }
  const data = (await response.json()) as SearchResult
  return data.medications;
}


