import { Component, OnInit } from '@angular/core';
import { Agent } from '../shared/model/agent';
import { AgentsService } from '../shared/services/agents.service';
import { MaxMinPipe } from '../shared/pipes/maxmin.pipe';


@Component({
  selector: 'nga-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.scss']
})
export class AgentsListComponent implements OnInit {
  resolvedAgents: Agent[];
  minIdx: number = null;
  maxIdx: number = null;

  constructor(private agentService: AgentsService, private pipe: MaxMinPipe) {
  }

  ngOnInit() {
    this.agentService.getAllAgents().subscribe((agents: Agent[]) => {
      this.resolvedAgents = agents;
      this.resolvedAgents.sort((x: Agent, y: Agent) =>
        Number(new Date(x.date)) - Number(new Date(y.date)));
      this.getIsolatedAgents();
    });
    if (this.resolvedAgents) {

    }
  }

  private getIsolatedAgents() {
    const listOfAgents = this.createMapOfAgents(this.resolvedAgents);
    console.log('Isolated agents by country', this.groupBy(listOfAgents, x => [x.country]));

    this.assignMinMaxDistances();
  }

  private createMapOfAgents(array: Agent[]): Agent[] {
    const agentMap = <IsolatedAgent>{};
    array.forEach(x => {
      if (agentMap.hasOwnProperty(x.agent)) {
        const total = agentMap[x.agent].total + 1;
        const agent = {
          nick: x.agent,
          total: total,
          country: x.country
        };
        agentMap[x.agent] = agent;
      } else {
        agentMap[x.agent] = {
          nick: x.agent,
          total: 1,
          country: x.country
        };
      }
    });

    const isolatedAgents: Agent[] = [];
    Object.keys(agentMap)
      .map((agent) => {
        if (agentMap[agent].total === 1) {
          isolatedAgents.push(agentMap[agent]);
        }
      });

    return isolatedAgents;
  }

  private groupBy<T>(array, f) {
    const groups: T[] = {} as T[];
    array.forEach(function (o) {
      const group: string = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups)
      .map((group) => {
        return groups[group];
      });
  }

  private assignMinMaxDistances() {
    const copy = [];
    Object.assign(copy, this.resolvedAgents);
    const mixMaxResult = this.pipe.transform(copy, 'distance');
    this.minIdx = this.resolvedAgents.indexOf(this.resolvedAgents.filter(x => x.distance === mixMaxResult[1])[0]);
    this.maxIdx = this.resolvedAgents.indexOf(this.resolvedAgents.filter(x => x.distance === mixMaxResult[0])[0]);
  }
}


export interface IsolatedAgent {
  country: string;
  nick: string;
  total: number;
}


