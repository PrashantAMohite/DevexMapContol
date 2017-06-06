import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { first } from 'rxjs/operator/first';
import { Geocode } from '../types/geocode.type';

@Injectable()
export class MapService {
    api$: ReplaySubject<any> = first.call(new ReplaySubject(1));
    apiUrl: string = 'https://maps.google.com/maps/api/js?key=AIzaSyB6pYrBCT4FajPZ1IJ9v2bbVQ4ABovuI7Y&libraries=visualization,places,drawing';
    defaultLat: number = -34.397;
    defaultLng: number = 150.644;
    defaultZoomLevel: number = 8;

    intializeMap(map: google.maps.Map, center?: Geocode, zoom?: number): google.maps.Map {
        map = new google.maps.Map(document.getElementById('google-map'), {
            center: {
                lat: center && center.lat ? center.lat : this.defaultLat,
                lng: center && center.lng ? center.lng : this.defaultLng
            },
            zoom: zoom ? zoom : this.defaultZoomLevel,
            panControl: true,
            panControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            }
        });
        return map;
    }

    loadGoogleMapAPI() {
        if (!this.isMapsApiLoaded()) {
            let script = document.createElement('script');
            script.id = 'map-api';

            script.async = true;
            script.onload = () => this.api$.next(google.maps);
            script.src = this.apiUrl;
            document.querySelector('body').appendChild(script);
        }
    }

    isMapsApiLoaded() {
        return typeof google === 'object' && typeof google.maps === 'object';
    }
}