// Please add the property in alphabetical order!
// General
type Image = {
    "#text": string;
    size: string;
};

export type Tag = {
    name: string;
    url: string;
};

type Attributes = {
    page: string;
    perPage: string;
    totalPages: string;
    total: string;
};

// Track
type TrackBase = {
    name: string;
    duration: string;
    listeners: string;
    mbid: string;
    playcount: string;
    url: string;
};

type TrackStreamable = {
    "#text": string;
    fulltrack: string;
};

type TrackWiki = {
    content: string;
    published: string;
    summary: string;
};

type TrackAlbum = {
    "@attr": {
        position: number;
    };
    artist: string;
    image: Image[];
    mbid: string;
    title: string;
    url: string;
};

type TrackMatch = {
    artist: string;
    image: Image[];
    listeners: string;
    mbid: string;
    name: string;
    streamable: string;
    url: string;
};

interface Track extends TrackBase {
    artist: ArtistBase;
    image: Image[];
    streamable: TrackStreamable;
}

export interface TopTrack {
    "@attr": Attributes;
    track: Track[];
}

export interface TrackInfo extends TrackBase {
    album: TrackAlbum;
    artist: ArtistBase;
    streamable: TrackStreamable;
    toptags: { tag: Tag[] };
    wiki: TrackWiki;
}

// Artist
type ArtistBase = {
    name: string;
    mbid: string;
    url: string;
};

type ArtistBio = {
    content: string;
    links: {
        link: {
            href: string;
            rel: string;
        };
    };
    published: string;
    summary: string;
};

export type ArtistSimilar = {
    image: Image[];
    name: string;
    url: string;
};

interface ArtistMatch extends ArtistBase {
    image: Image[];
    listeners: string;
    streamable: string;
}

interface Artist extends ArtistMatch {
    playcount: string;
}

export interface TopArtist {
    "@attr": Attributes;
    artist: Artist[];
}

export interface ArtistInfo extends ArtistBase {
    bio: ArtistBio;
    image: Image[];
    ontour: number;
    similar: {
        artist: ArtistSimilar[];
    };
    stats: {
        playcount: number;
        listeners: number;
    };
    streamable: string;
    tags: {
        tag: Tag[];
    };
}

// Search
export type SearchBase = {
    "opensearch:Query": {
        "#text": string;
        role: string;
        searchTerms?: string;
        startPage: string;
    };
    "opensearch:totalResults": string;
    "opensearch:startIndex": string;
    "opensearch:itemsPerPage": string;
    artistmatches?: {
        artist: ArtistMatch[];
    };
    "@attr": {
        for?: string;
    };
    trackmatches?: {
        track: TrackMatch[];
    };
};

// states
export enum ShowBy {
    Artist = "topArtist",
    Track = "topTrack",
}
