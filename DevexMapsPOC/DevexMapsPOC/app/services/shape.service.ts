import { Injectable } from '@angular/core';
import { Geocode } from '../types/geocode.type';

@Injectable()
export class ShapeService {

    getCoOrdinates() {

    }

    drawPolygon(polygonCoordinates: Geocode[], map: google.maps.Map): google.maps.Polygon {
        var regionMapMarkers: any[];
        regionMapMarkers = [];

        for (let i = 0; i < polygonCoordinates.length; i++) {
            var c1 = new google.maps.LatLng(polygonCoordinates[i].lat,polygonCoordinates[i].lng);
            regionMapMarkers.push(c1);
        }

        var polygon = new google.maps.Polygon({
            paths: regionMapMarkers,
            strokeColor: '#0000cc',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#0000cc',
            fillOpacity: 0.35
        });
        polygon.setMap(map);

        return polygon;
    }
}