import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Patients } from '../both/collections/patients.collection';
import { Patient } from '../both/models/patient.model';

Meteor.methods({
	addPatient: function(patient: Patient) {
        return Patients.insert({
    		datos_personales:{
                apellido_materno: patient.datos_personales.apellido_materno,
                apellido_paterno: patient.datos_personales.apellido_paterno,
                direccion: patient.datos_personales.direccion,
                edad: patient.datos_personales.edad,
                fecha_de_nacimiento: patient.datos_personales.fecha_de_nacimiento,
                lugar_de_residencia: patient.datos_personales.lugar_de_residencia,
                motivo_consulta: patient.datos_personales.motivo_consulta,
                nombre: patient.datos_personales.nombre,
                referido_por: patient.datos_personales.referido_por,
                sexo: patient.datos_personales.sexo,
                telefono: patient.datos_personales.telefono
            }
        });
    },
    addDemographic: function(data: any, id: string) {
        return Patients.update(id, {$set: {datos_demograficos: data, datos_demograficos_lleno: true}});
    },
    addActualData: function(data: any, id: string) {
        return Patients.update(id, {$set: {datos_episodio_actual: data, episodio_actual_lleno: true}});
    },
    addPathologicalBackground: function(data: any, id: string) {
        return Patients.update(id, {$set: {datos_antecedentes_patologicos: data, antecedentes_patologicos_lleno: true}});
    },
    addSustanceAbuseHistory: function(data: any, id: string) {
        return Patients.update(id, {$set: {datos_abuso_sustancias: data, abuso_substancias_lleno: true}});
    },
    addGynecologicalObstetricsBackground: function(data: any, id: string) {
        return Patients.update(id, {$set: {datos_gineco_obstetricos: data, antecedentes_ginecoobstetricos_lleno: true}});
    },
    addHistory: function(data: any, id: string) {
        return Patients.update(id, {$set: {datos_historia: data, historia_psicosocial_lleno: true}});
    },    
    addExamenMental: function(data: any, id: string) {
        return Patients.update(id, {$set: {datos_examen_mental: data, examen_mental_lleno: true}});
    },
    addDiagnosticoTratamiento: function(data: any, id: string) {
        return Patients.update(id, {$set: {datos_diagnostico_tratamiento: data, diagnostico_tratamiento_lleno: true}});
    },
})