import * as request from '~/lib/utils/request';
import type { Section, Library, Media, MediaMetadata, Movie } from '~/types/plex';

const apiUrl = (token: string, apiPath: string): string => {
    'use server';
    const plexPath = process.env.PLEX_HOST;
    return `http://${plexPath}${apiPath}?X-Plex-Token=${token}`;
};

const fetchSection = async (token: string, type: string): Promise<Section> => {
    const url = apiUrl(token, '/library/sections');

    const res = await request.get(url, 'xml');
    return new Promise((resolve) => resolve(res.elements[0].elements.find((lib: Section) => lib.attributes.type === type)));
};

const fetchMedia = async (token: string, lib: Section) => {
    const key = lib.attributes.key;
    const url = apiUrl(token, `/library/sections/${key}/all`);

    const res = await request.get(url, 'xml');
    return new Promise((resolve) => resolve(res));
};

const fetchArt = async (token: string, ids: string []): Promise<Blob> => {
    const url = `/library/metadata/${ids[0]}/art/${ids[1]}`;

    return request.get(apiUrl(token, url), 'img');
};

const fetchThumbnail = async (token: string, ids: string []): Promise<Blob> => {
    const url = `/library/metadata/${ids[0]}/thumb/${ids[1]}`;

    return request.get(apiUrl(token, url), 'img');
};

const mapMovie = (movie: Media) : Movie => ({
    title: movie.attributes.title,
    studio: movie.attributes.studio,
    year: movie.attributes.year,
    genre: movie.elements
        .filter((ele: MediaMetadata) => ele.name === 'Genre')
        .map((ele: MediaMetadata) => ele.attributes.tag),
    tagline: movie.attributes.tagline,
    summary: movie.attributes.summary,
    thumb: '/api/plex' + movie.attributes.thumb,
    art: '/api/plex' + movie.attributes.art,
    contentRating: movie.attributes.contentRating,
    duration: movie.attributes.duration
});

export const art = async (token: string | null, ids: string []): Promise<ImageData> => {
    'use server';
    if (!token) {
        throw new Error('Missing token');
    }
   
    return fetchArt(token, ids);
}

export const thumb = async (token: string | null, ids: string []): Promise<ImageData> => {
    'use server';
    if (!token) {
        throw new Error('Missing token');
    }
   
    return fetchThumbnail(token, ids);
}

export const movies = async (token: string | null): Promise<Movie[]> => {
    'use server';
    if (!token) {
        throw new Error('Missing token');
    }

    // types movie, music, show
    const movieDir = await fetchSection(token, 'movie');
    const contents = await fetchMedia(token, movieDir) as Library;
    const movies = contents.elements[0].elements as Media[];
    const mappedMovies = movies.map(mapMovie) as Movie[];

    return new Promise(resolve => resolve(mappedMovies));
};
