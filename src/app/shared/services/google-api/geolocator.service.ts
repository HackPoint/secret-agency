import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Agent } from '../../model/agent';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';


@Injectable()
export class GeolocatorService {
  constructor(private http: HttpClient) {
  }

  public find(agent: Agent): Observable<Agent> {
    return this.http.get<Agent>(`${environment.google.BASE_URL}${agent.address}`)
      .map(response => {
        const coordinates = <Coordinates> {
          latitude: response['results'][0].geometry.location.lat,
          longitude: response['results'][0].geometry.location.lng
        };
        agent.distance = this.getDistance(<Coordinates>environment.google.COORDINATES, coordinates, Unit.km);
        return agent;
      });
  }

  private getDistance(from: Coordinates, to: Coordinates, unit: Unit) {
    const radlat1 = Math.PI * from.latitude / 180;
    const radlat2 = Math.PI * to.latitude / 180;
    const theta = from.longitude - to.longitude;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    switch (unit) {
      case Unit.km:
        dist = dist * 1.609344;
        break;
      case Unit.mi:
        dist = dist * 0.8684;
        break;
    }
    return dist;
  }
}

export enum Unit {
  km,
  mi
}
