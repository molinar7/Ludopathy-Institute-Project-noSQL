import { CollectionObject } from './collection-object.model';

export interface Patient extends CollectionObject {
    datos_personales: DatosPersonales,
    datos_demograficos?: DatosDemograficos,
    datos_episodio_actual?: DatosEpisodioActual,
    datos_historia_psiquiatrica?: DatosHistoriaPsiquiatrica,
    datos_examen_mental?: DatosExamenMental,
    datos_diagnostico_tratamiento?: DatosDiagnosticoTratamiento,
    datos_historia?: DatosHistoria,
    datos_antecedentes_patologicos?: DatosAntecedentesPatologicos,
    datos_abuso_sustancias?: DatosAbusoSustancias,
    datos_gineco_obstetricos?: DatosGinecoObstetricos,
    datos_nota_clinica?: DatosNotaClinica,
    historia_psicosocial_lleno?: boolean,
    datos_demograficos_lleno?: boolean,
    episodio_actual_lleno?: boolean,
    examen_mental_lleno?: boolean,
    diagnostico_tratamiento_lleno?: boolean,
    antecedentes_patologicos_lleno?: boolean,
    historia_psiquiatrica_lleno?: boolean,
    abuso_substancias_lleno?: boolean,
    antecedentes_ginecoobstetricos_lleno?: boolean
}

interface DatosPersonales {
	nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    sexo: string,
    motivo_consulta: string,
    edad: number,
    referido_por: string,
    direccion: string,
    telefono: string,
    fecha_de_nacimiento: Date,
    lugar_de_residencia: string
}

interface DatosDemograficos {
    estado_civil: string,
    religion: string,
    escolaridad: string,
    sustento_familiar: string,
    ocupacion_jefe_familia: string,
    ocupacion_paciente: string
}


interface DatosEpisodioActual {
    peea: string,
    episodio_actual: string,
    episodios_previos: number,
    edad_primer_episodio: number,
    inicio_sintomas_episodio_actual: string,
    fecha_inicio_episodio_actual: string,
    tratamiento_episodio_actual: Tratamiento[],
    psicofarmacos_episodio_actual: string,
    otro_tratamiento?: string
}

interface Tratamiento {
    tratamiento: string,
    activo: boolean
}

interface DatosHistoriaPsiquiatrica {    
    tratamiento_previo_pp_emocionales: string,
    caso_afirmativo_tratado_por: [string],
    hospitalizado_pp_emocionales: string,
    edad_primera_hospitalizacion: number,
    numero_hospitalizaciones: number,
    duracion_total_hospitalizaciones: string,
    motivo_hospitalizacion: string,
    cronologia: string,
    problemas_psiquiatricos_previos: [string],
    tratamientos_anteriores: string
}


interface DatosExamenMental {
    escalas_realizadas_por: string,
    hamd: number,
    hama: number,
    ybocs: number,
    qlesq: number,
    gadi: number,
    bdi: number,
    spin: number,
    pas: number,
    descripcion_hallazgos: string,

    tension_sistolica_acostado_PT: number,
    tension_sistolica_acostado_ST: number,
    tension_sistolica_parado_PT: number,
    tension_sistolica_parado_ST: number,
    tension_diastolica_acostado_PT: number,
    tension_diastolica_acostado_ST: number,
    tension_diastolica_parado_PT: number,
    tension_diastolica_parado_ST: number,
    frecuencia_cardiaca_acostado: number,
    frecuencia_cardiaca_parado: number,
    ritmo_regular: number,
    ritmo_irregular: number,
    peso: number,
    talla: number,
    circunferencia_abdominal: number,
    temperatura: number,
    peso_usual: number,
    imc: number,
    resultados_laboratorio_y_gabinete: string,
}


interface DatosDiagnosticoTratamiento {
    primario: string,
    secundario: string,
    seguimiento_farmacologico: string,
    modalidad_terapeutica: string,
    pronostico: string,
    evaluador_nombre: string,
    evaluador_categoria: string,
    cronologia: string,
    problemas_psiquiatricos_previos: string,
    evaluador_firma: string
}

interface DatosHistoria {
    historia_psicosocial_y_del_desarrollo: string,
    snc: string,
    trastornos_convulsivos: string,
    respiratorias: string,
    cardiovasculares: string,
    hematopoyecticas_linfaticas: string,
    ojos_nariz_oidos_garganta: string,
    hepaticas: string,
    dermatologicas_tejido_conectivo: string,
    musculo_esqueleticas: string,
    endocrinas_metabolicas: string,
    gastrointestinales: string,
    renales_genitourinarias: string,
    cancer: string,
    alergia_hipersensibilidad_a_medicamentos: string,
    intervenciones_quirurgicas_mayores: string,
    intervenciones_quirurgicas_programadas: string,
    otros: string,
    snc1: string,
    trastornos_convulsivos1: string,
    respiratorias1: string,
    cardiovasculares1: string,
    hematopoyecticas_linfaticas1: string,
    ojos_nariz_oidos_garganta1: string,
    hepaticas1: string,
    dermatologicas_tejido_conectivo1: string,
    musculo_esqueleticas1: string,
    endocrinas_metabolicas1: string,
    gastrointestinales1: string,
    renales_genitourinarias1: string,
    cancer1: string,
    alergia_hipersensibilidad_a_medicamentos1: string,
    intervenciones_quirurgicas_mayores1: string,
    intervenciones_quirurgicas_programadas1: string,
    otros1: string,
    condicion_general: string,
    piel: string,
    cabeza: string,
    ojos: string,
    oido_nariz_garganta: string,
    cuello_tiroides: string,
    pulmones: string,
    corazon: string,
    sistema_gastrointestinal: string,
    nodulos_linfaticos: string,
    higado_vesicula_biliar: string,
    sistema_urogenital: string,
    sistema_musculo_esqueletico: string,
    neurologico: string,
    otro: string,
    condicion_general1: string,
    piel1: string,
    cabeza1: string,
    ojos1: string,
    oido_nariz_garganta1: string,
    cuello_tiroides1: string,
    pulmones1: string,
    corazon1: string,
    sistema_gastrointestinal1: string,
    nodulos_linfaticos1: string,
    higado_vesicula_biliar1: string,
    sistema_urogenital1: string,
    sistema_musculo_esqueletico1: string,
    neurologico1: string,
    otro1: string,
    esquizofrenia: string,
    trastorno_bipolar: string,
    alcoholismo: string,
    drogadiccion: string,
    depresion_mayor: string,
    distimia: string,
    ataques_de_panico: string,
    agorafobia: string,
    trastorno_obsesivo_compulsivo: string,
    fobia_social: string,
    fobia_especifica: string,
    ansiedad_generalizada: string,
    demencia: string,
    retardo_mental: string,
    trastorno_de_personalidad: string,
    otrofam: string,
    datos_relevantes_historia_familiar: string,
    esquizofrenia_quien: string,
    trastorno_bipolar_quien: string,
    alcoholismo_quien: string,
    drogadiccion_quien: string,
    depresion_mayor_quien: string,
    distimia_quien: string,
    ataques_de_panico_quien: string,
    agorafobia_quien: string,
    trastorno_obsesivo_compulsivo_quien: string,
    fobia_social_quien: string,
    fobia_especifica_quien: string,
    ansiedad_generalizada_quien: string,
    demencia_quien: string,
    retardo_mental_quien: string,
    trastorno_de_personalidad_quien: string,
    otrofam_quien: string
}


interface DatosAntecedentesPatologicos {
    snc: string,
    trastornos_convulsivos: string,
    respiratorias: string,
    cardiovasculares: string,
    hematopoyecticas_linfaticas: string,
    ojos_nariz_oidos_garganta: string,
    hepaticas: string,
    dermatologicas_tejido_conectivo: string,
    musculo_esqueleticas: string,
    endocrinas_metabolicas: string,
    gastrointestinales: string,
    renales_genitourinarias: string,
    cancer: string,
    alergia_hipersensibilidad_a_medicamentos: string,
    intervenciones_quirurgicas_mayores: string,
    otros: string,
    notas_antecedentes_personales_patologicos_y_no_patologicos: string,
    toma_cafe: string,
    tazas_de_cafe: number,
    tabaquismo: string,
    consumo_diario_tabaco: number,
    anos_tabaquismo: number,
    edad_inicio: number,
    edad_suspension: number,
    bebidas_alcoholicas: string,
    frecuencia_y_cantidad: string,
    sintio_dejar_de_tomar: string,
    sintio_culpable_forma_tomar: string,
    calmar_nervios_cortar_cruda: string
}


interface DatosAbusoSustancias {
    abusos: Abuso[],
    abuso_alcohol?: string,
    abuso_inhalantes?: string,
    abuso_anfetaminas?: string,
    abuso_opiaceos_heroina?: string,
    abuso_marihuana?: string,
    abuso_pcp?: string,
    abuso_cocaina_crack?: string,
    abuso_sedantes_hipnoticos_ansioliticos?: string,
    abuso_alucionogenos?: string,
    abuso_otros?: string,
    abuso_problemas_consumo_sustancias: string
}

interface Abuso {
    abuso: string,
    informacion: string,
    activo: boolean
}


interface DatosGinecoObstetricos {
    menarca: string,
    fum: string,
    masculino: string,
    ritmo: string,
    tension_premenstrual: string,
    vida_sexual_activa: number,
    num_companeros_sexuales: number,
    actuales: number,
    gesta: number,
    para: number,
    cesareas: number,
    abortos: number,
    embarazo_actual: string,
    semanas_embarazo: number,
    lactancia: string,
    posibilidad_de_embarazo: string,
    utiliza_metodos_anticonceptivos:  MetodoAnticonceptivo[],
    otros_metodos:  OtroMetodo[]
}

interface MetodoAnticonceptivo {
    metodo: string,
    activo: boolean
}

interface OtroMetodo {
    metodo: string,
    activo: boolean
}


interface DatosNotaClinica {
    pacId: string,
    numsesion: string,
    fecha: string,
    edad: number,
    hora: string,
    modalidad: string,
    evolucion: string,
    diagnostico: string,
    tratamiento: string,
    evaluador: string,
    acudio: string,
    recaida: string
}
