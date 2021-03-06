import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Moment } from "moment";

import { AbstractSelector } from "./abstractSelector";


@Component({
    selector: "minute-selector",
    styles: [
        `.date-set{line-height:2em;text-align:center;vertical-align:middle}.date-set.hidden{display:none}.date-set__dates{display:flex;flex-direction:row;margin:0;padding:0;list-style-type:none;flex-wrap:wrap;justify-content:space-between;align-items:stretch}.date-set__date{cursor:pointer;flex-grow:1;flex-shrink:0;flex-basis:33%}`
    ],
    template: `
        <div class="date-set">
            <ul class="date-set__dates">
                <li *ngFor="let minute of minutes()"
                    [ngClass]="
                {
                     'date-set__date': true 
                }"
                    (mousedown)="dateChange.emit(minute); $event.preventDefault(); $event.stopPropagation();">
                    {{ minute.format("mm") }}
                </li>
            </ul>
        </div>
    `
})
export class MinuteSelector extends AbstractSelector {
    @Input()
    public date: Moment;
    @Output()
    public dateChange: EventEmitter<Moment>;
    @Output()
    public dateSelected: EventEmitter<Moment>;
    @Output()
    public modeChanged: EventEmitter<any>;

    public minutes(): Moment[] {
        const result: Moment[] = [];

        for (let i = 0; i < 60; i = i + 5) {
            result.push(this.value.clone().minute(i));
        }

        return result;
    }
}
