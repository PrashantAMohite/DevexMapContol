import { Injectable } from '@angular/core';

@Injectable()
export class DrawingManagerService {
    addDrawingTools(drawingmanager: google.maps.drawing.DrawingManager,
        map: google.maps.Map, drawingMode?: string,
        drawingControl?: boolean, drawingControlPosition?: string,
        allowedDrawingShapes?: string[]
    ) {
        drawingmanager.setOptions({
            drawingMode: this.getDrawingMode(drawingMode),
            drawingControl: this.getDrawingControlVal(drawingControl),
            drawingControlOptions: {
                position: this.getDrawingControlPosition(drawingControlPosition),
                drawingModes: this.getAllowedDrawingShapes(allowedDrawingShapes),
            },
            polygonOptions: {
                strokeColor: '#0000cc',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#0000cc',
                fillOpacity: 0.35
            }
        });
        drawingmanager.setMap(map);
    }

    removeDrawingTools(drawingmanager: google.maps.drawing.DrawingManager,
        map: google.maps.Map) {
        drawingmanager.setOptions({
            drawingControl: false
        });
        drawingmanager.setMap(map);
    }

    getDrawingMode(drawingMode: string): google.maps.drawing.OverlayType{
        if (drawingMode && drawingMode !== '') {
            let mode = drawingMode.toLowerCase();
            switch (mode) {
                case google.maps.drawing.OverlayType.CIRCLE.toString():
                    return google.maps.drawing.OverlayType.CIRCLE;
                case google.maps.drawing.OverlayType.MARKER.toString():
                    return google.maps.drawing.OverlayType.MARKER;
                case google.maps.drawing.OverlayType.POLYGON.toString():
                    return google.maps.drawing.OverlayType.POLYGON;
                case google.maps.drawing.OverlayType.POLYLINE.toString():
                    return google.maps.drawing.OverlayType.POLYLINE;
                default: return google.maps.drawing.OverlayType.POLYGON;

            }
        } else {
            return google.maps.drawing.OverlayType.POLYGON;
        }

    }

    getDrawingControlVal(drawingControl: boolean): boolean {
        if (drawingControl === undefined || drawingControl === null)
            return true;
        return drawingControl;
    }

    getDrawingControlPosition(controlPosition: string): google.maps.ControlPosition {

        if (controlPosition && controlPosition !== '') {
            let position = controlPosition.toString();
            switch (position) {
                case google.maps.ControlPosition.BOTTOM_CENTER.toString():
                    return google.maps.ControlPosition.BOTTOM_CENTER;

                case google.maps.ControlPosition.BOTTOM_LEFT.toString():
                    return google.maps.ControlPosition.BOTTOM_LEFT;

                case google.maps.ControlPosition.BOTTOM_RIGHT.toString():
                    return google.maps.ControlPosition.BOTTOM_RIGHT;

                case google.maps.ControlPosition.LEFT_BOTTOM.toString():
                    return google.maps.ControlPosition.LEFT_BOTTOM;

                case google.maps.ControlPosition.LEFT_CENTER.toString():
                    return google.maps.ControlPosition.LEFT_CENTER;

                case google.maps.ControlPosition.LEFT_TOP.toString():
                    return google.maps.ControlPosition.LEFT_TOP;

                case google.maps.ControlPosition.RIGHT_BOTTOM.toString():
                    return google.maps.ControlPosition.RIGHT_BOTTOM;

                case google.maps.ControlPosition.RIGHT_CENTER.toString():
                    return google.maps.ControlPosition.RIGHT_CENTER;

                case google.maps.ControlPosition.RIGHT_TOP.toString():
                    return google.maps.ControlPosition.RIGHT_TOP;

                case google.maps.ControlPosition.TOP_CENTER.toString():
                    return google.maps.ControlPosition.TOP_CENTER;

                case google.maps.ControlPosition.TOP_LEFT.toString():
                    return google.maps.ControlPosition.TOP_LEFT;

                case google.maps.ControlPosition.TOP_RIGHT.toString():
                    return google.maps.ControlPosition.TOP_RIGHT;


                default: return google.maps.ControlPosition.TOP_CENTER;

            }
        } else {
            return google.maps.ControlPosition.TOP_CENTER;
        }
    }

    getAllowedDrawingShapes(shapeList: string[]): google.maps.drawing.OverlayType[] {
        var allowedShapes: google.maps.drawing.OverlayType[] = [];

        if (shapeList && shapeList.length !== 0) {
            
            for (let i = 0; i < shapeList.length; i++) {
                var shape = shapeList[i].toString().toLowerCase();
                switch (shape)
                {
                    case google.maps.drawing.OverlayType.CIRCLE.toString():
                        allowedShapes.push(google.maps.drawing.OverlayType.CIRCLE);
                        break;

                    case google.maps.drawing.OverlayType.MARKER.toString():
                        allowedShapes.push(google.maps.drawing.OverlayType.MARKER);
                        break;

                    case google.maps.drawing.OverlayType.POLYGON.toString():
                        allowedShapes.push(google.maps.drawing.OverlayType.POLYGON);
                        break;

                    case google.maps.drawing.OverlayType.POLYLINE.toString():
                        allowedShapes.push(google.maps.drawing.OverlayType.POLYGON);
                        break;
                }
            }
        } else {
            allowedShapes.push(google.maps.drawing.OverlayType.POLYGON);
        }

        return allowedShapes;   
    }
            
}