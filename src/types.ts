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
    playcount: string;
    listeners: string;
    mbid: string;
    url: string;
};

type TrackStreamable = {
    "#text": string;
    fulltrack: string;
};

type TrackWiki = {
    published: string;
    content: string;
    summary: string;
};

type TrackAlbum = {
    artist: string;
    url: string;
    mbid: string;
    title: string;
    "@attr": {
        position: number;
    };
    image: Image[];
};

interface Track extends TrackBase {
    streamable: TrackStreamable;
    artist: ArtistBase;
    image: Image[];
}

export interface TopTrack {
    track: Track[];
    "@attr": Attributes;
}

export interface TrackInfo extends TrackBase {
    artist: ArtistBase;
    streamable: TrackStreamable;
    toptags: { tag: Tag[] };
    wiki: TrackWiki;
    album: TrackAlbum;
}

// Artist
type ArtistBase = {
    name: string;
    mbid: string;
    url: string;
};

type ArtistBio = {
    links: {
        link: {
            rel: string;
            href: string;
        };
    };
    content: string;
    published: string;
    summary: string;
};

export type ArtistSimilar = {
    name: string;
    url: string;
    image: Image[];
};

interface Artist extends ArtistBase {
    playcount: string;
    listeners: string;
    streamable: string;
    image: Image[];
}

export interface TopArtist {
    artist: Artist[];
    "@attr": Attributes;
}

export interface ArtistInfo extends ArtistBase {
    bio: ArtistBio;
    ontour: number;
    stats: {
        playcount: number;
        listeners: number;
    };
    image: Image[];
    similar: { artist: ArtistSimilar[] };
    tags: {
        tag: Tag[];
    };
    streamable: string;
}

export enum ShowBy {
    Track = "topTrack",
    Artist = "topArtist",
}
