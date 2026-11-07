/* GENERATED from data/* by scripts/build-foundation.cjs. DO NOT EDIT BY HAND. */
window.POISON_FOUNDATION = {
  "version": "2.0.0",
  "as_of": "2026-11-06",
  "methodology": "Metric ontology and data acquisition readiness. Do not treat definition counts as measured harm, litigation prospects or company culpability.",
  "counts": {
    "metrics_defined": 142,
    "metric_domains": 14,
    "source_entries": 22,
    "seed_emission_records": 50,
    "countries": 10,
    "target_dossier_slots": 100,
    "emission_coverage_slots": 49,
    "validated_multihazard_dossiers": 0,
    "validated_company_health_harm_estimates": 0,
    "automatically_authorized_cases": 0
  },
  "domains": [
    {
      "id": "CLIMATE",
      "label": "Climate & atmospheric forcing",
      "medium": [
        "air",
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "source_candidates": [
        "CM24",
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "metric_count": 12
    },
    {
      "id": "AIR",
      "label": "Air pollutants",
      "medium": [
        "air"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "source_candidates": [
        "EPA_TRI",
        "OPENAQ",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "metric_count": 14
    },
    {
      "id": "WATER",
      "label": "Water & hydrology",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "metric_count": 16
    },
    {
      "id": "SOIL",
      "label": "Soil & subsurface",
      "medium": [
        "soil",
        "water"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "metric_count": 11
    },
    {
      "id": "ECOLOGY",
      "label": "Wildlife & ecosystems",
      "medium": [
        "biota",
        "water",
        "soil"
      ],
      "receptors": [
        "plants",
        "animals"
      ],
      "source_candidates": [
        "IUCN",
        "STATE_AIR",
        "EEA_IEP"
      ],
      "metric_count": 12
    },
    {
      "id": "AGRICULTURE",
      "label": "Agriculture & food chains",
      "medium": [
        "soil",
        "water",
        "biota"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "source_candidates": [
        "FAOSTAT",
        "CAN_NPRI",
        "EPA_TRI"
      ],
      "metric_count": 10
    },
    {
      "id": "CHEMICALS",
      "label": "Persistent chemicals & materials",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP",
        "CAN_NPRI"
      ],
      "metric_count": 10
    },
    {
      "id": "PHARMA",
      "label": "Pharmaceutical & antimicrobial",
      "medium": [
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals"
      ],
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP"
      ],
      "metric_count": 8
    },
    {
      "id": "BIOLOGICAL",
      "label": "Biological & pathogen hazards",
      "medium": [
        "water",
        "soil",
        "biota",
        "air"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "source_candidates": [
        "CAN_NPRI",
        "EPA_ECHO"
      ],
      "metric_count": 8
    },
    {
      "id": "HUMAN",
      "label": "Human health & populations",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans"
      ],
      "source_candidates": [
        "WHO_AIR",
        "LANCET",
        "STATE_AIR",
        "EPA_IRIS"
      ],
      "metric_count": 12
    },
    {
      "id": "WORKERS",
      "label": "Occupational health",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans"
      ],
      "source_candidates": [
        "EPA_ECHO",
        "EPA_TRI"
      ],
      "metric_count": 6
    },
    {
      "id": "REMEDIATION",
      "label": "Remediation & restoration",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA"
      ],
      "metric_count": 8
    },
    {
      "id": "EQUITY",
      "label": "Equity & vulnerable receptors",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "source_candidates": [
        "WHO_AIR",
        "STATE_AIR"
      ],
      "metric_count": 6
    },
    {
      "id": "GOVERNANCE",
      "label": "Governance & legal signals",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA",
        "IND_NGT",
        "ID_PROPER",
        "RUS_NVOS"
      ],
      "metric_count": 9
    }
  ],
  "metrics": [
    {
      "id": "ghg_prod",
      "label": "Production-linked GHG attribution",
      "domain": "Climate & atmospheric forcing",
      "domain_code": "CLIMATE",
      "medium": [
        "air",
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "MtCO2e/year",
      "kind": "emission",
      "note": "Producer-attributed, not territorial",
      "source_candidates": [
        "CM24",
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "ghg_operational",
      "label": "Direct operational GHG",
      "domain": "Climate & atmospheric forcing",
      "domain_code": "CLIMATE",
      "medium": [
        "air",
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "MtCO2e/year",
      "kind": "emission",
      "note": "Specify Scopes and exclusions",
      "source_candidates": [
        "CM24",
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "co2_fossil",
      "label": "Fossil CO2 mass",
      "domain": "Climate & atmospheric forcing",
      "domain_code": "CLIMATE",
      "medium": [
        "air",
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "tonnes/year",
      "kind": "emission",
      "note": "Separate from methane CO2e",
      "source_candidates": [
        "CM24",
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "methane_mass",
      "label": "Methane mass",
      "domain": "Climate & atmospheric forcing",
      "domain_code": "CLIMATE",
      "medium": [
        "air",
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "tonnes/year",
      "kind": "emission",
      "note": "No GWP conflation",
      "source_candidates": [
        "CM24",
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "methane_co2e",
      "label": "Methane CO2e",
      "domain": "Climate & atmospheric forcing",
      "domain_code": "CLIMATE",
      "medium": [
        "air",
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "MtCO2e/year",
      "kind": "emission",
      "note": "Declare GWP horizon",
      "source_candidates": [
        "CM24",
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "nitrous_oxide",
      "label": "Nitrous oxide mass",
      "domain": "Climate & atmospheric forcing",
      "domain_code": "CLIMATE",
      "medium": [
        "air",
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "tonnes/year",
      "kind": "emission",
      "note": "Declare process",
      "source_candidates": [
        "CM24",
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "f_gases",
      "label": "Fluorinated-gas CO2e",
      "domain": "Climate & atmospheric forcing",
      "domain_code": "CLIMATE",
      "medium": [
        "air",
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "tonnes_CO2e/year",
      "kind": "emission",
      "note": "Specify gas species and GWP",
      "source_candidates": [
        "CM24",
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "flaring",
      "label": "Flaring-associated emissions",
      "domain": "Climate & atmospheric forcing",
      "domain_code": "CLIMATE",
      "medium": [
        "air",
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "tonnes_CO2e/year",
      "kind": "emission",
      "note": "Measured versus estimated",
      "source_candidates": [
        "CM24",
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "lifecycle_scope3",
      "label": "Use of marketed products",
      "domain": "Climate & atmospheric forcing",
      "domain_code": "CLIMATE",
      "medium": [
        "air",
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "MtCO2e/year",
      "kind": "emission",
      "note": "Avoid duplication with facility operational data",
      "source_candidates": [
        "CM24",
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "cumulative_ghg",
      "label": "Cumulative attributable GHG",
      "domain": "Climate & atmospheric forcing",
      "domain_code": "CLIMATE",
      "medium": [
        "air",
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "MtCO2e",
      "kind": "stock",
      "note": "Document start and end years",
      "source_candidates": [
        "CM24",
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "climate_radiative",
      "label": "Radiative forcing contribution",
      "domain": "Climate & atmospheric forcing",
      "domain_code": "CLIMATE",
      "medium": [
        "air",
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "W/m2",
      "kind": "model",
      "note": "Requires atmospheric attribution model",
      "source_candidates": [
        "CM24",
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "climate_scenario",
      "label": "Future GHG pathway",
      "domain": "Climate & atmospheric forcing",
      "domain_code": "CLIMATE",
      "medium": [
        "air",
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "MtCO2e/year",
      "kind": "scenario",
      "note": "Conditional scenario, not forecast of wrongdoing",
      "source_candidates": [
        "CM24",
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "pm25_ambient",
      "label": "Ambient PM2.5 concentration",
      "domain": "Air pollutants",
      "domain_code": "AIR",
      "medium": [
        "air"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "ug/m3",
      "kind": "concentration",
      "note": "Station-representative ambient value",
      "source_candidates": [
        "EPA_TRI",
        "OPENAQ",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "pm10_ambient",
      "label": "Ambient PM10 concentration",
      "domain": "Air pollutants",
      "domain_code": "AIR",
      "medium": [
        "air"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "ug/m3",
      "kind": "concentration",
      "note": "Size fraction matters",
      "source_candidates": [
        "EPA_TRI",
        "OPENAQ",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "no2_ambient",
      "label": "Ambient NO2",
      "domain": "Air pollutants",
      "domain_code": "AIR",
      "medium": [
        "air"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "ug/m3",
      "kind": "concentration",
      "note": "Observed exposure proxy",
      "source_candidates": [
        "EPA_TRI",
        "OPENAQ",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "so2_ambient",
      "label": "Ambient SO2",
      "domain": "Air pollutants",
      "domain_code": "AIR",
      "medium": [
        "air"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "ug/m3",
      "kind": "concentration",
      "note": "Temporal averaging specified",
      "source_candidates": [
        "EPA_TRI",
        "OPENAQ",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "o3_ambient",
      "label": "Ground-level ozone",
      "domain": "Air pollutants",
      "domain_code": "AIR",
      "medium": [
        "air"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "ug/m3",
      "kind": "concentration",
      "note": "Secondary pollutant not single source",
      "source_candidates": [
        "EPA_TRI",
        "OPENAQ",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "pm25_stack",
      "label": "Direct PM2.5 release",
      "domain": "Air pollutants",
      "domain_code": "AIR",
      "medium": [
        "air"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "kg/year",
      "kind": "emission",
      "note": "Facility release to air",
      "source_candidates": [
        "EPA_TRI",
        "OPENAQ",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "nox_stack",
      "label": "NOx releases",
      "domain": "Air pollutants",
      "domain_code": "AIR",
      "medium": [
        "air"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "kg/year",
      "kind": "emission",
      "note": "Precursor, not same as NO2 ambient",
      "source_candidates": [
        "EPA_TRI",
        "OPENAQ",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "so2_stack",
      "label": "SO2 releases",
      "domain": "Air pollutants",
      "domain_code": "AIR",
      "medium": [
        "air"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "kg/year",
      "kind": "emission",
      "note": "Industrial source inventory",
      "source_candidates": [
        "EPA_TRI",
        "OPENAQ",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "voc_releases",
      "label": "VOC releases",
      "domain": "Air pollutants",
      "domain_code": "AIR",
      "medium": [
        "air"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "kg/year",
      "kind": "emission",
      "note": "Species and source inventory",
      "source_candidates": [
        "EPA_TRI",
        "OPENAQ",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "benzene_air",
      "label": "Benzene concentration",
      "domain": "Air pollutants",
      "domain_code": "AIR",
      "medium": [
        "air"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "ug/m3",
      "kind": "concentration",
      "note": "Carcinogenic hazard requires dose",
      "source_candidates": [
        "EPA_TRI",
        "OPENAQ",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "formaldehyde_air",
      "label": "Formaldehyde concentration",
      "domain": "Air pollutants",
      "domain_code": "AIR",
      "medium": [
        "air"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "ug/m3",
      "kind": "concentration",
      "note": "Different exposure contexts",
      "source_candidates": [
        "EPA_TRI",
        "OPENAQ",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "ammonia_air",
      "label": "Ammonia releases",
      "domain": "Air pollutants",
      "domain_code": "AIR",
      "medium": [
        "air"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "kg/year",
      "kind": "emission",
      "note": "PM precursor and local deposition",
      "source_candidates": [
        "EPA_TRI",
        "OPENAQ",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "black_carbon",
      "label": "Black carbon mass",
      "domain": "Air pollutants",
      "domain_code": "AIR",
      "medium": [
        "air"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "kg/year",
      "kind": "emission",
      "note": "Air quality and climate effects",
      "source_candidates": [
        "EPA_TRI",
        "OPENAQ",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "acid_deposition",
      "label": "Acid deposition",
      "domain": "Air pollutants",
      "domain_code": "AIR",
      "medium": [
        "air"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "kg/ha/year",
      "kind": "exposure",
      "note": "Requires source-attribution transport",
      "source_candidates": [
        "EPA_TRI",
        "OPENAQ",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "effluent_volume",
      "label": "Wastewater discharge volume",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "m3/year",
      "kind": "emission",
      "note": "Outfall and receiving body",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "water_contaminant_load",
      "label": "Water contaminant mass",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "kg/year",
      "kind": "emission",
      "note": "Chemical identity required",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "pfas_water",
      "label": "Specific PFAS in water",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "ng/L",
      "kind": "concentration",
      "note": "Separate individual compounds",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "mercury_water",
      "label": "Mercury in water",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "ug/L",
      "kind": "concentration",
      "note": "Speciation required",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "lead_water",
      "label": "Lead in water",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "ug/L",
      "kind": "concentration",
      "note": "Use sampling method",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "arsenic_water",
      "label": "Arsenic in water",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "ug/L",
      "kind": "concentration",
      "note": "Speciation and background",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "nitrate_water",
      "label": "Nitrate in water",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "mg/L",
      "kind": "concentration",
      "note": "Report nitrogen-equivalent definition",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "phosphate_water",
      "label": "Phosphate in water",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "mg/L",
      "kind": "concentration",
      "note": "Specify form and hydrology",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "bod5",
      "label": "Biochemical oxygen demand",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "mg/L",
      "kind": "concentration",
      "note": "Effluent water-quality indicator",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "cod",
      "label": "Chemical oxygen demand",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "mg/L",
      "kind": "concentration",
      "note": "Not a direct toxicity measure",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "dissolved_oxygen",
      "label": "Dissolved oxygen",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "mg/L",
      "kind": "concentration",
      "note": "Ecosystem endpoint proxy",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "tss",
      "label": "Total suspended solids",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "mg/L",
      "kind": "concentration",
      "note": "Sediment and particulate context",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "water_temperature",
      "label": "Thermal discharge anomaly",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "degC",
      "kind": "exposure",
      "note": "Refer to ambient baseline",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "microplastic_water",
      "label": "Microplastic particle count",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "particles/L",
      "kind": "concentration",
      "note": "Size and polymer methods vary",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "groundwater_plume",
      "label": "Groundwater plume extent",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "hectares",
      "kind": "stock",
      "note": "Requires hydrological model",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "water_withdrawal",
      "label": "Freshwater withdrawal",
      "domain": "Water & hydrology",
      "domain_code": "WATER",
      "medium": [
        "water"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "m3/year",
      "kind": "pressure",
      "note": "Not equal to toxic discharge",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "soil_lead",
      "label": "Lead in soil",
      "domain": "Soil & subsurface",
      "domain_code": "SOIL",
      "medium": [
        "soil",
        "water"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "mg/kg",
      "kind": "concentration",
      "note": "Background and bioavailability",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "soil_mercury",
      "label": "Mercury in soil",
      "domain": "Soil & subsurface",
      "domain_code": "SOIL",
      "medium": [
        "soil",
        "water"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "mg/kg",
      "kind": "concentration",
      "note": "Chemical form and terrain",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "soil_arsenic",
      "label": "Arsenic in soil",
      "domain": "Soil & subsurface",
      "domain_code": "SOIL",
      "medium": [
        "soil",
        "water"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "mg/kg",
      "kind": "concentration",
      "note": "Geological background",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "soil_cadmium",
      "label": "Cadmium in soil",
      "domain": "Soil & subsurface",
      "domain_code": "SOIL",
      "medium": [
        "soil",
        "water"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "mg/kg",
      "kind": "concentration",
      "note": "Crop uptake potential",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "soil_pfas",
      "label": "PFAS soil concentration",
      "domain": "Soil & subsurface",
      "domain_code": "SOIL",
      "medium": [
        "soil",
        "water"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "ug/kg",
      "kind": "concentration",
      "note": "Compound-specific analysis",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "soil_pesticide",
      "label": "Pesticide residues in soil",
      "domain": "Soil & subsurface",
      "domain_code": "SOIL",
      "medium": [
        "soil",
        "water"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "mg/kg",
      "kind": "concentration",
      "note": "Agent/metabolite ID",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "contaminated_area",
      "label": "Mapped contaminated land",
      "domain": "Soil & subsurface",
      "domain_code": "SOIL",
      "medium": [
        "soil",
        "water"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "hectares",
      "kind": "stock",
      "note": "Delineation and threshold",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "soil_erosion",
      "label": "Soil erosion mass",
      "domain": "Soil & subsurface",
      "domain_code": "SOIL",
      "medium": [
        "soil",
        "water"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "tonnes/year",
      "kind": "pressure",
      "note": "Attribution to management required",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "landfill_leachate",
      "label": "Leachate contaminant load",
      "domain": "Soil & subsurface",
      "domain_code": "SOIL",
      "medium": [
        "soil",
        "water"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "kg/year",
      "kind": "emission",
      "note": "Per landfill and chemical",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "subsurface_vapor",
      "label": "Subsurface vapor intrusion",
      "domain": "Soil & subsurface",
      "domain_code": "SOIL",
      "medium": [
        "soil",
        "water"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "ug/m3",
      "kind": "exposure",
      "note": "Transport and indoor air methods",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "soil_biodiversity",
      "label": "Soil biota community change",
      "domain": "Soil & subsurface",
      "domain_code": "SOIL",
      "medium": [
        "soil",
        "water"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "index",
      "kind": "ecology",
      "note": "Define reference community",
      "source_candidates": [
        "EPA_TRI",
        "CAN_NPRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "habitat_loss",
      "label": "Habitat conversion",
      "domain": "Wildlife & ecosystems",
      "domain_code": "ECOLOGY",
      "medium": [
        "biota",
        "water",
        "soil"
      ],
      "receptors": [
        "plants",
        "animals"
      ],
      "unit": "hectares",
      "kind": "pressure",
      "note": "Establish counterfactual and land tenure",
      "source_candidates": [
        "IUCN",
        "STATE_AIR",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "wetland_loss",
      "label": "Wetland area lost",
      "domain": "Wildlife & ecosystems",
      "domain_code": "ECOLOGY",
      "medium": [
        "biota",
        "water",
        "soil"
      ],
      "receptors": [
        "plants",
        "animals"
      ],
      "unit": "hectares",
      "kind": "pressure",
      "note": "Ecosystem type and timeframe",
      "source_candidates": [
        "IUCN",
        "STATE_AIR",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "species_abundance",
      "label": "Species population trend",
      "domain": "Wildlife & ecosystems",
      "domain_code": "ECOLOGY",
      "medium": [
        "biota",
        "water",
        "soil"
      ],
      "receptors": [
        "plants",
        "animals"
      ],
      "unit": "relative_index",
      "kind": "ecology",
      "note": "Species/site/time normalized",
      "source_candidates": [
        "IUCN",
        "STATE_AIR",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "species_richness",
      "label": "Species richness change",
      "domain": "Wildlife & ecosystems",
      "domain_code": "ECOLOGY",
      "medium": [
        "biota",
        "water",
        "soil"
      ],
      "receptors": [
        "plants",
        "animals"
      ],
      "unit": "species_count",
      "kind": "ecology",
      "note": "Sampling design and baseline",
      "source_candidates": [
        "IUCN",
        "STATE_AIR",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "fish_kill",
      "label": "Verified fish mortality count",
      "domain": "Wildlife & ecosystems",
      "domain_code": "ECOLOGY",
      "medium": [
        "biota",
        "water",
        "soil"
      ],
      "receptors": [
        "plants",
        "animals"
      ],
      "unit": "animals",
      "kind": "outcome",
      "note": "Event attribution required",
      "source_candidates": [
        "IUCN",
        "STATE_AIR",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "tissue_bioaccum",
      "label": "Tissue contaminant burden",
      "domain": "Wildlife & ecosystems",
      "domain_code": "ECOLOGY",
      "medium": [
        "biota",
        "water",
        "soil"
      ],
      "receptors": [
        "plants",
        "animals"
      ],
      "unit": "mg/kg",
      "kind": "exposure",
      "note": "Species and tissue",
      "source_candidates": [
        "IUCN",
        "STATE_AIR",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "ecotox_noec",
      "label": "No-observed-effect concentration",
      "domain": "Wildlife & ecosystems",
      "domain_code": "ECOLOGY",
      "medium": [
        "biota",
        "water",
        "soil"
      ],
      "receptors": [
        "plants",
        "animals"
      ],
      "unit": "mg/L",
      "kind": "hazard",
      "note": "Laboratory endpoint, not actual injury",
      "source_candidates": [
        "IUCN",
        "STATE_AIR",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "ecotox_lc50",
      "label": "Median lethal concentration",
      "domain": "Wildlife & ecosystems",
      "domain_code": "ECOLOGY",
      "medium": [
        "biota",
        "water",
        "soil"
      ],
      "receptors": [
        "plants",
        "animals"
      ],
      "unit": "mg/L",
      "kind": "hazard",
      "note": "Lab organism and duration",
      "source_candidates": [
        "IUCN",
        "STATE_AIR",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "eutrophication",
      "label": "Eutrophication response",
      "domain": "Wildlife & ecosystems",
      "domain_code": "ECOLOGY",
      "medium": [
        "biota",
        "water",
        "soil"
      ],
      "receptors": [
        "plants",
        "animals"
      ],
      "unit": "index",
      "kind": "ecology",
      "note": "Multiple nutrient sources",
      "source_candidates": [
        "IUCN",
        "STATE_AIR",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "habitat_fragment",
      "label": "Habitat fragmentation",
      "domain": "Wildlife & ecosystems",
      "domain_code": "ECOLOGY",
      "medium": [
        "biota",
        "water",
        "soil"
      ],
      "receptors": [
        "plants",
        "animals"
      ],
      "unit": "index",
      "kind": "pressure",
      "note": "Spatial methodology",
      "source_candidates": [
        "IUCN",
        "STATE_AIR",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "coral_bleaching",
      "label": "Coral bleaching area",
      "domain": "Wildlife & ecosystems",
      "domain_code": "ECOLOGY",
      "medium": [
        "biota",
        "water",
        "soil"
      ],
      "receptors": [
        "plants",
        "animals"
      ],
      "unit": "hectares",
      "kind": "outcome",
      "note": "Multiple causal forces",
      "source_candidates": [
        "IUCN",
        "STATE_AIR",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "restoration_survival",
      "label": "Restoration survival rate",
      "domain": "Wildlife & ecosystems",
      "domain_code": "ECOLOGY",
      "medium": [
        "biota",
        "water",
        "soil"
      ],
      "receptors": [
        "plants",
        "animals"
      ],
      "unit": "percent",
      "kind": "remediation",
      "note": "Follow-up years required",
      "source_candidates": [
        "IUCN",
        "STATE_AIR",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "pesticide_applied",
      "label": "Pesticide active ingredient applied",
      "domain": "Agriculture & food chains",
      "domain_code": "AGRICULTURE",
      "medium": [
        "soil",
        "water",
        "biota"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "kg/year",
      "kind": "pressure",
      "note": "Not total formulation mass",
      "source_candidates": [
        "FAOSTAT",
        "CAN_NPRI",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "herbicide_applied",
      "label": "Herbicide active ingredient used",
      "domain": "Agriculture & food chains",
      "domain_code": "AGRICULTURE",
      "medium": [
        "soil",
        "water",
        "biota"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "kg/year",
      "kind": "pressure",
      "note": "Chemical specificity required",
      "source_candidates": [
        "FAOSTAT",
        "CAN_NPRI",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "fertilizer_n",
      "label": "Synthetic nitrogen application",
      "domain": "Agriculture & food chains",
      "domain_code": "AGRICULTURE",
      "medium": [
        "soil",
        "water",
        "biota"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "kg_N/year",
      "kind": "pressure",
      "note": "Agricultural sector inputs",
      "source_candidates": [
        "FAOSTAT",
        "CAN_NPRI",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "fertilizer_p",
      "label": "Phosphorus application",
      "domain": "Agriculture & food chains",
      "domain_code": "AGRICULTURE",
      "medium": [
        "soil",
        "water",
        "biota"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "kg_P/year",
      "kind": "pressure",
      "note": "Unit basis explicit",
      "source_candidates": [
        "FAOSTAT",
        "CAN_NPRI",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "nutrient_runoff",
      "label": "Nutrient runoff load",
      "domain": "Agriculture & food chains",
      "domain_code": "AGRICULTURE",
      "medium": [
        "soil",
        "water",
        "biota"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "kg/year",
      "kind": "emission",
      "note": "Catchment model needed",
      "source_candidates": [
        "FAOSTAT",
        "CAN_NPRI",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "crop_residues",
      "label": "Crop contaminant residues",
      "domain": "Agriculture & food chains",
      "domain_code": "AGRICULTURE",
      "medium": [
        "soil",
        "water",
        "biota"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "mg/kg",
      "kind": "exposure",
      "note": "Food safety sampling",
      "source_candidates": [
        "FAOSTAT",
        "CAN_NPRI",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "crop_yield_loss",
      "label": "Crop yield effect",
      "domain": "Agriculture & food chains",
      "domain_code": "AGRICULTURE",
      "medium": [
        "soil",
        "water",
        "biota"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "tonnes/year",
      "kind": "outcome",
      "note": "Weather and soil confounders",
      "source_candidates": [
        "FAOSTAT",
        "CAN_NPRI",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "pollinator_trend",
      "label": "Pollinator abundance trend",
      "domain": "Agriculture & food chains",
      "domain_code": "AGRICULTURE",
      "medium": [
        "soil",
        "water",
        "biota"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "relative_index",
      "kind": "ecology",
      "note": "Time series and control",
      "source_candidates": [
        "FAOSTAT",
        "CAN_NPRI",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "livestock_exposure",
      "label": "Livestock pollutant burden",
      "domain": "Agriculture & food chains",
      "domain_code": "AGRICULTURE",
      "medium": [
        "soil",
        "water",
        "biota"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "mg/kg",
      "kind": "exposure",
      "note": "Feed and water pathways",
      "source_candidates": [
        "FAOSTAT",
        "CAN_NPRI",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "irrigation_quality",
      "label": "Irrigation water contaminant",
      "domain": "Agriculture & food chains",
      "domain_code": "AGRICULTURE",
      "medium": [
        "soil",
        "water",
        "biota"
      ],
      "receptors": [
        "plants",
        "animals",
        "humans"
      ],
      "unit": "mg/L",
      "kind": "concentration",
      "note": "Specify chemical",
      "source_candidates": [
        "FAOSTAT",
        "CAN_NPRI",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "pfas_release",
      "label": "Specified PFAS release mass",
      "domain": "Persistent chemicals & materials",
      "domain_code": "CHEMICALS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "kg/year",
      "kind": "emission",
      "note": "No undifferentiated PFAS total without coverage",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP",
        "CAN_NPRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "pcb_release",
      "label": "PCB release mass",
      "domain": "Persistent chemicals & materials",
      "domain_code": "CHEMICALS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "kg/year",
      "kind": "emission",
      "note": "Congener identity required",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP",
        "CAN_NPRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "dioxin_teq",
      "label": "Dioxin toxic equivalent",
      "domain": "Persistent chemicals & materials",
      "domain_code": "CHEMICALS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "g_TEQ/year",
      "kind": "emission",
      "note": "TEF basis must be disclosed",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP",
        "CAN_NPRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "organohalogen",
      "label": "Organohalogen release mass",
      "domain": "Persistent chemicals & materials",
      "domain_code": "CHEMICALS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "kg/year",
      "kind": "emission",
      "note": "Agent-specific differences",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP",
        "CAN_NPRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "metal_release",
      "label": "Specified metal release mass",
      "domain": "Persistent chemicals & materials",
      "domain_code": "CHEMICALS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "kg/year",
      "kind": "emission",
      "note": "Speciation and partition",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP",
        "CAN_NPRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "microplastic_release",
      "label": "Plastic particle releases",
      "domain": "Persistent chemicals & materials",
      "domain_code": "CHEMICALS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "particles/year",
      "kind": "emission",
      "note": "Sampling methods immature",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP",
        "CAN_NPRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "plastic_mass_leakage",
      "label": "Plastic leaked to environment",
      "domain": "Persistent chemicals & materials",
      "domain_code": "CHEMICALS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "tonnes/year",
      "kind": "pressure",
      "note": "Source attribution and leakage model",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP",
        "CAN_NPRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "radionuclide_activity",
      "label": "Radionuclide release activity",
      "domain": "Persistent chemicals & materials",
      "domain_code": "CHEMICALS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "Bq/year",
      "kind": "emission",
      "note": "Isotope, half-life, exposure route",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP",
        "CAN_NPRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "chemical_persistence",
      "label": "Environmental half-life",
      "domain": "Persistent chemicals & materials",
      "domain_code": "CHEMICALS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "days",
      "kind": "hazard",
      "note": "Medium and conditions",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP",
        "CAN_NPRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "bioaccum_factor",
      "label": "Bioaccumulation factor",
      "domain": "Persistent chemicals & materials",
      "domain_code": "CHEMICALS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "L/kg",
      "kind": "hazard",
      "note": "Species and compound-specific",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP",
        "CAN_NPRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "api_release",
      "label": "Active pharmaceutical ingredient discharge",
      "domain": "Pharmaceutical & antimicrobial",
      "domain_code": "PHARMA",
      "medium": [
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals"
      ],
      "unit": "kg/year",
      "kind": "emission",
      "note": "API identity and process",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "antibiotic_effluent",
      "label": "Antibiotic concentration in effluent",
      "domain": "Pharmaceutical & antimicrobial",
      "domain_code": "PHARMA",
      "medium": [
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals"
      ],
      "unit": "ug/L",
      "kind": "concentration",
      "note": "Agent specificity",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "hormone_residue",
      "label": "Hormone-active residue in water",
      "domain": "Pharmaceutical & antimicrobial",
      "domain_code": "PHARMA",
      "medium": [
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals"
      ],
      "unit": "ng/L",
      "kind": "concentration",
      "note": "Mechanistic potency varies",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "drug_metabolites",
      "label": "Drug metabolites in wastewater",
      "domain": "Pharmaceutical & antimicrobial",
      "domain_code": "PHARMA",
      "medium": [
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals"
      ],
      "unit": "ug/L",
      "kind": "concentration",
      "note": "Transformation products",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "amr_genes",
      "label": "Antimicrobial resistance gene abundance",
      "domain": "Pharmaceutical & antimicrobial",
      "domain_code": "PHARMA",
      "medium": [
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals"
      ],
      "unit": "copies/mL",
      "kind": "exposure",
      "note": "Sampling and gene specificity",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "amr_bacteria",
      "label": "Resistant organisms in effluent",
      "domain": "Pharmaceutical & antimicrobial",
      "domain_code": "PHARMA",
      "medium": [
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals"
      ],
      "unit": "CFU/100mL",
      "kind": "exposure",
      "note": "Species and resistance definition",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "hospital_waste",
      "label": "Medical waste treatment failures",
      "domain": "Pharmaceutical & antimicrobial",
      "domain_code": "PHARMA",
      "medium": [
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals"
      ],
      "unit": "events/year",
      "kind": "legal",
      "note": "Verified operational events",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "api_ecotoxicity",
      "label": "Drug-residue ecological endpoint",
      "domain": "Pharmaceutical & antimicrobial",
      "domain_code": "PHARMA",
      "medium": [
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans",
        "animals"
      ],
      "unit": "index",
      "kind": "ecology",
      "note": "Validated species endpoint",
      "source_candidates": [
        "EPA_TRI",
        "EEA_IEP"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "e_coli",
      "label": "E. coli concentration",
      "domain": "Biological & pathogen hazards",
      "domain_code": "BIOLOGICAL",
      "medium": [
        "water",
        "soil",
        "biota",
        "air"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "CFU/100mL",
      "kind": "concentration",
      "note": "Indicator not pathogen type",
      "source_candidates": [
        "CAN_NPRI",
        "EPA_ECHO"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "enterococci",
      "label": "Enterococci concentration",
      "domain": "Biological & pathogen hazards",
      "domain_code": "BIOLOGICAL",
      "medium": [
        "water",
        "soil",
        "biota",
        "air"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "CFU/100mL",
      "kind": "concentration",
      "note": "Water quality indicator",
      "source_candidates": [
        "CAN_NPRI",
        "EPA_ECHO"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "viral_marker",
      "label": "Viral RNA marker",
      "domain": "Biological & pathogen hazards",
      "domain_code": "BIOLOGICAL",
      "medium": [
        "water",
        "soil",
        "biota",
        "air"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "copies/L",
      "kind": "concentration",
      "note": "Detection does not equal infectivity",
      "source_candidates": [
        "CAN_NPRI",
        "EPA_ECHO"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "algal_toxin",
      "label": "Cyanotoxin concentration",
      "domain": "Biological & pathogen hazards",
      "domain_code": "BIOLOGICAL",
      "medium": [
        "water",
        "soil",
        "biota",
        "air"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "ug/L",
      "kind": "concentration",
      "note": "Species and specific toxin",
      "source_candidates": [
        "CAN_NPRI",
        "EPA_ECHO"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "biological_aerosol",
      "label": "Bioaerosol concentration",
      "domain": "Biological & pathogen hazards",
      "domain_code": "BIOLOGICAL",
      "medium": [
        "water",
        "soil",
        "biota",
        "air"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "CFU/m3",
      "kind": "concentration",
      "note": "Sampling and viable fraction",
      "source_candidates": [
        "CAN_NPRI",
        "EPA_ECHO"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "pathogen_event",
      "label": "Confirmed pathogen release events",
      "domain": "Biological & pathogen hazards",
      "domain_code": "BIOLOGICAL",
      "medium": [
        "water",
        "soil",
        "biota",
        "air"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "events/year",
      "kind": "outcome",
      "note": "Causal chain documented",
      "source_candidates": [
        "CAN_NPRI",
        "EPA_ECHO"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "zoonotic_spillover",
      "label": "Verified exposure-linked cases",
      "domain": "Biological & pathogen hazards",
      "domain_code": "BIOLOGICAL",
      "medium": [
        "water",
        "soil",
        "biota",
        "air"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "cases/year",
      "kind": "outcome",
      "note": "Not infer from mere presence",
      "source_candidates": [
        "CAN_NPRI",
        "EPA_ECHO"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "sewage_overflow",
      "label": "Untreated sewage overflow volume",
      "domain": "Biological & pathogen hazards",
      "domain_code": "BIOLOGICAL",
      "medium": [
        "water",
        "soil",
        "biota",
        "air"
      ],
      "receptors": [
        "humans",
        "animals",
        "plants"
      ],
      "unit": "m3/year",
      "kind": "emission",
      "note": "Outfall and episode",
      "source_candidates": [
        "CAN_NPRI",
        "EPA_ECHO"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "exposed_population",
      "label": "Modeled exposed people",
      "domain": "Human health & populations",
      "domain_code": "HUMAN",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "people",
      "kind": "exposure",
      "note": "Threshold and geographic overlap",
      "source_candidates": [
        "WHO_AIR",
        "LANCET",
        "STATE_AIR",
        "EPA_IRIS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "biomonitor_blood_lead",
      "label": "Blood lead concentration",
      "domain": "Human health & populations",
      "domain_code": "HUMAN",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "ug/dL",
      "kind": "exposure",
      "note": "Consent, sample and context",
      "source_candidates": [
        "WHO_AIR",
        "LANCET",
        "STATE_AIR",
        "EPA_IRIS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "excess_cases",
      "label": "Attributable excess cases",
      "domain": "Human health & populations",
      "domain_code": "HUMAN",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "cases/year",
      "kind": "model",
      "note": "Causal counterfactual required",
      "source_candidates": [
        "WHO_AIR",
        "LANCET",
        "STATE_AIR",
        "EPA_IRIS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "hospitalizations",
      "label": "Attributable hospital admissions",
      "domain": "Human health & populations",
      "domain_code": "HUMAN",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "admissions/year",
      "kind": "model",
      "note": "Outcome and model",
      "source_candidates": [
        "WHO_AIR",
        "LANCET",
        "STATE_AIR",
        "EPA_IRIS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "mortality",
      "label": "Attributable premature deaths",
      "domain": "Human health & populations",
      "domain_code": "HUMAN",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "deaths/year",
      "kind": "model",
      "note": "Cannot assign global burden to named producer",
      "source_candidates": [
        "WHO_AIR",
        "LANCET",
        "STATE_AIR",
        "EPA_IRIS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "dalys",
      "label": "Disability-adjusted life years",
      "domain": "Human health & populations",
      "domain_code": "HUMAN",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "DALYs/year",
      "kind": "model",
      "note": "Specific disease model with uncertainty",
      "source_candidates": [
        "WHO_AIR",
        "LANCET",
        "STATE_AIR",
        "EPA_IRIS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "yll",
      "label": "Years of life lost",
      "domain": "Human health & populations",
      "domain_code": "HUMAN",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "years/year",
      "kind": "model",
      "note": "Medical attributable burden",
      "source_candidates": [
        "WHO_AIR",
        "LANCET",
        "STATE_AIR",
        "EPA_IRIS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "cancer_risk",
      "label": "Incremental lifetime cancer risk",
      "domain": "Human health & populations",
      "domain_code": "HUMAN",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "probability",
      "kind": "model",
      "note": "Agent-specific dose response",
      "source_candidates": [
        "WHO_AIR",
        "LANCET",
        "STATE_AIR",
        "EPA_IRIS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "birth_outcomes",
      "label": "Adverse birth outcomes",
      "domain": "Human health & populations",
      "domain_code": "HUMAN",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "cases/year",
      "kind": "model",
      "note": "Latency and confounders",
      "source_candidates": [
        "WHO_AIR",
        "LANCET",
        "STATE_AIR",
        "EPA_IRIS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "developmental",
      "label": "Child neurodevelopmental outcomes",
      "domain": "Human health & populations",
      "domain_code": "HUMAN",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "index",
      "kind": "model",
      "note": "Clinical and exposure method",
      "source_candidates": [
        "WHO_AIR",
        "LANCET",
        "STATE_AIR",
        "EPA_IRIS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "heat_exposure",
      "label": "Population heat exposure",
      "domain": "Human health & populations",
      "domain_code": "HUMAN",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "person_days/year",
      "kind": "exposure",
      "note": "Climate attribution separate",
      "source_candidates": [
        "WHO_AIR",
        "LANCET",
        "STATE_AIR",
        "EPA_IRIS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "drinking_water_pop",
      "label": "Population served by affected supply",
      "domain": "Human health & populations",
      "domain_code": "HUMAN",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "people",
      "kind": "exposure",
      "note": "Supply exposure requires sampling",
      "source_candidates": [
        "WHO_AIR",
        "LANCET",
        "STATE_AIR",
        "EPA_IRIS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "worker_exposure",
      "label": "Occupational airborne concentration",
      "domain": "Occupational health",
      "domain_code": "WORKERS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "mg/m3",
      "kind": "exposure",
      "note": "Shift averaged and task-specific",
      "source_candidates": [
        "EPA_ECHO",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "worker_illness",
      "label": "Documented occupational illness",
      "domain": "Occupational health",
      "domain_code": "WORKERS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "cases/year",
      "kind": "outcome",
      "note": "Reporting definitions vary",
      "source_candidates": [
        "EPA_ECHO",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "worker_fatality",
      "label": "Occupational fatalities",
      "domain": "Occupational health",
      "domain_code": "WORKERS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "deaths/year",
      "kind": "outcome",
      "note": "Incident specificity",
      "source_candidates": [
        "EPA_ECHO",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "worker_injury",
      "label": "Recorded lost-time injuries",
      "domain": "Occupational health",
      "domain_code": "WORKERS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "injuries/year",
      "kind": "outcome",
      "note": "Severity and denominator",
      "source_candidates": [
        "EPA_ECHO",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "industrial_incident",
      "label": "Reportable industrial accidents",
      "domain": "Occupational health",
      "domain_code": "WORKERS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "events/year",
      "kind": "legal",
      "note": "Not synonymous with fault",
      "source_candidates": [
        "EPA_ECHO",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "process_safety",
      "label": "Process safety incident rate",
      "domain": "Occupational health",
      "domain_code": "WORKERS",
      "medium": [
        "air",
        "water",
        "soil",
        "biota"
      ],
      "receptors": [
        "humans"
      ],
      "unit": "events/million_hours",
      "kind": "outcome",
      "note": "Hours denominator",
      "source_candidates": [
        "EPA_ECHO",
        "EPA_TRI"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "remediation_cost",
      "label": "Documented remedial spending",
      "domain": "Remediation & restoration",
      "domain_code": "REMEDIATION",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "currency",
      "kind": "remediation",
      "note": "Currency, year, scope and realized vs planned",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "remedial_area",
      "label": "Land actively restored",
      "domain": "Remediation & restoration",
      "domain_code": "REMEDIATION",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "hectares",
      "kind": "remediation",
      "note": "Not equal to ecological recovery",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "pollutant_removed",
      "label": "Contaminant removed",
      "domain": "Remediation & restoration",
      "domain_code": "REMEDIATION",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "kg/year",
      "kind": "remediation",
      "note": "Disposal and transformation",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "groundwater_recovery",
      "label": "Aquifer restoration progress",
      "domain": "Remediation & restoration",
      "domain_code": "REMEDIATION",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "percent",
      "kind": "remediation",
      "note": "Specify baseline and goals",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "clean_water_connected",
      "label": "Population gaining safe supply",
      "domain": "Remediation & restoration",
      "domain_code": "REMEDIATION",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "people",
      "kind": "remediation",
      "note": "Verify water quality",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "restoration_duration",
      "label": "Time since restoration began",
      "domain": "Remediation & restoration",
      "domain_code": "REMEDIATION",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "years",
      "kind": "remediation",
      "note": "Milestone-specific",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "cleanup_gap",
      "label": "Unfunded cleanup liability estimate",
      "domain": "Remediation & restoration",
      "domain_code": "REMEDIATION",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "currency",
      "kind": "model",
      "note": "Legal vs financial estimate",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "residual_burden",
      "label": "Estimated residual pollutant burden",
      "domain": "Remediation & restoration",
      "domain_code": "REMEDIATION",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "kg",
      "kind": "model",
      "note": "Mass balance and uncertainty",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "disadvantaged_exposure",
      "label": "Exposure by population subgroup",
      "domain": "Equity & vulnerable receptors",
      "domain_code": "EQUITY",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "people",
      "kind": "exposure",
      "note": "Only aggregated, privacy-safe cohorts",
      "source_candidates": [
        "WHO_AIR",
        "STATE_AIR"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "school_proximity",
      "label": "Schools near monitored source",
      "domain": "Equity & vulnerable receptors",
      "domain_code": "EQUITY",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "facilities",
      "kind": "pressure",
      "note": "Proximity does not prove exposure",
      "source_candidates": [
        "WHO_AIR",
        "STATE_AIR"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "watershed_dependence",
      "label": "Communities relying on affected watershed",
      "domain": "Equity & vulnerable receptors",
      "domain_code": "EQUITY",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "people",
      "kind": "exposure",
      "note": "Water use and actual exposure",
      "source_candidates": [
        "WHO_AIR",
        "STATE_AIR"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "environmental_disparity",
      "label": "Difference in measured exposure between groups",
      "domain": "Equity & vulnerable receptors",
      "domain_code": "EQUITY",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "ug/m3",
      "kind": "model",
      "note": "Comparable population definitions",
      "source_candidates": [
        "WHO_AIR",
        "STATE_AIR"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "subsistence_food",
      "label": "Dietary exposure through local food",
      "domain": "Equity & vulnerable receptors",
      "domain_code": "EQUITY",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "ug/kg",
      "kind": "exposure",
      "note": "Consent and locally validated diets",
      "source_candidates": [
        "WHO_AIR",
        "STATE_AIR"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "cumulative_burden",
      "label": "Multi-source cumulative exposure",
      "domain": "Equity & vulnerable receptors",
      "domain_code": "EQUITY",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "index",
      "kind": "model",
      "note": "Not company-allocable without source apportionment",
      "source_candidates": [
        "WHO_AIR",
        "STATE_AIR"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "permit_exceedances",
      "label": "Recorded permit exceedances",
      "domain": "Governance & legal signals",
      "domain_code": "GOVERNANCE",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "events/year",
      "kind": "legal",
      "note": "Compliance status requires final decision",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA",
        "IND_NGT",
        "ID_PROPER",
        "RUS_NVOS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "inspection_findings",
      "label": "Official inspection findings",
      "domain": "Governance & legal signals",
      "domain_code": "GOVERNANCE",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "findings/year",
      "kind": "legal",
      "note": "Not conclusive guilt",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA",
        "IND_NGT",
        "ID_PROPER",
        "RUS_NVOS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "enforcement_actions",
      "label": "Regulatory enforcement actions",
      "domain": "Governance & legal signals",
      "domain_code": "GOVERNANCE",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "actions/year",
      "kind": "legal",
      "note": "Status, appeal and disposition",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA",
        "IND_NGT",
        "ID_PROPER",
        "RUS_NVOS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "court_judgments",
      "label": "Final court findings",
      "domain": "Governance & legal signals",
      "domain_code": "GOVERNANCE",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "judgments",
      "kind": "legal",
      "note": "Parties, jurisdiction, remedy",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA",
        "IND_NGT",
        "ID_PROPER",
        "RUS_NVOS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "civil_settlements",
      "label": "Documented settlement amount",
      "domain": "Governance & legal signals",
      "domain_code": "GOVERNANCE",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "currency",
      "kind": "legal",
      "note": "Not equivalent to admitted fault",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA",
        "IND_NGT",
        "ID_PROPER",
        "RUS_NVOS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "facility_permits",
      "label": "Permitted facilities with identified operator",
      "domain": "Governance & legal signals",
      "domain_code": "GOVERNANCE",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "facilities",
      "kind": "ownership",
      "note": "Permit coverage is incomplete",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA",
        "IND_NGT",
        "ID_PROPER",
        "RUS_NVOS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "ownership_links",
      "label": "Time-valid ownership links",
      "domain": "Governance & legal signals",
      "domain_code": "GOVERNANCE",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "relationships",
      "kind": "ownership",
      "note": "Legal entity resolution essential",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA",
        "IND_NGT",
        "ID_PROPER",
        "RUS_NVOS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "community_complaints",
      "label": "Officially recorded public complaints",
      "domain": "Governance & legal signals",
      "domain_code": "GOVERNANCE",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "complaints/year",
      "kind": "lead",
      "note": "Lead only, may be unsubstantiated",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA",
        "IND_NGT",
        "ID_PROPER",
        "RUS_NVOS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    },
    {
      "id": "document_disputes",
      "label": "Material evidence disputes",
      "domain": "Governance & legal signals",
      "domain_code": "GOVERNANCE",
      "medium": [
        "cross_media"
      ],
      "receptors": [
        "humans",
        "plants",
        "animals"
      ],
      "unit": "issues",
      "kind": "review",
      "note": "Log correction and response",
      "source_candidates": [
        "EPA_ECHO",
        "BRA_IBAMA",
        "IND_NGT",
        "ID_PROPER",
        "RUS_NVOS"
      ],
      "temporal": [
        "historical",
        "annual",
        "scenario"
      ],
      "status": "definition_only",
      "aggregation": "prohibited_without_explicit_boundary_and_method",
      "publication_requirements": [
        "dated_source",
        "unit",
        "system_boundary",
        "quality_grade",
        "uncertainty_review"
      ]
    }
  ],
  "sources": [
    {
      "id": "CM24",
      "name": "InfluenceMap Carbon Majors 2024",
      "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
      "domain": "climate",
      "country": "GLOBAL",
      "access": "report",
      "limitations": "published model; producer attribution, global boundaries; noncommercial reuse conditions",
      "license_status": "noncommercial-check-terms",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "EDGAR26",
      "name": "JRC EDGAR 2026",
      "url": "https://edgar.jrc.ec.europa.eu/report_2026",
      "domain": "climate",
      "country": "GLOBAL",
      "access": "report",
      "limitations": "territorial country inventory without LULUCF for displayed values",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "EPA_TRI",
      "name": "EPA Toxics Release Inventory",
      "url": "https://www.epa.gov/toxics-release-inventory-tri-program",
      "domain": "chemicals",
      "country": "US",
      "access": "portal",
      "limitations": "reporting thresholds, reported releases and transfers; not exposures",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "EPA_ECHO",
      "name": "EPA Enforcement and Compliance History Online",
      "url": "https://echo.epa.gov/",
      "domain": "legal",
      "country": "US",
      "access": "portal",
      "limitations": "enforcement and compliance history, not itself causation",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "EPA_IRIS",
      "name": "EPA Integrated Risk Information System",
      "url": "https://iris.epa.gov/",
      "domain": "human",
      "country": "US",
      "access": "method",
      "limitations": "chemical hazard evaluations; requires chemical-specific use",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "EEA_IEP",
      "name": "EEA Industrial Emissions Portal",
      "url": "https://industry.eea.europa.eu/industrial-emissions",
      "domain": "chemicals",
      "country": "EU",
      "access": "portal",
      "limitations": "selected European regulated facilities and thresholds",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "CLIMATE_TRACE",
      "name": "Climate TRACE",
      "url": "https://climatetrace.org/data",
      "domain": "climate",
      "country": "GLOBAL",
      "access": "data",
      "limitations": "remote and model-derived source emission estimates; verify vintage",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "OPENAQ",
      "name": "OpenAQ",
      "url": "https://openaq.org/platform/",
      "domain": "air",
      "country": "GLOBAL",
      "access": "data",
      "limitations": "ambient monitors with uneven spatial and temporal coverage",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "WHO_AIR",
      "name": "WHO Ambient outdoor air quality and health",
      "url": "https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health",
      "domain": "human",
      "country": "GLOBAL",
      "access": "report",
      "limitations": "population burden, not industrial facility attribution",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "LANCET",
      "name": "Lancet Commission pollution and health update",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11995256/",
      "domain": "human",
      "country": "GLOBAL",
      "access": "peer_review",
      "limitations": "GBD-based 2019 burden estimates; cannot assign to producer firms",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "CAN_NPRI",
      "name": "Canada National Pollutant Release Inventory",
      "url": "https://pollution-waste.canada.ca/national-release-inventory/",
      "domain": "chemicals",
      "country": "CA",
      "access": "portal",
      "limitations": "facility-level reports; 2025 currently preliminary",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "JPN_PRTR",
      "name": "Japan Pollutant Release and Transfer Register",
      "url": "https://www.env.go.jp/en/chemi/prtr/prtr.html",
      "domain": "chemicals",
      "country": "JP",
      "access": "portal",
      "limitations": "chemical substance coverage and reporting thresholds",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "CHN_PERMITS",
      "name": "China national discharge-permit platform",
      "url": "https://permit.mee.gov.cn/",
      "domain": "chemicals",
      "country": "CN",
      "access": "portal",
      "limitations": "permit and disclosed discharge values; language/access constraints",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "RUS_NVOS",
      "name": "Rosprirodnadzor NVOS facility register",
      "url": "https://rpn.gov.ru/activity/services/28169/",
      "domain": "facilities",
      "country": "RU",
      "access": "portal",
      "limitations": "registered facilities; not a comprehensive measured-release time series",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "BRA_IBAMA",
      "name": "Brazil IBAMA environmental enforcement public data",
      "url": "https://dadosabertos.ibama.gov.br/dataset/fiscalizacao-auto-de-infracao",
      "domain": "legal",
      "country": "BR",
      "access": "data",
      "limitations": "infraction notices do not always imply final, upheld wrongdoing",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "ID_PROPER",
      "name": "Indonesia PROPER environmental compliance program",
      "url": "https://proper.menlhk.go.id/proper/kriteria",
      "domain": "legal",
      "country": "ID",
      "access": "portal",
      "limitations": "compliance grades require interpretation and original record checking",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "IND_NGT",
      "name": "India National Green Tribunal case search",
      "url": "https://www.greentribunal.gov.in/judgementOrder/case-advance-search",
      "domain": "legal",
      "country": "IN",
      "access": "portal",
      "limitations": "case search has CAPTCHA; judgments not facility emissions",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "STATE_AIR",
      "name": "State of Global Air",
      "url": "https://www.stateofglobalair.org/data",
      "domain": "human",
      "country": "GLOBAL",
      "access": "data",
      "limitations": "population exposure and health burden modeled; not company attribution",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "UNECE_PRTR",
      "name": "UNECE PRTR protocol",
      "url": "https://prtr.unece.org/",
      "domain": "chemicals",
      "country": "GLOBAL",
      "access": "portal",
      "limitations": "register discovery; not a single harmonized global facility dataset",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "FAOSTAT",
      "name": "FAO statistical data",
      "url": "https://www.fao.org/faostat/en/#data",
      "domain": "agriculture",
      "country": "GLOBAL",
      "access": "portal",
      "limitations": "agricultural and land metrics, national aggregates",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "IUCN",
      "name": "IUCN Red List",
      "url": "https://www.iucnredlist.org/",
      "domain": "ecology",
      "country": "GLOBAL",
      "access": "portal",
      "limitations": "species conservation status; not company-linked impact",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    },
    {
      "id": "IPBES",
      "name": "IPBES assessments",
      "url": "https://www.ipbes.net/assessments",
      "domain": "ecology",
      "country": "GLOBAL",
      "access": "reports",
      "limitations": "ecosystem assessment context; not an industrial release record",
      "license_status": "review-before-automated-reuse",
      "ingestion_status": "research-link-only",
      "last_checked": "2026-11-06"
    }
  ],
  "countries": [
    {
      "code": "CN",
      "name": "China",
      "source_ids": [
        "CHN_PERMITS",
        "EDGAR26"
      ],
      "research_entry_point": "Permits and disclosed pollution categories; construct time-valid corporate ownership graph",
      "key_gaps": "Scale facility discharges, concentrations, non-climate health pathways, regional access",
      "workflow": "research_only",
      "published_individual_harm_estimates": 0,
      "verified_multi_hazard_dossiers": 0,
      "legal_clearance": "not_started",
      "facility_measurements_imported": 0,
      "seed_emissions_records": 11,
      "target_dossiers": 10,
      "coverage_slots_filled": 10,
      "coverage_note": "Emissions-only source records; not verified multi-hazard dossiers"
    },
    {
      "code": "US",
      "name": "United States",
      "source_ids": [
        "EPA_TRI",
        "EPA_ECHO",
        "EPA_IRIS",
        "CLIMATE_TRACE"
      ],
      "research_entry_point": "Facility-level TRI reporting and ECHO compliance chronology",
      "key_gaps": "Resolve hazardous-substance thresholds, downstream transport, injury and jurisdiction",
      "workflow": "research_only",
      "published_individual_harm_estimates": 0,
      "verified_multi_hazard_dossiers": 0,
      "legal_clearance": "not_started",
      "facility_measurements_imported": 0,
      "seed_emissions_records": 10,
      "target_dossiers": 10,
      "coverage_slots_filled": 10,
      "coverage_note": "Emissions-only source records; not verified multi-hazard dossiers"
    },
    {
      "code": "IN",
      "name": "India",
      "source_ids": [
        "IND_NGT",
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "research_entry_point": "NGT judgments and agency records as first-stage research leads",
      "key_gaps": "Need a verified facility-release portal, local unit standards, geocoded sites",
      "workflow": "research_only",
      "published_individual_harm_estimates": 0,
      "verified_multi_hazard_dossiers": 0,
      "legal_clearance": "not_started",
      "facility_measurements_imported": 0,
      "seed_emissions_records": 6,
      "target_dossiers": 10,
      "coverage_slots_filled": 6,
      "coverage_note": "Emissions-only source records; not verified multi-hazard dossiers"
    },
    {
      "code": "RU",
      "name": "Russia",
      "source_ids": [
        "RUS_NVOS",
        "EDGAR26"
      ],
      "research_entry_point": "NVOS facility identity and federal registration metadata",
      "key_gaps": "Public measurable release files, access constraints, source independence",
      "workflow": "research_only",
      "published_individual_harm_estimates": 0,
      "verified_multi_hazard_dossiers": 0,
      "legal_clearance": "not_started",
      "facility_measurements_imported": 0,
      "seed_emissions_records": 10,
      "target_dossiers": 10,
      "coverage_slots_filled": 10,
      "coverage_note": "Emissions-only source records; not verified multi-hazard dossiers"
    },
    {
      "code": "ID",
      "name": "Indonesia",
      "source_ids": [
        "ID_PROPER",
        "EDGAR26"
      ],
      "research_entry_point": "PROPER compliance criteria and company-level assessment leads",
      "key_gaps": "Primary release quantities, parent ownership, site coordinates, appeal status",
      "workflow": "research_only",
      "published_individual_harm_estimates": 0,
      "verified_multi_hazard_dossiers": 0,
      "legal_clearance": "not_started",
      "facility_measurements_imported": 0,
      "seed_emissions_records": 3,
      "target_dossiers": 10,
      "coverage_slots_filled": 3,
      "coverage_note": "Emissions-only source records; not verified multi-hazard dossiers"
    },
    {
      "code": "BR",
      "name": "Brazil",
      "source_ids": [
        "BRA_IBAMA",
        "EDGAR26"
      ],
      "research_entry_point": "IBAMA inspection notices, environmental embargoes and official data",
      "key_gaps": "Notice finality, industrial pollutant quantities, watershed causal chain",
      "workflow": "research_only",
      "published_individual_harm_estimates": 0,
      "verified_multi_hazard_dossiers": 0,
      "legal_clearance": "not_started",
      "facility_measurements_imported": 0,
      "seed_emissions_records": 1,
      "target_dossiers": 10,
      "coverage_slots_filled": 1,
      "coverage_note": "Emissions-only source records; not verified multi-hazard dossiers"
    },
    {
      "code": "IR",
      "name": "Iran",
      "source_ids": [
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "research_entry_point": "Territorial and asset-estimated climate baselines only",
      "key_gaps": "Public environmental release register and jurisdiction-specific counsel research unverified",
      "workflow": "research_only",
      "published_individual_harm_estimates": 0,
      "verified_multi_hazard_dossiers": 0,
      "legal_clearance": "not_started",
      "facility_measurements_imported": 0,
      "seed_emissions_records": 1,
      "target_dossiers": 10,
      "coverage_slots_filled": 1,
      "coverage_note": "Emissions-only source records; not verified multi-hazard dossiers"
    },
    {
      "code": "JP",
      "name": "Japan",
      "source_ids": [
        "JPN_PRTR",
        "EDGAR26"
      ],
      "research_entry_point": "Japan PRTR chemical-release and transfer disclosures",
      "key_gaps": "Link company/facility identifiers and outcome-specific human/ecological effects",
      "workflow": "research_only",
      "published_individual_harm_estimates": 0,
      "verified_multi_hazard_dossiers": 0,
      "legal_clearance": "not_started",
      "facility_measurements_imported": 0,
      "seed_emissions_records": 2,
      "target_dossiers": 10,
      "coverage_slots_filled": 2,
      "coverage_note": "Emissions-only source records; not verified multi-hazard dossiers"
    },
    {
      "code": "SA",
      "name": "Saudi Arabia",
      "source_ids": [
        "EDGAR26",
        "CLIMATE_TRACE"
      ],
      "research_entry_point": "Country emissions and asset-level climate estimation baseline",
      "key_gaps": "Verified local industrial release and enforcement records missing from catalogue",
      "workflow": "research_only",
      "published_individual_harm_estimates": 0,
      "verified_multi_hazard_dossiers": 0,
      "legal_clearance": "not_started",
      "facility_measurements_imported": 0,
      "seed_emissions_records": 1,
      "target_dossiers": 10,
      "coverage_slots_filled": 1,
      "coverage_note": "Emissions-only source records; not verified multi-hazard dossiers"
    },
    {
      "code": "CA",
      "name": "Canada",
      "source_ids": [
        "CAN_NPRI",
        "EDGAR26"
      ],
      "research_entry_point": "NPRI facility-level air/water/land and cross-program data",
      "key_gaps": "2025 NPRI preliminary data; use reviewed vintages for comparisons",
      "workflow": "research_only",
      "published_individual_harm_estimates": 0,
      "verified_multi_hazard_dossiers": 0,
      "legal_clearance": "not_started",
      "facility_measurements_imported": 0,
      "seed_emissions_records": 5,
      "target_dossiers": 10,
      "coverage_slots_filled": 5,
      "coverage_note": "Emissions-only source records; not verified multi-hazard dossiers"
    }
  ]
};
