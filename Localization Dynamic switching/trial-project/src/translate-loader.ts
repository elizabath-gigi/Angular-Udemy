import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class CustomLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    const xlfFile = lang === 'hi' ? 'messages.hi.xlf' : 'messages.xlf';
    return this.http.get(`/assets/locale/${xlfFile}`, { responseType: 'text' }).pipe(
      map((data: string) => this.parseXlf(data))
    );
  }

  parseXlf(data: string): any {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'application/xml');
    const transUnits = xmlDoc.getElementsByTagName('trans-unit');
    const translations: any = {};

    console.log(`Parsing ${transUnits.length} translation units...`);

    for (let i = 0; i < transUnits.length; i++) {
        const transUnit = transUnits[i];
        const id = transUnit.getAttribute('id');
        const targetElements = transUnit.getElementsByTagName('target');
        let target = null;

        if (targetElements.length > 0) {
            target = targetElements[0].textContent;
        } else {
            const sourceElements = transUnit.getElementsByTagName('source');
            if (sourceElements.length > 0) {
                target = sourceElements[0].textContent;
                console.warn(`Missing <target> for id ${id}. Using <source> content instead.`);
            } else {
                console.warn(`Missing both <target> and <source> for id ${id}.`);
            }
        }

        if (id && target) {
            translations[id] = target;
        } else {
            console.warn(`Translation for id ${id} is incomplete. Target: ${target}`);
        }
   

    }
  }
}
