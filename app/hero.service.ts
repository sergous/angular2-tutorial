import { Injectable } from '@angular/core';
import {Hero} from "./hero";
import 'rxjs/add/operator/toPromise';
import { Http, Response } from '@angular/http';

@Injectable()
export class HeroService {

    constructor (private http: Http) {}

    private heroesUrl = 'app/heroes'; // URL to the web api

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    // Update existing Hero
    private put(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = '${this.heroesUrl}/${hero.id}';

        return this.http
            .put(url, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    // Delete existing Hero
    delete(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = '${this.heroesUrl}/${hero.id}';

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    save() {
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero; // saved hero, w/ id if new
                this.goBack(hero);
            })
            .catch(error => this.error = error); // TODO: Display error message
    }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(res =>
                res.json().data)
            .catch(this.handleError);
    }

    getHero(id: number) {
        return this.getHeroes()
            .then(heroes => heroes.filter(hero => hero.id === id)[0]);
    }

    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        if (this.navigated) { window.history.back(); }
    }
}