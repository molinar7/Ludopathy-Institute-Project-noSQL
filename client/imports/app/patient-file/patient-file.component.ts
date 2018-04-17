import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
 
import 'rxjs/add/operator/map';

import { Patients } from '../../../../both/collections/patients.collection';
import { Patient } from '../../../../both/models/patient.model';

import template from './patient-file.component.html';

@Component({
	selector: 'patient-file',
	template
})
export class PatientFileComponent implements OnInit{
	patientId: string;
	paramsSub: Subscription;
	patient: Patient;

	constructor(private route: ActivatedRoute){}

	ngOnInit() {
		this.paramsSub = this.route.params
			.map(params => params['id'])
			.subscribe(patientId => {
				this.patientId = patientId;
				this.patient = Patients.findOne(this.patientId);
			});
	}

	ngOnDestroy() {
		this.paramsSub.unsubscribe();
	}
}