import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component'
import {HeroService} from './hero.service'

@Component({
    selector: 'my-heroes',
    template: `
        <ul class="heroes">
            <li *ngFor="let hero of heroes"
            [class.selected]="hero === selectedHero"
            (click)="onSelect(hero)">
            <span class="badge">{{hero.id}}</span> {{hero.name}}
            </li>
        </ul>
        <my-hero-detail [hero]="selectedHero"></my-hero-detail>
    `,
    styleUrls: ['app/heroes.component.css'],
    directives: [HeroDetailComponent]
})



export class HeroesComponent implements OnInit {
    constructor(private heroService: HeroService) { }
    getHeroes() {
        //this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes); //Emulate slow connection
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }
    ngOnInit() {
        this.getHeroes();
    }
    title = 'Tour of Heroes';
    heroes: Hero[];
    selectedHero: Hero;
    onSelect(hero: Hero) {
        this.selectedHero = hero;
    }
}