/**
 * MedLink Global Interoperability Engine
 * Converts local medical records into the International HL7/FHIR Standard.
 */

export const convertToFHIR = (patient, prescription) => {
  return {
    resourceType: "Bundle",
    type: "collection",
    timestamp: new Date().toISOString(),
    entry: [
      {
        fullUrl: `urn:uuid:${patient.id}`,
        resource: {
          resourceType: "Patient",
          id: patient.id,
          name: [{ text: patient.full_name }],
          telecom: [{ system: "email", value: patient.email }]
        }
      },
      {
        resource: {
          resourceType: "MedicationRequest",
          status: "active",
          intent: "order",
          medicationCodeableConcept: {
            text: prescription.medicines?.[0]?.name || "General Treatment"
          },
          authoredOn: new Date().toISOString()
        }
      }
    ],
    metadata: {
      standard: "HL7 FHIR R4",
      region: "Global/IN"
    }
  };
};
