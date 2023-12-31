class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=5fa1322b3727b2a9e4094bc52f59026e';
    _baseOffset = 210;

    getResource = async url => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch - ${url} status: ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(
            `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
        );
        return res.data.results.map(this._tranformCharacter);
    };

    getCharacter = async id => {
        const res = await this.getResource(
            `${this._apiBase}characters/${id}?${this._apiKey}`
        );
        return this._tranformCharacter(res.data.results[0]);
    };

    _tranformCharacter = char => {
        return {
            id: char.id,
            name: char.name,
            description: char.description
                ? `${char.description.slice(0, 200)}...`
                : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homePage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        };
    };
}

export default MarvelService;
