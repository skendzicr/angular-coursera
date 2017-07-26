import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders.const';

@Injectable()
export class LeaderService {

  constructor() { }
  getLeaders(): Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }

  getLeader(id: number): Leader {
    return LEADERS.filter(leader => (leader.id === id))[0];
  }

  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter(leader => leader.featured)[0]);
  }

}
