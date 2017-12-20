import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Agent } from '../shared/model/agent';
import { AgentsService } from '../shared/services/agents.service';


@Component({
  selector: 'nga-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgentsListComponent implements OnInit {
  agents: Agent[];

  constructor(private agentService: AgentsService) {
  }

  ngOnInit() {
    this.agentService.getAllAgents().subscribe((agents: Agent[]) => {
      this.agents = agents.sort((x: Agent, y: Agent) => {
        return Number(new Date(x.date)) - Number(new Date(y.date));
      });
      this.getIsolatedAgents();

    });

  }

  getIsolatedAgents() {
    const listOfAgents = this.createMapOfAgents(this.agents);

    console.log('Isolated agents by country', this.groupBy(listOfAgents, x => [x.country]));

  }

  private createMapOfAgents(array: Agent[]): Agent[] {
    const agentMap = <IsolatedAgent>{};
    array.forEach(x => {
      if (agentMap.hasOwnProperty(x.agent)) {
        const total = agentMap[x.agent].total + 1;
        let agent = {
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
}

export interface IsolatedAgent {
  country: string;
  nick: string;
  total: number;
}


