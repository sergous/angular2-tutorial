import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Hero} from './hero';
import {HeroService} from './hero.service'
import {Router} from '@angular/router-deprecated'
import {HeroDetailComponent} from './hero-detail.component'

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: ['app/heroes.component.css'],
    directives: [HeroDetailComponent]
})



export class HeroesComponent implements OnInit {
    constructor(
        private heroService: HeroService,
        private router: Router
    ) { }
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
    gotoDetail() {
        var link = ['HeroDetail', {id: this.selectedHero.id}];
        this.router.navigate(link);
    }
    addHero() {
        this.addingHero = true;
        this.selectedHero = null;
    }
    close(savedHero: Hero) {
        this.addingHero = false;
        if (savedHero) { this.getHeroes(); }
    }
    delete(hero: Hero, event: any) {
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .then(res => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if(this.selectedHero === hero) {
                    this.selectedHero = null;
                }
            })
            .catch(error => this.error = error); //TODO: display error
    }
}