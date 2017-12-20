import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Agent } from '../model/agent';

@Injectable()
export class AgentsService {

  constructor(private http: HttpClient) {
  }

  getAllAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>('/api/agents');
  }

}
