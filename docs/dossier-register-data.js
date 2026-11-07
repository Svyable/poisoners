/* GENERATED / Dossier evidence subset; no certified injury claims. */
window.POISON_DOSSIERS = {
  "version": "3.0.0",
  "as_of": "2026-11-07",
  "disclaimer": "These are source-linked climate producer observations and research tasks, not measured toxic injury, a composite Poison Index or assertions of unlawful conduct.",
  "gate_definitions": [
    {
      "id": "source",
      "label": "Documented source",
      "status": "linked",
      "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
    },
    {
      "id": "entity",
      "label": "Legal entity",
      "status": "open",
      "description": "Need independently verified legal name, registration and ownership effective dates"
    },
    {
      "id": "facility",
      "label": "Facility attribution",
      "status": "open",
      "description": "Need named facility IDs, geographies and source-to-asset boundaries"
    },
    {
      "id": "release",
      "label": "Chemical release",
      "status": "open",
      "description": "Need site-specific chemical identities and air/water/soil release measurements"
    },
    {
      "id": "exposure",
      "label": "Exposure pathway",
      "status": "open",
      "description": "Need fate/transport, monitored exposure and receptor baselines"
    },
    {
      "id": "outcome",
      "label": "Attributable outcome",
      "status": "open",
      "description": "Need endpoint-specific counterfactual and independent scientific review"
    },
    {
      "id": "counsel",
      "label": "Legal assessment",
      "status": "open",
      "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
    }
  ],
  "totals": {
    "company_records": 50,
    "countries": 10,
    "source_linked_greenhouse_gas_records": 50,
    "verified_multi_hazard_dossiers": 0,
    "verified_human_harm_estimates": 0,
    "counsel_authorized_actions": 0,
    "documented_historical_comparators": 4
  },
  "dossiers": [
    {
      "id": "saudi-aramco",
      "company": "Saudi Aramco",
      "sector": "Oil & gas",
      "home_country_code": "SA",
      "home_country": "Saudi Arabia",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 1786,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 72457,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-saudi-aramco",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Country emissions and asset-level climate estimation baseline",
        "key_gaps": "Verified local industrial release and enforcement records missing from catalogue",
        "source_portals": [
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "coal-india",
      "company": "Coal India",
      "sector": "Coal",
      "home_country_code": "IN",
      "home_country": "India",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 1684,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 35221,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-coal-india",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NGT judgments and agency records as first-stage research leads",
        "key_gaps": "Need a verified facility-release portal, local unit standards, geocoded sites",
        "source_portals": [
          {
            "id": "IND_NGT",
            "name": "India National Green Tribunal case search",
            "url": "https://www.greentribunal.gov.in/judgementOrder/case-advance-search",
            "limitations": "case search has CAPTCHA; judgments not facility emissions"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "chn-energy",
      "company": "CHN Energy",
      "sector": "Coal & power",
      "home_country_code": "CN",
      "home_country": "China",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 1679,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 25231,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-chn-energy",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Permits and disclosed pollution categories; construct time-valid corporate ownership graph",
        "key_gaps": "Scale facility discharges, concentrations, non-climate health pathways, regional access",
        "source_portals": [
          {
            "id": "CHN_PERMITS",
            "name": "China national discharge-permit platform",
            "url": "https://permit.mee.gov.cn/",
            "limitations": "permit and disclosed discharge values; language/access constraints"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "national-iranian-oil-company",
      "company": "National Iranian Oil Company",
      "sector": "Oil & gas",
      "home_country_code": "IR",
      "home_country": "Iran",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 1387,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 45826,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-national-iranian-oil-company",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Territorial and asset-estimated climate baselines only",
        "key_gaps": "Public environmental release register and jurisdiction-specific counsel research unverified",
        "source_portals": [
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "gazprom",
      "company": "Gazprom",
      "sector": "Oil & gas",
      "home_country_code": "RU",
      "home_country": "Russia",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 1293,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 53116,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-gazprom",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NVOS facility identity and federal registration metadata",
        "key_gaps": "Public measurable release files, access constraints, source independence",
        "source_portals": [
          {
            "id": "RUS_NVOS",
            "name": "Rosprirodnadzor NVOS facility register",
            "url": "https://rpn.gov.ru/activity/services/28169/",
            "limitations": "registered facilities; not a comprehensive measured-release time series"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "jinneng-group",
      "company": "Jinneng Group",
      "sector": "Coal",
      "home_country_code": "CN",
      "home_country": "China",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 1129,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-jinneng-group",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Permits and disclosed pollution categories; construct time-valid corporate ownership graph",
        "key_gaps": "Scale facility discharges, concentrations, non-climate health pathways, regional access",
        "source_portals": [
          {
            "id": "CHN_PERMITS",
            "name": "China national discharge-permit platform",
            "url": "https://permit.mee.gov.cn/",
            "limitations": "permit and disclosed discharge values; language/access constraints"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "rosneft",
      "company": "Rosneft",
      "sector": "Oil & gas",
      "home_country_code": "RU",
      "home_country": "Russia",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 763,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-rosneft",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NVOS facility identity and federal registration metadata",
        "key_gaps": "Public measurable release files, access constraints, source independence",
        "source_portals": [
          {
            "id": "RUS_NVOS",
            "name": "Rosprirodnadzor NVOS facility register",
            "url": "https://rpn.gov.ru/activity/services/28169/",
            "limitations": "registered facilities; not a comprehensive measured-release time series"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "cnpc",
      "company": "CNPC",
      "sector": "Oil & gas",
      "home_country_code": "CN",
      "home_country": "China",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 750,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 20434,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-cnpc",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Permits and disclosed pollution categories; construct time-valid corporate ownership graph",
        "key_gaps": "Scale facility discharges, concentrations, non-climate health pathways, regional access",
        "source_portals": [
          {
            "id": "CHN_PERMITS",
            "name": "China national discharge-permit platform",
            "url": "https://permit.mee.gov.cn/",
            "limitations": "permit and disclosed discharge values; language/access constraints"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "shandong-energy",
      "company": "Shandong Energy",
      "sector": "Coal",
      "home_country_code": "CN",
      "home_country": "China",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 750,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-shandong-energy",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Permits and disclosed pollution categories; construct time-valid corporate ownership graph",
        "key_gaps": "Scale facility discharges, concentrations, non-climate health pathways, regional access",
        "source_portals": [
          {
            "id": "CHN_PERMITS",
            "name": "China national discharge-permit platform",
            "url": "https://permit.mee.gov.cn/",
            "limitations": "permit and disclosed discharge values; language/access constraints"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "china-national-coal-group",
      "company": "China National Coal Group",
      "sector": "Coal",
      "home_country_code": "CN",
      "home_country": "China",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 732,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-china-national-coal-group",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Permits and disclosed pollution categories; construct time-valid corporate ownership graph",
        "key_gaps": "Scale facility discharges, concentrations, non-climate health pathways, regional access",
        "source_portals": [
          {
            "id": "CHN_PERMITS",
            "name": "China national discharge-permit platform",
            "url": "https://permit.mee.gov.cn/",
            "limitations": "permit and disclosed discharge values; language/access constraints"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "shaanxi-coal-and-chemical-industry-group",
      "company": "Shaanxi Coal and Chemical Industry Group",
      "sector": "Coal & chemicals",
      "home_country_code": "CN",
      "home_country": "China",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 694,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-shaanxi-coal-and-chemical-industry-group",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Permits and disclosed pollution categories; construct time-valid corporate ownership graph",
        "key_gaps": "Scale facility discharges, concentrations, non-climate health pathways, regional access",
        "source_portals": [
          {
            "id": "CHN_PERMITS",
            "name": "China national discharge-permit platform",
            "url": "https://permit.mee.gov.cn/",
            "limitations": "permit and disclosed discharge values; language/access constraints"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "exxonmobil",
      "company": "ExxonMobil",
      "sector": "Oil & gas",
      "home_country_code": "US",
      "home_country": "United States",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 677,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 57458,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-exxonmobil",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Facility-level TRI reporting and ECHO compliance chronology",
        "key_gaps": "Resolve hazardous-substance thresholds, downstream transport, injury and jurisdiction",
        "source_portals": [
          {
            "id": "EPA_TRI",
            "name": "EPA Toxics Release Inventory",
            "url": "https://www.epa.gov/toxics-release-inventory-tri-program",
            "limitations": "reporting thresholds, reported releases and transfers; not exposures"
          },
          {
            "id": "EPA_ECHO",
            "name": "EPA Enforcement and Compliance History Online",
            "url": "https://echo.epa.gov/",
            "limitations": "enforcement and compliance history, not itself causation"
          },
          {
            "id": "EPA_IRIS",
            "name": "EPA Integrated Risk Information System",
            "url": "https://iris.epa.gov/",
            "limitations": "chemical hazard evaluations; requires chemical-specific use"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "chevron",
      "company": "Chevron",
      "sector": "Oil & gas",
      "home_country_code": "US",
      "home_country": "United States",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 577,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 62503,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-chevron",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Facility-level TRI reporting and ECHO compliance chronology",
        "key_gaps": "Resolve hazardous-substance thresholds, downstream transport, injury and jurisdiction",
        "source_portals": [
          {
            "id": "EPA_TRI",
            "name": "EPA Toxics Release Inventory",
            "url": "https://www.epa.gov/toxics-release-inventory-tri-program",
            "limitations": "reporting thresholds, reported releases and transfers; not exposures"
          },
          {
            "id": "EPA_ECHO",
            "name": "EPA Enforcement and Compliance History Online",
            "url": "https://echo.epa.gov/",
            "limitations": "enforcement and compliance history, not itself causation"
          },
          {
            "id": "EPA_IRIS",
            "name": "EPA Integrated Risk Information System",
            "url": "https://iris.epa.gov/",
            "limitations": "chemical hazard evaluations; requires chemical-specific use"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "shanxi-coking-coal-group",
      "company": "Shanxi Coking Coal Group",
      "sector": "Coal",
      "home_country_code": "CN",
      "home_country": "China",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 540,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-shanxi-coking-coal-group",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Permits and disclosed pollution categories; construct time-valid corporate ownership graph",
        "key_gaps": "Scale facility discharges, concentrations, non-climate health pathways, regional access",
        "source_portals": [
          {
            "id": "CHN_PERMITS",
            "name": "China national discharge-permit platform",
            "url": "https://permit.mee.gov.cn/",
            "limitations": "permit and disclosed discharge values; language/access constraints"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "petrobras",
      "company": "Petrobras",
      "sector": "Oil & gas",
      "home_country_code": "BR",
      "home_country": "Brazil",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 400,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-petrobras",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "IBAMA inspection notices, environmental embargoes and official data",
        "key_gaps": "Notice finality, industrial pollutant quantities, watershed causal chain",
        "source_portals": [
          {
            "id": "BRA_IBAMA",
            "name": "Brazil IBAMA environmental enforcement public data",
            "url": "https://dadosabertos.ibama.gov.br/dataset/fiscalizacao-auto-de-infracao",
            "limitations": "infraction notices do not always imply final, upheld wrongdoing"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "conocophillips",
      "company": "ConocoPhillips",
      "sector": "Oil & gas",
      "home_country_code": "US",
      "home_country": "United States",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 352,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 24713,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-conocophillips",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Facility-level TRI reporting and ECHO compliance chronology",
        "key_gaps": "Resolve hazardous-substance thresholds, downstream transport, injury and jurisdiction",
        "source_portals": [
          {
            "id": "EPA_TRI",
            "name": "EPA Toxics Release Inventory",
            "url": "https://www.epa.gov/toxics-release-inventory-tri-program",
            "limitations": "reporting thresholds, reported releases and transfers; not exposures"
          },
          {
            "id": "EPA_ECHO",
            "name": "EPA Enforcement and Compliance History Online",
            "url": "https://echo.epa.gov/",
            "limitations": "enforcement and compliance history, not itself causation"
          },
          {
            "id": "EPA_IRIS",
            "name": "EPA Integrated Risk Information System",
            "url": "https://iris.epa.gov/",
            "limitations": "chemical hazard evaluations; requires chemical-specific use"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "lukoil",
      "company": "Lukoil",
      "sector": "Oil & gas",
      "home_country_code": "RU",
      "home_country": "Russia",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 323,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-lukoil",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NVOS facility identity and federal registration metadata",
        "key_gaps": "Public measurable release files, access constraints, source independence",
        "source_portals": [
          {
            "id": "RUS_NVOS",
            "name": "Rosprirodnadzor NVOS facility register",
            "url": "https://rpn.gov.ru/activity/services/28169/",
            "limitations": "registered facilities; not a comprehensive measured-release time series"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "china-huaneng-group",
      "company": "China Huaneng Group",
      "sector": "Power",
      "home_country_code": "CN",
      "home_country": "China",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 300,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-china-huaneng-group",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Permits and disclosed pollution categories; construct time-valid corporate ownership graph",
        "key_gaps": "Scale facility discharges, concentrations, non-climate health pathways, regional access",
        "source_portals": [
          {
            "id": "CHN_PERMITS",
            "name": "China national discharge-permit platform",
            "url": "https://permit.mee.gov.cn/",
            "limitations": "permit and disclosed discharge values; language/access constraints"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "cnooc",
      "company": "CNOOC",
      "sector": "Oil & gas",
      "home_country_code": "CN",
      "home_country": "China",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 293,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-cnooc",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Permits and disclosed pollution categories; construct time-valid corporate ownership graph",
        "key_gaps": "Scale facility discharges, concentrations, non-climate health pathways, regional access",
        "source_portals": [
          {
            "id": "CHN_PERMITS",
            "name": "China national discharge-permit platform",
            "url": "https://permit.mee.gov.cn/",
            "limitations": "permit and disclosed discharge values; language/access constraints"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "peabody-energy",
      "company": "Peabody Energy",
      "sector": "Coal",
      "home_country_code": "US",
      "home_country": "United States",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 261,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-peabody-energy",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Facility-level TRI reporting and ECHO compliance chronology",
        "key_gaps": "Resolve hazardous-substance thresholds, downstream transport, injury and jurisdiction",
        "source_portals": [
          {
            "id": "EPA_TRI",
            "name": "EPA Toxics Release Inventory",
            "url": "https://www.epa.gov/toxics-release-inventory-tri-program",
            "limitations": "reporting thresholds, reported releases and transfers; not exposures"
          },
          {
            "id": "EPA_ECHO",
            "name": "EPA Enforcement and Compliance History Online",
            "url": "https://echo.epa.gov/",
            "limitations": "enforcement and compliance history, not itself causation"
          },
          {
            "id": "EPA_IRIS",
            "name": "EPA Integrated Risk Information System",
            "url": "https://iris.epa.gov/",
            "limitations": "chemical hazard evaluations; requires chemical-specific use"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "luan-chemical-group",
      "company": "Luan Chemical Group",
      "sector": "Coal & chemicals",
      "home_country_code": "CN",
      "home_country": "China",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 259,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-luan-chemical-group",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Permits and disclosed pollution categories; construct time-valid corporate ownership graph",
        "key_gaps": "Scale facility discharges, concentrations, non-climate health pathways, regional access",
        "source_portals": [
          {
            "id": "CHN_PERMITS",
            "name": "China national discharge-permit platform",
            "url": "https://permit.mee.gov.cn/",
            "limitations": "permit and disclosed discharge values; language/access constraints"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "novatek",
      "company": "Novatek",
      "sector": "Oil & gas",
      "home_country_code": "RU",
      "home_country": "Russia",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 257,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-novatek",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NVOS facility identity and federal registration metadata",
        "key_gaps": "Public measurable release files, access constraints, source independence",
        "source_portals": [
          {
            "id": "RUS_NVOS",
            "name": "Rosprirodnadzor NVOS facility register",
            "url": "https://rpn.gov.ru/activity/services/28169/",
            "limitations": "registered facilities; not a comprehensive measured-release time series"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "suek",
      "company": "SUEK",
      "sector": "Coal",
      "home_country_code": "RU",
      "home_country": "Russia",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 256,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-suek",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NVOS facility identity and federal registration metadata",
        "key_gaps": "Public measurable release files, access constraints, source independence",
        "source_portals": [
          {
            "id": "RUS_NVOS",
            "name": "Rosprirodnadzor NVOS facility register",
            "url": "https://rpn.gov.ru/activity/services/28169/",
            "limitations": "registered facilities; not a comprehensive measured-release time series"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "sinopec",
      "company": "Sinopec",
      "sector": "Oil & gas",
      "home_country_code": "CN",
      "home_country": "China",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 214,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-sinopec",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Permits and disclosed pollution categories; construct time-valid corporate ownership graph",
        "key_gaps": "Scale facility discharges, concentrations, non-climate health pathways, regional access",
        "source_portals": [
          {
            "id": "CHN_PERMITS",
            "name": "China national discharge-permit platform",
            "url": "https://permit.mee.gov.cn/",
            "limitations": "permit and disclosed discharge values; language/access constraints"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "occidental-petroleum",
      "company": "Occidental Petroleum",
      "sector": "Oil & gas",
      "home_country_code": "US",
      "home_country": "United States",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 209,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-occidental-petroleum",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Facility-level TRI reporting and ECHO compliance chronology",
        "key_gaps": "Resolve hazardous-substance thresholds, downstream transport, injury and jurisdiction",
        "source_portals": [
          {
            "id": "EPA_TRI",
            "name": "EPA Toxics Release Inventory",
            "url": "https://www.epa.gov/toxics-release-inventory-tri-program",
            "limitations": "reporting thresholds, reported releases and transfers; not exposures"
          },
          {
            "id": "EPA_ECHO",
            "name": "EPA Enforcement and Compliance History Online",
            "url": "https://echo.epa.gov/",
            "limitations": "enforcement and compliance history, not itself causation"
          },
          {
            "id": "EPA_IRIS",
            "name": "EPA Integrated Risk Information System",
            "url": "https://iris.epa.gov/",
            "limitations": "chemical hazard evaluations; requires chemical-specific use"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "core-natural-resources",
      "company": "Core Natural Resources",
      "sector": "Coal",
      "home_country_code": "US",
      "home_country": "United States",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 181,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-core-natural-resources",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Facility-level TRI reporting and ECHO compliance chronology",
        "key_gaps": "Resolve hazardous-substance thresholds, downstream transport, injury and jurisdiction",
        "source_portals": [
          {
            "id": "EPA_TRI",
            "name": "EPA Toxics Release Inventory",
            "url": "https://www.epa.gov/toxics-release-inventory-tri-program",
            "limitations": "reporting thresholds, reported releases and transfers; not exposures"
          },
          {
            "id": "EPA_ECHO",
            "name": "EPA Enforcement and Compliance History Online",
            "url": "https://echo.epa.gov/",
            "limitations": "enforcement and compliance history, not itself causation"
          },
          {
            "id": "EPA_IRIS",
            "name": "EPA Integrated Risk Information System",
            "url": "https://iris.epa.gov/",
            "limitations": "chemical hazard evaluations; requires chemical-specific use"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "expand-energy",
      "company": "Expand Energy",
      "sector": "Oil & gas",
      "home_country_code": "US",
      "home_country": "United States",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 181,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-expand-energy",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Facility-level TRI reporting and ECHO compliance chronology",
        "key_gaps": "Resolve hazardous-substance thresholds, downstream transport, injury and jurisdiction",
        "source_portals": [
          {
            "id": "EPA_TRI",
            "name": "EPA Toxics Release Inventory",
            "url": "https://www.epa.gov/toxics-release-inventory-tri-program",
            "limitations": "reporting thresholds, reported releases and transfers; not exposures"
          },
          {
            "id": "EPA_ECHO",
            "name": "EPA Enforcement and Compliance History Online",
            "url": "https://echo.epa.gov/",
            "limitations": "enforcement and compliance history, not itself causation"
          },
          {
            "id": "EPA_IRIS",
            "name": "EPA Integrated Risk Information System",
            "url": "https://iris.epa.gov/",
            "limitations": "chemical hazard evaluations; requires chemical-specific use"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "eqt-corporation",
      "company": "EQT Corporation",
      "sector": "Oil & gas",
      "home_country_code": "US",
      "home_country": "United States",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 162,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-eqt-corporation",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Facility-level TRI reporting and ECHO compliance chronology",
        "key_gaps": "Resolve hazardous-substance thresholds, downstream transport, injury and jurisdiction",
        "source_portals": [
          {
            "id": "EPA_TRI",
            "name": "EPA Toxics Release Inventory",
            "url": "https://www.epa.gov/toxics-release-inventory-tri-program",
            "limitations": "reporting thresholds, reported releases and transfers; not exposures"
          },
          {
            "id": "EPA_ECHO",
            "name": "EPA Enforcement and Compliance History Online",
            "url": "https://echo.epa.gov/",
            "limitations": "enforcement and compliance history, not itself causation"
          },
          {
            "id": "EPA_IRIS",
            "name": "EPA Integrated Risk Information System",
            "url": "https://iris.epa.gov/",
            "limitations": "chemical hazard evaluations; requires chemical-specific use"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "eog-resources",
      "company": "EOG Resources",
      "sector": "Oil & gas",
      "home_country_code": "US",
      "home_country": "United States",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 159,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-eog-resources",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Facility-level TRI reporting and ECHO compliance chronology",
        "key_gaps": "Resolve hazardous-substance thresholds, downstream transport, injury and jurisdiction",
        "source_portals": [
          {
            "id": "EPA_TRI",
            "name": "EPA Toxics Release Inventory",
            "url": "https://www.epa.gov/toxics-release-inventory-tri-program",
            "limitations": "reporting thresholds, reported releases and transfers; not exposures"
          },
          {
            "id": "EPA_ECHO",
            "name": "EPA Enforcement and Compliance History Online",
            "url": "https://echo.epa.gov/",
            "limitations": "enforcement and compliance history, not itself causation"
          },
          {
            "id": "EPA_IRIS",
            "name": "EPA Integrated Risk Information System",
            "url": "https://iris.epa.gov/",
            "limitations": "chemical hazard evaluations; requires chemical-specific use"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "devon-energy",
      "company": "Devon Energy",
      "sector": "Oil & gas",
      "home_country_code": "US",
      "home_country": "United States",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 110,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-devon-energy",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Facility-level TRI reporting and ECHO compliance chronology",
        "key_gaps": "Resolve hazardous-substance thresholds, downstream transport, injury and jurisdiction",
        "source_portals": [
          {
            "id": "EPA_TRI",
            "name": "EPA Toxics Release Inventory",
            "url": "https://www.epa.gov/toxics-release-inventory-tri-program",
            "limitations": "reporting thresholds, reported releases and transfers; not exposures"
          },
          {
            "id": "EPA_ECHO",
            "name": "EPA Enforcement and Compliance History Online",
            "url": "https://echo.epa.gov/",
            "limitations": "enforcement and compliance history, not itself causation"
          },
          {
            "id": "EPA_IRIS",
            "name": "EPA Integrated Risk Information System",
            "url": "https://iris.epa.gov/",
            "limitations": "chemical hazard evaluations; requires chemical-specific use"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "adani-group",
      "company": "Adani Group",
      "sector": "Coal",
      "home_country_code": "IN",
      "home_country": "India",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 139,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-adani-group",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NGT judgments and agency records as first-stage research leads",
        "key_gaps": "Need a verified facility-release portal, local unit standards, geocoded sites",
        "source_portals": [
          {
            "id": "IND_NGT",
            "name": "India National Green Tribunal case search",
            "url": "https://www.greentribunal.gov.in/judgementOrder/case-advance-search",
            "limitations": "case search has CAPTCHA; judgments not facility emissions"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "singareni-collieries",
      "company": "Singareni Collieries",
      "sector": "Coal",
      "home_country_code": "IN",
      "home_country": "India",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 138,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 3569,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-singareni-collieries",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NGT judgments and agency records as first-stage research leads",
        "key_gaps": "Need a verified facility-release portal, local unit standards, geocoded sites",
        "source_portals": [
          {
            "id": "IND_NGT",
            "name": "India National Green Tribunal case search",
            "url": "https://www.greentribunal.gov.in/judgementOrder/case-advance-search",
            "limitations": "case search has CAPTCHA; judgments not facility emissions"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "ongc",
      "company": "ONGC",
      "sector": "Oil & gas",
      "home_country_code": "IN",
      "home_country": "India",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 115,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 6150,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-ongc",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NGT judgments and agency records as first-stage research leads",
        "key_gaps": "Need a verified facility-release portal, local unit standards, geocoded sites",
        "source_portals": [
          {
            "id": "IND_NGT",
            "name": "India National Green Tribunal case search",
            "url": "https://www.greentribunal.gov.in/judgementOrder/case-advance-search",
            "limitations": "case search has CAPTCHA; judgments not facility emissions"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "ntpc",
      "company": "NTPC",
      "sector": "Power",
      "home_country_code": "IN",
      "home_country": "India",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 108,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-ntpc",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NGT judgments and agency records as first-stage research leads",
        "key_gaps": "Need a verified facility-release portal, local unit standards, geocoded sites",
        "source_portals": [
          {
            "id": "IND_NGT",
            "name": "India National Green Tribunal case search",
            "url": "https://www.greentribunal.gov.in/judgementOrder/case-advance-search",
            "limitations": "case search has CAPTCHA; judgments not facility emissions"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "ultratech-cement",
      "company": "UltraTech Cement",
      "sector": "Cement",
      "home_country_code": "IN",
      "home_country": "India",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 53,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-ultratech-cement",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NGT judgments and agency records as first-stage research leads",
        "key_gaps": "Need a verified facility-release portal, local unit standards, geocoded sites",
        "source_portals": [
          {
            "id": "IND_NGT",
            "name": "India National Green Tribunal case search",
            "url": "https://www.greentribunal.gov.in/judgementOrder/case-advance-search",
            "limitations": "case search has CAPTCHA; judgments not facility emissions"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          },
          {
            "id": "CLIMATE_TRACE",
            "name": "Climate TRACE",
            "url": "https://climatetrace.org/data",
            "limitations": "remote and model-derived source emission estimates; verify vintage"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "surgutneftegas",
      "company": "Surgutneftegas",
      "sector": "Oil & gas",
      "home_country_code": "RU",
      "home_country": "Russia",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 173,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 5090,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-surgutneftegas",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NVOS facility identity and federal registration metadata",
        "key_gaps": "Public measurable release files, access constraints, source independence",
        "source_portals": [
          {
            "id": "RUS_NVOS",
            "name": "Rosprirodnadzor NVOS facility register",
            "url": "https://rpn.gov.ru/activity/services/28169/",
            "limitations": "registered facilities; not a comprehensive measured-release time series"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "kuzbassrazrezugol",
      "company": "Kuzbassrazrezugol",
      "sector": "Coal",
      "home_country_code": "RU",
      "home_country": "Russia",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 118,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 2813,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-kuzbassrazrezugol",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NVOS facility identity and federal registration metadata",
        "key_gaps": "Public measurable release files, access constraints, source independence",
        "source_portals": [
          {
            "id": "RUS_NVOS",
            "name": "Rosprirodnadzor NVOS facility register",
            "url": "https://rpn.gov.ru/activity/services/28169/",
            "limitations": "registered facilities; not a comprehensive measured-release time series"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "elgaugol",
      "company": "Elgaugol",
      "sector": "Coal",
      "home_country_code": "RU",
      "home_country": "Russia",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 82,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-elgaugol",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NVOS facility identity and federal registration metadata",
        "key_gaps": "Public measurable release files, access constraints, source independence",
        "source_portals": [
          {
            "id": "RUS_NVOS",
            "name": "Rosprirodnadzor NVOS facility register",
            "url": "https://rpn.gov.ru/activity/services/28169/",
            "limitations": "registered facilities; not a comprehensive measured-release time series"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "tatneft",
      "company": "Tatneft",
      "sector": "Oil & gas",
      "home_country_code": "RU",
      "home_country": "Russia",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 82,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-tatneft",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NVOS facility identity and federal registration metadata",
        "key_gaps": "Public measurable release files, access constraints, source independence",
        "source_portals": [
          {
            "id": "RUS_NVOS",
            "name": "Rosprirodnadzor NVOS facility register",
            "url": "https://rpn.gov.ru/activity/services/28169/",
            "limitations": "registered facilities; not a comprehensive measured-release time series"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "sibanthracite-group",
      "company": "Sibanthracite Group",
      "sector": "Coal",
      "home_country_code": "RU",
      "home_country": "Russia",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 62,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-sibanthracite-group",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NVOS facility identity and federal registration metadata",
        "key_gaps": "Public measurable release files, access constraints, source independence",
        "source_portals": [
          {
            "id": "RUS_NVOS",
            "name": "Rosprirodnadzor NVOS facility register",
            "url": "https://rpn.gov.ru/activity/services/28169/",
            "limitations": "registered facilities; not a comprehensive measured-release time series"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "bumi-resources",
      "company": "Bumi Resources",
      "sector": "Coal",
      "home_country_code": "ID",
      "home_country": "Indonesia",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 177,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 4123,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-bumi-resources",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "PROPER compliance criteria and company-level assessment leads",
        "key_gaps": "Primary release quantities, parent ownership, site coordinates, appeal status",
        "source_portals": [
          {
            "id": "ID_PROPER",
            "name": "Indonesia PROPER environmental compliance program",
            "url": "https://proper.menlhk.go.id/proper/kriteria",
            "limitations": "compliance grades require interpretation and original record checking"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "pertamina",
      "company": "Pertamina",
      "sector": "Oil & gas",
      "home_country_code": "ID",
      "home_country": "Indonesia",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 157,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 8582,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-pertamina",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "PROPER compliance criteria and company-level assessment leads",
        "key_gaps": "Primary release quantities, parent ownership, site coordinates, appeal status",
        "source_portals": [
          {
            "id": "ID_PROPER",
            "name": "Indonesia PROPER environmental compliance program",
            "url": "https://proper.menlhk.go.id/proper/kriteria",
            "limitations": "compliance grades require interpretation and original record checking"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "alamtri-resources",
      "company": "AlamTri Resources",
      "sector": "Coal",
      "home_country_code": "ID",
      "home_country": "Indonesia",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 153,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-alamtri-resources",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "PROPER compliance criteria and company-level assessment leads",
        "key_gaps": "Primary release quantities, parent ownership, site coordinates, appeal status",
        "source_portals": [
          {
            "id": "ID_PROPER",
            "name": "Indonesia PROPER environmental compliance program",
            "url": "https://proper.menlhk.go.id/proper/kriteria",
            "limitations": "compliance grades require interpretation and original record checking"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "mitsubishi-corporation",
      "company": "Mitsubishi Corporation",
      "sector": "Coal & energy",
      "home_country_code": "JP",
      "home_country": "Japan",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 92,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-mitsubishi-corporation",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Japan PRTR chemical-release and transfer disclosures",
        "key_gaps": "Link company/facility identifiers and outcome-specific human/ecological effects",
        "source_portals": [
          {
            "id": "JPN_PRTR",
            "name": "Japan Pollutant Release and Transfer Register",
            "url": "https://www.env.go.jp/en/chemi/prtr/prtr.html",
            "limitations": "chemical substance coverage and reporting thresholds"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "inpex",
      "company": "INPEX",
      "sector": "Oil & gas",
      "home_country_code": "JP",
      "home_country": "Japan",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 90,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-inpex",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "Japan PRTR chemical-release and transfer disclosures",
        "key_gaps": "Link company/facility identifiers and outcome-specific human/ecological effects",
        "source_portals": [
          {
            "id": "JPN_PRTR",
            "name": "Japan Pollutant Release and Transfer Register",
            "url": "https://www.env.go.jp/en/chemi/prtr/prtr.html",
            "limitations": "chemical substance coverage and reporting thresholds"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "canadian-natural-resources",
      "company": "Canadian Natural Resources",
      "sector": "Oil & gas",
      "home_country_code": "CA",
      "home_country": "Canada",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 204,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 3078,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-canadian-natural-resources",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NPRI facility-level air/water/land and cross-program data",
        "key_gaps": "2025 NPRI preliminary data; use reviewed vintages for comparisons",
        "source_portals": [
          {
            "id": "CAN_NPRI",
            "name": "Canada National Pollutant Release Inventory",
            "url": "https://pollution-waste.canada.ca/national-release-inventory/",
            "limitations": "facility-level reports; 2025 currently preliminary"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "suncor-energy",
      "company": "Suncor Energy",
      "sector": "Oil & gas",
      "home_country_code": "CA",
      "home_country": "Canada",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 120,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": 3301,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-suncor-energy",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NPRI facility-level air/water/land and cross-program data",
        "key_gaps": "2025 NPRI preliminary data; use reviewed vintages for comparisons",
        "source_portals": [
          {
            "id": "CAN_NPRI",
            "name": "Canada National Pollutant Release Inventory",
            "url": "https://pollution-waste.canada.ca/national-release-inventory/",
            "limitations": "facility-level reports; 2025 currently preliminary"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "cenovus-energy",
      "company": "Cenovus Energy",
      "sector": "Oil & gas",
      "home_country_code": "CA",
      "home_country": "Canada",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 119,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-cenovus-energy",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NPRI facility-level air/water/land and cross-program data",
        "key_gaps": "2025 NPRI preliminary data; use reviewed vintages for comparisons",
        "source_portals": [
          {
            "id": "CAN_NPRI",
            "name": "Canada National Pollutant Release Inventory",
            "url": "https://pollution-waste.canada.ca/national-release-inventory/",
            "limitations": "facility-level reports; 2025 currently preliminary"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "tourmaline-oil",
      "company": "Tourmaline Oil",
      "sector": "Oil & gas",
      "home_country_code": "CA",
      "home_country": "Canada",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 91,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-tourmaline-oil",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NPRI facility-level air/water/land and cross-program data",
        "key_gaps": "2025 NPRI preliminary data; use reviewed vintages for comparisons",
        "source_portals": [
          {
            "id": "CAN_NPRI",
            "name": "Canada National Pollutant Release Inventory",
            "url": "https://pollution-waste.canada.ca/national-release-inventory/",
            "limitations": "facility-level reports; 2025 currently preliminary"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    },
    {
      "id": "arc-resources",
      "company": "ARC Resources",
      "sector": "Oil & gas",
      "home_country_code": "CA",
      "home_country": "Canada",
      "metric": {
        "name": "Published 2024 production-linked greenhouse gas emissions",
        "value": 54,
        "unit": "MtCO2e",
        "year": 2024,
        "historical_cumulative": null,
        "historical_unit": "MtCO2e",
        "boundary": "Global producer-linked: selected operational emissions plus use of marketed products; not territorial inventory",
        "kind": "modeled_producer_attribution",
        "not_equivalent_to": [
          "facility-level toxic release",
          "measured human exposure",
          "attributable human illness",
          "legal culpability"
        ]
      },
      "evidence": {
        "record_id": "cm24-arc-resources",
        "status": "corroborated",
        "grade": "B",
        "model_class": "modeled",
        "period": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "source": {
          "url": "https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466",
          "title": "Carbon Majors: 2024 Data Update",
          "publisher": "InfluenceMap / Carbon Majors",
          "published_at": "2026-01-21",
          "retrieved_at": "2026-11-06",
          "table_or_page": "Appendix 1, 2024 Emissions",
          "license": "Noncommercial reuse terms; check source permission before redistribution or commercial use"
        },
        "limitations": [
          "Producer attribution includes downstream fossil-fuel combustion where applicable; not geographic exposure or measured harm",
          "Coverage is oil, gas, coal, cement; not a cross-industry ranking",
          "An emission is not proof of illegality or cause of specific disease"
        ]
      },
      "gates": [
        {
          "id": "source",
          "label": "Documented source",
          "status": "linked",
          "description": "Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"
        },
        {
          "id": "entity",
          "label": "Legal entity",
          "status": "open",
          "description": "Need independently verified legal name, registration and ownership effective dates"
        },
        {
          "id": "facility",
          "label": "Facility attribution",
          "status": "open",
          "description": "Need named facility IDs, geographies and source-to-asset boundaries"
        },
        {
          "id": "release",
          "label": "Chemical release",
          "status": "open",
          "description": "Need site-specific chemical identities and air/water/soil release measurements"
        },
        {
          "id": "exposure",
          "label": "Exposure pathway",
          "status": "open",
          "description": "Need fate/transport, monitored exposure and receptor baselines"
        },
        {
          "id": "outcome",
          "label": "Attributable outcome",
          "status": "open",
          "description": "Need endpoint-specific counterfactual and independent scientific review"
        },
        {
          "id": "counsel",
          "label": "Legal assessment",
          "status": "open",
          "description": "Need jurisdiction, cause of action, standing, remedies and qualified local counsel"
        }
      ],
      "readiness": {
        "source_anchored": true,
        "legal_entity_resolved": false,
        "facility_identified": false,
        "pathway_measured": false,
        "exposure_validated": false,
        "impact_reviewed": false,
        "counsel_cleared": false
      },
      "investigation": {
        "research_entry_point": "NPRI facility-level air/water/land and cross-program data",
        "key_gaps": "2025 NPRI preliminary data; use reviewed vintages for comparisons",
        "source_portals": [
          {
            "id": "CAN_NPRI",
            "name": "Canada National Pollutant Release Inventory",
            "url": "https://pollution-waste.canada.ca/national-release-inventory/",
            "limitations": "facility-level reports; 2025 currently preliminary"
          },
          {
            "id": "EDGAR26",
            "name": "JRC EDGAR 2026",
            "url": "https://edgar.jrc.ec.europa.eu/report_2026",
            "limitations": "territorial country inventory without LULUCF for displayed values"
          }
        ],
        "next_steps": [
          "Verify legal entity and time-bound ownership using a primary company registry",
          "Resolve at least one facility/site ID with source-dated geographic records",
          "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
          "Corroborate transport and actual receptor exposure with appropriate measurements",
          "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
        ]
      },
      "publication_warning": "Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
    }
  ],
  "case_examples": [
    {
      "id": "minamata-1956",
      "title": "Minamata disease",
      "country": "JP",
      "subject": "Chisso (historical Minamata facility)",
      "hazard": "Methylmercury",
      "year": 1956,
      "medium": [
        "water",
        "biota",
        "humans"
      ],
      "finding_kind": "Government causation assessment and court compensation decision",
      "statement": "Japan's government concluded in 1968 that methylmercury discharged in industrial effluent accumulated through seafood and caused disease; a March 1973 court decision established Chisso's compensation responsibility for the Kumamoto case.",
      "key_figure": {
        "value": 1973,
        "unit": "year",
        "label": "court decision",
        "meaning": "Year of initial Kumamoto damages judgment, not an injury count"
      },
      "sources": [
        {
          "title": "Japan Ministry of the Environment · 1995 environmental report",
          "url": "https://www.env.go.jp/en/wpaper/1995/eae240000000065.html"
        },
        {
          "title": "Minamata official chronology",
          "url": "https://www.env.go.jp/en/chemi/hs/minamata2002/refer.html"
        }
      ],
      "chain": [
        "plant_effluent",
        "methylmercury",
        "water",
        "fish_and_shellfish",
        "human_consumption",
        "documented_neurological_disease",
        "compensation_judgment"
      ],
      "caveat": "Historical, site-specific determination. Does not establish present-day exposure or extrapolate to all current chemical producers."
    },
    {
      "id": "deepwater-horizon-2010",
      "title": "Deepwater Horizon",
      "country": "US",
      "subject": "BP / Macondo well (2010)",
      "hazard": "Oil spill",
      "year": 2010,
      "medium": [
        "water",
        "animals",
        "plants",
        "humans"
      ],
      "finding_kind": "Government-documented spill and court-approved civil settlement",
      "statement": "The U.S. Department of the Interior records an approximately 134-million-gallon release over 87 days following the April 2010 well blowout; a court approved a $20.8 billion settlement in April 2016 over civil penalties and natural-resource damages.",
      "key_figure": {
        "value": 134,
        "unit": "million gallons",
        "label": "released oil (approx.)",
        "meaning": "Event-specific spill magnitude, not a universal toxicity equivalent"
      },
      "sources": [
        {
          "title": "U.S. Department of the Interior · settlement announcement",
          "url": "https://www.doi.gov/node/20575"
        }
      ],
      "chain": [
        "offshore_well",
        "crude_oil",
        "gulf_water",
        "marine_ecosystems",
        "natural_resource_assessment",
        "court_supervised_remedies"
      ],
      "caveat": "Civil monetary terms include different categories. Settlement value is not a directly measured ecological loss."
    },
    {
      "id": "brumadinho-2019",
      "title": "Brumadinho dam rupture",
      "country": "BR",
      "subject": "Vale / Córrego do Feijão (2019)",
      "hazard": "Mine tailings and dam failure",
      "year": 2019,
      "medium": [
        "water",
        "soil",
        "animals",
        "plants",
        "humans"
      ],
      "finding_kind": "Government-documented dam failure and judicial repair agreement",
      "statement": "Minas Gerais records 272 deaths following the January 2019 rupture and a February 2021 judicial agreement with Vale for collective repair, with an estimated value of approximately R$37.69 billion.",
      "key_figure": {
        "value": 272,
        "unit": "reported deaths",
        "label": "event-specific human toll",
        "meaning": "Government-documented disaster death count, not a prediction for any other site"
      },
      "sources": [
        {
          "title": "Minas Gerais government · Brumadinho judicial agreement",
          "url": "https://www.mg.gov.br/pro-brumadinho/pagina/entenda-o-acordo-judicial-de-reparacao-ao-rompimento-em-brumadinho"
        },
        {
          "title": "Minas Gerais government · financial obligations",
          "url": "https://www.mg.gov.br/pro-brumadinho/pagina/reparacao-brumadinho-obrigacoes-de-pagar-da-vale-ao-estado"
        }
      ],
      "chain": [
        "tailings_dam",
        "structural_failure",
        "river_and_land",
        "communities_and_ecosystems",
        "documented_deaths_and_damage",
        "judicial_repair_agreement"
      ],
      "caveat": "Collective repair agreement, individual actions and criminal proceedings are distinct. Do not equate announced agreement amount with measured total harm."
    },
    {
      "id": "pfas-water-2024",
      "title": "Public-water-supplier PFAS settlement",
      "country": "US",
      "subject": "3M / public water supplier claims",
      "hazard": "PFAS",
      "year": 2024,
      "medium": [
        "water",
        "humans"
      ],
      "finding_kind": "Court-approved settlement; company denies admission",
      "statement": "3M reported final court approval of its U.S. public-water-supplier settlement in March 2024. The settlement provides for payments over time and expressly does not constitute an admission of liability or wrongdoing.",
      "key_figure": {
        "value": null,
        "unit": "not comparable",
        "label": "no injury estimate",
        "meaning": "Water-supplier settlement scope is not proof of any individual's disease"
      },
      "sources": [
        {
          "title": "3M public water supplier settlement announcement",
          "url": "https://news.3m.com/2024-04-01-3M-Settlement-with-Public-Water-Suppliers-to-Address-PFAS-in-Drinking-Water-Receives-Final-Court-Approval"
        },
        {
          "title": "3M SEC filing · 2024 second-quarter 10-Q: settlement terms and no admission",
          "url": "https://www.sec.gov/Archives/edgar/data/66740/000006674024000080/mmm-20240630.htm"
        }
      ],
      "chain": [
        "chemical_manufacture_and_use",
        "pfas_in_drinking_water",
        "public_water_suppliers",
        "treatment_and_monitoring",
        "settlement_not_admission"
      ],
      "caveat": "Public-water-supplier remedies are distinct from individualized health allegations; the company expressly denies admission of wrongdoing."
    }
  ]
};
