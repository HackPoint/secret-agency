import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Agent } from '../model/agent';
import { GeolocatorService } from './google-api/geolocator.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class AgentsService {

  constructor(private http: HttpClient, private location: GeolocatorService) {
  }

  getAllAgents(): Observable<Agent[]> {
    const agentsWithoutDistance = this.http.get<Agent[]>('/api/agents');
    return agentsWithoutDistance.mergeMap((agents: Agent[]) => {
      return Observable.forkJoin(
        agents.map((agent: Agent) => {
          return this.location.find(agent);
        })
      );
    });
  }

}
