import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DxMapComponent } from 'devextreme-angular';
import { MapService } from '../app/services/map.service'
import { DrawingManagerService } from '../app/services/drawingManager.service';
import { ShapeService } from '../app/services/shape.service';
import { Geocode } from '../app/types/geocode.type'

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [MapService, DrawingManagerService, ShapeService],
    moduleId: module.id
})
export class AppComponent {
        name = 'DevExtreme Angular Control';
        @ViewChild(DxMapComponent) dxmap: DxMapComponent;
        map: any;
        drawingmanager: any;
        selectedOverlay: any;
        contentString = '';
        polygonOrdinate: Geocode[];

        constructor(private mapService: MapService,
            private drawingManagerService: DrawingManagerService,
            private shapeService: ShapeService,
            private chref: ChangeDetectorRef) {
        }
        ngOnInit() {
            this.dxmap.key = "AIzaSyB6pYrBCT4FajPZ1IJ9v2bbVQ4ABovuI7Y&libraries=visualization,places,drawing";
            this.dxmap.center = { lat: -34.397, lng: 150.644 }
        }

        onMapReady(e: any) {
            this.map = e.originalMap;
            this.map.setOptions();
            this.drawingmanager = new google.maps.drawing.DrawingManager();
            this.addDrawingTools();
            this.registerEventListener();
        }
        removeDrawingTools() {
            this.drawingManagerService.removeDrawingTools(this.drawingmanager, this.map);
        }

        addDrawingTools() {
            this.drawingManagerService.addDrawingTools(this.drawingmanager, this.map);
        }


        registerEventListener() {
            var _this = this;
            google.maps.event.addListener(_this.drawingmanager, 'overlaycomplete', function (event: any) {
                if (event.type !== google.maps.drawing.OverlayType.MARKER) {
                    _this.drawingmanager.setDrawingMode(null);
                    _this.selectedOverlay = event.overlay;
                    _this.getPolygonCordinates();
                    _this.removeDrawingTools();
                }
            });
        }
        deleteSelectedOverlay() {
            if (this.selectedOverlay) {
                this.selectedOverlay.setMap(null);
                delete this.selectedOverlay;
                this.contentString = '';
                this.addDrawingTools();
            }
        }

        redrawPolygon() {
            if (this.selectedOverlay && this.polygonOrdinate
                && this.polygonOrdinate.length > 0) return;

            let polygon = this.shapeService.drawPolygon(this.polygonOrdinate, this.map);

            this.drawingmanager.setDrawingMode(null);
            this.polygonOrdinate = [];
            this.removeDrawingTools();
            this.selectedOverlay = polygon;
            this.getPolygonCordinates();
        }

        getPolygonCordinates() {
            if (this.selectedOverlay) {
                this.contentString = '';

                var vertices = this.selectedOverlay.getPath();
                this.polygonOrdinate = [];
                for (var i = 0; i < vertices.getLength(); i++) {
                    var xy = vertices.getAt(i);
                    var cord = new Geocode();

                    cord.lat = xy.lat();
                    cord.lng = xy.lng();

                    this.polygonOrdinate.push(cord);

                    this.contentString += '\n' + 'Coordinate ' + (i + 1) + ':\n' + xy.lat() + ',' +
                        xy.lng();
                }
            }
            this.chref.detectChanges();
        }
}