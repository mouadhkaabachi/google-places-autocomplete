import { PLACES_API_URL, PLACES_DETAILS_API_URL_places } from './google-places-autocomplete.static';
import { Http, Observable } from "@nativescript/core";
export class Common extends Observable {
    constructor(key) {
        super();
        this.apikey = key;
    }
    search(terms, countryISO = '', types = 'geocode') {
        let requestUrl = PLACES_API_URL +
            "?input=" + encodeURIComponent(terms.trim()) +
            (countryISO ? "&components=country:" + countryISO : '') + "&key=" +
            this.apikey;
        return Http
            .getJSON(requestUrl)
            .then(function (data) {
            let items = [];
            for (let i = 0; i < data.predictions.length; i++) {
                items.push({
                    description: data.predictions[i].description,
                    placeId: data.predictions[i].place_id,
                    data: data.predictions[i]
                });
            }
            return items;
        });
    }
    getPlaceById(placeId) {
        let requestUrl = PLACES_DETAILS_API_URL_places +
            "?placeid=" + placeId + "&key=" +
            this.apikey;
        return Http
            .getJSON(requestUrl)
            .then((data) => {
            let place = {};
            place.latitude = data.result.geometry.location.lat;
            place.longitude = data.result.geometry.location.lng;
            place.name = data.result.name;
            place.phoneNumber = data.result.international_phone_number;
            place.formattedAddress = data.result.formatted_address;
            place.data = data;
            if (data.result.photos && data.result.photos.length > 0) {
                place.photoReference = data.result.photos[0].photo_reference;
            }
            return place;
        });
    }
    handleErrors(response) {
        if (!response.result) {
            console.log("google-geocoder error");
            console.log(JSON.stringify(response));
        }
        return response;
    }
}
//# sourceMappingURL=google-places-autocomplete.common.js.map