import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from './store.service'

@Component({
    template: ''
})

export class StoreBase {
    $sub: Subscription;
    constructor(public store: StoreService) {
        this.$sub = this.store.getNhaMay().subscribe(res => {
                this.ngOnInit()
        })
    }
    ngOnInit(): void {
    }
    ngOnDestroy(): void {
        console.log('ondestroy');
        this.$sub.unsubscribe();
    }
}