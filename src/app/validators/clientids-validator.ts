import { AbstractControl } from '@angular/forms';

export class ClientIdsCompareValue{
    static compare(abstarctControl: AbstractControl){
        const clientone = +[abstarctControl.get('clientIdOne').value];
        const clienttwo = +[abstarctControl.get('clientIdTwo').value];
         if(clienttwo < clientone) {
            return abstarctControl.get('clientIdTwo').setErrors({MatchValue: true})
         } else {
            return null;
         }
    }
}