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

type TrackArtist = {
    name: string;
    mbid: string;
    url: string;
};

type TrackImage = {
    "#text": string;
    size: string;
};

interface Track extends TrackBase {
    streamable: TrackStreamable;
    artist: TrackArtist;
    image: TrackImage[];
}

type TrackAttributes = {
    page: string;
    perPage: string;
    totalPages: string;
    total: string;
};

export interface DataTrack {
    data: {
        tracks: {
            track: Track[];
            "@attr": TrackAttributes;
        };
    };
}

type Tag = {
    name: string;
    url: string;
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
    image: TrackImage[];
};

export interface TrackInfo extends TrackBase {
    artist: TrackArtist;
    streamable: TrackStreamable;
    toptags: { tag: Tag[] };
    wiki: TrackWiki;
    album: TrackAlbum;
}
