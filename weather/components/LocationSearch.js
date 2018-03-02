class LocationSearch {
    constructor() {
        this.state = {
            isValid: true,
        }

        bindAll(this, 'handleSubmit');
        this.host = document.createElement('div');
        this.host.classList.add('location-search-container');
        this.host.addEventListener('submit', this.handleSubmit);
    }

    updateState(nextState) {
        this.state = nextState;
        this.render();
    }

    handleSubmit(ev) {
        ev.preventDefault();

        const city = ev.target.elements.search.value.trim();
        if (!city.length) {
            this.updateState({ isValid: false });
        }
    }
    render() {
        const { isValid } = this.state;


        this.host.innerHTML = `
            <form class='weather-form'>
                <input name='search' required class = 'search-weather'>
                <button class='weather-search-submit'>find</button>
            </form>`;
        return this.host;
    }


}

export default LocationSearch;