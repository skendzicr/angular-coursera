import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';

import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'app-dishdetail',
	templateUrl: './dishdetail.component.html',
	styleUrls: ['./dishdetail.component.scss']
})



export class DishdetailComponent implements OnInit {

	dish: Dish;
	dishIds: number[];
	prev: number;
	next: number;

	constructor(
		private dishService: DishService,
		private route: ActivatedRoute,
		private location: Location) { }

	ngOnInit() {
		this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
		this.route.params
			.switchMap((params: Params) => this.dishService.getDish(+params.id))
			.subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });

		const id = +this.route.snapshot.params.id; // + converts 'id' to number;
		this.dishService.getDish(id).subscribe(dish => this.dish = dish);
	}

	setPrevNext(dishId: number) {
		const index = this.dishIds.indexOf(dishId);
		this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
		this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
	}

	goBack(): void {
		this.location.back();
	}

}
