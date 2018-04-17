import { Patients } from '../../../both/collections/patients.collection';
import { Patient } from '../../../both/models/patient.model';

export function loadPatients() {
	if (Patients.find().cursor.count() === 0){
		for(var i = 0; i < 30; i ++){
			let val_sexo = i % 2 == 0 ? 'Masculino' : 'Femenino';
			Patients.insert({
				datos_personales:{
					nombre: Fake.word(),
					apellido_paterno: Fake.word(),
					apellido_materno: Fake.word(),
					sexo: val_sexo,
					fecha_de_nacimiento: new Date("February 4, 1993 10:13:00"),
					motivo_consulta: Fake.sentence(10),
  				edad: 20 + i,
  				referido_por: Fake.word(),
  				direccion: Fake.sentence(3),
  				telefono: '844-784-2112',
  				lugar_de_residencia: Fake.sentence(3)
				}
			})
		}
	}
}