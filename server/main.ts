import { Meteor } from 'meteor/meteor';
import { loadPatients } from './imports/fixtures/patients';


Meteor.startup(() => {
	loadPatients();
});