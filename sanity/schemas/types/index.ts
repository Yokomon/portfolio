type Fields = {
  name: string;
  title: string;
  type: string;
  options?: {
    source?: string;
    hotspot?: boolean;
  };
  fields?: {
    name: string;
    title: string;
    type: string;
  }[];
  of?: { type: string }[];
}[];

interface SanityDocs {
  name: string;
  title: string;
  type: string;
  fields: Fields;
}

export type { SanityDocs };
