import { UseFetchListsProps } from "../hooks/apiHooks";
import { QueryMethod } from "../types";

export function isTemplateImage(url: string | undefined): boolean {
    const templateURL = "2a96cbd8b46e442fc41c2b86b821562f.png";
    if (typeof url === "string" && url.includes(templateURL)) {
        return true;
    }
    return false;
}

export const customAvatarTemplate = "/assets/images/undraw_mello_otq1.svg";
export const customCoverTemplate = "/assets/images/cover_template.jpg";

// from MDN Docs
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
export const range = (start = 0, stop: number, step = 1) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
    );

export function generateEndPoint({
    method,
    _page,
    _limit,
    query,
}: UseFetchListsProps): string {
    const baseURL = "https://ws.audioscrobbler.com/2.0/";
    const endURL = `api_key=${process.env.VITE_LAST_FM_API_KEY}&format=json`;
    let page = _page ? _page : 1;
    let limit = _limit ? _limit : 24;

    switch (method) {
        case QueryMethod.byArtist:
            return `${baseURL}?method=${QueryMethod.byArtist}&page=${page}&limit=${limit}&${endURL}`;
        case QueryMethod.byTrack:
            return `${baseURL}?method=${QueryMethod.byTrack}&page=${page}&limit=${limit}&${endURL}`;
        case QueryMethod.searchArtist:
            return `${baseURL}?method=${QueryMethod.searchArtist}&artist=${query}&page=${page}&limit=${limit}&${endURL}`;
        case QueryMethod.searchTrack:
            return `${baseURL}?method=${QueryMethod.searchTrack}&track=${query}&page=${page}&limit=${limit}&${endURL}`;
        default:
            throw new Error("method is unknown");
    }
}

export function parsingWikiContent(content: string) {
    let text: string;
    let textStopIndex = content.indexOf("<a");
    text = content.slice(0, textStopIndex);

    let href: string;
    let hrefStartIndex = content.indexOf("href");
    let hrefStopIndex = content.indexOf('">');
    href = content.slice(hrefStartIndex + 6, hrefStopIndex);

    return {
        text,
        href,
    };
}
